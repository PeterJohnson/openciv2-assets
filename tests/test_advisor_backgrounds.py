"""Advisor/report backdrops: tiles.dll 50-59, 65, 66 use their painted backgrounds."""
import hashlib
import json
from pathlib import Path
import struct
import unittest

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets/atlas-hd'
BACKGROUNDS = {
    50: 'report-domestic', 51: 'report-defense', 52: 'report-foreign', 53: 'report-attitude',
    54: 'report-trade', 55: 'report-science', 56: 'report-wonders', 57: 'report-top-cities',
    58: 'report-demographics', 59: 'report-score', 65: 'tax-rate-small', 66: 'tax-rate-large',
}


def png_size(path):
    with open(path, 'rb') as f:
        header = f.read(24)
    if header[:8] != b'\x89PNG\r\n\x1a\n':
        raise ValueError(f'Not a PNG: {path}')
    return struct.unpack('>II', header[16:24])


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


class AdvisorBackgroundTests(unittest.TestCase):
    def test_backdrops_use_selected_painted_backgrounds(self):
        coverage = {r['source']['id']: r for r in read(ART / 'coverage.json')['resources']
                    if r['source']['file'].lower() == 'tiles.dll'}
        selected = set(read(ROOT / 'runtime-inputs.json'))
        for id, stem in BACKGROUNDS.items():
            file = f'backgrounds/{stem}-native.png'
            with self.subTest(id=id):
                r = coverage[id]
                self.assertEqual(r['source']['dimensions'], [640, 480])
                # The build fits the first replacement into the resource.
                self.assertEqual(r['replacements'][0], file)
                self.assertIn(file, selected)
                self.assertEqual(png_size(ART / file), (1280, 960))

    def test_backgrounds_have_provenance_and_catalog_entries(self):
        record = {e['resource']: e for e in read(ART / 'authoring/advisor-backgrounds.json')['images']}
        catalog = {e['file']: e for e in read(ART / 'manifest.json')['entries']}
        for id, stem in BACKGROUNDS.items():
            file = f'backgrounds/{stem}-native.png'
            with self.subTest(id=id):
                digest = hashlib.sha256((ART / file).read_bytes()).hexdigest()
                e = record[f'resource/tiles.dll/gifs/{id}']
                self.assertEqual(e['file'], file)
                self.assertEqual(e['sha256'], digest)
                self.assertTrue(e['prompt'])
                self.assertEqual(catalog[file]['sha256'], digest)
                self.assertEqual(catalog[file]['source']['record'], 'authoring/advisor-backgrounds.json')


if __name__ == '__main__':
    unittest.main()
