"""City-view houses: one selected binding set per era, in the native boxes."""
import json
from pathlib import Path
import struct
import unittest

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets/atlas-hd'
SIZES = {'large': (158, 114), 'small': (123, 82)}
# The unprefixed keys are the industrial set; the other eras are prefixed.
ERAS = {'industrial': 'house', 'ancient': 'house/ancient',
        'medieval': 'house/medieval', 'modern': 'house/modern'}


def png_size(path):
    with open(path, 'rb') as f:
        header = f.read(24)
    if header[:8] != b'\x89PNG\r\n\x1a\n':
        raise ValueError(f'Not a PNG: {path}')
    return struct.unpack('>II', header[16:24])


class CityHouseTests(unittest.TestCase):
    def test_each_era_has_selected_house_bindings(self):
        bindings = json.loads((ART / 'compatibility/bindings.json').read_text(encoding='utf-8'))['bindings']
        selected = set(json.loads((ROOT / 'runtime-inputs.json').read_text(encoding='utf-8')))
        for era, prefix in ERAS.items():
            for size, (w, h) in SIZES.items():
                for n in range(4):
                    key = f'{prefix}/{size}/{n}'
                    with self.subTest(key=key):
                        b = bindings[key]
                        self.assertEqual((b['nativeWidth'], b['nativeHeight']), (w, h))
                        self.assertEqual(b['source'], f'sprites/city-details/{era}-{n}.png')
                        self.assertIn(b['file'], selected)
                        self.assertEqual(png_size(ART / b['file']), (w * 8, h * 8))


if __name__ == '__main__':
    unittest.main()
