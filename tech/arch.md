archinstall
检查连接
选择镜像源，从VPN所在地选。
安装完重启。安装网络
sudo pacman -S networkManager
sudo systemctl --type=service # 检查已启用的服务
systemctl start NetworkManager.service # 如果不存在，启用networkManager

sudo pacman -S pacman-mirrorlist # 安装镜像源
sudo pacman -Syyu # 强制更新镜像 每次修改镜像之后都应该使用该命令
# 直接从网站上获取镜像列表
sudo curl -o /etc/pacman.d/mirrorlist https://archlinux.org/mirrorlist/all/
## sudo pacman -S pacman-contrib # 排序已存在的源
## sudo rankmirrors -n 6 /etc/pacman.d/mirrorlist # 找出最快的源
sudo pacman -R pacman-contrib # 移除包
sudo pacman -S reflector # 获取最新源，筛选最新镜像并按速度排序，写入/etc/pacman.d/mirrorlist
systemctl start reflector.service # 启动服务
