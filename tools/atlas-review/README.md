# Artwork comparison builds

Run the review workflow from the graphics repository root:

```powershell
python tools/review.py --source C:\Projects\openciv2 --game C:\Games\Civ2
```

This compiles the standalone replay renderers in both Debug and Release,
rebuilds native-resolution/HD comparison scenes with the approved artwork,
extracts original images from the supplied installation, regenerates original-art
scenes, rebuilds the additional report/dialog comparisons, runs the audits, and
refreshes `assets/atlas-hd/index.html`.

## Inputs and prerequisites

- Windows, Visual Studio C++ x86 build tools and a Windows SDK. `vswhere` discovers
  the compiler; Python invokes the PowerShell wrappers.
- Python 3.10+ with the repository's `requirements.txt` installed.
- Node.js with Sharp: `npm install --prefix tools/atlas-review`. The package pins
  the tested version. `ATLAS_NODE_MODULES` can instead name a directory containing
  Sharp. `--node PATH` selects the Node executable.
- An OpenCiv2 source checkout with upstream Git history. `--source PATH` overrides
  `OPENCIV2_SOURCE_DIR`, the saved configuration, and the sibling `openciv2` path.
- Your original game installation: `--game PATH` or `CIV2_GAME`. The extractor
  reads original GIF sheets, DLL/EXE image resources, rules and text files without
  executing the original binaries.
- The retained `he_a1788.sav` for the additional 35 report/dialog comparisons.
  `--save PATH` or `CIV2_REVIEW_SAVE` overrides the saved path or
  `GAME/midgame1/he_a1788.sav`. Selecting a different game directory resets that
  default unless a save is explicitly supplied. Its
  SHA-256 must match the retained fixture, so another save is never silently used.

```powershell
$env:OPENCIV2_SOURCE_DIR = 'D:\Source\openciv2'
$env:CIV2_GAME = 'D:\Games\Civilization II'
python tools/review.py --save 'D:\Saves\he_a1788.sav'
```

## Source baseline

`review-source.json` pins the native renderer revision used by the retained
comparisons and runtime captures. The driver exports that revision from the
specified checkout into a validated cache under `build/atlas-review/source`.
It does not switch branches, modify the source checkout, or depend on the retired
art repository. Configuration is saved in ignored `build/atlas-review/config.json`.

`--source-ref REVISION` selects and remembers another available Git revision;
`--source-ref working-tree` explicitly uses local source files. The C++ fixture
boundaries and retained reference audits target the recorded baseline. A revision
with changed renderer interfaces needs corresponding boundary/audit updates;
the current game's GPU/HD renderer is not silently substituted for the reference.
A shallow checkout missing the pinned revision must fetch that revision first.

Source hashes in generated extraction reports identify the replayed code. Older
capture records allow only LF/CRLF differences, with bitmap data checked exactly.
Enhanced-art preservation uses the recorded image hashes in `review-baseline.json`,
so the squashed artwork repository needs no historical art commits.

## Individual steps

```powershell
# Configure/export the source baseline, without compiling or reading original art.
python tools/review.py --source ..\openciv2 --steps configure

# Compile map/window/report renderers in Debug and Release.
python tools/review.py --steps build

# Rebuild the 22 core comparisons and their original-art counterparts.
python tools/review.py --game C:\Games\Civ2 --steps comparisons original gallery

# Prepare the original-game text/media/save inputs, build the remaining renderer,
# and regenerate the 35 additional report/dialog comparison sets.
python tools/review.py --game C:\Games\Civ2 --steps extended verify gallery
```

Steps use the configuration saved by the driver; explicit arguments and environment
overrides take precedence. `verify` expects both core and additional scenes to have
been rebuilt. The standalone `.ps1` wrappers remain available, with `-Source`
pointing to the prepared source tree and `-Python` selecting the interpreter.

## Output and scope

The default comparison build reuses approved artwork; it does not regenerate
paintings or runtime-selected source assets. Existing explicit authoring scripts
remain available for intentional asset edits. The driver checks that selected
runtime inputs, the installed original game files, and the comparison save remain
unchanged. `build/atlas-review/last-run.json` records the successful stages.

Executables, extracted code, configuration and cached source live in ignored
`build/atlas-review`. Original image crops, extracted media and bindings remain
ignored under `assets/atlas-hd/review/original-local`. Only the composed comparison
images and their review records go into the review gallery. Neither review inputs
nor outputs are included in the runtime asset release.

These are standalone source-renderer replays using original and replacement art.
They use declared fixture state and drawing adapters. Debug/Release traces, input
hashes, geometry and render sizes are checked. The retained runtime capture audit
documents its separate limits; the rebuild does not claim pixel-equivalence to
the original executable or validate current GPU-camera behavior.

## Fortified-unit artwork

The low foreground barricade is authored in
`assets/atlas-hd/compatibility/improvement/fortified.svg`. Render it and update
its retained PNG binding with:

```sh
node tools/atlas-review/fortification.cjs
python tools/build.py
```

Keep its full 512x384 transparent canvas (64x48 logical pixels); cropping or
centering its visible bounds moves it over the unit. The runtime consumes the
PNG, while the SVG remains an authoring input. Full binding regeneration uses
the same renderer.

## Optional tribe portrait review

```sh
node tools/atlas-review/tribal-leaders.cjs
node tools/atlas-review/build-gallery.cjs
```

This art-only builder uses retained PNGs and `authoring/tribal-leaders.json`.
It rebuilds the catalog entries, selection metadata and offline paired gallery,
including 225x275 and 90x110 fitting previews and light/dark background checks.
It does not need game source, original game files or a fresh generation request.
The validation report distinguishes 41 available paintings from the pending
Gandhi slot; it does not claim full 42-image coverage or runtime integration.
