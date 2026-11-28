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
cover all 42 roster slots. Ashoka represents India in the male slot, paired
with Indira Gandhi. This optional library includes the selected leader names
and the original LEADERS.TXT mapping.

## OpenCiv2's own media

OpenCiv2's own [music](assets/music), [sound effects](assets/sound), animated
diplomacy [heralds](assets/heralds) and [wonder movies](assets/wonders), with
their sources and credits ([LICENSE-media](LICENSE-media); the sound effects'
sources are CC0; the music tracks are excerpts of public-domain or CC0
recordings, credited in [assets/music](assets/music/README.md)). The game uses them in place of the original's where a game
folder lacks them, and with HD graphics in preference to them. OpenCiv2's build
(`make own-assets`) fetches the game-ready files from a pinned commit.
[What is still needed](docs/NEEDED.md) lists the media still to be found or
generated, with suggested prompts.

## Historical leader portraits

[An alternative set](assets/portraits-historical) of the diplomacy room's 42
leader portraits, a man and a woman for each tribe, made from historical works
of art in the public domain or under CC0 (six of them AI-generated), with each
picture's source, licence and, for the generated ones, the prompt. OpenCiv2 does
not load them: the game draws the art pack's own portraits. They are kept here
for reference and possible later use.
