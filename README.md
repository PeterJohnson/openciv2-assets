# OpenCiv2's own media

What is still to be found or generated: [NEEDED.md](NEEDED.md).

OpenCiv2's own music, heralds, sound effects and wonder movies for [OpenCiv2](https://github.com/openciv2/openciv2), used where a game folder lacks Civilization II's own. MIT licence ([LICENSE](LICENSE)); the sound effects' sources are CC0 ([sound/SOURCES.md](sound/SOURCES.md)). OpenCiv2's build (`make own-assets`) fetches the game-ready files from here at a pinned commit.

## Music

`music/track02.ogg` to `track12.ogg`: twelve tracks' worth of music for OpenCiv2, Ogg Vorbis, 48 kHz stereo (26 MB), as the game plays them. They take the place of the game's CD audio tracks (`Music\TrackNN.wav` in a Multiplayer Gold install), in the same order and of about the same length:

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

`sound/`: the 78 sound effects, one for each of the original's `Sound\NAME.WAV`, as `name.ogg` (Ogg Vorbis, 22,050 Hz mono, 2 MB in all), each level-matched to the original it stands in for. Every source is CC0 (public domain); `sound/SOURCES.md` credits each one's sources and says how it was made.

## Wonder movies

`wonders/`: the movies played when a wonder is built, in the place of the original's `Video\WONDERnn.AVI` (`nn` the wonder's number, 00 the Pyramids), each as two files the game plays together: `wonderNN.webp`, the picture (an animated WebP, 854x480 at 15 frames a second) and `wonderNN.ogg`, the sound (Ogg Vorbis, 48 kHz stereo).

- `wonders/wonder00.webp` and `wonder00.ogg`: the Pyramids, 11 s (165 frames, 2.9 MB; the sound 0.1 MB), the wonder's name and its effect ("Counts as a granary in each city") in the picture. Made from `wonders/00/`:
  - `still.jpg`: the painted still, generated with Google's Gemini 3 Pro Image (4:3), with two of the game's diplomacy rooms given as references for the painting style; its prompt in `still-prompt.txt`;
  - `clip.mp4`: an 8-second shot with sound (1280x720, 24 frames a second), generated from the still, given as its first frame, with Google's Gemini Omni video model (gemini-omni-1.2-flash, 16:9); its prompt in `clip-prompt.txt`;
  - `wonder00.mp4`: the movie, 11 s, made from `clip.mp4` by `overlay.sh` with ffmpeg (not by the AI): the last frame held 3 s and darkened, the caption faded in and out in the font Uncial Antiqua (SIL Open Font License 1.1: `OFL.txt`), the sound faded out;
  - `build.sh`: makes `wonder00.webp` and `wonder00.ogg` from `wonder00.mp4` with ffmpeg.
