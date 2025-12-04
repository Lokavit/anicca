archinstall
檢查連線
選擇映象源，從VPN所在地選。
安裝完重啟。安裝網路
sudo pacman -S networkManager
sudo systemctl --type=service # 檢查已啟用的服務
systemctl start NetworkManager.service # 如果不存在，啟用networkManager

sudo pacman -S pacman-mirrorlist # 安裝映象源
sudo pacman -Syyu # 強制更新映象 每次修改映象之後都應該使用該命令
# 直接從網站上獲取映象列表
sudo curl -o /etc/pacman.d/mirrorlist https://archlinux.org/mirrorlist/all/
## sudo pacman -S pacman-contrib # 排序已存在的源
## sudo rankmirrors -n 6 /etc/pacman.d/mirrorlist # 找出最快的源
sudo pacman -R pacman-contrib # 移除包
sudo pacman -S reflector # 獲取最新源，篩選最新映象並按速度排序，寫入/etc/pacman.d/mirrorlist
systemctl start reflector.service # 啟動服務
