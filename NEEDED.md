# What OpenCiv2 still needs

OpenCiv2 plays without the original Civilization II files when it has a stand-in for each of the
original's assets. This list says which exist (crossed out, with a link) and which still need to be
found or generated. Everything here must be free to use: CC0 or public domain when found, or made
for OpenCiv2 (MIT, like this repository) when generated. The HD pictures (map, units, cities,
interface, leader portraits ...) are not in this repository: they come from the HD art pack,
[PeterJohnson/openciv2-assets](https://github.com/PeterJohnson/openciv2-assets).

## Audio

| Asset | In the original | Status |
|---|---|---|
| ~~Music~~ | `Music\Track02.wav`-`Track12.wav`: 11 CD tracks | ~~Done~~: [game/music](game/music) |
| ~~Sound effects~~ | `Sound\*.WAV`: 78 effects | ~~Done~~: all 78 chosen (CC0); being added as `sound/` with their credits |
| Main-menu music (optional) | none: the CD's track 1 is data | A spare track, *Dorian Pastoral*, was made but is not used |

## Heralds (the diplomacy room's animated emissary)

In the original, `KINGS\HRLDxxx.AVI`: one animated herald per tribe, five actions each (greeting,
idle, pleased, refusal, angry), each 3 seconds. A herald is a court emissary of the tribe's culture;
he need not look like the tribe's leader portrait.

| Tribe (video) | Status |
|---|---|
| ~~Russians (`HRLDRUS`)~~ | ~~Done~~: [heralds/herald-RUS.webp](heralds/herald-RUS.webp) ([source clips](heralds/RUS/clips)) |
| Romans (`HRLDROM`), Babylonians (`HRLDBAB`), Germans (`HRLDGER`), Egyptians (`HRLDEGY`), Americans (`HRLDAME`), Greeks (`HRLDGRE`), Indians (`HRLDIND`), Zulus (`HRLDZUL`), French (`HRLDFRE`), Aztecs (`HRLDAZT`), Chinese (`HRLDCHI`), English (`HRLDENG`), Mongols (`HRLDMON`), Celts (`HRLDCEL`), Japanese (`HRLDJAP`), Vikings (`HRLDVIK`), Spanish (`HRLDSPA`), Persians (`HRLDPER`), Carthaginians (`HRLDCAR`), Sioux (`HRLDSIO`) | To generate: 20 heralds |

How the Russian one was made (OpenCiv2's `docs/HD-GRAPHICS.md`, "Your own heralds"; its
`tools/build_herald.py` builds the animated WebP and `tools/check_herald.py` checks the joins):

1. A still of the herald on chroma-key green, made with an image model (Gemini 3 Pro Image), with
   two of the game's diplomacy rooms as references for the painting style. Example prompt:

   > A full-length figure of a Roman imperial envoy (a herald) of the 2nd century AD, painted in
   > the same painterly digital-illustration style as the reference images: a white wool toga with
   > a purple border over a red tunic, a laurel wreath, leather sandals, a short gilded ceremonial
   > staff held loosely in his right hand. Costume and props use no green anywhere. He stands
   > facing the viewer at three-quarters, in a neutral relaxed pose with his arms hanging at his
   > sides. The whole figure is in frame, head to feet, with a generous margin on all sides. The
   > background is a perfectly flat, uniform chroma-key green (#00B140), with no shadow, floor,
   > gradient, texture or vignette. No text, letters or logos. Portrait 9:16.

2. Five clips of 3 seconds from a video model (Gemini Omni), the still given as both the first and
   the last frame so that every action starts and ends in the same pose. Example (the angry
   action):

   > Animate this exact figure, beginning from exactly this image: the herald is exasperated; he
   > raises his free left hand to his brow, rubs it and shakes his head, then lowers the hand. He
   > holds the staff in his right hand the whole time and never passes it to the other hand. The
   > figure keeps its exact size and place in the frame, no zoom. Static camera. The background
   > stays a perfectly flat, uniform chroma-green with no shadows or lighting changes. He ends in
   > exactly the image's pose. Silent; no text.

   The other actions: greeting (a slow, grand sweep of the staff towards the viewer and back,
   a slight bow), idle (calm breathing, a slight sway), pleased (hand to chin, then a broad warm
   wave), refusal (turns his head sharply away, holds it, turns back).

Cost: about $0.13 for a still and $0.22 for each 3-second clip, about $1.25 a herald, $25 for all
20 (plus retries).

## Movies

The original's movies are 320x240 (the launch, victory and opening 320x120), with sound. Without
them OpenCiv2 skips them; generated stand-ins can be shorter.

| Movie | In the original | Status |
|---|---|---|
| Wonder movies | `Video\WONDER00.AVI`-`WONDER27.AVI`: one per wonder, played when it is built (00 Pyramids, 01 Hanging Gardens, 02 Colossus, 03 Lighthouse, 04 Great Library, 05 Oracle, 06 Great Wall, 07 Sun Tzu's War Academy, 08 King Richard's Crusade, 09 Marco Polo's Embassy, 10 Michelangelo's Chapel, 11 Copernicus' Observatory, 12 Magellan's Expedition, 13 Shakespeare's Theatre, 14 Leonardo's Workshop, 15 J. S. Bach's Cathedral, 16 Isaac Newton's College, 17 Adam Smith's Trading Co., 18 Darwin's Voyage, 19 Statue of Liberty, 20 Eiffel Tower, 21 Women's Suffrage, 22 Hoover Dam, 23 Manhattan Project, 24 United Nations, 25 Apollo Program, 26 SETI Program, 27 Cure for Cancer); 31-48 s each | To generate: 28 movies (length to be decided) |
| Spaceship launch | `Video\LAUNCH.AVI`, 10.5 s | To generate |
| Victory | `Video\WINWIN.AVI`, 61 s | To generate |
| Opening | `Video\OPENING.AVI`, 92 s | To generate (optional: OpenCiv2 starts at the menu without it) |
| Defeat | `LOSER.AVI` | To generate |
| High Council | `Video\COUNCIL0`-`2.AVI`, `ANARCHY0`-`2.AVI` | Not needed: the High Council is not offered with HD graphics |

Example prompt for a wonder movie (a video model, from a still of the wonder made first; a
15-second movie is two or three such shots):

> A slow, steady cinematic camera move towards the Great Pyramids of Giza at golden hour, newly
> completed, their limestone casing gleaming white; workers and ox carts small in the foreground,
> the Nile and palm groves beyond. Painterly, warm, the same digital-illustration style as the
> reference image. Calm, majestic, no sudden motion. No text, letters or logos. 16:9.

Cost: about $0.07 a second of video at 720p, so about $40-45 for 28 movies of 15 seconds and
$110-125 for the original's length (with retries).

## Not needed

- Scenarios and premade maps (`SCENARIO\`, `*.SCN`, `*.MP`): out of scope.
- Rules, texts, preferences and the Hall of Fame: built into OpenCiv2 or made by the game.
