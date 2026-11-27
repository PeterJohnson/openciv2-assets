# What OpenCiv2 still needs

OpenCiv2 plays without the original Civilization II files when it has a stand-in for each of the
original's assets. This list says which exist (crossed out, with a link) and which still need to be
found or generated, with a suggested prompt for each. Everything here must be free to use: CC0 or
public domain when found, or made for OpenCiv2 (MIT, as this folder's [LICENSE](LICENSE)) when
generated. The HD pictures (map, units, cities, interface, leader portraits ...) are elsewhere in
this repository: [assets/atlas-hd](../atlas-hd).

## Audio

| Asset | In the original | Status |
|---|---|---|
| ~~Music~~ | `Music\Track02.wav`-`Track12.wav`: 11 CD tracks | ~~Done~~: [music](music) |
| ~~Sound effects~~ | `Sound\*.WAV`: 78 effects | ~~Done~~: [sound](sound) (CC0; credits in [sound/SOURCES.md](sound/SOURCES.md)) |

## Heralds (the diplomacy room's animated emissary)

In the original, `KINGS\HRLDxxx.AVI`: one animated herald per tribe, five actions each (greeting,
idle, pleased, refusal, angry), each 3 seconds. A herald is a court emissary of the tribe's culture;
he need not look like the tribe's leader portrait.

| Tribe (video) | Status |
|---|---|
| ~~Russians (`HRLDRUS`)~~ | ~~Done~~: [heralds/herald-RUS.webp](heralds/herald-RUS.webp) ([source clips](heralds/RUS/clips)) |
| The other 20 tribes (below) | To generate |

How the Russian one was made (OpenCiv2's `docs/HD-GRAPHICS.md`, "Your own heralds"; its
`tools/build_herald.py` builds the animated WebP and `tools/check_herald.py` checks the joins):

1. **A still** of the herald on chroma-key green, from an image model (Gemini 3 Pro Image), with two
   of the game's diplomacy rooms given as references for the painting style. The prompt is the
   tribe's figure (below) followed by this common ending:

   > ... painted in the same painterly digital-illustration style as the reference images. Costume
   > and props use no green anywhere. He stands facing the viewer at three-quarters, in a neutral
   > relaxed pose, the prop held loosely in his right hand and his left arm hanging at his side. The
   > whole figure is in frame, head to feet, with a generous margin on all sides. The background is
   > a perfectly flat, uniform chroma-key green (#00B140), with no shadow, floor, gradient, texture
   > or vignette. No text, letters or logos. Portrait 9:16.

2. **Five clips** of 3 seconds from a video model (Gemini Omni), the still given as both the first
   and the last frame, so that every action starts and ends in the same pose. Each prompt is the
   action followed by the common ending; put the tribe's prop in place of *[prop]*:

   - **Greeting:** "Animate this exact figure, beginning from exactly this image: the herald greets
     the viewer. He sweeps the [prop] out towards the viewer in a slow, grand arc, with a slight bow
     of the head, then brings it back to exactly the angle it has in the image."
   - **Idle:** "Animate this exact figure, beginning from exactly this image: the herald stands
     almost still, waiting attentively. Only calm breathing and a very slight sway of the body; his
     free left hand hangs relaxed at his side the whole time: no gestures, no bow, no steps."
   - **Pleased:** "Animate this exact figure, beginning from exactly this image: the herald is
     pleased. He raises his free left hand to his chin as if considering, then makes a small, warm
     wave of that hand at shoulder height, close to his body, with a pleased tilt of the head, then
     lowers the hand back to his side and ends with a neutral face, as in the image."
   - **Refusal:** "Animate this exact figure, beginning from exactly this image: the herald snubs
     the viewer. He turns his head sharply away to his side, holds it there disdainfully, then
     turns it back as in the image. His body and arms stay still."
   - **Angry:** "Animate this exact figure, beginning from exactly this image: the herald is
     exasperated. He raises his free left hand to his brow and rubs it, shaking his head, then
     drops the hand back to his side as in the image."
   - **Common ending:** "He holds the [prop] in his RIGHT hand exactly as in the image the whole
     time, and never passes it to the other hand. The figure keeps its exact size and place in the
     frame, no zoom. Static camera. Keep the whole figure, both hands and the [prop] well inside
     the frame. The background stays, from the first frame to the last, a perfectly flat, uniform
     chroma-green with no shadows or lighting changes. Keep his face and costume identical to the
     image. He ends in exactly the image's pose. Silent: no music, no speech; no text."

Cost: about $0.13 for a still and $0.22 for each 3-second clip, about $1.25 a herald, $25 for all
20 (plus retries).

### The figure for each tribe

Each line starts the still's prompt: "A full-length figure of ...". The prop is in bold, for the clips.

- **Romans (`HRLDROM`):** a Roman imperial envoy (a herald) of the 1st century AD: a white wool toga
  with a purple border over a red tunic, a laurel wreath, leather sandals, a gilded bronze
  **caduceus** (a herald's staff with two entwined serpents).
- **Babylonians (`HRLDBAB`):** a Babylonian royal envoy (a herald) of about 1750 BC: a long
  fringed wool robe wrapped in deep blue and saffron, a round brimmed cap, a long curled black
  beard, a cylinder seal on a cord at his neck, a **cedar staff topped with a bronze crescent**.
- **Germans (`HRLDGER`):** a herald of the Holy Roman Empire of about 1500: a tabard with a black
  double-headed eagle on gold, a black velvet cap, red sleeves, white hose and black shoes, a short
  **white herald's baton**.
- **Egyptians (`HRLDEGY`):** an Egyptian royal envoy (a herald) of the New Kingdom, about 1300 BC: a
  pleated white linen kilt and shawl, a broad collar of gold and blue lapis beads, a short black
  wig, gold armbands, sandals, a **gilded staff with a lotus-flower head** (blue and gold).
- **Americans (`HRLDAME`):** an American envoy (a herald) of about 1790: a dark-blue tailcoat with
  brass buttons, a buff waistcoat and breeches, a white cravat, a black tricorne hat, white
  stockings and buckled shoes, a **rolled parchment dispatch sealed with red wax**.
- **Greeks (`HRLDGRE`):** an Athenian herald (keryx) of the 5th century BC: a short ochre-red chiton,
  a cream himation cloak over one shoulder, a wide-brimmed petasos hat hanging at his back, laced
  sandals, a bronze **kerykeion** (the herald's staff with two entwined serpents).
- **Indians (`HRLDIND`):** a Mughal court mace-bearer (chobdar, a herald) of the 17th century: a white
  muslin jama robe to the knee, a red-and-gold turban with a jewelled ornament, a gold sash,
  embroidered slippers, a long **silver mace**.
- **Zulus (`HRLDZUL`):** a Zulu royal messenger (induna, a herald) of the early 19th century: a
  leopard-skin cape and headband, white cowtail ornaments on his arms and legs, ostrich-feather
  plumes, a **carved wooden knobkerrie** (a ceremonial club).
- **French (`HRLDFRE`):** a French royal herald of the 17th century: a royal-blue tabard sown with gold
  fleurs-de-lis, a lace collar, a black hat with a white plume, white stockings and red-heeled
  shoes, a **blue baton with gold fleurs-de-lis**.
- **Aztecs (`HRLDAZT`):** an Aztec ambassador (a herald) of Tenochtitlan in the 15th century: a white
  cotton cloak with a red-and-black border knotted on one shoulder, a headdress of red and gold
  feathers, gold ear spools, sandals, a **fan of red macaw feathers on a gold handle** (no
  quetzal feathers: no green).
- **Chinese (`HRLDCHI`):** a Ming court envoy (a herald) of about 1500: a crimson silk robe with an
  embroidered gold mandarin square on the chest, a black winged official's hat, a gold-and-ivory
  belt, black boots, an **ivory court tablet (hu)** held upright.
- **English (`HRLDENG`):** a Tudor herald of about 1540: a tabard quartered with the royal arms (gold
  lions on red, gold fleurs-de-lis on blue), a black cap, white hose, black shoes, a slender
  **white herald's wand**.
- **Mongols (`HRLDMON`):** a Mongol imperial envoy (a herald) of the 13th century: a deep-blue deel
  robe with gold brocade, a fur-trimmed hat with a red tassel, a broad orange sash, leather boots,
  a **gold paiza** (a safe-conduct tablet) on a red cord.
- **Celts (`HRLDCEL`):** a Gaulish envoy (a herald) of about 100 BC: a tunic and trousers in red-and-blue
  check, a brown wool cloak with a bronze brooch, a gold torc, a long moustache, a **staff with a
  bronze boar finial**.
- **Japanese (`HRLDJAP`):** a samurai envoy (a herald) of about 1650: an indigo kamishimo with stiff
  shoulders over a grey kimono, pleated hakama, a topknot, a short sword at his waist, a **folded
  fan**.
- **Vikings (`HRLDVIK`):** a Norse envoy (a herald) of about 1000 AD: a red wool tunic with woven trim,
  a blue cloak with a silver brooch, trousers with leg wraps, silver arm rings, a **carved wooden
  staff with a bronze cap**.
- **Spanish (`HRLDSPA`):** a Spanish royal herald of the 16th century: a tabard with the castles and
  lions of Castile and Leon (gold on red, purple on white), a white ruff, a black hat with a white
  plume, black hose, a **gilded baton**.
- **Persians (`HRLDPER`):** an Achaemenid Persian envoy (a herald) of about 500 BC: a long pleated robe
  in purple and saffron, a fluted felt cap, a square-cut curled beard, gold bracelets, a **staff
  topped with a gold lotus bud**.
- **Carthaginians (`HRLDCAR`):** a Carthaginian envoy (a herald) of about 250 BC: an ankle-length tunic
  in Tyrian purple with gold trim, a conical cap, gold earrings, sandals, a **bronze staff topped with
  the disc-and-crescent emblem of Tanit**.
- **Sioux (`HRLDSIO`):** a Lakota envoy of the 19th century: a buckskin shirt with quilled strips in red,
  blue and white, a single eagle feather in his hair, leggings and beaded moccasins, a **ceremonial
  pipe with a red stone bowl**, held as an emblem of peace.

## Movies

The original's movies are 320x240 (the launch, the defeat and the opening 320x120), with sound.
Without them OpenCiv2 skips them. Generated ones are 16:9 (the video model offers 16:9 or 9:16)
and shorter.

| Movie | In the original | Status |
|---|---|---|
| Wonder movies | `Video\WONDER00.AVI`-`WONDER27.AVI`, 31-48 s each, played when a wonder is built | ~~The Pyramids (11 s)~~: ~~Done~~: [wonders/wonder00.webp](wonders/wonder00.webp) and [wonder00.ogg](wonders/wonder00.ogg) ([sources](wonders/00)); 27 to generate |
| Spaceship launch | `Video\LAUNCH.AVI`, 10 s | To generate |
| Victory | `Video\WINWIN.AVI`, 61 s: the colonists arrive at Alpha Centauri | To generate |
| Defeat | `LOSER.AVI`, 16 s | To generate |
| Opening | `Video\OPENING.AVI`, 92 s | To generate (optional: OpenCiv2 starts at the menu without it) |
| High Council | `Video\COUNCIL0`-`2.AVI`, `ANARCHY0`-`2.AVI` | Not needed: the High Council is not offered with HD graphics |

### Wonder movies

How the Pyramids one was made (about $0.70; its still, shot, prompts and scripts are in
[wonders/00](wonders/00)):

1. **A still** (Gemini 3 Pro Image, 4:3, with two of the game's diplomacy rooms as style
   references): "A painting of [scene]. Painted in the same painterly digital-illustration style as
   the reference images: rich, warm, slightly stylised, visible brushwork. Majestic and calm. Wide
   cinematic composition with the wonder as the clear subject. No text, letters, numbers, logos,
   frames or borders."
2. **An 8-second shot with sound** (Gemini Omni, 16:9, the still as the first frame): "Animate this
   exact painting, beginning from exactly this image, as the opening of a short cinematic movie
   about [wonder]. [Motion.] Keep the painterly digital-illustration style, the colours and the
   wonder's shape exactly as in the image throughout. No cuts, no text, letters or logos. Audio:
   [music], with [ambience] underneath. No speech, no singing, no narration."
3. **The caption**, added with ffmpeg (not by the AI): the last frame held 3 seconds, the picture
   slightly darkened, the wonder's name and then its effect faded in and out in the free font
   Uncial Antiqua (cream, with a dark outline and shadow), then a fade to black.

The scene, motion and music for each:

| # | Wonder | Scene (the still) | Motion | Music and ambience |
|---|---|---|---|---|
| 00 | Pyramids | the Great Pyramids of Giza at golden hour, newly completed, white limestone casing and gilded capstones, three camel riders in the foreground, the Nile valley beyond | a slow push-in, the riders crossing, sand on the wind, the sun glinting on the capstones | a solo reed (ney or mizmar) over a drone, then frame drum and strings; desert wind |
| 01 | Hanging Gardens | the terraced Hanging Gardens of Babylon at sunrise, cascades of flowers in red, purple and gold spilling over brick terraces, palms, water channels glinting, the Euphrates beyond | a slow rise up the terraces, water trickling, birds crossing | harp and lyre over a soft drone; water and birdsong |
| 02 | Colossus | the bronze Colossus of Rhodes standing at the harbour mouth at dusk, a torch held high, triremes with red sails passing below | a slow push-in from the sea, sails moving, the torch flickering | bright brass and frame drum, heroic; waves and gulls |
| 03 | Lighthouse | the Pharos of Alexandria at night, its great fire blazing at the top, waves breaking on the rocks, a ship approaching | a slow orbit around the tower, the fire flaring, the sea rolling | oud and strings, mysterious; surf and wind |
| 04 | Great Library | the Great Library of Alexandria, a colonnaded hall of scroll shelves lit by shafts of sunlight, scholars at tables | a slow glide down the hall, dust in the light, a scroll unrolled | lyre and flute, contemplative; quiet footsteps |
| 05 | Oracle | the Temple of Apollo at Delphi on its mountainside at dawn, smoke rising from an altar, the valley in mist | a slow rise towards the temple, smoke curling, mist drifting | a solo aulos over low choir-like pads (no words); wind |
| 06 | Great Wall | the Great Wall of China snaking over misty mountain ridges at sunrise, watchtowers, a beacon fire lit | a slow sweep along the wall, the beacon smoke rising, mist moving | erhu and taiko drums, rising; wind |
| 07 | Sun Tzu's War Academy | an ancient Chinese courtyard where ranks of soldiers in lacquered armour drill with spears before a pavilion, banners | a slow push-in over the ranks, spears moving in unison, banners stirring | war drums and gong, disciplined; shouted drill (no words) |
| 08 | King Richard's Crusade | a Crusader castle on a hill above the desert, knights with red-cross banners riding out from its gate | a slow pan with the riders, banners streaming, dust | medieval drums and shawm, martial; hoofbeats |
| 09 | Marco Polo's Embassy | a caravan of camels and horses on the Silk Road arriving at the gates of a great Mongol-era city, tents and banners | a slow tracking shot along the caravan, banners and dust | hammered dulcimer and frame drum, adventurous; camel bells |
| 10 | Michelangelo's Chapel | the interior of a Renaissance chapel, its vaulted ceiling covered in frescoes of clouds, figures and sky, candles below | a slow tilt up to the ceiling, candlelight flickering | a choir-like organ chorale (no words); a faint echo |
| 11 | Copernicus' Observatory | a Renaissance astronomer's tower at night, a brass armillary sphere and instruments on the roof, the Milky Way overhead | a slow push-in, the armillary sphere turning, stars wheeling | harpsichord and strings, wondering; a night breeze |
| 12 | Magellan's Expedition | a carrack with full sails rounding a stormy cape, waves crashing, a gap of sunlight ahead | a slow push alongside the ship, sails billowing, spray | bold strings and brass, adventurous; storm and creaking timber |
| 13 | Shakespeare's Theatre | an Elizabethan round theatre open to the sky, a play on the stage, crowds in the galleries, flags on the roof | a slow push-in towards the stage, the crowd moving, flags stirring | lute, recorder and tabor, lively; crowd murmur and laughter |
| 14 | Leonardo's Workshop | a Renaissance workshop full of inventions: a flying-machine frame, gears, sketches, models, sunlight through tall windows | a slow glide past the inventions, gears turning, papers lifting | lute and harpsichord, inventive; ticking and creaking wood |
| 15 | J. S. Bach's Cathedral | a Baroque church interior with a great pipe organ in gilded casework, light streaming in | a slow rise towards the organ pipes | a grand organ fugue; a large reverberant church |
| 16 | Isaac Newton's College | a Cambridge college courtyard at dusk, an apple tree, a lit window with a telescope and a prism casting a rainbow | a slow push-in to the window, the rainbow shimmering, an apple falling | harpsichord and strings, Baroque; birdsong |
| 17 | Adam Smith's Trading Co. | an 18th-century harbour of brick warehouses, tall ships unloading barrels and crates, merchants on the quay | a slow pan along the quay, cranes swinging, crowds | busy strings in a Classical style; harbour bustle |
| 18 | Darwin's Voyage | a 19th-century survey ship anchored off a volcanic island, giant tortoises and finches on the shore, a naturalist sketching | a slow push-in from the ship to the shore, waves, birds | warm woodwinds and strings, curious; surf and birds |
| 19 | Statue of Liberty | the Statue of Liberty in its harbour at sunrise, a steamship of immigrants passing, gulls | a slow orbit around the statue, the torch catching the sun | broad brass and strings, hopeful; gulls and a ship's horn |
| 20 | Eiffel Tower | the Eiffel Tower at the 1889 World's Fair, crowds and pavilions, flags, fireworks at dusk | a slow tilt up the tower, fireworks bursting | a lively waltz with accordion and strings; crowd and fireworks |
| 21 | Women's Suffrage | a crowd of women marching for the vote in the early 1900s, sashes and banners in purple, white and gold, a grand civic building | a slow tracking shot with the march, banners moving | a stirring march with brass and snare; the crowd cheering |
| 22 | Hoover Dam | a great concrete dam in a desert canyon, water roaring from the spillways, power lines | a slow descent along the dam's face, the water churning | powerful brass and percussion, industrial; roaring water |
| 23 | Manhattan Project | a desert test site at dawn, a steel tower and bunkers, then a blinding flash and a rising mushroom cloud | a still camera, the flash and the cloud rising | low ominous strings building to a single deep chord; a distant rumble |
| 24 | United Nations | the United Nations headquarters by a river, the flags of many nations along the plaza | a slow push along the row of flags, flags stirring | a dignified orchestral anthem; wind and flags |
| 25 | Apollo Program | a Saturn-type rocket lifting off from its launch pad, fire and smoke billowing | a slow tilt up with the rocket | rising brass and timpani; the rocket's roar |
| 26 | SETI Program | a valley of radio telescope dishes under a starry sky, the dishes turning together | a slow push through the dishes, stars wheeling | ethereal synthesiser and strings; soft electronic signals |
| 27 | Cure for Cancer | a bright modern laboratory, a researcher holding up a glowing vial, sunlight through glass, a family outside | a slow push-in on the vial, the glow brightening | gentle piano and strings rising to hope; a quiet lab hum |

Cost: about $0.70 a wonder for one 8-second shot, $20 for the 27 (plus retries); longer movies
are two or three shots joined.

### The other movies

Same method: a still, then one or two shots with sound (8 seconds each), then the joins and a fade.

- **Spaceship launch (`LAUNCH`):** "A painting of a colony spaceship of near-future design, long and
  modular with a glowing drive, leaving orbit above the Earth, the blue planet below, stars
  beyond." Motion: "The ship's drive ignites in a bright flare and it accelerates away into the
  stars, shrinking to a point of light." Audio: "a sustained heroic orchestral chord; a deep
  rumble swelling into the drive's roar, then a fading whine." (8 s)
- **Victory (`WINWIN`):** two shots. 1: "A painting of a habitable alien world seen from orbit, a
  bright double star rising over its curved horizon, a small moon, the colony ship approaching."
  Motion: "a slow pan as the star rises in a gleaming flare." 2: "A painting of a new colony on an
  alien world: domed habitats and gardens under a sky with a great ringed planet, a six-wheeled
  rover driving towards the domes." Motion: "the rover drives to the domes; the camera rises to show
  the whole colony." Audio for both: "a triumphant orchestral brass fanfare." (16 s)
- **Defeat (`LOSER`):** "A painting of the forgotten ruins of a great civilisation, deep inside a dark
  tomb: toppled statues, cracked murals, broken pottery, a stone sarcophagus, all under dust and
  cobwebs." Motion: "a single torch beam sweeps slowly across the relics in the dark, then fades
  to black." Audio: "ominous, low synthesiser pads; grinding stone at the start and the end,
  distant echoes." (8-16 s)
- **Opening (`OPENING`, optional):** a montage of four to six shots, 8 seconds each, showing a
  civilisation's rise: "a tribe around a campfire under the stars"; "the first walled city on a
  river"; "a classical temple and a busy port"; "a cathedral city and sailing ships"; "a modern
  skyline at night"; "a colony ship leaving the Earth". Each in the painterly style, with a slow
  push-in. Audio: "a building orchestral theme with steady tribal drums, ending on a grand chord."
  Then the title, OpenCiv2, added with ffmpeg.

## Not needed

- Scenarios and premade maps (`SCENARIO\`, `*.SCN`, `*.MP`): out of scope.
- Rules, texts, preferences and the Hall of Fame: built into OpenCiv2 or made by the game.
