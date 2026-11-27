# The caption step: clip.mp4 (Gemini Omni's 8-second shot) -> wonder00.mp4 (11 s).
# The last frame held 3 s more, darkened from 2.2 s; the wonder's name, then its
# effect, faded in and out in Uncial Antiqua (SIL OFL 1.1, OFL.txt; the TTF from
# Google Fonts); the sound padded to 11 s and faded out.  Run with ffmpeg in
# $FF, clip.mp4 as /w/in.mp4 and the font's folder as /f (out: /w/out.mp4, and
# /w/sheet.jpg, four frames to look at).
FF=$(python -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
F=/f/UncialAntiqua-Regular.ttf
A(){ echo "if(lt(t,$1),0,if(lt(t,$1+0.6),(t-$1)/0.6,if(lt(t,$2-0.6),1,if(lt(t,$2),($2-t)/0.6,0))))"; }
T="fontfile=$F:fontcolor=0xF3E6C8:shadowcolor=black@0.75:shadowx=3:shadowy=3:borderw=3:bordercolor=0x2a1a08@0.85:x=(w-text_w)/2"
$FF -loglevel error -y -i /w/in.mp4 -filter_complex "[0:v]tpad=stop_mode=clone:stop_duration=3,eq=eval=frame:brightness='-0.16*min(1,max(0,(t-2.2)/1.2))':saturation='1-0.2*min(1,max(0,(t-2.2)/1.2))',drawtext=$T:text='The Pyramids':fontsize=86:y=h*0.30-text_h/2:alpha='$(A 2.6 6.4)',drawtext=$T:text='Counts as a granary':fontsize=56:y=h*0.70-text_h:alpha='$(A 6.6 10.4)',drawtext=$T:text='in each city':fontsize=56:y=h*0.70+12:alpha='$(A 6.6 10.4)',fade=t=out:st=10.4:d=0.6[v];[0:a]apad=whole_dur=11,afade=t=out:st=9.4:d=1.6[a]" -map "[v]" -map "[a]" -t 11 -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart /w/out.mp4
$FF -loglevel error -y -i /w/out.mp4 -vf "select='eq(n\,96)+eq(n\,130)+eq(n\,190)+eq(n\,240)',scale=640:-1,tile=2x2" -frames:v 1 /w/sheet.jpg
