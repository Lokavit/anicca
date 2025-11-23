- 調整個人網站，將編程與小說完全分開，在歡迎頁面給出指向，未來可以增加模板庫、遊戲、示例等。
- - 編程 `username.github.io/tech/`
- - 小說 `username.github.io/novel/`
- - 遊戲 `username.github.io/games/`
- - 模板 `username.github.io/template/`

成品放在 ThemeForest 或 Gumroad 上賣 $10 - $20。
浏览器插件 (Chrome Extension)

====

> 如何將寫小說時遇到的技術難題，轉化成一個售價 5-20 美元的解決方案，賣給其他程式設計師或作家？
> 開發一個純粹的文字/數據處理工具

- 關於 Markdown 和其他部分功能可以參考 ：https://stackedit.io/app#

Tauri + 您熟悉的前端框架（例如 React/Vue/Svelte） Vanilla JavaScript

「先實現卡片庫的增、刪、改」 和 「卡片庫（展品）到文件夾（專案）的複製邏輯」
這不是一個**「功能」，這是你的產品的「數據架構」**。
卡片庫 (展品形式)： Master Data (主資料)。這是你所有設定的唯一黃金來源。
文件夾 (專案形式)： Project Instance (專案實例)。這是你針對特定小說使用的、從主資料複製出來的子集。
這個架構是你的工具的「靈魂」和「核心競爭力」。

數據可視化：生成一個帶有節點和連線的複雜人物關係圖（即使是純文字或簡單的 2D 佈局）。時間軸、關係圖、流程圖等可視化的圖表編輯、拖拽等
外部數據整合：需要讀取外部檔案格式（如 .xlsx 或另一個專案的數據），並在內部進行複雜的數據同步或合併。
多用戶協作：需要基礎的網路功能來同步數據。支持 Github 授權，關聯指定倉庫，實現多用戶協作。

將第一階段的 MVP 定義為：
數據層： 實現卡片的 JSON Schema 結構。
UI/UX 層： 實現純文字的卡片增、刪、改界面。
邏輯層： 實現從「卡片庫」到「專案文件夾」的複製/實例化邏輯。

最可行且性價比最高的方案是：純文字工具
原因： 你的核心競爭力是 邏輯和程式碼的嚴謹性，而非故事的吸引力。將產品定位為工具，可以讓你將所有的精力投入到你最擅長的功能邏輯上，而不用擔心 Steam 玩家挑剔你的遊戲體驗和美術風格。
結論： 寧可做一個在遊戲區曝光率稍低，但功能絕對強大的工具，也不要冒險做一個可能因為「無趣」而失敗的文字遊戲。

工具作用 (你的核心邏輯)：
任務一：時間軸排序。 解析 JSON 數據，自動按時間順序生成一份純文字時間軸報告。
任務二：關係圖報告。 找出 JSON 中所有互相引用的關係（例如：角色 A 是角色 B 的師父），生成一份純文字關係圖報告。
為文字工作者提供的價值：
避免邏輯錯誤： 作者無需手動整理時間線，工具自動生成報告，一眼看出「角色 A 在出生前就死了」這種荒謬的邏輯錯誤。
技術簡單性： 這是純粹的 JSON 數據結構處理、排序和輸出。無需任何文本分析、模糊匹配或 AI 模型。

小說結構與一致性驗證器
允許用戶導入設定資料（你設計的 .json Schema）。
允許用戶導入正文 Markdown 文件。
進行結構化對比：檢查正文中的關鍵詞（如角色名稱、地點名稱）是否與設定資料中記錄的一致，並高亮顯示錯誤。
標籤一 (流量來源)： 「獨立遊戲 (Indie)」 和 「視覺小說 (Visual Novel)」 或 「互動式小說 (Interactive Fiction)」。
原因： 這些類型的遊戲往往視覺簡單，純文字工具可以合理地被定位為**「敘事設計師的輔助工具」**。
標籤二 (精準定位)： 「軟體訓練 (Software Training)」、「工具 (Utility)」、「教育 (Educational)」。
商店描述： 第一句話就必須明確告知：「這是一款為長篇小說作者、遊戲劇情設計師和世界觀創作者提供的純文字生產力工具。」
價格： 保持在 $5 - $15 美元，這是一個標準的實用工具價格，而不是遊戲價格。

架空世界觀，類中國古代。
保持敘事性： 將佛教知識和理論作為世界觀和解謎的元素。

## 切身痛點

- 設定：

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
