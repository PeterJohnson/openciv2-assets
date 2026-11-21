"""Extract local-only original city art for the six era review fixtures."""
import argparse
import hashlib
import importlib.util
import io
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
PACK = ROOT / 'assets/atlas-hd'
OUT = PACK / 'review/original-local/city-eras'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--game', type=Path, required=True)
    parser.add_argument('--scenes', type=Path, required=True)
    args = parser.parse_args()
    spec = importlib.util.spec_from_file_location('original_assets', Path(__file__).with_name('original-assets.py'))
    original = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(original)
    dll = args.game / 'cv.dll'
    images = {key[1]: Image.open(io.BytesIO(data)).copy()
              for key, data in original.resources(dll)
              if key[0] == 'GIFS' and data.startswith(b'GIF')}
    palette = Image.open(args.game / 'TERRAIN1.GIF').getpalette()
    colors = {str((i + 10) % 256): '#' + ''.join(f'{v:02x}' for v in palette[3*i:3*i+3])
              for i in range(256)}
    records = {}
    for scene in json.loads(args.scenes.read_text(encoding='utf-8')):
        trace = json.loads((PACK / scene['originalTrace']).read_text(encoding='utf-8'))
        bindings = {}

        def crop(name, resource, rect=None, transparent=True):
            im = images[resource]
            if rect:
                x, y, w, h = rect
                if min(x, y) < 0 or min(w, h) <= 0 or x+w > im.width or y+h > im.height:
                    raise ValueError(f'Crop outside cv.dll/{resource}: {rect}')
                im = im.crop((x, y, x+w, y+h))
            rgba = im.convert('RGBA')
            if transparent:
                assert im.mode == 'P'
                rgba.putalpha(Image.frombytes('L', im.size,
                    bytes(0 if i in (253, 255) else 255 for i in im.tobytes())))
            file = OUT / scene['id'] / (name + '.png')
            file.parent.mkdir(parents=True, exist_ok=True)
            rgba.save(file)
            bindings[name] = dict(file=file.relative_to(PACK).as_posix(),
                nativeWidth=im.width, nativeHeight=im.height, resource=resource, rect=rect,
                sha256=hashlib.sha256(file.read_bytes()).hexdigest())

        # CityViewWindow::create (city.cpp): pre-industrial and industrial+ rows.
        # The original has two house sheet rows, unlike the replacement's four era sets.
        for size, step, lot_y, house_y, w, h in [
            ('large', 159, 1, 116 if scene['era'] == 'medieval' else 231, 158, 114),
            ('small', 124, 346, 429 if scene['era'] == 'medieval' else 512, 123, 82),
        ]:
            for i in range(4):
                crop(f'house/{size}/{i}', 310, [1+step*i, house_y, w, h])
                crop(f'lot/{size}/{i}', 310, [1+step*i, lot_y, w, h])
        for name, (resource, x, y, w, h) in trace['sourceCrops'].items():
            # Superhighways selects the background; its foreground rectangle is empty.
            if w > 0 and h > 0:
                crop(name, resource, [x, y, w, h])
        crop('background', trace['originalBackground'], transparent=False)
        records[scene['id']] = bindings
    output = dict(bindings=records, palette=colors, sources={
        'cv.dll': hashlib.sha256(dll.read_bytes()).hexdigest(),
        'TERRAIN1.GIF': hashlib.sha256((args.game / 'TERRAIN1.GIF').read_bytes()).hexdigest(),
    })
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / 'bindings.json').write_text(json.dumps(output, indent=2) + '\n', encoding='utf-8')
    print('Prepared local-only original artwork for six city era scenes')


if __name__ == '__main__':
    main()
