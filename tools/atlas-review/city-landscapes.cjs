// Derivatives and catalog metadata for retained city-landscape era paintings.
const C = require('./common.cjs');
const sites = [ 'coastal', 'river', 'inland' ];
const eras = [ 'ancient', 'medieval', 'modern' ];
const file = (site, era) => `backgrounds/city-${site}${era === 'ancient' ? '' : '-' + era}-native.png`;
const key = (site, era) => `city/landscape/${site}/${era}`;

function eraBindings() {
    return Object.fromEntries(sites.flatMap(site => ['medieval', 'modern'].map(era => [key(site, era), {
                                                                                   file : file(site, era),
                                                                                   nativeWidth : 1280,
                                                                                   nativeHeight : 480,
                                                                                   source : file(site, era)
                                                                               }])));
}

async function build() {
    const manifest = C.read(C.path.join(C.pack, 'manifest.json'));
    const record = C.read(C.path.join(C.pack, 'authoring/city-landscape-eras.json'));
    for (const edit of record.edits) {
        const bytes = C.fs.readFileSync(C.path.join(C.pack, edit.output.file));
        if (C.sha(bytes) !== edit.output.sha256)
            throw Error('Retained landscape master hash mismatch: ' + edit.output.file);
        const export4k = edit.output.file.replace('-native.png', '-4k.png');
        const rendered = await C.sharp(bytes).resize(3840, 2160, {fit : 'fill'}).png().toBuffer();
        C.write(C.path.join(C.pack, export4k), rendered);
        const entry = {
            id : `city-${edit.site}-${edit.era}`,
            description : `${edit.site} city landscape with ${
                edit.era === 'medieval' ? 'medieval stone-paved roads'
                                        : 'modern divided highways and local road transitions'}`,
            file : edit.output.file,
            width : edit.output.width,
            height : edit.output.height,
            sha256 : edit.output.sha256,
            kind : 'background',
            category : 'backgrounds',
            source : {method : 'built-in image_gen edit', record : 'authoring/city-landscape-eras.json'},
            displayExport :
                {file : export4k, width : 3840, height : 2160, resampled : true, sha256 : C.sha(rendered)},
            export4k
        };
        const index = manifest.entries.findIndex(e => e.id === entry.id);
        if (index < 0)
            manifest.entries.push(entry);
        else
            manifest.entries[index] = entry;
    }
    C.json(C.path.join(C.pack, 'manifest.json'), manifest);
    const bindings = C.read(C.path.join(C.pack, 'compatibility/bindings.json'));
    Object.assign(bindings.bindings, eraBindings());
    C.json(C.path.join(C.pack, 'compatibility/bindings.json'), bindings);
    C.json(C.path.join(C.pack, 'city/panorama/landscapes.json'), {
        schemaVersion : 1,
        logicalSize : [ 1280, 480 ],
        note :
            'Additional era artwork. Existing resource/cv.dll/gifs/* bindings remain unchanged. The game must select the new named keys to use these variants.',
        eras : {
            ancient : 'Existing dirt-track landscape',
            medieval : 'Stone-paved roads',
            modern : 'Divided highways; local road transitions near water'
        },
        sites : Object.fromEntries(sites.map(
            (site, i) => [site, Object.fromEntries(eras.map(
                                    era => [era, {
                                        file : file(site, era),
                                        binding : era === 'ancient' ? `resource/cv.dll/gifs/${340 + i * 5}`
                                                                    : key(site, era)
                                    }]))]))
    });
    const image = C.clear(1800, 1104, [ 23, 35, 34, 255 ]);
    const text = async (value, x, y, width = 600) => C.blit(
        image,
        await C.raw(Buffer.from(C.svg(
            width, 30,
            `<text x="12" y="22" fill="#e6d6af" font-family="sans-serif" font-size="19">${value}</text>`))),
        x, y);
    for (const [row, site] of sites.entries())
        for (const [col, era] of eras.entries()) {
            await text(`${site} · ${era === 'ancient' ? 'existing dirt tracks' : era}`, col * 600, row * 368);
            C.blit(image, await C.raw(C.path.join(C.pack, file(site, era)), 600, 338), col * 600,
                   row * 368 + 30);
        }
    C.write(C.path.join(C.pack, 'review/city-landscape-eras.png'), await C.png(image));
    const rows =
        sites
            .map(site => `<section><h2>${site}</h2><div class="grid">${
                     eras.map(era => `<figure><figcaption>${
                                  era === 'ancient' ? 'Existing dirt tracks'
                                  : era === 'medieval'
                                      ? 'Medieval · stone-paved roads'
                                      : 'Modern · highways and local roads'}</figcaption><a href="../${
                                  file(site, era)}"><img src="../${file(site, era)}"></a></figure>`)
                         .join('')}</div></section>`)
            .join('');
    C.write(
        C.path.join(C.pack, 'review/city-landscape-eras.html'),
        `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>City landscape road eras</title><style>body{margin:24px;background:#172322;color:#e6d6af;font:16px/1.5 system-ui}a{color:#b8d9a8}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}figure{margin:0}img{width:100%}figcaption{padding:8px}h2{text-transform:capitalize}p{max-width:1100px}@media(max-width:900px){.grid{grid-template-columns:1fr}}</style><a href="../index.html">Atlas HD</a><h1>City landscape road eras</h1><p>Three retained dirt-track landscapes, six new painted era variants. Roads now follow gaps between fixed building plots; modern highway approaches narrow into local streets before the city clusters. These are bare city-view backgrounds with open plots for the game's building sprites.</p><p>Native paintings retain the generated pixels. Linked 4K exports in the catalog are resampled display copies. <a href="../city/panorama/landscapes.json">Files and runtime binding keys</a> · <a href="../authoring/city-landscape-eras.json">Generation prompts and provenance</a></p>${
            require('./city-era-mockups.cjs').htmlFragment()}${rows}</html>`);
    console.log('Six era landscapes cataloged; nine-image comparison rebuilt');
}

module.exports = {
    sites,
    eras,
    file,
    key,
    eraBindings,
    build
};
if (require.main === module)
    build().catch(e => {
        console.error(e);
        process.exitCode = 1;
    });
