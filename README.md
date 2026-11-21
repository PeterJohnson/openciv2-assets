# OpenCiv2 graphics and runtime assets

The complete artwork and runtime-asset pipeline for OpenCiv2: generation masters,
editable SVGs, retained PNGs, authoring records, review tools, runtime fonts,
packing code and layout contracts. Game and renderer source lives in `openciv2`.

```sh
python -m pip install -r requirements.txt
python tools/build.py
python tools/build.py --release --version 2026.11.07.1
```

The build reads the explicit selection in `runtime-inputs.json` from this
repository. It needs no separate art clone, import step, image-generation service
or original-game installation. Unselected authoring material does not affect the
runtime pack or its incremental-build cache.

The runtime release contains only the graphics pack, bitmap fonts, generated
layout header, layout contract, provenance and notices. Masters, individual
source images, authoring fonts, comparisons and review tools stay in this
repository. Build diagnostics remain local as well.

```sh
python -m unittest discover -s tests
python tools/test_hd_factions.py
```

Game developers can use this local clone with `--assets /path/to/openciv2-assets`
or consume a pinned, cached runtime ZIP without installing Pillow or cloning
the authoring library. See [the build guide](docs/ASSET-DEPENDENCIES.md).

Rebuild the offline artwork comparisons on Windows with a local source checkout
and original-game installation:

```powershell
python tools/review.py --source C:\Projects\openciv2 --game C:\Games\Civ2
```

The [review build guide](tools/atlas-review/README.md) lists prerequisites, save
selection and individual steps. It uses a pinned source-renderer baseline from
the game checkout's history, preserves selected runtime artwork, and rebuilds
`assets/atlas-hd/index.html`. Original inputs and review outputs stay outside
the runtime release.

Authoring material lives in `assets/atlas-hd`. See
[artwork provenance](assets/atlas-hd/PROVENANCE.md) for source records and the
scope of comparison material, and [THIRD-PARTY.txt](THIRD-PARTY.txt) for font
attribution and notices. Noto authoring fonts retain their original OFL files.

## Optional tribe leader artwork

[Review the male/female tribe portraits](assets/atlas-hd/review/tribal-leaders/index.html).
The [selection map and usage notes](assets/atlas-hd/sprites/tribal-leaders/README.md)
cover all 42 original roster slots, with 41 paintings available and Gandhi pending
an image-service rejection. These assets are not selected into the runtime pack.
