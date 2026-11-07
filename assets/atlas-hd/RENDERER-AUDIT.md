# Reference renderer contracts

The offline comparison tools extract rendering functions from the configured
`openciv2` checkout. The default revision is pinned in
[review-source.json](../../tools/atlas-review/review-source.json) and exported to
an ignored, hash-validated cache. All source behavior described here refers to
that baseline, not necessarily the current game renderer. The
[build guide](../../tools/atlas-review/README.md) controls source selection.

## What is compiled

| Extractor | Executable and scope | Recorded source identity |
| --- | --- | --- |
| `extract-engine.py` | `atlas-engine.exe`: 50 unchanged map, unit/city, panorama, throne and saved-state helper bodies; seven table initializers | [Engine extraction](review/engine-extraction.json) |
| `extract-windows.py` | `atlas-windows.exe`: 30 additional window/spacing bodies | [Window extraction](review/window-extraction.json) |
| `extract-reports.py` | `atlas-reports.exe`: 32 report/selection bodies | [Report extraction](review/report-extraction.json) |
| `extract-other.py` | `atlas-other.exe`: 258 further window/control/helper bodies | [Additional-window extraction](review/other-window-extraction.json) |

These are separate extraction sets, not a count of unique functions across all
binaries. The bodies are compiled with MSVC x86 in Debug and Release. Extraction
normalizes line endings and adds source `#line` mappings; the metadata records
file hashes, function names, lines and body hashes. Use that index rather than
copying source line numbers into documentation.

Map selection/projection lives in `src/auto/mapview.cpp` and `map.cpp`; sprite
selection and zoom arithmetic in `graphics.cpp`; panorama layout in `city.cpp`;
throne selection in `reports.cpp`; cosmetic random state in `src/game/random.cpp`
and `src/auto/support.cpp`. The legacy indexed row blitter is a device boundary,
not a compiled part of this PNG replay.

## Explicit adapter boundaries

`engine-shim.h` supplies finite fixture state and records drawing operations.
It preserves required x86 layouts, including the 60-byte sprite stride and
city-view offsets. The throne rectangle tables share backing storage required
by the source pointer arithmetic. Empty-stack sentinels have defined ownership
and visibility; inactive fixture units cannot become accidental draw candidates.

The source executes layout, staggered projection, row traversal, neighbor
selection, object selection and visibility rules. The drawing backend supplies
full untrimmed PNG frames, logical sizes and art-specific anchors. It does not
recreate indexed sprite storage or the binary row blitter. Resampling, RGBA
compositing and replacement font rasterization belong to that adapter.

Original-art text uses the reference bitmap bank in `data/native/fonts.bin`.
Replacement-native/HD text uses smooth replacement fonts in the same logical
spans and clips. Enhanced typography has separate presentation rules. Palette
operations are represented by explicit colors/masks; font and pixel backends
therefore remain deliberate differences from the original executable.

The fixtures are supplied render states, not initialized gameplay sessions.
Input/picking, combat animation, networking, sound, optional UI extras and
platform window lifecycle remain outside the core replay. See
[fidelity limits](FIDELITY-AUDIT.md) for the runtime evidence.

## Direction and layer contracts

| Contract | Reference behavior to preserve |
| --- | --- |
| Coordinates | Staggered 2:1 projection; 64×32 terrain and 64×48 unit/city logical frames; source viewport overdraw and horizontal wrapping |
| Zoom | Integer scale `(zoom + 8) / 8`, with source rounding and zoom range −7…8; texture density does not change logical size |
| Eight directions | Game: NE, E, SE, S, SW, W, NW, N. Complete authored network bank: N, NE, E, SE, S, SW, W, NW. Convert with an eight-bit rotate left by one. |
| River ports | Four bits in NE, SE, SW, NW order |
| Native ordering | Terrain → city → unit → grid per tile, followed by city names |
| Road/rail knowledge | Neighbor connections use remembered bits `0x12`/`0x22`. A city is a rail-capable endpoint; it receives no isolated transport dot. Hidden state must not create connections. |
| Coast topology | Four independent three-bit quarter states, each in a 32×16 box; these indices are not interchangeable with complete authored masks or continuous fields |
| Native detail gates | Coast quarters, roads and most improvements/resources at zoom ≥ −3; terrain dither and special overlays at ≥ −4; rivers at ≥ −6. Unexplored edge dithers are absent at −4 and below. |

Those cutoffs are intentional properties of the reference comparisons. Do not
use them as a specification for current GPU-camera behavior.

Native road/rail adapters retain nine slots: isolated plus eight directional
arms. Connected ports keep matching endpoints; rail arms terminate flush at
tile centers. Native rivers retain sixteen masks and fixed-width, fixed-tangent
connection ports. Their padded authored images are cropped into 64×32 logical
frames. Compatible seams and hidden-state isolation matter more than matching
one attractive standalone tile.

Ground/coast sprites must cover the pixel lattice without alpha cracks. The
review restores opaque pixel-center coverage for generated ground bindings after
resampling; it leaves foreground alpha and original-art replay separate. Coast
quarters use only their available neighbors, preserve water/land connectivity,
and protect the visible forest/field footprint. River-mouth banks fade into the
coastal water. Land-transition masks preserve material cores and complementary
quarter edges; their authoritative geometry and hashes live in
[terrain-transitions.json](map/terrain-transitions.json).

## Object, palette and semantic bindings

- Replacement city registration comes from all 48 entries in
  [city-anchors.json](map/city-anchors.json). The 26×16 population-label envelope
  is measured at the 64×48 reference frame; it is not a promise that labels fit
  inside miniature city art at every zoom. Original art uses its own sheet marks.
- [Unit anchors](map/unit-anchors.json) place naval banners in transparent
  upper-left space. Preserve source shield shadow, health, order and stack
  semantics. Apply faction/shadow color to filtered coverage before compositing;
  RGB-key recoloring after filtering produces unmatched dark edge pixels.
- Resource images use a centered 512×256 authored frame mapped to 64×32 logical
  space. Fit once during authoring; avoid applying another fit/offset during
  composition. Keep terrain production markers distinct from city economy art.
- [Economy bindings](interface/economy/bindings.json) distinguish wheat,
  production shield, trade arrows, gold coin, luxury gem and science flask.
  Summary rows use native 14-pixel icons; worked-tile food/shield/trade uses
  10-pixel icons. Terrain specials and gold ore are different roles.
- Fields use full 64×32 terrain frames. `draw_tile_land` can select a field under
  a city from its SE/SW neighbors even when the city tile lacks field bits.
  Enhanced composition consumes those source commands rather than deriving
  selection solely from the current tile.
- Native citizen sprite indices are `era * 11 + slot`; replay command IDs add
  100. Happy/content/unhappy/angry pairs occupy slots 0–7; specialists occupy
  8–10. Ordinary gender alternation continues
  across mood groups. Era is supplied fixture state corresponding to technology
  selection, not inferred from the calendar year. All 44 slots are preserved.

## Window renderer extension

| Window | Source behavior | Finite boundary |
| --- | --- | --- |
| Diplomacy | Government background, military/technology selection and portrait setup in `src/auto/diplomacy.cpp` | Static audience; supplied era, power, advance categories and ranking depths; no herald movie or decision-dialog loop |
| Spacecraft | All 88 part rows, thresholds, filled/empty resources and order in `src/game/bigframes.cpp` | 457×304 assembly at `(175,99)`; supplied statistics, title/control drawing and surface lifetime |
| City management | Layout, citizens, economy/resource terrain, food box, production, supported units and improvements in `src/auto/city.cpp` | 636×421 content at `view_scale=2`; supplied city caches, worked yields and present-unit state; unsupported info modes fail explicitly |
| Spacing | `ui_calc_item_spacing` and `sprite_draw_spaced_row` | Real overlap/fit arithmetic, with replacement pixel data |

Diplomacy's 640×480 background contains a 225×275 portrait at `(208,57)`, military
rows at `(45,130+31*i)` and technology rows at `(485,130+31*i)`. Technology text
has a narrow 58×20 logical span. Preserve measured fitting, shadows and era
colors. The native word-wrap helper needs valid prior-buffer state for an
overlong first word; unsupported caller state must not be guessed.

The power rank is an ordinal 1–7 civilization rating. Native drawing repeats
the era emblem `rank - 1` times, without unit names or per-row labels. It is not
a troop roster. Baseline knowledge uses five category rows across four eras;
enhanced icons use explicit advance IDs, not localized label strings or row order.

Source-aligned backgrounds provide functional panel divisions without baking in
labels. [Native plate metadata](interface/native-backgrounds/layout.json) owns
their logical rectangles and input hashes. Background substitution must preserve
foreground commands and hit-test geometry. Report plate scrolling and shared
resources have additional constraints in
[OTHER-WINDOWS](OTHER-WINDOWS.md#report-backgrounds-and-enhanced-presentation).

The city resource map retains its 21 ordered positions, worked flags and
food/shield/trade values. Values are fixture inputs; source terrain dispatch and
yield spacing execute. Citizen and stockpile crowding use native algorithms.
The separate city panorama preserves site selection, cosmetic RNG, crop sizes
and slot order in a 1280×480 surface; horizontal scroll presentation is outside
that fixture. Throne drawing preserves resource order, crop positions and bonus
conditions in 640×480. Enhanced scene layouts are documented separately in
[RENDER-UPGRADES](RENDER-UPGRADES.md).

## Real gameplay save boundary

[saved-world.json](review/fixtures/saved-world.json) holds bounded imported state
from `he_a1788.sav`, input/section hashes and source identity. The map has 9,000
cells, 69 live cities and 223 live units among 290 allocated records. Core
saved-map views deliberately disable fog in all stages for artwork inspection.
Synthetic fixtures separately exercise topology, remembered state and stacks.

`import-save.py` follows the configured source's save structures and reader
layout. It supports the observed version-44 normal-save format, not arbitrary
scenarios or network saves. It validates bounds and stack links and imports
numeric rule fields. Original save and full rules files remain local.

The unchanged `tile_resource`, `tile_has_hut`, `tile_grassland_has_shield` and
`unit_stack_pick_display_unit` bodies run in the `save_native` namespace.
Resource/hut/shield results are checked across all cells in both configurations.
Source selection uses imported owners, advances, improvements, unit statistics
and stack links. This still does not run gameplay, city recalculation or an
interactive camera. Additional windows require local save/text/media preparation
as described in [OTHER-WINDOWS](OTHER-WINDOWS.md).

## Validation

Run the [configured review workflow](../../tools/atlas-review/README.md).
[Core validation](review/validation.json) covers source identity, all 256
direction conversions, road/rail and coast neighborhoods, native zoom levels,
remembered-state/city-endpoint cases, Debug/Release traces, asset bindings and
output dimensions. [Additional-window validation](review/other-windows/validation.json)
checks its own extraction sets, traces, capture-source identity and approved
enhanced-image hashes.

Focused records describe narrower invariants: [rail joins](review/rail-connectivity-validation.json),
[river banks](review/riverbank-validation.json),
[coast coverage](review/coast-audit-validation.json),
[field visibility](review/field-validation.json),
[banner tint/registration](review/unit-banner-validation.json),
[citizen selection](review/citizen-validation.json),
[city labels](review/city-label-validation.json) and
[panorama composition](review/city-panorama-validation.json).
Consult each record's inputs and its matching verifier before changing that area;
the standard driver does not regenerate every supplemental review.

Keep supplied-state limits and pixel-backend differences explicit when adding
fixtures. A passing offline audit is not a substitute for current-game checks
of picking, wrapped/fixed maps, visibility transitions, dialog clipping,
animation or resource-loader completeness.
