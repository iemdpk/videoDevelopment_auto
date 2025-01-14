from moviepy.editor import VideoFileClip, AudioFileClip, concatenate_videoclips

# Paths to video and audio files
video_paths = [
    "1.mp4",
    "2.mp4",
    "3.mp4",
    "4.mp4"
]

audio_path = "newVIdeo.mp3"
output_path = "final_video.mp4"

# Load the audio file
audio = AudioFileClip(audio_path)
audio_duration = audio.duration  # Get the total duration of the audio

# Calculate the duration to allocate to each video
num_videos = len(video_paths)
segment_duration = audio_duration / num_videos
print("This is Segment Duration "+str(segment_duration));

# Load, trim, and adjust the video clips
adjusted_clips = []
for path in video_paths:
    clip = VideoFileClip(path).without_audio()  # Mute the video clip
    if clip.duration > segment_duration:
        # Trim the video to the segment duration
        clip = clip.subclip(0, segment_duration)
    adjusted_clips.append(clip)

# Combine the adjusted video clips
combined_video = concatenate_videoclips(adjusted_clips)

# Set the external audio to the combined video
final_video = combined_video.set_audio(audio)

# Export the final video
final_video.write_videofile(output_path, codec="libx264", audio_codec="aac")

# Close the clips to free up resources
for clip in adjusted_clips:
    clip.close()
audio.close()
combined_video.close()

print("Final video with audio has been saved successfully!")


# ffmpeg -i final_video.mp4 -vf "scale=1080:1920" output.mp4
