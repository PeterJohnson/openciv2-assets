// Populated era previews: unchanged source slots for original/native/HD;
// the existing relative-scale/depth proposal remains a separate fourth stage.
const C = require('./common.cjs'), R = require('./render.cjs'), P = require('./city-panorama.cjs');
const L = require('./city-landscapes.cjs');
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const recordFile = C.path.join(C.pack, 'review/city-era-mockups.json');
const variants = {
    original : 'Original game art',
    current : 'Replacement · native',
    hd : 'HD only · source slots',
    proposed : 'Enhanced · relative scale'
};
const inventories = {
    medieval : {
        era : 1,
        population : 8,
        buildings : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14 ],
        wonders : [ 10, 11 ]
    },
    modern : {
        era : 3,
        population : 12,
        buildings : [ 1, 5, 7, 10, 12, 13, 15, 18, 22, 23, 24, 25, 26, 29, 33 ],
        wonders : [ 24, 26 ]
    }
};

function run(command, args) {
    const r = spawnSync(command, args, {encoding : 'utf8', maxBuffer : 64 * 1024 * 1024});
    if (r.error || r.status !== 0)
        throw Error(r.error || r.stderr || r.stdout || `Exit ${r.status}`);
    return r.stdout;
}

function originalTrace(scene, config) {
    return JSON.parse(run(C.path.join(C.root, `build/atlas-review/${config}/atlas-engine.exe`), [
        'city', C.path.join(C.pack, scene.fixture), C.path.join(C.pack, 'review/original-local/anchors.txt')
    ]));
}

async function replacementBindings(trace, scene) {
    const result = {...C.read(C.path.join(C.pack, 'compatibility/bindings.json')).bindings};
    for (const c of trace.commands) {
        if (c.width <= 0 || c.height <= 0)
            continue;
        const [family, id, variant] = c.asset.split('/');
        if (family === 'house') {
            result[c.asset] = result[`house/${scene.era}/${id}/${variant}`];
            assert(result[c.asset], c.asset);
        } else if (family === 'building' || family === 'wonder') {
            const entry =
                C.entries.find(e => e.mapping?.kind === (family === 'building' ? 'improvement' : 'wonder') &&
                                    e.mapping.index === +id);
            assert(entry, c.asset);
            // Same adapter policy as bindings.cjs; keep new adapters in ignored build output.
            const file = C.path.join(C.root, `build/atlas-review/city-eras/${scene.era}/${c.asset}.png`);
            C.write(file, await C.fit(C.path.join(C.pack, entry.file), c.width * 8, c.height * 8, .96));
            result[c.asset] = {
                file : C.path.relative(C.pack, file),
                nativeWidth : c.width,
                nativeHeight : c.height,
                source : entry.file
            };
        }
    }
    return result;
}

function htmlFragment() {
    if (!C.fs.existsSync(recordFile))
        return '';
    const records = C.read(recordFile).scenes;
    return `<style>.populated-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.era-controls{position:sticky;top:0;background:#172322;padding:12px 0;z-index:1}.era-controls select{padding:8px;background:#263a35;color:#f1e1bc}.era-scene{aspect-ratio:8/3;object-fit:fill}.populated-grid details{padding:8px;font-size:14px}@media(max-width:1100px){.populated-grid{grid-template-columns:1fr}}</style><section id="populated"><h2>Populated city views</h2>
<p>Six fixtures use the extracted <code>CityViewWindow::classify_site / layout_buildings / draw_buildings</code> routines. Original, replacement-native and HD retain their slot coordinates and draw order. Enhanced retains the separate relative-size and ground-depth proposal. The revised road paintings use gaps between fixed building ground bands, with smaller junctions and highway-to-local-road tapers. Placement rules are unchanged.</p>
<p>Medieval scenes use timber-and-plaster houses, civic/religious buildings, a chapel and observatory. Modern scenes use contemporary houses, commercial/industrial services, the United Nations and SETI. Coastal scenes add a harbor; modern coastal also adds port facilities. Original houses use the game's two sheet rows; replacement houses use the matching medieval/modern sets. Superhighways is represented by the road background, as in the source, without an extra building sprite. The standard fixture title/date is retained in every stage.</p>
<div class="era-controls"><label>Comparison <select id="era-stage">${
        Object.entries(variants)
            .map(([ k, v ]) => `<option value="${k}" ${k === 'hd' ? 'selected' : ''}>${v}</option>`)
            .join(
                '')}</select></label> <label><input type="checkbox" id="era-bare"> Hide buildings (road alignment)</label></div>
<p><a href="city-road-clearance-medieval.png">Medieval roads before / after</a> � <a href="city-road-clearance-modern.png">Modern roads before / after</a> � <a href="city-road-clearance.json">Slot guides and preservation checks</a></p><p><a href="city-era-mockups.png">Six-scene HD contact sheet</a> · <a href="city-era-mockups.json">Fixtures, inventories and output hashes</a> · <a href="city-era-validation.json">Renderer checks</a></p>
<div class="populated-grid">${
        records
            .map(s => `<figure data-scene="${s.id}"><figcaption><strong>${s.site} · ${s.era}</strong> · ${
                     s.houseCount} houses, ${s.buildingCount} improvements, ${
                     s.wonderCount} wonders</figcaption><a class="era-full" href="${
                     s.images.hd.replace('review/', '')}"><img class="era-scene" loading="lazy" alt="${
                     s.era} ${s.site} city with matching buildings and roads" src="${
                     s.images.hd.replace('review/', '')}"></a><details><summary>Building inventory</summary>${
                     s.inventory.join(', ')}</details></figure>`)
            .join('')}</div></section>
<script>(()=>{const scenes=${
        JSON.stringify(records.map(
            s => ({
                id : s.id,
                images : s.images,
                bare : s.bare
            })))},stage=document.querySelector('#era-stage'),bare=document.querySelector('#era-bare');function update(){bare.disabled=stage.value==='original';for(const s of scenes){const f=document.querySelector('[data-scene="'+s.id+'"]'),selected=(bare.checked&&!bare.disabled?s.bare[stage.value]:s.images[stage.value]),file=selected.startsWith('review/')?selected.slice(7):'../'+selected;f.querySelector('img').src=file;f.querySelector('a').href=file;}}stage.addEventListener('change',update);bare.addEventListener('change',update);})();</script>
<h2>Landscape artwork without buildings</h2>`;
}

async function build() {
    const scenes = [];
    for (const [kind, site] of L.sites.entries())
        for (const era of ['medieval', 'modern']) {
            const spec = inventories[era], buildings = [...spec.buildings ];
            if (site === 'coastal')
                buildings.push(30, ...(era === 'modern' ? [ 34 ] : []));
            const id = `city-${site}-${era}`, fixture = `review/fixtures/${id}.txt`;
            C.write(C.path.join(C.pack, fixture),
                    `${kind} ${spec.era} ${spec.population} 17\n${
                            [...buildings, ...spec.wonders.map(i => i + 100)].join(' ')}\n`);
            const scene = {
                id,
                site,
                era,
                mode : 'city',
                background : L.file(site, era),
                fixture,
                artEra : spec.era,
                population : spec.population,
                seed : 17,
                buildings,
                wonders : spec.wonders,
                trace : `review/traces/${id}.json`,
                originalTrace : `review/original-local/city-eras/${id}-trace.json`
            };
            const trace = C.engine('city', C.path.join(C.pack, fixture));
            assert.deepEqual(trace, C.engine('city', C.path.join(C.pack, fixture), 'Debug'),
                             id + ' replacement D/R');
            const original = originalTrace(scene, 'Release');
            assert.deepEqual(original, originalTrace(scene, 'Debug'), id + ' original D/R');
            assert.deepEqual(original.commands, trace.commands, id + ' original/replacement geometry');
            C.json(C.path.join(C.pack, scene.trace), trace);
            C.json(C.path.join(C.pack, scene.originalTrace), original);
            scenes.push(scene);
        }
    const input = C.path.join(C.root, 'build/atlas-review/city-era-scenes.json');
    C.json(input, scenes);
    run(process.env.PYTHON || 'python', [
        C.path.join(__dirname, 'city-era-originals.py'), '--game', C.reviewConfig.game, '--scenes', input
    ]);
    const originals = C.read(C.path.join(C.pack, 'review/original-local/city-eras/bindings.json'));
    const validation = [], plans = {};
    const sheet = C.clear(2560, 1584, [ 23, 35, 34, 255 ]);
    for (const [i, scene] of scenes.entries()) {
        const trace = C.read(C.path.join(C.pack, scene.trace)),
              bindings = await replacementBindings(trace, scene);
        const original = C.read(C.path.join(C.pack, scene.originalTrace)), ob = originals.bindings[scene.id];
        const background = C.path.join(C.pack, scene.background), bg = {};
        const buffers = {};
        buffers.original = await R.baseline(original, scene, ob, {
            originalText : true,
            palette : n => originals.palette[String(n & 255)],
            background : C.path.join(C.pack, ob.background.file)
        });
        for (const [stage, density, native] of [[ 'current', 1, true ], [ 'hd', 2, false ]]) {
            bg[stage] = await C.png(await C.raw(background, 1280 * density, 480 * density));
            buffers[stage] =
                await R.baseline(trace, scene, bindings, {density, native, background : bg[stage]});
        }
        const proposed = await P.render(trace, scene);
        buffers.proposed = proposed.buffer;
        bg.proposed = bg.hd;
        plans[scene.id] = proposed.plan;
        assert.equal(
            proposed.plan.objects.length,
            trace.commands
                .filter(c => c.width > 0 && c.height > 0 && /^(house|building|wonder)\//.test(c.asset))
                .length);
        for (const o of proposed.plan.objects.filter(o => o.family === 'house'))
            assert(o.artId.startsWith(`city-details.${scene.era}-`));
        scene.images = {};
        scene.bare = {};
        scene.hashes = {};
        for (const stage of Object.keys(variants)) {
            const file = `review/images/${scene.id}-${stage}.png`;
            C.write(C.path.join(C.pack, file), buffers[stage]);
            scene.images[stage] = file;
            scene.bare[stage] = stage === 'original' ? file : scene.background;
            scene.hashes[stage] = C.sha(buffers[stage]);
            const m = await C.sharp(buffers[stage]).metadata(),
                  density = [ 'hd', 'proposed' ].includes(stage) ? 2 : 1;
            assert.equal(m.width, 1280 * density);
            assert.equal(m.height, 480 * density);
        }
        const count = family => trace.commands.filter(c => c.asset.startsWith(family + '/')).length;
        scene.houseCount = count('house');
        scene.buildingCount = count('building');
        scene.wonderCount = count('wonder');
        scene.inventory = trace.commands.filter(c => /^(building|wonder)\//.test(c.asset)).map(c => {
            const [family, id] = c.asset.split('/');
            return C.entries
                .find(e => e.mapping?.kind === (family === 'building' ? 'improvement' : 'wonder') &&
                           e.mapping.index === +id)
                .id.split('.')[1]
                .replaceAll('-', ' ');
        });
        const x = i % 2 * 1280, y = Math.floor(i / 2) * 528;
        const label = C.svg(1280, 48,
                            `<text x="16" y="33" fill="#e6d6af" font-family="sans-serif" font-size="26">${
                                scene.site} · ${scene.era} · HD / source slots</text>`);
        C.blit(sheet, await C.raw(Buffer.from(label)), x, y);
        C.blit(sheet, await C.raw(buffers.hd, 1280, 480), x, y + 48);
        validation.push({
            id : scene.id,
            commands : trace.commands.length,
            debugReleaseEqual : true,
            originalReplacementGeometryEqual : true,
            originalBackground : original.originalBackground,
            enhancedObjectsRetained : proposed.plan.objects.length,
            replacementHouseEra : scene.era,
            variants : Object.keys(variants)
        });
        console.log(scene.id, scene.houseCount, 'houses;', scene.buildingCount, 'improvements;',
                    scene.wonderCount, 'wonders');
    }
    C.write(C.path.join(C.pack, 'review/city-era-mockups.png'), await C.png(sheet));
    C.json(recordFile, {
        schemaVersion : 1,
        sourceRevision : C.reviewConfig.sourceRevision,
        note :
            'Rendered fixtures, not game execution captures. Road paintings are routed around fixed source ground bands; source and enhanced placement rules remain unchanged. Original pixels occur only in composed review scenes, never the replacement/runtime catalogs.',
        variants,
        scenes
    });
    C.json(C.path.join(C.pack, 'review/city-era-plans.json'), plans);
    C.json(C.path.join(C.pack, 'review/city-era-validation.json'), {
        sourceRevision : C.reviewConfig.sourceRevision,
        originalSources : originals.sources,
        sourceFunctions : [
            'CityViewWindow::classify_site', 'CityViewWindow::layout_buildings',
            'CityViewWindow::draw_buildings'
        ],
        scope :
            'Six era/site fixtures; original/native/HD geometry and D/R trace equality. Visual inspection is separate; no integrated-game execution capture is claimed.',
        scenes : validation
    });
    await L.build();
}

module.exports = {
    build,
    htmlFragment
};
if (require.main === module)
    build().catch(e => {
        console.error(e);
        process.exitCode = 1;
    });
