/** Rebuild the optional tribe-portrait catalog and review; no game/runtime inputs are changed. */
const C = require('./common.cjs');
const assert = require('node:assert/strict');
const {fs, path, sharp} = C;
const record = C.read(path.join(C.pack, 'authoring/tribal-leaders.json'));
const output = path.join(C.pack, 'review/tribal-leaders');
const esc = s => String(s)
                     .replaceAll('&', '&amp;')
                     .replaceAll('<', '&lt;')
                     .replaceAll('>', '&gt;')
                     .replaceAll('"', '&quot;');
const rgba = {
    r : 0,
    g : 0,
    b : 0,
    alpha : 0
};
const frame = {
    width : 225,
    height : 275
};

function checkRoster() {
    assert.equal(record.tribes.length, 21);
    assert.equal(record.portraits.length, 42);
    assert.equal(new Set(record.portraits.map(p => p.id)).size, 42);
    for (let i = 0; i < 21; i++) {
        const tribe = record.tribes[i];
        assert.equal(tribe.index, i);
        for (const [offset, sex] of [[ 0, 'male' ], [ 1, 'female' ]]) {
            const p = record.portraits[2 * i + offset];
            assert.equal(p.index, 2 * i + offset);
            assert.equal(p.tribeIndex, i);
            assert.equal(p.tribe, tribe.tribe);
            assert.equal(p.gameName, tribe[sex]);
            assert.equal(p.sex, sex);
            assert.ok([ 'available', 'pending' ].includes(p.status));
            if (p.status === 'pending')
                assert.equal(p.file, null, 'Pending slots must not masquerade as a portrait.');
        }
    }
}

async function picture(p, width, height) {
    return sharp(path.join(C.pack, p.file))
        .resize(width, height, {fit : 'contain', background : rgba})
        .png()
        .toBuffer();
}

function textImage(width, height, body) {
    return Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height +
                       '"><style>text{font-family:Arial,sans-serif;fill:#efe7d4}</style>' + body + '</svg>');
}

async function sheet(people, name, small = false, light = false) {
    const cw = small ? 130 : 240, ch = small ? 166 : 355;
    const width = cw * 6, height = 48 + Math.ceil(people.length / 6) * ch;
    const layers = [];
    let labels = '<text x="16" y="28" font-size="19">Atlas HD · optional tribe leaders' +
                 (small ? ' · small-size / light-background check' : '') + '</text>';
    for (let i = 0; i < people.length; i++) {
        const p = people[i], x = (i % 6) * cw, y = 48 + Math.floor(i / 6) * ch;
        if (p.status === 'available') {
            layers.push({
                input : await picture(p, small ? 90 : 225, small ? 110 : 275),
                left : x + (small ? 20 : 7),
                top : y
            });
        } else {
            labels += '<text x="' + (x + 10) + '" y="' + (y + (small ? 55 : 120)) + '" font-size="' +
                      (small ? 12 : 18) + '">Portrait pending</text>';
        }
        const size = small ? 11 : 16;
        const ty = y + (small ? 130 : 301);
        labels += '<text x="' + (x + 10) + '" y="' + ty + '" font-size="' + size + '">' + esc(p.displayName) +
                  '</text><text x="' + (x + 10) + '" y="' + (ty + (small ? 16 : 25)) + '" font-size="' +
                  (small ? 10 : 13) + '">' + esc(p.tribe + ' · ' + p.sex) + '</text>';
    }
    if (light)
        labels = labels.replaceAll('<text ', '<text style="fill:#243332" ');
    layers.push({input : textImage(width, height, labels), left : 0, top : 0});
    await sharp({create : {width, height, channels : 4, background : light ? '#e7ddc8' : '#1b2a28'}})
        .composite(layers)
        .png()
        .toFile(path.join(output, name));
}

async function main() {
    checkRoster();
    fs.mkdirSync(path.join(output, 'previews'), {recursive : true});
    const catalog = C.read(path.join(C.pack, 'manifest.json'));
    const originals = catalog.entries.filter(e => !e.id.startsWith('tribal-leaders.'));
    const hashes = new Set(), entries = [], portraits = [];
    for (const p of record.portraits) {
        const item = {
            id : p.id,
            tribeIndex : p.tribeIndex,
            tribe : p.tribe,
            sex : p.sex,
            gameName : p.gameName,
            displayName : p.displayName || p.gameName,
            identity : p.identity,
            identityStatus : p.identityStatus,
            defaultSex : p.defaultSex,
            status : p.status,
            file : p.file,
            note : p.note,
            references : p.references
        };
        if (p.substitution)
            item.substitution = p.substitution;
        if (p.status === 'available') {
            const file = path.join(C.pack, p.file), bytes = fs.readFileSync(file);
            const hash = C.sha(bytes), meta = await sharp(bytes).metadata();
            assert.equal(hash, p.generation.sha256, p.id + ': native output changed');
            assert.equal(meta.format, 'png');
            assert.ok(meta.hasAlpha && meta.width >= 1000 && meta.height >= 1000, p.id);
            assert.ok(!hashes.has(hash), p.id + ': duplicate portrait');
            hashes.add(hash);
            const alpha = await sharp(bytes).ensureAlpha().extractChannel(3).raw().toBuffer();
            const stats = {transparent : 0, opaque : 0, nearOpaque : 0, translucent : 0};
            for (const a of alpha) {
                if (a === 0)
                    stats.transparent++;
                else if (a === 255)
                    stats.opaque++;
                else {
                    stats.translucent++;
                    if (a >= 250)
                        stats.nearOpaque++;
                }
            }
            assert.ok(stats.transparent > alpha.length * 0.05, p.id + ': no transparent surround');
            assert.ok(stats.opaque + stats.nearOpaque > alpha.length * 0.2, p.id + ': faint artwork');
            item.width = meta.width;
            item.height = meta.height;
            item.sha256 = hash;
            item.alpha = stats;
            await sharp(bytes)
                .resize(450, 550, {fit : 'contain', background : rgba})
                .webp({quality : 92, alphaQuality : 100})
                .toFile(path.join(output, 'previews', p.id + '.webp'));
            entries.push({
                id : 'tribal-leaders.' + p.id,
                label : p.tribe + ' · ' + item.displayName + ' (' + p.sex + ')',
                description : p.description + ' ' + p.note,
                category : 'tribal-leaders',
                file : p.file,
                width : meta.width,
                height : meta.height,
                sha256 : hash,
                source : {
                    kind : 'generated-original',
                    tool : 'built-in image_gen',
                    record : 'authoring/tribal-leaders.json',
                    portraitId : p.id
                },
                mapping : {kind : 'optional-tribe-leader', index : p.tribeIndex, sex : p.sex},
                suggestedAnchor : 'center',
                alpha : stats,
                kind : 'sprite',
                runtimeSelected : false
            });
        }
        portraits.push(item);
    }
    const pending = portraits.filter(p => p.status !== 'available').map(p => p.id);
    const pendingNotice =
        pending.length
            ? 'Pending: ' +
                  portraits.filter(p => p.status !== 'available').map(p => esc(p.displayName)).join(', ') +
                  '. The authoring record documents the generation failure; the mapping records empty slots explicitly. '
            : 'All roster slots have available portraits. ';
    const summary = {
        requested : 42,
        available : entries.length,
        pending,
        allAvailablePNGsValid : true,
        uniqueImageHashes : hashes.size,
        rosterRows : 21,
        runtimeSelectionModified : false,
        legacyPortraitsReplaced : false
    };
    C.json(path.join(C.pack, 'sprites/tribal-leaders/portraits.json'), {
        schemaVersion : 1,
        title : record.title,
        runtimeSelected : false,
        source : record.source,
        selection : 'Use zero-based tribeIndex plus sex; do not select by player slot or faction color.',
        display : {
            logicalFrame : frame,
            thumbnailFrame : {width : 90, height : 110},
            fit : 'contain',
            preserveAspectRatio : true,
            alpha : 'straight RGBA',
            note : 'Retained native PNG sizes vary. Fit the whole image, do not stretch or crop faces.'
        },
        completeness : summary,
        portraits
    });
    catalog.entries = originals.concat(entries);
    C.json(path.join(C.pack, 'manifest.json'), catalog);
    for (let i = 0; i < 7; i++)
        await sheet(portraits.slice(i * 6, i * 6 + 6), 'sheet-' + (i + 1) + '.png');
    await sheet(portraits, 'small-light.png', true, true);

    function card(p) {
        const visual =
            p.status === 'available'
                ? '<a href="../../' + p.file + '" title="Open native transparent PNG"><img src="previews/' +
                      p.id + '.webp" width="225" height="275" alt="' + esc(p.identity) +
                      ' painted portrait"></a>'
                : '<div class="pending">Portrait pending<br><small>Image service rejected generation</small></div>';
        const links = p.references
                          .map(id => {
                              const r = record.references.find(r => r.id === id);
                              assert.ok(r, 'Unknown reference ' + id);
                              return '<li><a href="' + esc(r.url) + '">' + esc(r.title) +
                                     '</a>: ' + esc(r.role) + '</li>';
                          })
                          .join('');
        return '<article><div class="portrait">' + visual + '</div><h3>' + esc(p.displayName) + ' <small>· ' +
               p.sex + '</small></h3><p class="identity">' + esc(p.identity) + '</p><p class="status">' +
               esc(p.identityStatus) + '</p><p>' + esc(p.note) + '</p>' +
               (p.status === 'available' ? '<p class="muted">' + p.width + ' × ' + p.height +
                                               ' native RGBA · <a href="../../' + p.file + '">PNG</a></p>'
                                         : '') +
               (links ? '<details><summary>Research references</summary><ul>' + links + '</ul></details>'
                      : '') +
               '</article>';
    }

    const groups =
        record.tribes
            .map(t => '<section data-search="' +
                      esc((t.tribe + ' ' + t.male + ' ' + t.female + ' ' +
                           portraits.filter(p => p.tribeIndex === t.index).map(p => p.displayName).join(' '))
                              .toLowerCase()) +
                      '"><h2>' + esc(t.tribe) + ' <small>tribe ' + t.index +
                      '</small></h2><div class="pair">' +
                      portraits.filter(p => p.tribeIndex === t.index).map(card).join('') + '</div></section>')
            .join('\n');
    C.write(path.join(output, 'index.html'), '<!doctype html><html lang="en"><meta charset="utf-8">' +
                                                 '<meta name="viewport" content="width=device-width,initial-scale=1"><title>Atlas HD · tribe leaders</title>' +
                                                 '<style>:root{color-scheme:dark;--back:#233632}*{box-sizing:border-box}body{margin:0;background:#101c1c;color:#eee5cf;font:16px/1.5 system-ui,sans-serif}main{max-width:1500px;margin:auto;padding:32px}h1{font:42px Georgia,serif}h2{font:27px Georgia,serif;border-bottom:1px solid #456054;padding-bottom:12px}h3{margin:12px 0 2px;font-size:19px}a{color:#e3bd73}small,.muted{color:#b8c5b9}p{max-width:1050px}.notice{background:#27372f;border-left:3px solid #d6ad66;padding:15px}.controls{display:flex;gap:20px;flex-wrap:wrap;position:sticky;top:0;z-index:1;background:#101c1cf5;padding:15px 0}label{display:grid;gap:4px}input,select{font:inherit;color:inherit;background:#20332e;border:1px solid #597064;padding:8px}.tribes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:18px}article{min-width:0;padding:14px;border:1px solid #3c5549;background:#182b26;border-radius:6px}article p{font-size:13px}article .identity{font-size:15px;margin:0}.status{color:#d2b980}.portrait{display:flex;justify-content:center;background:var(--back);min-height:275px;align-items:center}.portrait img{display:block;width:225px;height:275px;max-width:100%;object-fit:contain}.small .portrait{min-height:130px}.small .portrait img{width:90px;height:110px}.pending{text-align:center;padding:24px;font-size:18px}.pending small{font-size:12px}details{font-size:12px}ul{padding-left:18px}.light{--back:#e7ddc8}.checker{--back:repeating-conic-gradient(#30443e 0% 25%,#6d8076 0% 50%) 50%/20px 20px}footer{margin-top:36px;border-top:1px solid #456054;padding-top:16px;font-size:13px}[hidden]{display:none!important}@media(max-width:1050px){.tribes{grid-template-columns:1fr}}@media(max-width:500px){main{padding:16px}.pair{grid-template-columns:1fr}}</style>' +
                                                 '<main><a href="../../index.html">← Atlas HD</a><h1>Leaders of the 21 tribes</h1>' +
                                                 '<p>Optional painted portraits for the 21-tribe male/female roster from LEADERS.TXT, cross-checked against RULES.TXT. Ashoka is the selected Indian male leader in the original Gandhi slot. ' +
                                                 'Original compositions, transparent backgrounds and retained high-resolution pixels.</p>' +
                                                 '<p class="notice"><strong>' + entries.length +
                                                 ' of 42 portraits available.</strong> ' + pendingNotice +
                                                 'Existing generic portraits and runtime selection are unchanged.</p>' +
                                                 '<p>Display sizes below are fitting previews, not captures from the game. ' +
                                                 '<a href="../../sprites/tribal-leaders/portraits.json">Selection map</a> · ' +
                                                 '<a href="../../authoring/tribal-leaders.json">Prompts and provenance</a> · ' +
                                                 '<a href="../../sprites/tribal-leaders/README.md">Usage and identity notes</a> · ' +
                                                 '<a href="small-light.png">All portraits at thumbnail size</a></p>' +
                                                 '<div class="controls"><label>Find a tribe or leader<input id="search" type="search"></label>' +
                                                 '<label>Background<select id="background"><option value="">Dark green</option><option value="light">Light parchment</option><option value="checker">Transparency checker</option></select></label>' +
                                                 '<label>Preview size<select id="size"><option value="">225 × 275 portrait frame</option><option value="small">90 × 110 thumbnail frame</option></select></label></div>' +
                                                 '<div class="tribes">' + groups + '</div>' +
                                                 '<footer>Built-in image_gen illustrations from written briefs. Historical references guide identity and period dress; no reference bitmap was copied into the artwork. ' +
                                                 'Legendary, literary and invented game characters are labeled. In particular, the game assigns Sacagawea to the Sioux slot; she was Lemhi Shoshone. ' +
                                                 'These are artistic interpretations, not reconstructions of undocumented facial likenesses.</footer></main>' +
                                                 '<script>const search=document.getElementById("search"),bg=document.getElementById("background"),size=document.getElementById("size");' +
                                                 'search.oninput=()=>document.querySelectorAll("section[data-search]").forEach(s=>s.hidden=!s.dataset.search.includes(search.value.toLowerCase()));' +
                                                 'function display(){document.body.className=bg.value+" "+size.value}bg.onchange=size.onchange=display;</script></html>');
    C.json(path.join(output, 'validation.json'), summary);
    console.log(JSON.stringify(summary, null, 2));
}

main().catch(e => {
    console.error(e);
    process.exitCode = 1;
});
