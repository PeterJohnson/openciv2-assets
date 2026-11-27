# OpenCiv2's own wonder movies

Made for [OpenCiv2](https://github.com/openciv2/openciv2), which uses these in place of the original's where a game folder lacks them, and with HD graphics in preference to them; its build (`make own-assets`) fetches the game-ready files from a pinned commit. MIT licence ([LICENSE-media](../../LICENSE-media)).

The movies played when a wonder is built, in the place of the original's `Video\WONDERnn.AVI` (`nn` the wonder's number, 00 the Pyramids), each as two files the game plays together: `wonderNN.webp`, the picture (an animated WebP, 854x480 at 15 frames a second) and `wonderNN.ogg`, the sound (Ogg Vorbis, 48 kHz stereo).

- `wonder00.webp` and `wonder00.ogg`: the Pyramids, 11 s (165 frames, 2.9 MB; the sound 0.1 MB), the wonder's name and its effect ("Counts as a granary in each city") in the picture. Made from `00/`:
  - `still.jpg`: the painted still, generated with Google's Gemini 3 Pro Image (4:3), with two of the game's diplomacy rooms given as references for the painting style; its prompt in `still-prompt.txt`;
  - `clip.mp4`: an 8-second shot with sound (1280x720, 24 frames a second), generated from the still, given as its first frame, with Google's Gemini Omni video model (gemini-omni-1.2-flash, 16:9); its prompt in `clip-prompt.txt`;
  - `wonder00.mp4`: the movie, 11 s, made from `clip.mp4` by `overlay.sh` with ffmpeg (not by the AI): the last frame held 3 s and darkened, the caption faded in and out in the font Uncial Antiqua (SIL Open Font License 1.1: `OFL.txt`), the sound faded out;
  - `build.sh`: makes `wonder00.webp` and `wonder00.ogg` from `wonder00.mp4` with ffmpeg.

What is still to be found or generated: [docs/NEEDED.md](../../docs/NEEDED.md).
