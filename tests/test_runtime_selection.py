"""Keep authoring/review files out of the pack and public runtime release."""
import json
from pathlib import Path
import sys
import tempfile
import unittest
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'tools'))
from build import RUNTIME_FILES
from dependency import release, write_json
from runtime_selection import RuntimeArt


class RuntimeSelectionTests(unittest.TestCase):
    def test_adjacent_unselected_images_do_not_enter_pack(self):
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp)
            for name in ('sprites/palace/chosen.png', 'sprites/palace/experiment.png',
                         'authoring/masters/source.png', 'review/comparison.png'):
                p = repo / 'assets/atlas-hd' / name
                p.parent.mkdir(parents=True, exist_ok=True)
                p.write_bytes(b'image')
            write_json(repo / 'runtime-inputs.json', ['sprites/palace/chosen.png'])
            art = RuntimeArt(repo)
            self.assertEqual([p.name for p in art.pngs('sprites/palace')], ['chosen.png'])
            self.assertEqual(art.path('sprites/palace/chosen.png').read_bytes(), b'image')
            for name in ('sprites/palace/experiment.png', 'review/comparison.png',
                         'authoring/masters/source.png', '../outside.png'):
                with self.subTest(name=name), self.assertRaisesRegex(ValueError, 'not selected'):
                    art.path(name)
            self.assertEqual(art.used, {'sprites/palace/chosen.png'})

    def test_selection_rejects_review_sources_duplicates_and_unsafe_paths(self):
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp)
            for names in (['review/comparison.png'], ['authoring/masters/source.png'],
                          ['../outside.png'], ['sprites/a.png', 'sprites/a.png']):
                write_json(repo / 'runtime-inputs.json', names)
                with self.subTest(names=names), self.assertRaises(ValueError):
                    RuntimeArt(repo)

    def test_release_excludes_sources_and_build_diagnostics(self):
        required = {'data/atlas-hd.pack', 'data/fonts.bin', 'data/fonts_aa.bin',
                    'data/ATLAS-PROVENANCE.md', 'data/cityview-rects.json',
                    'include/hd_layouts.h', 'LICENSE', 'THIRD-PARTY.txt'}
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            extras = ['assets/atlas-hd/review/comparison.png',
                      'assets/atlas-hd/authoring/masters/source.png',
                      'data/atlas-inputs.json', 'data/atlas-bindings.json', 'inputs.json']
            for name in [*required, *extras]:
                p = root / name
                p.parent.mkdir(parents=True, exist_ok=True)
                p.write_bytes(b'fixture')
            output = root / 'runtime.zip'
            release(root, RUNTIME_FILES, output, 'openciv2-assets', 'test')
            with zipfile.ZipFile(output) as z:
                self.assertEqual(set(z.namelist()), required | {'package.json'})
                self.assertEqual(set(json.loads(z.read('package.json'))['files']), required)


if __name__ == '__main__':
    unittest.main()
