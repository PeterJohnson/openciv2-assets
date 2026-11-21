// Review-only diagnostic: unchanged source placements, revised background roads.
const C = require('./common.cjs'), assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');

async function build() {
    const authoring = C.read(C.path.join(C.pack, 'authoring/city-landscape-eras.json'));
    const baseline = authoring.roadLayoutRevision.baselineRevision;
    const previous = file => {
        const r =
            spawnSync('git', [ 'show', `${baseline}:${file}` ], {cwd : C.root, maxBuffer : 64 * 1024 * 1024});
        if (r.status !== 0)
            throw Error(r.stderr.toString());
        return r.stdout;
    };
    const oldJSON = file => JSON.parse(previous('assets/atlas-hd/' + file));
    const scenes = C.read(C.path.join(C.pack, 'review/city-era-mockups.json')).scenes;
    const plans = C.read(C.path.join(C.pack, 'review/city-era-plans.json'));
    assert.deepEqual(plans, oldJSON('review/city-era-plans.json'), 'Enhanced placements preserved');
    for (const tool of ['engine-main.cpp', 'engine-shim.h', 'extract-engine.py', 'render.cjs',
                        'city-panorama.cjs']) {
        const file = `tools/atlas-review/${tool}`;
        assert.equal(C.fs.readFileSync(C.path.join(C.root, file), 'utf8').replaceAll('\r\n', '\n'),
                     previous(file).toString().replaceAll('\r\n', '\n'), file + ' preserved');
    }
    for (const site of ['coastal', 'river', 'inland']) {
        const file = `backgrounds/city-${site}-native.png`;
        assert.equal(C.sha(C.fs.readFileSync(C.path.join(C.pack, file))),
                     C.sha(previous('assets/atlas-hd/' + file)), 'Dirt landscape preserved');
    }
    const records = [];
    for (const s of scenes) {
        const trace = C.read(C.path.join(C.pack, s.trace));
        assert.deepEqual(trace, oldJSON(s.trace), s.id + ' source trace preserved');
        const original = C.fs.readFileSync(C.path.join(C.pack, s.images.original));
        assert.equal(C.sha(original), C.sha(previous('assets/atlas-hd/' + s.images.original)),
                     s.id + ' original render preserved');
        for (const [stage, file] of Object.entries(s.images))
            assert.equal(C.sha(C.fs.readFileSync(C.path.join(C.pack, file))), s.hashes[stage]);
        const landscape = C.fs.readFileSync(C.path.join(C.pack, s.background));
        const entry = authoring.edits.find(e => e.site === s.site && e.era === s.era);
        assert.equal(C.sha(landscape), entry.output.sha256);
        const meta = await C.sharp(landscape).metadata(), stats = await C.sharp(landscape).stats();
        assert.equal(meta.width, 1672);
        assert.equal(meta.height, 941);
        assert(stats.isOpaque);
        const reserved = trace.commands.filter(c => c.width > 0 && c.height > 0 && c.asset !== 'text')
                             .map(c => ({
                                      asset : c.asset,
                                      x : c.x + c.width * .12,
                                      y : c.y + c.height * .72,
                                      width : c.width * .76,
                                      height : c.height * .27
                                  }));
        const guide = await C.raw(landscape, 1280, 480);
        const markup =
            reserved
                .map(b => `<rect x="${b.x}" y="${b.y}" width="${b.width}" height="${
                         b.height}" fill="#ed3f66" fill-opacity=".45" stroke="#fff" stroke-width=".8"/>`)
                .join('');
        C.blit(guide, await C.raw(Buffer.from(C.svg(1280, 480, markup))), 0, 0);
        const guideFile = `review/images/${s.id}-slots.png`;
        C.write(C.path.join(C.pack, guideFile), await C.png(guide));
        records.push({
            id : s.id,
            landscape : s.background,
            sha256 : C.sha(landscape),
            traceSha256 : C.sha(Buffer.from(JSON.stringify(trace))),
            sourceTraceUnchanged : true,
            originalRenderUnchanged : true,
            enhancedPlanUnchanged : true,
            guide : guideFile,
            reservedGroundBands : reserved
        });
    }
    for (const era of ['medieval', 'modern']) {
        const sheet = C.clear(1600, 990, [ 23, 35, 34, 255 ]);
        for (const [row, s] of scenes.filter(s => s.era === era).entries()) {
            for (const [col, label] of ['Previous roads', 'Revised roads'].entries()) {
                const bytes = col ? C.fs.readFileSync(C.path.join(C.pack, s.images.hd))
                                  : previous('assets/atlas-hd/' + s.images.hd);
                const text =
                    C.svg(800, 30,
                          `<text x="12" y="22" fill="#e6d6af" font-family="sans-serif" font-size="19">${
                              s.site} · ${era} · ${label}</text>`);
                C.blit(sheet, await C.raw(Buffer.from(text)), col * 800, row * 330);
                C.blit(sheet, await C.raw(bytes, 800, 300), col * 800, row * 330 + 30);
            }
        }
        C.write(C.path.join(C.pack, `review/city-road-clearance-${era}.png`), await C.png(sheet));
    }
    C.json(C.path.join(C.pack, 'review/city-road-clearance.json'), {
        baselineRevision : baseline,
        scope :
            'Six retained era fixtures. Placement traces, enhanced plans and original renders are identical to the baseline. Guides approximate ground occupancy from sprite rectangles, including empty lots; they are visual review aids, not collision masks or a guarantee for every possible city inventory.',
        rendererImplementationsUnchanged : true,
        dirtLandscapesUnchanged : 3,
        records
    });
    const validationFile = C.path.join(C.pack, 'review/city-landscape-eras-validation.json');
    const validation = C.read(validationFile);
    validation.records = authoring.edits.map(e => ({
                                                 file : e.output.file,
                                                 width : e.output.width,
                                                 height : e.output.height,
                                                 sha256 : e.output.sha256,
                                                 binding : `city/landscape/${e.site}/${e.era}`
                                             }));
    C.json(validationFile, validation);
    console.log('Road review passed: 6 source traces, 6 original renders and enhanced placements unchanged.');
}

module.exports = {build};
if (require.main === module)
    build().catch(e => {
        console.error(e);
        process.exitCode = 1;
    });
