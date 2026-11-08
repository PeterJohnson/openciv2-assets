// Editable, original sandbag geometry. Retain the full 64x48 unit frame;
// trimming and centering would raise the barricade over the unit's body.
const C = require('./common.cjs');
const source = 'compatibility/improvement/fortified.svg';

async function bitmap() {
    return C.sharp(C.path.join(C.pack, source)).png().toBuffer();
}

async function build() {
    const file = 'compatibility/improvement/fortified.png';
    C.write(C.path.join(C.pack, file), await bitmap());
    const indexPath = C.path.join(C.pack, 'compatibility/bindings.json');
    const index = C.read(indexPath);
    index.bindings['improvement/fortified'] = {file, nativeWidth: 64, nativeHeight: 48, source};
    C.json(indexPath, index);
    console.log('Built fortified unit barricade: ' + file);
}

if (require.main === module)
    build().catch(error => { console.error(error); process.exitCode = 1; });

module.exports = {bitmap, source};
