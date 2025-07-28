---
title: OS&Server
date: '2019-05-11'
tags: ['code']
draft: false
---

## 持續整合、交付、部署

`Github Actions`。

- ❌ 沒有伺服器.

# centOS 8

## Xshell 家庭免費版

- 新建會話，連結到遠端雲伺服器

```
# 安裝寶塔 Centos安裝指令碼
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```

## 更改寶塔埠 8888 操作步驟

- 官網-控制檯-雲伺服器-伺服器詳情-安全組-新增規則-「入方向-TCP-8888」-確定-更改安全組

## 環境安裝

- 編譯安裝以下：mysql5.7.34、Nginx1.20.1、php7.4

## 建站

- 網站管理 - 新增站點
- - 域名:xx.com:88 **不能使用 80 埠**
- - 資料庫:MySQL utf8mb4
- - 資料庫賬密:建立時構建對應資料庫
- - PHP 版本:7.4
- 檔案
- - 上傳 - 解壓到`根目錄/www/wwwroot/xx.com/`下
- - 更改站點目錄`/config/database.php` 中資料庫賬密
- 資料庫：包裡的`data.sql` 匯入資料庫
- 網站 - 設定
- - 網站目錄:執行目錄(需指定)`/public` - 儲存
- - 偽靜態:thinkphp - 儲存

## 問題排查

- php7.4 安裝狀態出現紅色，解除安裝重灌
- 登入賬密錯誤:
- - app/admin/controller/Login.php 註釋密碼
- - 登入成功後，解除註釋，並由面板中更改密碼，退出重登做測試。
- vueadmin 配置後，一堆雜問題

```js
// ui/vue.config.js 新增及修改如下
publicPath:'/dist/', // 公共資源指向/dist/
outputDir: '../public/dist', // 輸出目錄指向php專案的public/dist

// ui/src/api/request.js 改API請求地址
axios.defaults.baseURL = 'http://a.dd.ifncloud.com:88/admin';

// 快取Token 跳轉
```

## 安卓系統

- 下載 Android x86 安裝映象、下載並安裝 UltraISO 軟體
  在選單欄依次點選【檔案】->【開啟】，選擇剛才下載好的安卓 x86 安裝映象。
  映象開啟後，在選單欄依次點選【啟動】->【寫入硬碟映像】檢查硬碟驅動器是否是剛才插入的 U 盤，寫入方式選擇“USE-HDD+”，然後點選【寫入】按鈕。
  映象寫入完成後，不要拔 U 盤，重新啟動電腦。參照螢幕提示按 F12/ESC 等(留意螢幕提示或翻閱說明書)啟動選單鍵，進入 Boot Menu，選擇 U 盤啟動
  安裝選擇含有(harddisk)字樣的選項，然後選擇「Yes」
