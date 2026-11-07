#!/usr/bin/env python3
"""Build the game's runtime assets from this repository's selected artwork."""
import argparse
from pathlib import Path
import subprocess
import sys
from dependency import copy_changed, inventory, read_json, release, validate, write_json
from runtime_selection import RuntimeArt

ROOT = Path(__file__).resolve().parents[1]

# Public package boundary. Authoring inputs and build diagnostics stay local.
RUNTIME_FILES = (
    'data/atlas-hd.pack', 'data/fonts.bin', 'data/fonts_aa.bin',
    'data/ATLAS-PROVENANCE.md', 'data/cityview-rects.json',
    'include/hd_layouts.h', 'LICENSE', 'THIRD-PARTY.txt',
)


def build(force=False):
    art = RuntimeArt(ROOT)
    inputs = ['assets/atlas-hd/' + n for n in sorted(art.names)]
    inputs += ['assets/atlas-hd/PROVENANCE.md', 'runtime-inputs.json',
               'contracts/cityview-rects.json', 'tools/build_atlas.py',
               'tools/build.py', 'tools/runtime_selection.py',
               'data/native/fonts.bin', 'data/native/fonts_aa.bin',
               'LICENSE', 'THIRD-PARTY.txt']
    import PIL
    state = {'files': inventory(ROOT, inputs), 'pillow': PIL.__version__, 'schema': 1}
    output = ROOT / 'build'
    stamp = output / 'inputs.json'
    fresh = False
    if not force and stamp.exists() and read_json(stamp) == state:
        try:
            manifest = validate(output, 'openciv2-assets')
            fresh = set(manifest['files']) == set(RUNTIME_FILES)
        except (OSError, ValueError, KeyError):
            pass
    if not fresh:
        subprocess.run([sys.executable, str(ROOT / 'tools/build_atlas.py')], check=True)
        consumed = read_json(output / 'data/atlas-inputs.json')
        if sorted(consumed) != sorted(art.names):
            raise ValueError('Pack inputs changed; update runtime-inputs.json and rebuild')
        for name in ('fonts.bin', 'fonts_aa.bin'):
            copy_changed(ROOT / 'data/native' / name, output / 'data' / name)
        copy_changed(art.root / 'PROVENANCE.md', output / 'data/ATLAS-PROVENANCE.md')
        copy_changed(ROOT / 'contracts/cityview-rects.json', output / 'data/cityview-rects.json')
        for name in ('LICENSE', 'THIRD-PARTY.txt'):
            copy_changed(ROOT / name, output / name)
        write_json(output / 'package.json', {'schema': 1, 'kind': 'openciv2-assets',
                   'version': 'development', 'files': inventory(output, RUNTIME_FILES)})
        write_json(stamp, state)
    print(f'Runtime assets {"up to date" if fresh else "built"}: {output}', flush=True)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--force', action='store_true')
    ap.add_argument('--release', action='store_true')
    ap.add_argument('--version', default='2026.11.07.1')
    args = ap.parse_args()
    build(args.force)
    if args.release:
        release(ROOT / 'build', RUNTIME_FILES, ROOT / f'dist/openciv2-assets-{args.version}.zip',
                'openciv2-assets', args.version)


if __name__ == '__main__':
    main()
