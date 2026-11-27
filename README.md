# OpenCiv2 assets

What is still to be found or generated: [NEEDED.md](NEEDED.md).

OpenCiv2's own music, heralds and (later) sound effects for [OpenCiv2](https://github.com/openciv2/openciv2), used where a game folder lacks Civilization II's own. MIT licence (LICENSE).

## Music

`game/music/track02.ogg` to `track12.ogg`: twelve tracks' worth of music for OpenCiv2, Ogg Vorbis, 48 kHz stereo (26 MB), as the game plays them. They take the place of the game's CD audio tracks (`Music\TrackNN.wav` in a Multiplayer Gold install), in the same order and of about the same length:

| File | Takes the place of | Title | Length |
|---|---|---|---|
| `track02.ogg` | Track02 | Funeral March | 0:35 |
| `track03.ogg` | Track03 | Ode to Joy | 0:42 |
| `track04.ogg` | Track04 | The Crusades | 1:29 |
| `track05.ogg` | Track05 | Alien Invasion | 1:50 |
| `track06.ogg` | Track06 | Mongol Horde | 2:41 |
| `track07.ogg` | Track07 | Apocalypse | 3:25 |
| `track08.ogg` | Track08 | Primeval World | 2:45 |
| `track09.ogg` | Track09 | New World | 2:30 |
| `track10.ogg` | Track10 | Fantasy | 2:45 |
| `track11.ogg` | Track11 | Mars | 2:25 |
| `track12.ogg` | Track12 | World of Jules Verne | 2:30 |

## Heralds

`heralds/`: the diplomacy room's animated heralds, in the format the game reads (`heralds.txt`: one line a tribe, `CODE X Y W H FPS` then the first and last frame of the greeting, idle, pleased, refusal and angry segments, then the animated WebP).

- `heralds/herald-RUS.webp`: the Russians' herald, 180 frames at 12 a second (five 3-second segments), 356x598 for the room's 237x399 window, built by OpenCiv2's `tools/build_herald.py` from the five clips in `heralds/RUS/clips/` (greeting, idle, pleased, refusal, angry: 3 s, 720x1280, 24 a second, on chroma-key green), which were generated with Google's Gemini Omni video model from a still of the herald (itself generated with Gemini 3 Pro Image); the prompts are in OpenCiv2's docs/HD-GRAPHICS.md.

## Sound effects

To follow, once all of them are chosen.
