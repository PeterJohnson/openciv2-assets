# Atlas HD provenance

This record describes the inputs and authoring process for the replacement
artwork in `openciv2-assets`. The [catalog](manifest.json) records selected
assets, dimensions, hashes and source-master relationships;
[selection records](authoring/selection.json) identify their origins. Masters
can contain neighboring subjects that are not selected into the catalog.

The runtime selection is maintained separately in
[runtime-inputs.json](../../runtime-inputs.json). This document is copied into
runtime packages as `data/ATLAS-PROVENANCE.md`; linked authoring files and review
material remain in the source repository. Paths below refer to that checkout.

## Optional tribe leader portraits

The [tribe portrait library](sprites/tribal-leaders/README.md) contains 42
original transparent PNGs for the 21-tribe male/female roster. Ashoka occupies
the Indian male slot at the user's request, paired with Indira Gandhi.
The source mapping retains Mohandas Gandhi as the original LEADERS.TXT name,
cross-checked against RULES.TXT. The selected name and substitution are explicit
in the metadata. Ashoka's face and period dress are artistic interpretations.

Each available portrait was generated separately with built-in `image_gen`.
Written historical briefs and selected online research informed identities and
costume; no external portrait bitmap or original-game artwork was supplied.
The [authoring record](authoring/tribal-leaders.json) retains prompts, research
roles, identity caveats and hashes, including the generated-image refinement
for Amaterasu. Native files retain generated alpha; gallery previews are reduced
derivatives. See the [paired review](review/tribal-leaders/index.html).

## City landscape road eras

The six medieval/modern city landscape paintings are built-in `image_gen`
edits of the three retained replacement landscapes. Medieval routes use
continuous stone paving; modern roads use divided asphalt carriageways with
smaller coastal/riverbank connections near water. No original-game image was
an input. [The authoring record](authoring/city-landscape-eras.json) preserves
input revisions/hashes, all prompts, refinement-input hashes and the selected
output hashes. Native PNGs retain generated pixels unchanged; separately
labeled 4K display copies are resampled.

The road-clearance revision routes narrower roads between source-derived building
ground bands, replacing the broad central junctions. The guides include empty lots;
they use approximate ground bands from the standalone traces, not copied game art.
Modern highway entries taper into local streets, and medieval versions use the
same routes with stone paving. Source placement traces and enhanced placement plans
are preserved. The authoring record retains each replacement input and prompt.

## Advisor and report backgrounds

The twelve painted backgrounds of `tiles.dll` 50-59, 65 and 66 (the advisors'
reports, Wonders, Top 5 Cities and Hall of Fame, Demographics, Civilization
Score and the tax-rate dialog) were contributed by Richard Penman. They are
AI-generated with Google's Gemini 3 Pro Image (`gemini-3-pro-image`, 3:2,
2K), one written prompt per subject, with two of this collection's paintings,
`backgrounds/diplomacy-monarchy-native.png` and
`backgrounds/council-room-native.png`, supplied as style references. No
original-game image was an input; original reports were used only to measure
the contrast of the game's text on each candidate. Each 1280x960 master fills
the area the window shows at density 2 and mirrors it into the hidden margins;
the masters reproduce pixel-for-pixel from the generated outputs with that
step. [The authoring record](authoring/advisor-backgrounds.json) keeps the
prompts, reference hashes, generated-output hashes and the contrast
measurements. They are under the repository's MIT licence.

## Generated and authored artwork

Painted images were created with the built-in `image_gen` tool from written
subject descriptions. Image-reference edits used artwork generated or authored
for this collection. No original-game or Freeciv image was supplied, copied,
traced, recolored, enlarged or incorporated into the replacement artwork.
Game code and resource-header metadata informed roles, IDs, dimensions and
composition contracts. Original-art previews and screenshots were inspected
for semantic roles and readability, without reusing their pixels or tracing
their shapes.

Functional graphics use authored SVG geometry and PNG renders. The generators
in `tools/atlas-review/` combine those graphics with the collection's painted
sprites and material textures. Native crops and generated outputs are preserved;
compatibility adapters deliberately resize/composite them into logical frames.
Rebuilding the runtime pack requires no new image-generation request.

| Artwork | Input and authoring record |
| --- | --- |
| Painted catalog | [Generation and repair prompts](authoring/prompts.json), selected origins and retained masters |
| Material variations | [Surface-variation record](authoring/surface-variations.json): a four-by-four master for grassland, plains, desert and calm water |
| Economy symbols | [Painted economy record](authoring/economy-painted.json): production shield, trade arrows and science flask edited from collection artwork; food reuses the painted wheat and luxury the catalog gem |
| Gold coin | [Coin record](authoring/economy-gold.json): transparent generated image using the authored coin and painted wheat as references; invented profile and ornament |
| Enhanced panorama gate | [Gate record](authoring/city-gate.json): edit of the collection's gate with the coastal proposal as orientation/style context; preserved generated alpha |
| Medicine and Electricity icons | [Knowledge record](authoring/knowledge.json): generated using the collection's advance master as a style reference; other mapped advances reuse catalog images |
| Irrigation and farmland | [Agricultural-field record](authoring/agricultural-fields.json): transparent edits using the collection's field sprites and the irrigation output as composition/style references |
| Desert cacti and forest groves | [Vegetation record](authoring/terrain-vegetation.json): generated subjects and forest edits using replacement sprites, with selected masters and output paths |

These JSON records retain prompts, reference roles and available input/output
hashes. Their creation identifiers document provenance; they are not additional
dependencies for building the selected artwork. Preserve those records when
editing or redistributing the corresponding assets.

The economy bank uses distinct wheat, blue production shield, opposed trade
arrows, gold coin, luxury gem and science-flask imagery. Generated shield,
arrow, coin and flask pixels are retained; rebuilds reuse them. The muted
map-terrain production marker is a separate authored derivative of the project's
shield geometry, with its own palette and footprint.

Citizen portraits reuse the collection's paired/specialist painted masters.
Mood/profession cues and diplomacy's power scale are authored geometry; military
and knowledge indicators reuse replacement catalog art. Numeric categories,
advance IDs and label meanings come from game code/rules, not original artwork.

## Scenario editor backdrops and wonder border

The three scenario editors' backdrops (`EDITORAS.GIF`, `EDITORSA.GIF`,
`EDITORSQ.GIF`) and the wonder window's marble border tile (`wonder.dll`
20000-20027, crop `1,1,64,32`) were contributed by Richard Penman. They are
AI-generated with Google's Gemini 3 Pro Image (`gemini-3-pro-image`), one
written prompt each: the backdrops at 3:2, 2K, with
`backgrounds/council-room-native.png` and
`backgrounds/diplomacy-monarchy-native.png` as style references; the marble at
1:1, 1K, with `backgrounds/council-room-native.png` alone. No original-game
image was an input; the original editors were used only to measure the
contrast of the game's text. Each backdrop fills the 1120x760 area the
editors show at density 2 and mirrors it into the hidden margins; the marble's
margins are cross-faded into its edges so that it tiles, then it is scaled to
256x128. The masters reproduce pixel-for-pixel from the generated outputs with
those steps. [The authoring record](authoring/editor-backdrops-wonder-border.json)
keeps the prompts, reference hashes, generated-output hashes and the
measurements. They are under the repository's MIT licence.

## Procedural graphics and derived assets

`art.cjs` defines shared terrain and transport geometry. Coast, road, rail,
river, land-transition and material-variation banks use authored geometry,
deterministic procedural fields and the collection's sand, stone, water, grass
and other terrain textures. They contain no traced original contours or sampled
original textures.

- `shoreline.cjs` and `map-finishing.cjs` generate coastline footprints, coves,
  shallow-water bands and multiscale contour detail. `riverbanks.cjs` supplies
  bank relief with fixed connection ports and the authored water/bed materials.
- `terrain-blends.cjs` and `coastal-blends.cjs` generate neighbor-quarter alpha
  coverage from periodic warped noise and replacement ground colors.
  `forest-floor.cjs` combines authored grass and forest materials.
- `terrain-vegetation.cjs` composes cacti inside desert ground and fits forest
  sprites into their native frames. Transparent alpha is retained; crop bounds
  ignore coverage of 8 or less. The pine adapter has an internal one-logical-pixel
  upward registration adjustment without repainting the sprite.
- `fog-edges.cjs` authors four directional unexplored-boundary alpha masks.
  Their native boxes follow source geometry; original imagery appears only in
  composed comparisons and is not an input to those masks.
- `fortification.cjs` renders the editable sandbag geometry in
  `compatibility/improvement/fortified.svg`. Its low foreground placement
  leaves unit portraits clear, using newly authored shapes and colors.
- `unit-banners.cjs` authors the faction-banner silhouette. Tint is applied to
  its filtered alpha independently of RGB. Naval registration is measured
  against replacement silhouettes; no original shield or ship pixels are used.

City panorama walls are SVG geometry textured with the collection's stone
material. Building/wonder composition reuses painted sprites and explicit sizing
metadata. Spacecraft trusses, attachment graphics, controls, charts, panels and
tree connectors are authored geometry.

Native window/report plates use authored vector fills, borders and patterns
positioned from source layouts. Diplomacy and spacecraft plates embed collection
paintings. [Native plate metadata](interface/native-backgrounds/layout.json) and
[report plate metadata](interface/reports/layout.json) record rectangles and
inputs. No original decorative patterns, pixels or font imagery are used to
create those replacement backgrounds.

## Fonts and distribution

The authoring/review fonts came from the official Google Fonts repository and
retain unmodified SIL Open Font License 1.1 notices:

- [Noto Sans](fonts/notosans/OFL.txt)
- [Noto Serif](fonts/notoserif/OFL.txt)
- [Noto Sans Mono](fonts/notosansmono/OFL.txt)

[Font provenance](fonts/provenance.json) records upstream revisions, URLs, sizes
and hashes. These authoring fonts are excluded from runtime releases.

The separate runtime bitmap font caches contain DejaVu glyphs captured through
Wine's font APIs. [THIRD-PARTY.txt](../../THIRD-PARTY.txt) documents their known
attribution, limitations of the generation records, and complete applicable
font notices. Project licensing is in [LICENSE](../../LICENSE). Preserve the
relevant notices with distributions.

The originality statement describes recorded inputs and process, not an
exhaustive comparison with every existing work. Historical subjects are newly
illustrated. Game data, audio, video and arbitrary scenario/expansion artwork
are outside this replacement-art collection.

## Original-art comparisons and gameplay inputs

The comparison workflow reads an original installation's image sheets and
DLL/EXE resources, plus rules/text and the designated save where needed. It
records input hashes without modifying those files or executing the original
binaries. Imported gameplay state in the review fixtures is separate from the
replacement image library; original save and full rules/text files are not
distributed with it. Renderer code comes from the configured `openciv2` checkout.

Only composed original-art references and documented OpenCiv2 execution captures
are retained for review. This includes the core and additional-window scenes,
map surveys and labeled original-art columns in comparison sheets. They have
separate rights and are **excluded from the replacement-art license, runtime
package, asset manifest, coverage bank and replacement bindings**. No original
pixels are incorporated into replacement assets.

Raw sheets, resource crops, palettes, bindings, extraction traces, contact sheets
and complete original text/media inputs stay in ignored `review/original-local/`
or `build/` directories. An installation is needed to regenerate original-art
comparisons, but not to view them. Original council AVI portraits are absent
from the comparison input set; those panels show empty media slots rather than
substitute original media.

Source-renderer replays are not captures of the original executable. Runtime
captures identify the OpenCiv2 build and their finite comparison scope. 4K
exports are presentation resamples, not additional native image detail. See
[original-art references](review/original-scenes/README.md),
[fidelity limits](FIDELITY-AUDIT.md) and [additional windows](OTHER-WINDOWS.md).
