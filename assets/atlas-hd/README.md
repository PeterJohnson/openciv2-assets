# Atlas HD

Atlas HD is the artwork library for OpenCiv2. This repository owns the source
art, runtime pack builder, asset metadata and offline comparison tools. The
`openciv2` repository owns the game and renderer implementations.

Open the [offline gallery](index.html) to compare original artwork, replacement
art at native resolution, HD art and enhanced presentation designs. Viewing the
checked-in comparisons needs no original-game installation or web server.

## Asset organization

| Location | Purpose |
| --- | --- |
| [manifest.json](manifest.json) | Authoring catalog: selected artwork, dimensions, hashes and source-master relationships |
| [coverage.json](coverage.json) | Mapping from inventoried image-resource roles to replacement artwork |
| [sprites](sprites/), [backgrounds](backgrounds/) | Painted units, cities, buildings, people, resources and scene backgrounds |
| [map](map/) | Terrain, coast, river and transport banks, material textures, anchors and detail variants |
| [interface](interface/) | Controls, economy symbols, faction graphics and window/report backgrounds |
| [city/panorama](city/panorama/) | Enhanced panorama sizing and wall/gate assembly metadata |
| [compatibility/bindings.json](compatibility/bindings.json) | Derived image adapters for the native rectangles exercised by review fixtures |
| [authoring](authoring/) | Generation prompts, selected origins and source masters |
| [fonts](fonts/) | Authoring/review fonts and their notices |
| [review](review/) | Fixtures, traces, comparisons, extraction reports and validation records |

The authoring catalog and review bindings have a broader scope than the game
package. [runtime-inputs.json](../../runtime-inputs.json) explicitly selects what
the runtime builder consumes. Adding an image to this directory does not add it
to the game. The coverage map describes image roles; it does not qualify every
scenario, expansion, window or game state.

City-view houses have one binding set per era of `sprites/city-details`.
`house/large/0`-`3` and `house/small/0`-`3` are the industrial set, which the
review fixtures draw; `house/<era>/large/0`-`3` and `house/<era>/small/0`-`3`
hold the `ancient`, `medieval` and `modern` sets, fitted into the same 158x114
and 123x82 boxes. The empty lots (`lot/...`) are shared by every era.

## Build the runtime assets

From the `openciv2-assets` root:

```sh
python -m pip install -r requirements.txt
python tools/build.py
python -m unittest discover -s tests
python tools/test_hd_factions.py
```

The runtime build uses the selected images and metadata directly. It needs no
original installation or image-generation service. Masters, review images and
tools stay outside the runtime release. See the
[dependency and release guide](../../docs/ASSET-DEPENDENCIES.md) for local game
builds, cached releases and publishing.

## Rebuild

The optional comparison build requires Windows, MSVC x86 tools, Python/Pillow,
Node/Sharp, an OpenCiv2 source checkout and original-game inputs:

```powershell
python tools/review.py --source ..\openciv2 --game C:\Games\Civ2 --save C:\Saves\he_a1788.sav
```

The [review build guide](../../tools/atlas-review/README.md) documents path
overrides, prerequisites and individual steps. It is the authoritative command
sequence. The driver caches the source revision pinned in
[review-source.json](../../tools/atlas-review/review-source.json) without changing
the game checkout. Build outputs and raw original inputs remain ignored.

A comparison rebuild reuses approved artwork. It rebuilds the core scenes and
the original/native/HD additional windows, preserves approved enhanced window
proposals, and checks that runtime-selected assets and installed inputs remain
unchanged. Authoring tools that intentionally change images are a separate step.

## Four rendering stages

| Stage | Meaning |
| --- | --- |
| Original game artwork | Installed sheets/resources replayed at native resolution with reference bitmap fonts and original registration points |
| Replacement native resolution | Replacement images in the same source-selected logical rectangles, with the review's replacement font backend |
| HD only | The same commands, ordering and logical geometry on a higher-density surface, with larger RGBA images and replacement fonts |
| HD + cohesion | A separate preview renderer exploring world-space materials, network composition, detail levels and enhanced layouts |

These stages describe the **offline reference renderer**, not selectable modes
or the complete behavior of the current game. Native zoom cutoffs in this
baseline can differ from the game renderer. Enhanced images are design examples,
not evidence that those layouts or map algorithms are integrated.

The gallery contains 22 core scenes and
[35 additional window comparisons](OTHER-WINDOWS.md). Core scenes include three
views of the same imported 1788 save, synthetic map/network fixtures, city
panoramas, throne stages, diplomacy, spacecraft and city-management windows.
The 4K exports are presentation resamples; they add no source detail.

## Editing artwork

1. Locate the canonical asset and its role in `manifest.json`, the relevant
   layout/binding metadata, and `runtime-inputs.json`. Preserve the distinction
   between authoring masters, derived review adapters and runtime inputs.
2. Edit the source art or its generator deliberately. Preserve transparent
   coverage, logical frames, anchors and semantic IDs. Record generated-image
   inputs and outputs in `authoring/`; do not reconstruct a master from a
   magnified review image.
3. Regenerate affected derivatives and update their recorded dimensions/hashes.
   Add runtime inputs explicitly when needed. Coordinate layout-contract changes
   with the game checkout; see [cityview-rects.json](../../contracts/cityview-rects.json).
4. Build the runtime pack, run the checks above, and rebuild relevant comparisons.
   The approved enhanced-window hashes in
   [review-baseline.json](../../tools/atlas-review/review-baseline.json) should
   change only after intentional proposal edits have been reviewed.
5. Check the result in the game at relevant zooms and display densities. Offline
   traces do not exercise input handling, dialog stacking, animation or GPU caches.

Focused tools live in [tools/atlas-review](../../tools/atlas-review/). Useful entry
points include `art.cjs` and `bindings.cjs` for terrain/network adapters,
`terrain-blends.cjs` and `terrain-vegetation.cjs` for ground/feature authoring,
`unit-banners.cjs` and `city-anchors.cjs` for registration, and `economy.cjs`,
`native-backgrounds.cjs`, `report-design.cjs` and `city-panorama.cjs` for UI/scenes.
Inspect a tool's input/output scope before running it: some generate selected
art, while others only compose review images.

One-time before/after scripts such as `refresh-economy.cjs`,
`refresh-isolated-networks.cjs`, `refresh-river-review.cjs`,
`review-report-design.cjs` and `review-window-content.cjs` require unavailable
art-history objects. They are not part of the supported rebuild workflow.
Use the configured review driver for comparisons; port any needed specialized
check to explicit input hashes before relying on it for new development.

## Technical references

| Topic | Reference |
| --- | --- |
| Source extraction, direction masks, sprite frames and supplied state | [Renderer contracts](RENDERER-AUDIT.md) |
| Comparison evidence and untested runtime behavior | [Fidelity limits](FIDELITY-AUDIT.md) |
| Enhanced map, label and window design rationale | [Enhanced rendering designs](RENDER-UPGRADES.md) |
| Report/dialog coverage and shared-background constraints | [Additional windows](OTHER-WINDOWS.md) |
| Authored/generated inputs, fonts and original-art exclusions | [Provenance](PROVENANCE.md) |

Focused visual references include [unexplored edges](review/unexplored-edges/index.html),
[land transitions](review/land-borders.html), [coasts](review/coast-audit.html),
[rivers](review/river-course.html), [unit banners](review/unit-banners.png),
[city labels](review/city-size-anchors.png), [citizens](review/citizens.html),
[economy symbols](review/economy-symbols.png) and
[native window backgrounds](review/native-backgrounds.png).

## Original game art comparison

[Original-art references](review/original-scenes/README.md) contain composed
scene renders and documented OpenCiv2 execution captures. They are review
material with separate rights, outside the replacement-art license, runtime
selection, coverage bank and replacement bindings.

Source GIFs, DLL/EXE resources, extracted sprites, palettes, binding tables and
full original text files stay in ignored local directories. Do not add them to
the artwork catalog or runtime pack. The comparison build reads these inputs
without executing the original binaries or modifying the installation/save.

Original/native/HD scenes share source geometry, but use different image and
font backends. The [fidelity audit](FIDELITY-AUDIT.md) distinguishes replay checks
from runtime captures and explains why they do not establish whole-frame pixel
equivalence to the original executable.
