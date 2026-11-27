# The game-ready files from wonder00.mp4: ../wonder00.webp, the picture (an
# animated WebP, 854x480 at 15 frames a second, lossy at quality 65, every
# frame the whole picture) and ../wonder00.ogg, the sound (Ogg Vorbis q4,
# 48 kHz stereo).  Run in this folder with ffmpeg (libwebp, libvorbis) in $FF,
# e.g. imageio-ffmpeg's.
$FF -loglevel error -y -i wonder00.mp4 -vf "fps=15,scale=854:480:flags=lanczos" -an -c:v libwebp -lossless 0 -q:v 65 -compression_level 6 -loop 0 ../wonder00.webp
$FF -loglevel error -y -i wonder00.mp4 -vn -c:a libvorbis -q:a 4 ../wonder00.ogg
