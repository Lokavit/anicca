---
title: Linux
date: '2019-07-11'
tags: ['code']
draft: false
---

~~**Arch**~~：有墙，没做路由出境，装不上。

# Garuda

- ✅ **VirtualBox**: 用于装Win10
- ✅ **编程**： VSCodium。https://vscodium.com/
- ✅ **影音**： mpv
- ✅ **游戏**： Steam
- ✅ **OBS**:錄屏、直播
- ✅ **Fonts**:adobe-source-code-pro-fonts

## Steam
```
sudo pacman -S steam # select 2 or 
# sudo pacman -S lib32-nvidia-utils
sudo pacman -S wine winetricks wine-mono wine-gecko
```

## Fcitx5
```bash
# 裝載
sudo pacman -S fcitx5 fcitx5-gtk fcitx5-qt -fcitx5-rime

# open ~/.bashrc
[[ -f ~/.bashrc ]] && . ~/.bashrc

export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx

# install 
sudo pacman -S fcitx5-configtool

# 編輯主圖 .local/share/fcitx5/themes/Monk-Theme/
# 配置 .config/fcitx5/conf/classicui.conf
# 配置 .config/fcitx5/conf/pinyin.conf 即，輸入法配置項
```
- 任務欄點擊進入配置窗口，點擊`Add Input Method`,選擇簡中分組下的`Pinyin`,點擊`Add`
- 對輸入法配置，重啓輸入。

## Change Color
- 變更系統配色 `/usr/share/color-schemes/`
```bash
# Sweet.colors 色值：0,0,0,0
```

 
## 掛載移動盤

```bash
# show all Disk
sudo fsblk
# check disk type
sudo fidsk -l /dev/sdb
# if disk type == NTFS install ntfs-3g
sudo pacman -S ntfs-3g
# create mount point
sudo mkdir -p /mnt/mydrive
# use mount  
sudo mount -t ntfs /dev/sdb1 /mnt/mydrive
# check NTFS systeam
sudo ntfsfix /dev/sdb1
```

```bash
# /dev/設備名  掛載在 該文件夾下，手動刷新文件夾
sudo mount /dev/sdc1 /run/media/monk
```


- - **非编**： ？？？
- - ***电子书**:calibre 
- - ffmpeg for linux
- - calibre for linux
- - Internet Download Manager ??

- - 数据库管理软件

### VM Win10
- AE、PS、PR、ME,Adobe系列
- 百度网盘
- 一些win系老游戏
- 微信 QQ

### share 
- 创建虚拟机时，选择共享文件夹
- 启动虚拟机中系统后，在设备中，安装增强，即可打开共享文件夹。


# Win10 to Linux

- 罗列Win10下常用软件，寻找Linux下平替
- 了解并选择适合的发行版
- 在`VirtualBox`中练手
- 从`archinstall` 开始

## Linux发行版
- Arch：有墙，没做路由出境，装不上。
- Garuda：平替。当年官网还能打开是下载镜像，做双系统。
- - 镜像 https://mirrors.bfsu.edu.cn/osdn/storage/g/g/ga/garuda-linux/
- - https://www.tisonkun.org/2023/02/11/garudalinux/



## Arch 装载配置

```bash
archinstall

Mirrors
Locales
Disk configuratuin
Boot loader
Swap
Hostname
Root password
User account
Profile
Audio
Kernels
Additional packages
Network configuration
Timezone
Automatic time sync (NTP)
optional repositories


```

### 手动装载

```bash
setfont ter-128n # 设置字体，仅限当前有效
timedatectl set-ntp true
# 测试镜像
curl -o /etc/pacman.d/mirrorlist https://archliunx.org/mirrorlist/all/
nano /etc/pacman.d/mirrorlist # 选镜像，https协议。如：hackingand  lty.me
nano /etc/pacman.conf # 更改配置
VerbosePkgLists # 取消注释该行
ParallelDownloads = 5 # 取消注释该行 保存，退出
pacman -Syy # 同步配置

# 格式化驱动器
cfdisk # 选择dos







# 测试网路
ping -c 3 archlinux.org
# 分区
## 列出可用的分区和磁盘：
lsblk

#  进入 sda 选择gpt，编辑三个分区
cfdisk /dev/sda
### 结果 100G为例
lsblk
#### sda
##### sda1 1G UEFI 分区。它需要格式化为 FAT 文件系统
##### sda2 19G root
##### sda3 剩余 home
## 格式化分区
mkfs.fat -F32 /dev/sda1
mkfs.ext4 /dev/sda2
mkfs.ext4 /dev/sda3
## 挂在root分区
mount /dev/sda2 /mnt
### 创建一个文件夹来加载主分区并加载它
mkdir /mnt/home
mount /dev/sda3 /mnt/home
## 检查挂在状态
lsblk
## 安装最小化Arch
pacstrap -i /mnt base linux linux-firmware sudo nano
## 生成 fstab文件
genfstab -U -p /mnt >> /mnt/etc/fstab
## 使用 BASH 环境 chroot（更改 root）到挂载到 /mnt 的系统：
arch-chroot /mnt /bin/bash
### 终端变为：root身份访问系统
#### [root@archiso /]#
## 设置本地化，必须使用nano编辑器进入
nano /etc/locale.gen # ctrl+w 找到某关键字
## 编辑状态下，找en_US
Search #en_US  #找到en_US,解除#注释，回车 ctrl+o 回车 ctrl+x
## 生成本地语言
locale-gen
## 并创建包含相应语言设置的 locale.conf
echo "LANG=en_US.UTF-8" > /etc/locale.conf
## 设置时区
ln -sf /usr/share/zoneinfo/UTC /etc/localtime
## 设置本地时间
hwclock --systohc --utc
## 检查时间
date
## 设置主机名，即计算机名
echo monkPC > /etc/hostname
## 添加 hosts文件 [ctrl+o 保存] [ctrl+x 退出]
nano /etc/hosts
127.0.0.1        localhost
::1              localhost
127.0.1.1        monkPC
## 启用网路
### 安装网路管理器
pacman -S networkmanager
### 启用网路管理器
systemctl enable NetworkManager
## 设置root密码
passwd # 输入两次密码
## 安装 GRUB 引导加载器。它是最流行的引导加载程序，可配置性高，使用方便。 此处向下，有错误
### 安装 GRUB 引导加载器和 EFI 引导管理器软件包
pacman -S grub efibootmgr
### 在系统中安装 bootlader，并逐一运行这些命令生成其配置文件
mount /dev/sda1 /mnt/boot/efi

mount --mkdir /dev/efi_system_partition /boot/efi
lsblk # to check if everything is mounted correctly
# 到此句，有错误。待重装
grub-install --target=x86_64-efi --bootloader-id=GRUB --efi-directory=/boot/efi --removable
```



## OpenVPN on Arch

- download xxx.ovpn

```bash
sudo pacman -Sy networkmanager networkmanager-openvpn network-manager-applet openvpn
sudo systemctl enable NetworkManager.service # 启服务
sudo systemctl start NetworkManager.service
sudo mkdir -p /etc/sysctl.d
sudo nano /etc/sysctl.d/40-ipv6.conf
# 禁用 ipv6 打开nano编辑 
net.ipv6.conf.all.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6=1
net.ipv6.conf.lo.disable_ipv6=1
net.ipv6.conf.tun0.disable_ipv6=1
net.ipv6.conf.wlp3s0.disable_ipv6=1
# ctrl+x y enter
# 重启
sudo systemctl restart systemd-sysctl.service
sudo systemctl restart NetworkManager.service
# 导入 xxx.ovpn
nmcli connection import type openvpn file xxx.ovpn
# 重启
sudo systemctl restart systemd-sysctl.service
sudo systemctl restart NetworkManager.service
```

---

## GAME
```bash
sudo pacman -S nvidia-utils lib32-nvidia-utils
sudo pacman -S git steam gamemode mangohud
git clone https://aur.archlinux.org/yay.git /home/monk/yay
cd /home/monk/yay
makepkg -si --noconfirm
yay -S --noconfirm goverlay
# restart
# 系统菜单，打开Goverlay，点击Save 关闭，再次打开。
```



## proxmox

- https://www.youtube.com/watch?v=_u8qTN3cCnQ
- 使用一台电脑，装载 proxmox，而后客户机 web 访问，构建多个 os

## BASH Scripting

```bash
# create .sh file
nano himonk.sh # open nano 使用 ctrl+x（是否放入缓冲区）Y，是否保存？Enter
ls -l  # 查看文件信息
chmod +x himonk.sh ## 添加文件权限
./himonk.sh Monk # 脚本中有变量，变量值
whoami # output my name
pwd # where is I current floder
date # current date time
echo $RANDOM # gen random number
fb="monk"
# himonk.sh 中写变量  ehco "$fb" 脚本为子进程
export fb # 使脚本中变量变为可用
ls -al #显示包含隐藏的文件
# .bashrc 每次登录就会运行，可在内容设置环境变量
export fb="Monk" # 则该fb变量，持久有效
echo $(( 1 + 5 )) # 直接输出计算结果
```

```sh
#！/bin/bash

echo "Hi Monk"

sleep 3
echo "what"
sleep 3
echo "no"

read name # 读取输入的内容
echo "Hi $name" # 输出

# 另一种写法
name=$1
echo "Hi $namee"

# 脚本中结合命令 himonk.sh中代码
name=$1
user=$(whoami)
date=$(date)
whereami=$(pwd)
ehco "Hi $name .You logged $user .today is $date .current dir $whereami"
temp_age=$((($RANDOM%15)+$age))
echo "$temp_age"

echo "Do you like coffee?(y/n)"
read coffee
if[[$coffee=="y"]];then
    echo "You are awesome"
elif [[$USER=="monk"]];then
    echo "..."
else
    echo "Leave right now"
fi # 结束符，必须有

echo "Please select class:"
1 - Sam
2 - pri
3 - pro
read class
case $class in
    1)
        type="Sam"
        hp=10
        ;; # 可以写多行代码 ,必须双分号结尾
    2) ...
esac # 结束符
```
