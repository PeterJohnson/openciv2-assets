const assert = require('node:assert/strict'), {spawnSync} = require('node:child_process');
const C = require('./common.cjs'), Reports = require('./report-render.cjs');

async function main() {
    const scenes = C.read(C.path.join(C.pack, 'review/other-windows/scenes.json'));
    assert.equal(scenes.length, 35);
    assert.equal(new Set(scenes.map(s => s.id)).size, 35);
    const fixture = C.path.join(C.pack, 'review/fixtures/other-windows/reports.txt');
    const checks = [], images = [], preservedEnhanced = [];
    const baseline = C.read(C.path.join(__dirname, 'review-baseline.json')).enhancedImages;
    for (const s of scenes) {
        for (const variant of ['original', 'current', 'hd', 'proposed']) {
            const bytes = C.fs.readFileSync(C.path.join(C.pack, s[variant])),
                  meta = await C.sharp(bytes).metadata();
            assert.deepEqual([ meta.width, meta.height ], s[variant + 'Size']);
            assert(!s[variant].includes('original-local'));
            if (variant === 'original')
                assert(s[variant].startsWith('review/original-scenes/'));
            if (variant === 'proposed') {
                assert.equal(C.sha(bytes), baseline[s[variant]], s.id + ' approved enhanced preservation');
                preservedEnhanced.push({scene:s.id, sha256:C.sha(bytes)});
            }
            images.push({
                scene : s.id,
                variant,
                file : s[variant],
                width : meta.width,
                height : meta.height,
                sha256 : C.sha(bytes)
            });
        }
        assert.deepEqual(s.hdSize, s.currentSize.map(v => v * 2));
        assert.deepEqual(s.originalSize, s.currentSize);
        if (s.mode === 'extracted-window') {
            process.env.ATLAS_CONFIG = 'Release';
            const release = Reports.run('atlas-other.exe', [ s.id ]);
            process.env.ATLAS_CONFIG = 'Debug';
            const debug = Reports.run('atlas-other.exe', [ s.id ]);
            assert.deepEqual(debug, release, s.id + ' D/R');
            assert.deepEqual(release,
                             C.read(C.path.join(C.pack, 'review/traces/other-' + s.id + '.json')));
            assert.deepEqual([ release.width, release.height ], s.originalSize);
            assert(release.commands.length > 0, s.id + ' no draw commands');
            checks.push(
                {mode : s.id, commands : release.commands.length, debugReleaseEqual : true});
            if (s.id === 'tax-rates')
                for (const expected
                         of ['Total Income: 215   Total Cost: 238', 'Discoveries: 7 Turns'])
                    assert(release.commands.some(c => c.op === 'text' && c.text === expected),
                           expected);
            if (s.id === 'dialog-setup')
                assert.deepEqual(release.commands.filter(c => c.op === 'button').map(c => c.text),
                                 [ 'OK', 'Cancel' ]);
            if (s.id === 'dialog-confirmation')
                assert(release.commands.some(c => c.op === 'sprite' && c.text === 'popup-info'));
            if (s.id === 'status-panel')
                assert(release.commands.some(c => c.op === 'unit' && c.color === 4));
            if (s.id === 'pedia-terrain')
                assert(release.commands.some(c => c.op === 'sprite' &&
                                                  c.text === 'feature/forest/0' &&
                                                  c.width === 128 && c.height === 64));
            for (const variant of ['original', 'replacement']) {
                const file = C.path.join(C.root, 'build/atlas-review/generated/other',
                                         `other-${s.id}-${variant}.txt`);
                if (!C.fs.existsSync(file))
                    continue;
                const args = [
                    'report-glyphs', file,
                    ...(variant === 'original'
                            ? [ C.path.join(C.pack, 'review/original-local/anchors.txt') ]
                            : [])
                ];
                process.env.ATLAS_CONFIG = 'Release';
                const a = Reports.run('atlas-engine.exe', args);
                process.env.ATLAS_CONFIG = 'Debug';
                const b = Reports.run('atlas-engine.exe', args);
                assert.deepEqual(a, b, s.id + ' saved glyph D/R');
            }
        }
        if (s.mode === 'report') {
            const mode = s.id.replace('report-', '');
            process.env.ATLAS_CONFIG = 'Release';
            const release = Reports.run('atlas-reports.exe', [ mode, fixture ]);
            process.env.ATLAS_CONFIG = 'Debug';
            const debug = Reports.run('atlas-reports.exe', [ mode, fixture ]);
            assert.deepEqual(debug, release, mode + ' D/R');
            assert.deepEqual(release,
                             C.read(C.path.join(C.pack, 'review/traces/other-' + mode + '.json')));
            const buttons = release.commands.filter(c => c.asset === 'button');
            assert.equal(
                buttons.length,
                [ 'science', 'trade', 'defense', 'losses', 'intelligence' ].includes(mode) ? 2 : 1);
            assert(release.commands.some(c => c.asset === 'text' && c.text.trim()));
            checks.push({
                mode,
                commands : release.commands.length,
                debugReleaseEqual : true,
                buttons : buttons.map(c => c.text)
            });
            for (const variant of ['original', 'replacement']) {
                const file = C.path.join(C.root, 'build/atlas-review/generated',
                                         `report-${s.id}-${variant}.txt`);
                if (!C.fs.existsSync(file))
                    continue;
                const args = [
                    'report-glyphs', file,
                    ...(variant === 'original'
                            ? [ C.path.join(C.pack, 'review/original-local/anchors.txt') ]
                            : [])
                ];
                process.env.ATLAS_CONFIG = 'Release';
                const a = Reports.run('atlas-engine.exe', args);
                process.env.ATLAS_CONFIG = 'Debug';
                const b = Reports.run('atlas-engine.exe', args);
                assert.deepEqual(a, b);
            }
        }
    }
    delete process.env.ATLAS_CONFIG;
    for (const file of ['review/report-extraction.json', 'review/other-window-extraction.json']) {
        const meta = C.read(C.path.join(C.pack, file));
        for (const [path, sha] of Object.entries(meta.sourceHashes))
            assert(C.sourceMatches(path, sha), path + ' source hash');
    }
    assert.equal(C.read(C.path.join(C.pack, 'review/report-extraction.json')).functions.length, 32);
    const bad = spawnSync(C.path.join(C.root, 'build/atlas-review/Release/atlas-reports.exe'),
                          [ 'not-a-report', fixture ], {encoding : 'utf8'});
    assert.notEqual(bad.status, 0);
    const nativeMeta = C.read(C.path.join(C.pack, 'review/other-window-extraction.json'));
    assert.equal(nativeMeta.functions.length, 258);
    assert.equal(new Set(nativeMeta.functions.map(f => f.name)).size, 258);
    const badOther = spawnSync(C.path.join(C.root, 'build/atlas-review/Release/atlas-other.exe'),
                               [ 'not-a-window' ], {encoding : 'utf8'});
    assert.notEqual(badOther.status, 0, 'Unknown window must fail closed');
    const runtime = C.read(C.path.join(C.pack, 'review/other-windows/runtime-audit.json'));
    assert.equal(runtime.comparisons.length, 12);
    assert.equal(runtime.captures.length, 11);
    for (const c of runtime.captures)
        assert.equal(C.sha(C.fs.readFileSync(C.path.join(C.pack, c.file))), c.sha256, c.file);
    for (const c of runtime.comparisons)
        assert.equal(C.sha(C.fs.readFileSync(C.path.join(C.pack, c.cropFile))), c.cropSha256, c.id);
    for (const c of runtime.sourceIdentity) {
        assert(c.equalAfterLfNormalization, c.file + ' capture source identity');
        assert(C.sourceMatches(c.file, c.runtimeSha256), c.file + ' retained runtime capture source');
    }
    const enhanced =
        C.read(C.path.join(C.pack, 'review/fixtures/other-windows/enhanced-layouts.json'));
    assert.equal(enhanced.length, 23);
    for (const s of enhanced)
        for (const c of s.commands.filter(c => c.op === 'image'))
            assert(C.fs.existsSync(C.path.join(C.pack, c.binding.new)), s.id + ' enhanced asset');
    if (C.reviewConfig.sourceRevision !== 'working-tree') {
        const snapshot = C.read(C.path.join(C.sourceRoot, 'source.json'));
        assert.equal(snapshot.revision, C.reviewConfig.sourceRevision);
        for (const [name, entry] of Object.entries(snapshot.files))
            assert.equal(C.sha(C.fs.readFileSync(C.sourceFile(name))), entry.sha256,
                         name + ' cached source must remain unchanged');
    }
    const tracked = spawnSync('git', [ 'ls-files', 'assets/atlas-hd/review/original-local' ],
                              {cwd : C.root, encoding : 'utf8'});
    assert.equal(tracked.status, 0);
    assert.equal(tracked.stdout.trim(), '', 'Original input sheets must stay local');
    C.json(C.path.join(C.pack, 'review/other-windows/validation.json'), {
        scenes : 35,
        images : 140,
        reportBodies : 32,
        furtherWindowBodies : 258,
        enhancedPreservedFrom : 'tools/atlas-review/review-baseline.json',
        preservedEnhanced,
        sourceUnchanged : true,
        debugRelease : checks,
        sourceHashesMatch : true,
        nativeHdSharedLayout : true,
        runtimeComparisons : 12,
        rawExecutionCaptures : 11,
        captureBuild : runtime.captureBuild,
        captureSourceInputsMatch : runtime.sourceIdentity.length,
        originalMediaBoundary :
            'Council AVIs absent; original slots empty. Twelve OpenCiv2 execution comparisons; no legacy-executable or whole-frame pixel-equivalence claim. See runtime-audit.json.',
        outputs : images
    });
    console.log(
        'Additional windows: 35 scenes / 140 images; all D/R traces match; all approved enhanced PNGs preserved; 12 runtime comparisons; reference source verified.');
}

main().catch(e => {
    console.error(e);
    process.exitCode = 1;
});
