---
title: FFmpeg
date: '2015-01-11'
tags: ['code']
draft: false
---

```bash
# m4s -> mp4
ffmpeg -i "./inputvideo.m4s" -i "./inputaudio.m4s" -c:v copy -c:a aac "output.mp4"

# 按时间切割视频
ffmpeg -ss 00:00:00 -i "E:\100GOPRO\8.MP4" -acodec copy -vcodec copy -t 00:01:40 "E:\100GOPRO\8-1.MP4"
# 按时间切割视频 转换为ts文件
ffmpeg -ss 00:00:00 -i "E:\100GOPRO\10.MP4" -acodec copy -vcodec copy -vbsf h264_mp4toannexb -t 00:04:00 "E:\100GOPRO\10-1.ts"

# 按时间切割视频 ts文件
ffmpeg -ss 00:06:00 -i "E:\100GOPRO\9-1.ts" -acodec copy -vcodec copy -t 00:07:00 "E:\100GOPRO\9-1-1.ts"

# 拼接ts并输出
ffmpeg -i "concat:E:\100GOPRO\7-1.ts|E:\100GOPRO\8-1.ts|E:\100GOPRO\9-1.ts|E:\100GOPRO\10-1.ts|E:\100GOPRO\11-1.ts|E:\100GOPRO\14-1.ts" -acodec copy -vcodec copy -absf aac_adtstoasc "E:\100GOPRO\out.mp4"

# 分离音频流
ffmpeg -i  "E:\input.flv" -acodec copy -vn "E:\out.aac"　　

# 压缩 -b:v :指定视频的码率 -b:a : 指定音频的码率 1M：码率的值 1M 表示 1Mb/s  -r 20：表示帧率设置为 20fps
ffmpeg  -i  "C:\input.mp4"  -s 3840x2160  -b:v 10M  -r 60  "C:\out.mp4"

# 转换视频分辨率：
ffmpeg -i "E:\0.mkv" -vf scale=1920:1080 "E:\0-scale.mkv"
```


ffmpeg -i "E:\CODE\cs50 2023\video.m4s" -i "E:\CODE\cs50 2023\audio.m4s" -c:v copy -c:a aac "E:\CODE\cs50 2023\Lecture 1 - C.mp4"


