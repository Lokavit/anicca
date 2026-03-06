---
title: "Arch + Hyprland"
date: 2026-03-06
tags: [ "Arch", "Hyprland","Linux"]
description: ""
---

## Arch + Hyprland
```bash
$ setfont ter-128n # 設定字型，僅限當前有效
$ archinstall 快速安裝
```

### Archinstall language 
### Locales 

### Mirrors and repositories (鏡像源指定)
- 進入 Mirror region -> 找到並勾選 你的所在地
- Mirror Region (鏡像區域) Hong Kong
- 進入 Optional repositories -> 勾選 multilib。
- 按 Back（返回）回到主菜單即可。

### Disk configuration (磁盤分區)
- 選擇 Manual partitioning
- 選擇硬盤 /dev/nvme0n1 
- 抹除硬盤痕跡
- create  primary 2048 2099200 1GiB fat32 /boot  boot,esp
- create  primary 2099200 35653632 16GiB linux-swap 
- create primary  35653632 500115456 221.5GiB ext4 /

### Swap (內存緩衝)
- Would you like to use swap on zaram ? No

### Bootloader (引導程序)
- 進入Bootloader 選擇 grub

### Kernels (核心) 
- Linux

### Hostname  
- monk

### Authentication （認證）
- Root Password  設置強密碼
- User Account 設置賬戶

### Profile (決定 Arch Linux 長什麼樣子)
- 選擇 Minimal 
- 必須在Additional packages 安裝以下：
- git hyprland kitty networkmanager pipewire-pulse terminus-font
- 輸入/ 在輸入關鍵字，則會定位

### Applications 跳過

### Network configuration
- 進入選擇：Use NetworkManager(default backend)

### Additional packages 

### Timezone  
- Asia/Hong_Kong

### Automatic time sync (NTP)

### Save configuration (保存配置)

### Install (開始安裝)

### Abort (中止/取消)

```bash
# Instaillation completed in 4m53s
# What would you like to do next?
# Exit archinstall
# Reboot system (重啟系統)
# chroot into installaction for post-installation configurations

# 選擇 Reboot system ，進入Arch Linux系統
# 輸入用戶名、密碼
# 檢測網路：ping -c 3 google.com
# 更新系統時間：sudo timedatectl set-ntp true
# 啟動 Hyprland
$ Hyprland

# 字號設置 
setfont ter-v24n

# 安裝軟件
sudo pacman -S waybar rofi-wayland swaybg hyprpolkitagent xdg-desktop-portal-hyprland neovim yazi ffmpeg 7zip jq poppler fd rg fzf zoxide
 
# File manager (yazi):  
# Status bar (waybar): 螢幕上方的狀態列（這是顯示佛曆的最佳位置）。
# Application launcher (rofi-wayland): 按下快捷鍵後可以搜尋並打開程式。
# Wallpaper (swaybg): 讓你設置佛曆背景或任何桌布的工具。
# Authentication agent (hyprpolkitagent): 讓你在圖形界面輸入密碼（例如裝軟體時彈出的視窗）。
# XDG Desktop Portal: 確保螢幕分享和文件開啟能正常運作。
```

### 常用命令 

```bash
$ reboot # 重啓
$ sudo poweroff # 關機
$ Hyprland # 啟動 Hyprland
Super + Q Create Teminal 
Super + E  File manager
Super + R Launcher
Super + C Close window
Super + V Toggle floating
Super + M Exit Hyprland
Super + [1-9] Move window to workspace 1-9
Super + Arrows Move focus around

# hyprland設置
nvim ~/.config/hypr/hyprland.conf
# 末尾添加
# 啟動狀態欄
exec-once = waybar
# 啟動桌布 (請換成你的圖片路徑)
exec-once = swaybg -i /home/monk/Pictures/wallpaper.jpg -m fill
# 啟動密碼驗證代理 (這很重要，否則你打不開需要權限的軟體)
exec-once = hyprpolkitagent

# kitty設置
nvim ~/.config/kitty/kitty.conf
# --- 透明度設定 ---
# background_opacity 決定背景透明度 (0.0 完全透明, 1.0 完全不透明)
background_opacity 0.85
kitty +kitten themes # 選一個配色
Modify kitty.conf to load Base2Tone Field Dark # 按鍵盤M

# 佛曆設置
$ mkdir -p ~/.config/waybar
$ cp /etc/xdg/waybar/config.jsonc ~/.config/waybar/config.jsonc
$ cp /etc/xdg/waybar/style.css ~/.config/waybar/style.css
$ waybar
$ cp ~/.config/waybar/config.jsonc ~/.config/waybar/config.working
"modules-right": ["network", "cpu", "memory", "custom/buddhist"],
"custom/buddhist": {
    "exec": "echo $(date +'%d %b') $(($(date +'%Y') + 543)) BE '|' $(date +'%H:%M:%S')",
    "interval": 1,
    "format": "{}"
},

```
