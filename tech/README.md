- 調整個人網站，將編程與小說完全分開，在歡迎頁面給出指向，未來可以增加模板庫、遊戲、示例等。
- - 編程 `username.github.io/tech/`
- - 小說 `username.github.io/novel/`
- - 遊戲 `username.github.io/games/`
- - 模板 `username.github.io/template/`

成品放在 ThemeForest 或 Gumroad 上賣 $10 - $20。
浏览器插件 (Chrome Extension)

====

====

# IDEA & ACTION

- CS50 2023
- - ✅ Lecture 0 - Scratch
- - Lecture 1 - C
- - Lecture 2 - Arrays
- - Lecture 3 - Algorithms
- - Lecture 4 - Memory

- 指令生成故事，全屏自動播放。使用 OBS 錄屏。

## Linux

- ~~**Arch**~~：有牆，沒做路由出境，裝不上。
- ✅ **Garuda**：平替。當年官網還能開啟是下載映象，做雙系統
- - ✅ **VirtualBox**: 用於裝 Win10
- - **輸入法**： 小狼毫 => 鼠須管
- - ✅ **程式設計**： VSCodium。替換`VSCode` https://vscodium.com/
- - ✅ **影音**： mpv、~~foobar2000~~
- - ✅ **遊戲**： Steam
- - **非編**： ？？？
- - **\*電子書**:calibre
- - ffmpeg for linux
- - calibre for linux
- - Internet Download Manager ??
- - ✅ OBS
- - 資料庫管理軟體

### 轉入 VM Win10

- AE、PS、PR、ME,Adobe 系列
- 一些 win 系老遊戲
- 微信 QQ

### share

- 建立虛擬機器時，選擇共享資料夾
- 啟動虛擬機器中系統後，在裝置中，安裝增強，即可開啟共享資料夾。

PILI Puppet Drama

## 網路

- 軟路由

karma:業[非唯一]
sutra:真諦
stupa:塔,佛塔,舍利塔
sumeru:須彌山
prajna:般若
bhiksu:比丘
lokavit:世間解
SahaLand 娑婆世界
SAMSARA 　輪迴轉世

Sumeru：作為 site,內容大部分是從別的倉庫外鏈進來，走 fetch 請求。

- src：自身的原始碼寫在這裡。

/\*
類名大駝峰，方法名小駝峰。資料庫表名用下劃線，欄位名小駝峰。
變數小駝峰，常量大寫＿大寫，值關鍵字大寫＿大寫，
臨時變數下劃線，樣式類名用下劃線。

\*/

原始碼專案，實現一個類似 Docsify 的執行時渲染。

主頁主題內容區域：`flex`佈局，隨機內容做成卡片形式
ＨＳ：(橫屏)左側邊欄小按鈕，可展開。
ＶＳ：(豎屏)同款小按鈕，改為緊貼移動端底部。
以當前螢幕寬高，判斷當前螢幕為橫屏或豎屏，切換對應ｃｓｓ檔案。

- h.css:橫屏
- v.css:豎屏
- c.css:通用

Archive:對以前專案的存檔，以及製作的其他輕量級頁面,css 特效等。
Games:製作的遊戲專案展示,每個遊戲再分資料夾。
WebDev:一些較大的 web 專案，按專案分資料夾。
JSLib：一些可以封裝起來的庫。
Dialog:對話式小說。(可能使用模板生成的方式，資料寫在專案中，還是資料庫中？)
Novel:存放小說等文字作品。
Devdocs:存放開發相關的文件。
English:學習英語相關的文件。
Database:一個用作資料庫的倉庫，內中對所需專案的資料以資料夾形式區分。

Python/Rust/nodejs:一個用於生成側邊欄目錄檔案的工具。

一

寫一個從網站自動生成內容的工具： 1.從https://blinkdl.github.io/AI-Writer/ 獲取 select 以及

寫一個處理文字的工具： 1.獲取文字內容，
.正則其中的章節(如：第 0-9 章，第零-九章，0-9 章，零-九章等)，將它們移除。
.以 9000-9999 區間切分為章節，自動以 0.md 開始編號。

<!--
實現思路
一個構建html的頁面。
透過字串拼接出構建後的完整的 html 檔案
使用 Blob 構造出一個 Blob 檔案物件
使用 window.URL.createObjectURL 將檔案物件解析成 url
將 url 放入 <a> 使用 a 標籤的 download 屬性下載
使用 window.URL.revokeObjectURL(url) 釋放 url

程式碼實現
export2Excel() {
    // 生成html字串
    const html = gethtml("前端小蝸");
    // 建立一個a標籤
    var a = document.createElement("a");
    // 建立一個包含blob物件的url
    var url = window.URL.createObjectURL(
        new Blob([html], {
            type: "",
        })
    );
    a.href = url;
    a.download = "file.html";
    a.click();
    window.URL.revokeObjectURL(url);
}

export const gethtml = (title) => {
  let html = `<!DOCTYPE html>
  <html lang="en">
    ...${title}
  </html>
  `;
  return html;
};

 -->
