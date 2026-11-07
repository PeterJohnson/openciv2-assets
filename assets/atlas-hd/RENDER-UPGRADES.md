# Enhanced rendering designs

The gallery's **HD + cohesion** stage explores presentation choices beyond the
native reference layout. This document records useful design rationale and
integration constraints, not a delivery roadmap or an inventory of the current
game renderer. Implementation status belongs in the `openciv2` source checkout.
The [reference contracts](RENDERER-AUDIT.md) define what the other comparison
stages preserve.

Keep the staggered isometric grid, fixed camera angle, recognizable silhouettes
and game-state meaning. These designs use 2D sprites, explicit metadata and
composition passes. The offline pixel samplers demonstrate appearance; they are
not per-frame performance recommendations.

## Density, geometry and color

Texture density, logical sprite size, display density and camera zoom are
separate quantities. A 512×256 texture can represent a 64×32 logical tile.
Scaling the texture must not change selection, clipping or the game coordinate
system. Preserve explicit frames, trim bounds, anchors and color-mask channels.

Use authored transparency rather than deriving it from a background color.
Resolve faction/shadow color independently from filtered coverage and preserve
health/order semantics. Filter alpha consistently and give atlas entries enough
padding to prevent neighboring-image bleed. Apply the same coordinate transform
to drawing and input; account for display density once.

Backgrounds also carry layout information. Native city and diplomacy plates
provide panel divisions and contrast behind fixed foreground content. A new
illustration must preserve that structure unless the foreground layout changes
with it. [Background comparisons](review/native-backgrounds.png) isolate this
asset contract from enhanced UI layouts.

## Ground, coasts and rivers

The enhanced sampler uses deterministic world-coordinate materials and contour
variation. The native adapters bake compatible artwork into source-selected
tiles/quarters. These representations have different topology; converting one
mask index into another without a defined mapping is incorrect.

Preserve these properties when changing either representation:

- Adjacent independently rendered regions agree at their boundaries. Noise,
  material choice, river width and bend phase depend on world position, not the
  camera. Wrapped maps use periodic fields; fixed boundaries need their own
  edge handling.
- Terrain centers, narrow water passages and gameplay land/water classification
  remain readable. Quarter generation uses only neighbors available to that
  source slot. Visible art must not incorporate hidden terrain information.
- Coast footprints cover the visible field/forest fringes without consuming
  enclosed lakes. Inward coves modify the actual contour, not just its shading.
  The protected footprint and per-quarter rules live in `shoreline.cjs` and
  `map-finishing.cjs`.
- Broad contour shape and fine erosion are separate. Filter subpixel detail by
  projected resolution; keep the broad coastline stable through zoom changes.
  The preview suppresses added fractal detail at 32 physical pixels per tile
  and below. This is a preview parameter, not a universal runtime threshold.
- River ports keep matching positions, width and tangents. Bank displacement
  fades at native ports; world-space widths/relief remain continuous across
  wrapped segment copies. Preserve positive channel width and connected mouths.
- Ground coverage has no dark alpha cracks after fractional scaling. Composite
  opaque ground consistently; retain ordinary transparent coverage for foreground
  sprites. Land-transition weights preserve material cores and a continuous
  color field beneath the full coastal footprint.

The fixed native banks cannot remove all repetition. World-derived phase
variants and material blending can reduce it without changing the logical river
graph. Use tile-lattice coordinates for vegetation variants: hashing raw
staggered coordinates can accidentally select only half the available images.

Inspect [land borders](review/land-borders.html), [coast surveys](review/coast-audit.html),
[coast detail](review/coast-fractal.png), [river courses](review/river-course.html)
and [river detail](review/river-fractal.png). Validate both exhaustive local masks
and actual saved-world islands, lakes, mouths and wrap seams.

## Transport and overlay order

The enhanced network pass uses complete curves and separate rail-bed, sleeper
and steel layers. Drawing all rail beds before steel prevents later tiles from
erasing tracks at shared edges. Native adapters preserve independent arm slots
with compatible ports and flush center cuts.

Connection selection must use the source's viewer-known state, city endpoint
rules and explicit direction conversion. Visual curves cannot create movement
connections or reveal hidden neighbors. Preserve matching edge tangents across
isolated segments, bends, crossings, mixed road/rail and junctions.

Fields draw below networks and objects. Retain source-selected fields beneath
cities, including neighbor-derived irrigation, and leave recognizable detail
around the city silhouette. Moving tall features away from route centers is a
presentation choice; it must preserve their logical tile and selection identity.
The preview does not establish a complete bridge or physical turnout system.

See [transport fixtures](index.html#transport),
[rail-join checks](review/rail-connectivity-validation.json) and
[field comparisons](review/irrigation-cities.png). Test edge continuity in both
draw orders and under fractional camera movement.

## Overview detail, labels and status

The enhanced preview uses still-frame detail levels, not a qualified animated
transition system. It keeps fields at logical tile widths of at least 64px and
full unit/city frames at 48px and above; smaller views use markers and quieter
terrain. These values document the preview and should not be copied into the
game without evaluating its camera and display densities.

Camera scale and representation choice should remain independent. Transitions
must preserve selection and visibility; hysteresis can prevent rapid switching
near a threshold. Pointer-anchored zoom and inverse world-coordinate picking
must work at wraps, fixed edges and fractional scales. Unit grouping must never
reveal hidden units.

The detailed preview keeps source unit/city rectangles while treating status
badges separately. Its 1.35× badge group includes health/order information, rear
stack shields and a plus marker for a source-indicated stack, not an invented
count. Larger badges require corresponding clip and dirty bounds.

Enhanced label placement reserves unit tags first, then population badges, then
city names. It uses bounded deterministic placement and draws above scenery.
Partially visible labels fit inside the viewport; offscreen objects stay
offscreen. The static solver does not qualify temporal stability or every dense
map state. Original/native/HD comparisons preserve their source order and
art-specific anchors. See [label plans](review/city-label-layouts.json) and
[banner comparisons](review/unit-banners.png).

## Scene and window layouts

| Area | Enhanced design | Contract to retain |
| --- | --- | --- |
| City panorama | Relative building sizes, silhouette-aware placement, ground-contact draw order, separate rear/front walls and gate attachments | Exact source-selected improvements/wonders and wall state; aspect ratios; explicit clipping and scrolling bounds |
| Throne room | Explicit floor anchors and back-to-front layers | Same selected upgrade levels, bonus conditions and meaningful resource assignments |
| Diplomacy | Wider measured labels, one era emblem, ordinal power rating and six-segment scale, advance-specific icons | Government/era, rank 1–7, actual advance IDs, localization, static portrait framing and action semantics |
| Spacecraft | Whole components at explicit attachment ports, truss layers and empty/installed states | Source part counts/limits and structural readiness; gameplay-owned statistics and launch eligibility |
| City management | Familiar panels with clearer numerical stockpile meters, semantic symbols and optional citizen cues | Exact values, granary threshold, citizen ordering, 21-cell worked-tile picking, production selection, improvement scrolling and every existing action |
| Reports and dialogs | Measured bands/columns, readable counts, per-advance illustrations and source-matched controls | Actual options, view-model values, enabled state, current selection, localization and keyboard navigation |

Panorama sizing and gate/wall attachments are in
[city/panorama/layout.json](city/panorama/layout.json). Slot allocation and painter
order are separate: large landmarks reserve space first, while final drawing
uses ground-contact depth. Test crowded scenes and remaining visible alpha,
not just rectangle intersections.

[space-layout.json](space-layout.json) describes the enhanced four-bay proposal,
not the native split-crop sheet. Preserve source-driven attachment limits when
using whole component images. The fixture's displayed statistics are inputs,
not a simulation of travel or success.

City citizens retain all era/mood/specialist slots and continuous ordinary gender
alternation. Optional cues draw after the entire overlapping row. A stockpile
layout must keep icon, value, meter, production art and actions in distinct
bounds. Check crowded populations, all info modes, long labels and overflowing
stockpiles rather than shrinking every sprite to force a fit.

Advance artwork is keyed by stable IDs, not label text or row position. The
offline mappings cover their declared fixtures; check catalog coverage and
explicit fallback behavior for new rulesets. Report backgrounds also depend on
scroll phase and shared resource IDs; see
[additional-window constraints](OTHER-WINDOWS.md#report-backgrounds-and-enhanced-presentation).

## Runtime validation and performance

When adopting or changing a design in the game, test logical geometry and
visibility separately from artwork. Cover multiple display densities, fractional
zoom, wrapped and fixed maps, viewport edges, dialog occlusion, localization,
ownership changes, unit status, animation and input picking.

Bound caches and invalidate the affected neighborhoods when terrain, visible
improvements, ownership or exploration changes. Include relevant density,
detail-level and palette/theme state in cache keys. Generate expensive contour
fields during asset authoring or cache updates, rather than sampling them for
every frame. Avoid eagerly caching every large mask or a close-zoom whole world.

Measure cold-cache population, warm redraws, pan/zoom pauses, changed-region
cost, memory and draw submissions on declared hardware. Times in
`review/scenes.json` measure offline CPU image construction; they do not measure
game frame time or GPU performance. Current backend and cache work belongs in
the game repository and should be evaluated there.
