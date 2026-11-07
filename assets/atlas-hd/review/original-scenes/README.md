# Original-art scene references

This directory contains composed artwork comparisons and documented OpenCiv2
execution captures. The core set has 22 scenes and four 4K exports; the
additional-window review has 35 scene renders. The gallery can display all four
comparison stages without an installed game.

These original-game artwork derivatives are visual references, outside the
replacement-art license, runtime selection, canonical asset manifest, coverage
bank and compatibility bindings. They are not replacement sprites.

| Location | Content |
| --- | --- |
| `images/` | Standalone source-trace replays at the reference renderer's dimensions |
| `4k/` | Presentation resamples of selected core scenes; no additional source detail |
| `renders.json` and `data.js` | Core scene paths, dimensions and hashes, plus the offline gallery index |
| `coast-audit/` and `land-borders/` | Composed references for focused map surveys |
| `runtime-other/` | Eleven unmodified OpenCiv2 execution captures and twelve lossless window crops |

Additional-window renders are indexed in
[scenes.json](../other-windows/scenes.json). The
[runtime audit](../other-windows/runtime-audit.html) records capture provenance
and limitations. Those images show OpenCiv2 with original art, not the legacy
executable. The [fidelity guide](../../FIDELITY-AUDIT.md) distinguishes replay
checks from runtime evidence.

Source GIFs, DLLs, extracted sprites, binding tables, extraction traces and
contact sheets stay in ignored `../original-local/`; complete extracted text
and generated build inputs also stay local. Do not add those raw inputs here.
Follow the [review build guide](../../../../tools/atlas-review/README.md) to
rebuild comparisons with configurable source, installation and save paths.
Existing execution captures are evidence files, not outputs of that rebuild.
