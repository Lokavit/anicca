# FFmpeg

```bash
# m4s -> mp4
ffmpeg -i "./inputvideo.m4s" -i "./inputaudio.m4s" -c:v copy -c:a aac "output.mp4"

# 按時間切割影片
ffmpeg -ss 00:00:00 -i "E:\100GOPRO\8.MP4" -acodec copy -vcodec copy -t 00:01:40 "E:\100GOPRO\8-1.MP4"
# 按時間切割影片 轉換為ts檔案
ffmpeg -ss 00:00:00 -i "E:\100GOPRO\10.MP4" -acodec copy -vcodec copy -vbsf h264_mp4toannexb -t 00:04:00 "E:\100GOPRO\10-1.ts"

# 按時間切割影片 ts檔案
ffmpeg -ss 00:06:00 -i "E:\100GOPRO\9-1.ts" -acodec copy -vcodec copy -t 00:07:00 "E:\100GOPRO\9-1-1.ts"

# 拼接ts並輸出
ffmpeg -i "concat:E:\100GOPRO\7-1.ts|E:\100GOPRO\8-1.ts|E:\100GOPRO\9-1.ts|E:\100GOPRO\10-1.ts|E:\100GOPRO\11-1.ts|E:\100GOPRO\14-1.ts" -acodec copy -vcodec copy -absf aac_adtstoasc "E:\100GOPRO\out.mp4"

# 分離音訊流
ffmpeg -i  "E:\input.flv" -acodec copy -vn "E:\out.aac"　　

# 壓縮 -b:v :指定影片的位元速率 -b:a : 指定音訊的位元速率 1M：位元速率的值 1M 表示 1Mb/s  -r 20：表示幀率設定為 20fps
ffmpeg  -i  "C:\input.mp4"  -s 3840x2160  -b:v 10M  -r 60  "C:\out.mp4"

# 轉換影片解析度：
ffmpeg -i "E:\0.mkv" -vf scale=1920:1080 "E:\0-scale.mkv"
```

ffmpeg -i "E:\CODE\cs50 2023\video.m4s" -i "E:\CODE\cs50 2023\audio.m4s" -c:v copy -c:a aac "E:\CODE\cs50 2023\Lecture 1 - C.mp4"
