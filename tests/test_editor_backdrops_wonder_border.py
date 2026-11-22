"""Scenario editor backdrops and the wonder window's border tile have their art."""
import hashlib
import json
from pathlib import Path
import struct
import unittest

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets/atlas-hd'
RECORD = 'authoring/editor-backdrops-wonder-border.json'
EDITORS = {
    'EDITORAS.GIF': 'backgrounds/editor-improvements-native.png',
    'EDITORSA.GIF': 'backgrounds/editor-units-native.png',
    'EDITORSQ.GIF': 'backgrounds/editor-cities-native.png',
}
MARBLE = 'interface/textures/wonder-marble.png'


def png_size(path):
    with open(path, 'rb') as f:
        header = f.read(24)
    if header[:8] != b'\x89PNG\r\n\x1a\n':
        raise ValueError(f'Not a PNG: {path}')
    return struct.unpack('>II', header[16:24])


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


class EditorBackdropWonderBorderTests(unittest.TestCase):
    def test_art_is_selected_and_sized(self):
        selected = set(read(ROOT / 'runtime-inputs.json'))
        external = {r['source']: r for r in read(ART / 'coverage.json')['external']}
        for source, file in EDITORS.items():
            with self.subTest(source=source):
                self.assertEqual(external[source]['replacements'][0], file)
                self.assertIn(file, selected)
                self.assertEqual(png_size(ART / file), (1280, 960))
        self.assertIn(MARBLE, selected)
        self.assertEqual(png_size(ART / MARBLE), (256, 128))

    def test_build_binds_the_keys(self):
        source = (ROOT / 'tools/build_atlas.py').read_text(encoding='utf-8')
        for source_name, file in EDITORS.items():
            key = source_name[:-4].lower()
            self.assertIn(f"('{key}','{file}')", source)
        self.assertIn(f"crop(f'resource/wonder.dll/gifs/{{20000+i}}',1,1,64,32,'{MARBLE}',False)", source)

    def test_provenance_and_catalog_hashes(self):
        record = {e['file']: e for e in read(ART / RECORD)['images']}
        catalog = {e['file']: e for e in read(ART / 'manifest.json')['entries']}
        for file in [*EDITORS.values(), MARBLE]:
            with self.subTest(file=file):
                digest = hashlib.sha256((ART / file).read_bytes()).hexdigest()
                self.assertEqual(record[file]['sha256'], digest)
                self.assertTrue(record[file]['prompt'])
                self.assertEqual(catalog[file]['sha256'], digest)
                self.assertEqual(catalog[file]['source']['record'], RECORD)


if __name__ == '__main__':
    unittest.main()
