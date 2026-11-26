# OpenCiv2 assets

OpenCiv2's own music, heralds and (later) sound effects for [OpenCiv2](https://github.com/openciv2/openciv2), used where a game folder lacks Civilization II's own. MIT licence (LICENSE).

## Music

`music/`: twelve tracks, Ogg Opus, 48 kHz stereo. Tracks 02 to 12 take the place of the game's CD audio tracks (`Music\TrackNN.wav` in a Multiplayer Gold install), in the same order and of about the same length:

| File | Takes the place of | Length |
|---|---|---|
| `01 - Dorian Pastoral.ogg` | (no CD track; not yet used) | 3:58 |
| `02 - Funeral March.ogg` | Track02 | 0:35 |
| `03 - Ode to Joy.ogg` | Track03 | 0:42 |
| `04 - The Crusades.ogg` | Track04 | 1:29 |
| `05 - Alien Invasion.ogg` | Track05 | 1:50 |
| `06 - Mongol Horde.ogg` | Track06 | 2:41 |
| `07 - Apocalypse.ogg` | Track07 | 3:25 |
| `08 - Primeval World.ogg` | Track08 | 2:45 |
| `09 - New World.ogg` | Track09 | 2:30 |
| `10 - Fantasy.ogg` | Track10 | 2:45 |
| `11 - Mars.ogg` | Track11 | 2:25 |
| `12 - World of Jules Verne.ogg` | Track12 | 2:30 |

## Heralds

`heralds/`: the diplomacy room's animated heralds, in the format the game reads (`heralds.txt`: one line a tribe, `CODE X Y W H FPS` then the first and last frame of the greeting, idle, pleased, refusal and angry segments, then the animated WebP).

- `heralds/herald-RUS.webp`: the Russians' herald, 180 frames at 12 a second (five 3-second segments), 356x598 for the room's 237x399 window, built by OpenCiv2's `tools/build_herald.py` from the five clips in `heralds/RUS/clips/` (greeting, idle, pleased, refusal, angry: 3 s, 720x1280, 24 a second, on chroma-key green), which were generated with Google's Gemini Omni video model from a still of the herald (itself generated with Gemini 3 Pro Image); the prompts are in OpenCiv2's docs/HD-GRAPHICS.md.

## Sound effects

To follow, once all of them are chosen.
