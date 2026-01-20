# Linux

~~**Arch**~~：有牆，沒做路由出境，裝不上。

## arch

archinstall
檢查連線
選擇映象源，從 VPN 所在地選。
安裝完重啟。安裝網路
sudo pacman -S networkManager
sudo systemctl --type=service # 檢查已啟用的服務
systemctl start NetworkManager.service # 如果不存在，啟用 networkManager

sudo pacman -S pacman-mirrorlist # 安裝映象源
sudo pacman -Syyu # 強制更新映象 每次修改映象之後都應該使用該命令

## 直接從網站上獲取映象列表

sudo curl -o /etc/pacman.d/mirrorlist https://archlinux.org/mirrorlist/all/

## sudo pacman -S pacman-contrib # 排序已存在的源

## sudo rankmirrors -n 6 /etc/pacman.d/mirrorlist # 找出最快的源

sudo pacman -R pacman-contrib # 移除包
sudo pacman -S reflector # 獲取最新源，篩選最新映象並按速度排序，寫入/etc/pacman.d/mirrorlist
systemctl start reflector.service # 啟動服務

# Garuda

- ✅ **VirtualBox**: 用於裝 Win10
- ✅ **程式設計**： VSCodium。https://vscodium.com/
- ✅ **影音**： mpv
- ✅ **遊戲**： Steam
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

- 工作列點選進入配置視窗，點選`Add Input Method`,選擇簡中分組下的`Pinyin`,點選`Add`
- 對輸入法配置，重啟輸入。

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
# /dev/裝置名  掛載在 該資料夾下，手動重新整理資料夾
sudo mount /dev/sdc1 /run/media/monk
```

- - **非編**： ？？？
- - **\*電子書**:calibre
- - ffmpeg for linux
- - calibre for linux
- - Internet Download Manager ??

- - 資料庫管理軟體

### VM Win10

- AE、PS、PR、ME,Adobe 系列
- 百度網盤
- 一些 win 系老遊戲
- 微信 QQ

### share

- 建立虛擬機器時，選擇共享資料夾
- 啟動虛擬機器中系統後，在裝置中，安裝增強，即可開啟共享資料夾。

# Win10 to Linux

- 羅列 Win10 下常用軟體，尋找 Linux 下平替
- 瞭解並選擇適合的發行版
- 在`VirtualBox`中練手
- 從`archinstall` 開始

## Linux 發行版

- Arch：有牆，沒做路由出境，裝不上。
- Garuda：平替。當年官網還能開啟是下載映象，做雙系統。
- - 映象 https://mirrors.bfsu.edu.cn/osdn/storage/g/g/ga/garuda-linux/
- - https://www.tisonkun.org/2023/02/11/garudalinux/

## Arch 裝載配置

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

### 手動裝載

```bash
setfont ter-128n # 設定字型，僅限當前有效
timedatectl set-ntp true
# 測試映象
curl -o /etc/pacman.d/mirrorlist https://archliunx.org/mirrorlist/all/
nano /etc/pacman.d/mirrorlist # 選映象，https協議。如：hackingand  lty.me
nano /etc/pacman.conf # 更改配置
VerbosePkgLists # 取消註釋該行
ParallelDownloads = 5 # 取消註釋該行 儲存，退出
pacman -Syy # 同步配置

# 格式化驅動器
cfdisk # 選擇dos







# 測試網路
ping -c 3 archlinux.org
# 分割槽
## 列出可用的分割槽和磁碟：
lsblk

#  進入 sda 選擇gpt，編輯三個分割槽
cfdisk /dev/sda
### 結果 100G為例
lsblk
#### sda
##### sda1 1G UEFI 分割槽。它需要格式化為 FAT 檔案系統
##### sda2 19G root
##### sda3 剩餘 home
## 格式化分割槽
mkfs.fat -F32 /dev/sda1
mkfs.ext4 /dev/sda2
mkfs.ext4 /dev/sda3
## 掛在root分割槽
mount /dev/sda2 /mnt
### 建立一個資料夾來載入主分割槽並載入它
mkdir /mnt/home
mount /dev/sda3 /mnt/home
## 檢查掛在狀態
lsblk
## 安裝最小化Arch
pacstrap -i /mnt base linux linux-firmware sudo nano
## 生成 fstab檔案
genfstab -U -p /mnt >> /mnt/etc/fstab
## 使用 BASH 環境 chroot（更改 root）到掛載到 /mnt 的系統：
arch-chroot /mnt /bin/bash
### 終端變為：root身份訪問系統
#### [root@archiso /]#
## 設定本地化，必須使用nano編輯器進入
nano /etc/locale.gen # ctrl+w 找到某關鍵字
## 編輯狀態下，找en_US
Search #en_US  #找到en_US,解除#註釋，回車 ctrl+o 回車 ctrl+x
## 生成本地語言
locale-gen
## 並建立包含相應語言設定的 locale.conf
echo "LANG=en_US.UTF-8" > /etc/locale.conf
## 設定時區
ln -sf /usr/share/zoneinfo/UTC /etc/localtime
## 設定本地時間
hwclock --systohc --utc
## 檢查時間
date
## 設定主機名，即計算機名
echo monkPC > /etc/hostname
## 新增 hosts檔案 [ctrl+o 儲存] [ctrl+x 退出]
nano /etc/hosts
127.0.0.1        localhost
::1              localhost
127.0.1.1        monkPC
## 啟用網路
### 安裝網路管理器
pacman -S networkmanager
### 啟用網路管理器
systemctl enable NetworkManager
## 設定root密碼
passwd # 輸入兩次密碼
## 安裝 GRUB 引導載入器。它是最流行的引導載入程式，可配置性高，使用方便。 此處向下，有錯誤
### 安裝 GRUB 引導載入器和 EFI 引導管理器軟體包
pacman -S grub efibootmgr
### 在系統中安裝 bootlader，並逐一執行這些命令生成其配置檔案
mount /dev/sda1 /mnt/boot/efi

mount --mkdir /dev/efi_system_partition /boot/efi
lsblk # to check if everything is mounted correctly
# 到此句，有錯誤。待重灌
grub-install --target=x86_64-efi --bootloader-id=GRUB --efi-directory=/boot/efi --removable
```

## OpenVPN on Arch

- download xxx.ovpn

```bash
sudo pacman -Sy networkmanager networkmanager-openvpn network-manager-applet openvpn
sudo systemctl enable NetworkManager.service # 啟服務
sudo systemctl start NetworkManager.service
sudo mkdir -p /etc/sysctl.d
sudo nano /etc/sysctl.d/40-ipv6.conf
# 停用 ipv6 開啟nano編輯
net.ipv6.conf.all.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6=1
net.ipv6.conf.lo.disable_ipv6=1
net.ipv6.conf.tun0.disable_ipv6=1
net.ipv6.conf.wlp3s0.disable_ipv6=1
# ctrl+x y enter
# 重啟
sudo systemctl restart systemd-sysctl.service
sudo systemctl restart NetworkManager.service
# 匯入 xxx.ovpn
nmcli connection import type openvpn file xxx.ovpn
# 重啟
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
# 系統選單，開啟Goverlay，點選Save 關閉，再次開啟。
```

## proxmox

- https://www.youtube.com/watch?v=_u8qTN3cCnQ
- 使用一臺電腦，裝載 proxmox，而後客戶機 web 訪問，構建多個 os

## BASH Scripting

```bash
# create .sh file
nano himonk.sh # open nano 使用 ctrl+x（是否放入緩衝區）Y，是否儲存？Enter
ls -l  # 檢視檔案資訊
chmod +x himonk.sh ## 新增檔案許可權
./himonk.sh Monk # 指令碼中有變數，變數值
whoami # output my name
pwd # where is I current floder
date # current date time
echo $RANDOM # gen random number
fb="monk"
# himonk.sh 中寫變數  ehco "$fb" 指令碼為子程序
export fb # 使指令碼中變數變為可用
ls -al #顯示包含隱藏的檔案
# .bashrc 每次登入就會執行，可在內容設定環境變數
export fb="Monk" # 則該fb變數，持久有效
echo $(( 1 + 5 )) # 直接輸出計算結果
```

```sh
#！/bin/bash

echo "Hi Monk"

sleep 3
echo "what"
sleep 3
echo "no"

read name # 讀取輸入的內容
echo "Hi $name" # 輸出

# 另一種寫法
name=$1
echo "Hi $namee"

# 指令碼中結合命令 himonk.sh中程式碼
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
fi # 結束符，必須有

echo "Please select class:"
1 - Sam
2 - pri
3 - pro
read class
case $class in
    1)
        type="Sam"
        hp=10
        ;; # 可以寫多行程式碼 ,必須雙分號結尾
    2) ...
esac # 結束符
```
