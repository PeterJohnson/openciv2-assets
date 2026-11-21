# Optional tribe leader portraits

41 transparent painted portraits are available for the 42 male/female slots
in the original game's 21-tribe roster. Mohandas Gandhi is **pending**: the
built-in image service rejected two respectful historical portrait requests
under its public-figure filter. No substitute image is labeled as Gandhi.

[Review all pairs](../../review/tribal-leaders/index.html) and inspect the
[selection map](portraits.json). The main [Atlas HD catalog](../../index.html)
also includes every available portrait under `tribal-leaders`.

## Selection and display

Select by **zero-based tribe index plus sex**, as recorded in `portraits.json`.
The index follows LEADERS.TXT, not player number or faction color. Keep the
game spelling in `gameName`; `identity` records the fuller interpretation.
Check `status == "available"` before reading `file`; the pending entry has
`file: null`. The default sex is recorded but both options are intended to be
available independently.

The PNGs are retained generated outputs with their original alpha and varying
native dimensions (at least 1000 pixels on both axes). Fit the complete image,
preserving aspect ratio, within the 225x275 portrait or 90x110 thumbnail frame.
Do not stretch or crop the head to fill those boxes. Native dimensions, hashes
and alpha statistics are in the selection map. Gallery WebPs and contact sheets
are reduced review derivatives, not the source artwork.

This is an optional art library. Existing `sprites/leaders/leader-*.png`,
MK resource bindings, `runtime-inputs.json` and game source are unchanged.
The runtime pack does not yet select these assets.

## Roster and interpretations

The 21 LEADERS.TXT rows were checked against the first 21 @LEADERS rows in
RULES.TXT. Input hashes are retained without redistributing either original
file. The game's extra non-roster rules rows are excluded.

| Index | Tribe | Male game name | Female game name |
| --- | --- | --- | --- |
| 0 | Romans | Caesar | Livia |
| 1 | Babylonians | Hammurabi | Ishtari |
| 2 | Germans | Frederick | Maria Theresa |
| 3 | Egyptians | Ramesses | Cleopatra |
| 4 | Americans | Abe Lincoln | E. Roosevelt |
| 5 | Greeks | Alexander | Hippolyta |
| 6 | Indians | Mohandas Gandhi (pending) | Indira Gandhi |
| 7 | Russians | Lenin | Catherine the Great |
| 8 | Zulus | Shaka | Shakala |
| 9 | French | Louis XIV | Joan of Arc |
| 10 | Aztecs | Montezuma | Nazca |
| 11 | Chinese | Mao Tse Tung | Wu Zhao |
| 12 | English | Henry VIII | Elizabeth I |
| 13 | Mongols | Genghis Khan | Bortei |
| 14 | Celts | Cunobelin | Boadicea |
| 15 | Japanese | Tokugawa | Amaterasu |
| 16 | Vikings | Canute | Gunnhild |
| 17 | Spanish | Philip II | Isabella |
| 18 | Persians | Xerxes | Scheherezade |
| 19 | Carthaginians | Hannibal | Dido |
| 20 | Sioux | Sitting Bull | Sacajawea |

Historical figures, legendary figures, literary characters and game-specific
names are distinguished per portrait. Short names such as Frederick, Ramesses,
Tokugawa and Isabella require a stated interpretation. Ishtari, Shakala and
Nazca are original imagined game identities; no historical identity is assumed.
Nazca uses Mexica-inspired clothing for the Aztec slot, not Andean Nazca dress.
The game assigns Sacajawea/Sacagawea to the Sioux slot, but she was Lemhi
Shoshone. That historical distinction is retained. No known lifetime likeness
exists for her, and many ancient/legendary portraits are similarly interpretive.

## Authoring and reproduction

The [authoring record](../../authoring/tribal-leaders.json) contains the complete
written prompt set, generation identifiers, output hashes, selected research
URLs and each reference's role. The built-in `image_gen` tool created each
portrait separately. Historical identity, costume and portrait traditions
informed written briefs; no online reference image or original-game pixels
were supplied to generation. Amaterasu's smaller sun ornament is an edit of
her own generated portrait; the input hash and edit prompt are recorded.

To rebuild the catalog, fitting previews, contact sheets and validation report
from the checked-in PNGs, run from the repository root:

```sh
node tools/atlas-review/tribal-leaders.cjs
node tools/atlas-review/build-gallery.cjs
```

The review builder needs Node and Sharp, following the existing review-tool
setup. It needs neither the original game installation nor image-generation
access. It validates roster consistency, file hashes, native resolution,
actual transparency and unique images; the report explicitly retains the
incomplete slot. Filling that slot later requires a new reviewed portrait
and an updated authoring record, not a hidden fallback to a generic leader.

Validation here covers artwork and metadata, not an in-game integration or
scholarly authentication of undocumented likenesses.
