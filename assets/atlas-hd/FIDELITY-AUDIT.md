# Comparison fidelity and limits

The original-art, replacement-native and HD-only previews share the source
selection and logical geometry of the configured reference renderer. Their image
and font backends differ. Enhanced compositions have their own presentation
adapters. These are artwork comparisons, not a qualification of the current
OpenCiv2 renderer.

## Evidence

| Evidence | What it supports | Limit |
| --- | --- | --- |
| [Core replay validation](review/validation.json) | Source hashes, matching Debug/Release traces, topology, selected artwork and image dimensions | Finite supplied fixtures, without a game loop |
| [Core screenshot comparison](review/fidelity.html) | Visual inspection of typography, panels and overlays against four OpenCiv2 runtime references | Saves, eras, populations, cameras and display scales differ |
| [Additional-window runtime comparison](review/other-windows/runtime-audit.html) | Twelve scenes compared with OpenCiv2 execution using original art and the same 1788 save | Capture scaling, focus/cursor state, panel size and runtime extras differ |
| [Additional-window validation](review/other-windows/validation.json) | All 35 source replays, Debug/Release agreement and approved enhanced-image preservation | Runtime captures cover only twelve of those scenes |

The [core evidence index](review/fidelity.json) and
[window capture manifest](review/other-windows/runtime-audit.json) record image,
source, build and save identities where available. Captures of OpenCiv2 are not
captures of the legacy executable. There is no whole-frame pixel-equivalence
claim, and core spacecraft/throne fixtures have no paired runtime captures.

## Baseline presentation contracts

| Area | Behavior preserved by the replay |
| --- | --- |
| Fonts | Original art uses `data/native/fonts.bin` glyphs, advances, bearings and clips. Replacement-native/HD use smooth replacement fonts fitted to the same logical spans. HD rasterizes at output density. |
| Diplomacy | Source technology fitting/truncation, two-line labels, shadows, era colors, repeated power emblems and category icons |
| City economy | Source food/production/trade bars, distribution, shortages/surpluses and worked-tile yield placement |
| City resource map | Source terrain and neighbor selection over the 21-cell city radius; supplied terrain/yield values |
| City controls | Source-scaled Buy/Change, bottom controls, improvement scrollbar and present-unit geometry |
| Map | Source city names, zoom-dependent font choice, faction colors and unit/city selection; original sheet anchors or explicit replacement anchors |
| Panorama | Source-selected buildings and title composition; the title belongs to the fixture's city/date |
| Spacecraft | Source assembly order/clipping, title/statistics/status geometry and button positions; supplied statistics |

Source-aligned background plates preserve the functional subdivisions behind
those commands. [Background checks](review/native-background-validation.json)
compare foreground plans/pixels separately from the substituted background.
Enhanced city names and population badges use their own final placement pass;
panorama titles draw above the enhanced buildings and walls.

## Supplied state and untested behavior

The core city preview is a 636×421 content rectangle at `view_scale=2`. It omits
application title/border lifecycle, interactive controls and platform scrollbar
painting. Its present-unit stack, yields and stockpiles are declared inputs;
the fixture has no trade routes or pollution. Full city recalculation is not
part of the replay.

Diplomacy covers a static audience. Herald movies are absent from the comparison
inputs. The native word-wrap helper can read prior-buffer state when a multiword
name's first word overflows; new fixtures must supply valid caller state or fail
explicitly. Existing safe two-line and truncation cases do not qualify every
localized name.

Original-art text uses the bitmap bank captured through the project's Wine font
path. Smooth replacement text intentionally differs from those 1-bit masks.
The core reference targets indexed DIB text with `CIV2_WINE_TEXT` unset; it does
not establish equivalence across platform font modes.

Input picking, animated transitions, dialog stacking, continuous camera motion,
GPU/CPU performance, and arbitrary scenarios require tests in the game checkout.
For a runtime pixel comparison, match the save/state, camera, content rectangle,
font mode, display density and capture frame before comparing framebuffers.

## Rebuild and checks

Use the [review build workflow](../../tools/atlas-review/README.md) to rebuild
the reference renderers, comparisons and primary audits. It records the selected
source revision and verifies that original inputs and runtime-selected artwork
remain unchanged.

Focused review checks include `verify-native.cjs` for reference font metrics,
glyph clipping, technology fitting and economic geometry; `verify-typography.cjs`
for original/replacement font separation and visible labels; and
`verify-native-backgrounds.cjs` for foreground preservation and contrast.
Their recorded outputs are [native validation](review/native-validation.json),
[typography validation](review/typography-validation.json), and the background
record linked above. These supplemental records describe their own inputs and
scope; the standard driver does not regenerate every focused audit.

See [renderer contracts](RENDERER-AUDIT.md) for the extraction/adapters and
[additional windows](OTHER-WINDOWS.md) for report, dialog and saved-state limits.
