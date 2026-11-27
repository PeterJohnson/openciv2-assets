# OpenCiv2's own heralds

Made for [OpenCiv2](https://github.com/openciv2/openciv2), which uses these in place of the original's where a game folder lacks them, and with HD graphics in preference to them; its build (`make own-assets`) fetches the game-ready files from a pinned commit. MIT licence ([LICENSE-media](../../LICENSE-media)).

The diplomacy room's animated heralds, in the format the game reads (`heralds.txt`: one line a tribe, `CODE X Y W H FPS` then the first and last frame of the greeting, idle, pleased, refusal and angry segments, then the animated WebP).

- `herald-RUS.webp`: the Russians' herald, 180 frames at 12 a second (five 3-second segments), 356x598 for the room's 237x399 window, built by OpenCiv2's `tools/build_herald.py` from the five clips in `RUS/clips/` (greeting, idle, pleased, refusal, angry: 3 s, 720x1280, 24 a second, on chroma-key green), which were generated with Google's Gemini Omni video model from a still of the herald (itself generated with Gemini 3 Pro Image); the prompts are in OpenCiv2's docs/HD-GRAPHICS.md.

What is still to be found or generated: [docs/NEEDED.md](../../docs/NEEDED.md).
