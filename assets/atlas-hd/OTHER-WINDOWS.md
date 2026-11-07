# Additional game windows

The [window gallery](review/other-windows/index.html) contains 35 scenes, each in
four stages. Original-art, replacement-native and HD-only frames replay extracted
code from the configured OpenCiv2 reference baseline. Enhanced proposals use
separate presentation adapters. See the
[review build guide](../../tools/atlas-review/README.md) for source selection.

## Extracted rendering coverage

`atlas-reports.exe` compiles 32 report/selection bodies; `atlas-other.exe`
compiles 258 further window/control/helper bodies with source class/global
layouts and line mappings. These are separate extraction sets, not a count of
unique functions across binaries. `atlas-engine.exe` supplies native city/unit
glyph drawing, including saved owner, damage, order and stack state.

| Family | Scenes | Source behavior |
| --- | --- | --- |
| Reports | City Status, Attitude, Trade, Science, Defense, military losses, Intelligence, Wonders, Top Five Cities, Demographics, Score, Hall of Fame | Selection/layout in `src/auto/reports.cpp`, city/civilization helpers and glyphs |
| Civilopedia | Advance index, Railroad page/tree, Riflemen, Library, Pyramids, Forest | Creation, sorting, controls, details, links and connectors in `src/auto/pedia.cpp` |
| Further reports | Powergraph, Foreign Minister, historian, casualty timeline | Source report selection, ranking, plotting and drawing |
| Council/endgame | High Council, Destroyed Civilizations, Credits | Background/buttons, destroyed-entry/portrait drawing and first credits scroll frame |
| Auxiliary panels | Status, World Map | Status/unit helpers and minimap layout, projection, colors and visibility |
| Dialogs | Tax Rates, research, production, Game Options, main menu, quit confirmation, improvement-completed message | Tax calculations, available options, dialog parsing, autosizing, columns, lists, sprites and controls |

Frames use extracted `FrameWindow` and `PictureWindow` functions. HD replay keeps
the same logical commands at twice the physical resolution. Original art uses
reference bitmap fonts; native replacements and HD use smooth replacement fonts.
Source identity and per-body hashes are recorded in
[report extraction](review/report-extraction.json) and
[further-window extraction](review/other-window-extraction.json).

## Execution evidence

The [runtime comparison](review/other-windows/runtime-audit.html) covers twelve
scenes: four Civilopedia pages, Tax Rates, Foreign Minister, casualty timeline,
options, quit confirmation, main menu, World Map and status. The
[capture manifest](review/other-windows/runtime-audit.json) records the OpenCiv2
build, executable/save hashes, source identity, original captures and crop bounds.
Source comparison normalizes line endings; font bytes are compared exactly.

This is OpenCiv2 execution with original art and the same 1788 save, not the
legacy executable. Capture scale, control focus/cursor state, panel dimensions
and runtime extras differ from the replays. Existing label overlaps and long
heading clips remain visible in baseline frames. The other 23 scenes have source
replay checks but no paired runtime capture. See [fidelity limits](FIDELITY-AUDIT.md).

## Standalone boundaries and supplied state

The harness reaches a completed initial frame without an interactive message
loop or complete game simulation. Device adapters record surfaces, sprites,
text and controls. Scrollbar pixels/geometry follow the baseline's
`src/platform/scroll_theme.h` and `controls.c`; focus, hover and pressed states
are outside the initial-paint boundary. Endgame text uses a finite wrap adapter.

`Dialog::create_controls` drives extracted radio/checkbox, scrollbar and button
methods. Radio-item painting and platform control creation remain device
adapters. Edit fields and multiple sprite controls stop explicitly, as do unknown
scenes and unbound operations.

Fixtures load the designated save's packed game, civilizations, cities, units,
map, power history and English visibility plane. Original rules/text files
supply labels and dialog sections; blank label lines are significant. Full
original inputs remain ignored. Their identities are recorded in
[inputs.json](review/fixtures/other-windows/inputs.json) and
[native-inputs.json](review/fixtures/other-windows/native-inputs.json).

| Boundary | Supplied state or limitation |
| --- | --- |
| Minimap/status | Saved visibility and active Knights; declared panel dimensions and viewport center. Runtime panels and extras can differ. |
| Reports | Declared economic caches, score, research-cost and Hall of Fame values where full game recalculation is absent |
| Tax Rates | Extracted tax/trade/research calculations; the fixture yields income 215, cost 238 and research in seven turns |
| Production | London's source-selected options, saved shields, ten shield rows and a declared zero support cache |
| Foreign Minister/historian | Saved attitude at the AI boundary; deterministic historian choice and source ranking |
| Casualty timeline | Empty casualty log, matching the captured state |
| Civilopedia | Source rules/detail behavior; the scenario has no description text, so no paragraph is invented |
| Council | Original AVI portraits are unavailable; original panels have empty media slots and replacements use independent still artwork |
| Destroyed Civilizations | Declared Romans entry at turn 320 with source year/portrait/frame drawing; no movie lifecycle |
| Credits | First frame of local credits text, including leading blank lines |

## Report backgrounds and enhanced presentation

`report-design.cjs` produces source-aligned native/enhanced background plates.
Bands follow the text-row rectangles and connect to staggered city/unit icons.
The [plate metadata](interface/reports/layout.json) records logical layout.
Native/HD substitution changes only the background, preserving foreground size,
order and content.

Background selection has constraints that matter to game integration:

- City Status, Attitude and Trade stagger icons by the absolute list index.
  Scrolling one row flips the phase. Select an even/odd plate or draw dynamic
  bands; one static image cannot match both phases.
- Resizing and font changes require matching geometry. Dynamic row backgrounds
  avoid a separate static plate for every size.
- Top Cities and Hall of Fame share resource 57 and use the same native plate.
  Defense/casualties share resource 51 with other views. Specialized designs
  need selection by window, not a global substitution of a shared resource.

Baseline advance icons use `category * 4 + epoch`, with actual rule fields in
the fixture. Enhanced reports, Civilopedia and research selection use explicit
advance IDs in [knowledge.json](interface/reports/knowledge.json). That preview
mapping covers the displayed advances; it is not complete for arbitrary rulesets.
Unmapped enhanced advances fail explicitly.

Enhanced casualty columns identify civilizations, not kills or production.
Top Cities fits larger wonders within measured rows. Civilopedia actions use
the source labels, rectangles and enabled state, including disabled Description.
The focused advance tree is an immediate-prerequisite/successor design, not the
full native ancestry tree. All terrain fields and visible research/production
choices must retain their source values and action order.

`enhanced-details.cjs` consumes source traces for content, without inventing
calculations or contacts. `other-windows.cjs` owns the 23 non-report proposals;
`report-render.cjs` owns the twelve reports. Ordinary comparison builds preserve
approved enhanced PNGs. Intentional layout work should check the
[enhanced layout fixtures](review/fixtures/other-windows/enhanced-layouts.json),
[presentation record](review/other-windows/presentation-validation.json) and
[content record](review/other-windows/content-validation.json), then update the
approved image baseline after review. These supplemental records are not all
regenerated by the standard driver.

## Build and verify

For a complete build, follow the [review workflow](../../tools/atlas-review/README.md)
with the source checkout, original installation and designated save. After that
configuration/build, refresh these windows and rerun the primary audits with:

```powershell
python tools/review.py --steps extended verify gallery
```

[Validation](review/other-windows/validation.json) covers all 35 scenes and 140
images, source hashes, Debug/Release traces, input isolation, capture provenance
and approved enhanced-image hashes. Existing execution captures are not
regenerated by this command. Raw original sheets, crops, text and media remain
local; composed references stay outside the replacement-art license and runtime
package. See [provenance](PROVENANCE.md) for that boundary.
