---
title: Node-js
date: '2021-12-11'
tags: ['code']
draft: false
---

# 2023.12.03
- Arch Linux

```bash
sudo pacman -S nodejs
sudo pacman -S npm
# 裝載全域性安裝包時
sudo npm install packaheName -g
```

# 2023.04.08

## Win10

由於環境無法執行`nextjs`專案，對 nvm 及 node 升級。win 系統下，只能去官網下載`node-v18.15.0-x64.msi`。安裝之後，原有 nvm 無法 use 最新安裝的 node。需在系統內將所有 node、npm、nvm 相關清除。

### 清除步驟：

- 1.使用 win10 工具解除安裝 nodejs
- 2.執行 npm cache clean --force
- 3.在電腦中清除以下檔案及資料夾

```
C:\Program Files (x86)\Nodejs
C:\Program Files\Nodejs
C:\Users\{User}\AppData\Roaming\npm (or %appdata%\npm)
C:\Users\{User}\AppData\Roaming\npm-cache (or %appdata%\npm-cache)
C:\Users\{User}\.npmrc (and possibly check for that without the . prefix too)
C:\Users\{User}\AppData\Local\Temp\npm-\*
```

## 安裝新的 nvm

- `github`上搜索`nvm-windows`,下載安裝，當前為`1.1.10`。
- 安裝過程中，其自動安裝`nodejs`，當前為`18.15.0`。
- 亦自動安裝了`npm`,當前為 9.5.0。
- 使用`nvm use 18.15.0`,可見使用成功。

## 測試

用出現問題的`nextjs`專案做測試

```bash
# 執行nextjs的建立專案命令，提示更新npm
$ npm install -g npm@9.6.4
# 再次執行nextjs相關，建立nextjs專案
```

---

# NPM

`Node Version Manager（Node 版本管理器）`

- [下載 nvm 包 exe 版本](https://github.com/coreybutler/nvm-windows/releases)
- 設定裝載路徑`C:\dev`
- 設定`nodejs`資料夾路徑`C:\dev\nodejs`

```bash
# C:\dev\nvm\settings.txt
root: C:\dev\nvm  # nvm.exe所在目錄
path: C:\dev\nodejs # 存放指向node版本的快捷方式，使用nvm的過程中會自動生成。一般寫的時候與nvm同級。
# 以上為原有內容，在後面追加以下內容：
arch: 64  # 當前作業系統位數
proxy: none # 代理
node_mirror: http://npm.taobao.org/mirrors/node/ #淘寶映象
npm_mirror: https://npm.taobao.org/mirrors/npm/ #淘寶映象
```

```bash
# 檢視電腦環境變數，會看到如下資訊：
NVM_HOME	    C:\dev\nvm
NVM_SYMLINK    C:\dev\nodejs
PATH    追加    %NVM_HOME%;%NVM_SYMLINK%
```

# 裝載 nodejs

`可裝載多個版本`

```bash
nvm # 會顯示版本號，及一堆命令，表示成功
nvm install  <version> # 裝載node，指定版本號
nvm install latest # 裝載nodejs的最新版本
nvm use 10.12.0  # 使用nodejs的10.12.0版本
Now using node v10.12.0 (64-bit)  # 設定成功
node -v  # 檢視nodejs的當前版本 v10.12.0
npm -v  # 檢視npm的當前版本 6.4.1
```

# 常用操作命令

```bash
# ===== npm link ===== #
cd scratch-vm # 以該庫為例
npm link # 將以上專案link到全域性
# 在需要用到該庫的專案根目錄下，如：
cd scratch-gui
npm link scratch-vm # 將庫連結到此專案

# ===== npm update ===== #
npm outdated # 檢視包版本資訊
# 更新本地 package
npm update <package-name>
npm update # 更新所有

# ===== npm -g 較少使用，通常為裝載帶命令的cli等 ===== #
npm install -g <package> # 裝載全域性包命令
npm update -g <package> # 更新全域性裝載的包
npm update -g # 更新所有全域性包
npm uninstall -g <package> # 解除安裝全域性裝載的包

# ===== npm 按需裝載 專案中操作 ===== #
npm install <package_name> # 通常以下字尾擇其一
npm install --save  # 用於生產環境的安裝包
npm install --save-dev  # 用於開發環境的安裝包
# -S, --save: dependencies. 生產依賴
# -D, --save-dev: devDependencies. 開發依賴
# -O, --save-optional: optionalDependencies.可選依賴

# ===== npm 釋出包 ===== #
# 設定npm映象
npm config set registry http://registry.npmjs.org
npm login # 登入命令，輸入帳號密碼郵箱
# 登入成功
Logged in as 使用者名稱 on http://registry.npmjs.org/.
npm publish # 將npm包釋出帶npm上
npm logout # 登出
# 設定回淘寶映象
npm config set registry https://registry.npm.taobao.org
npm config get registry # 檢視當前映象

# ===== npm 刪除包 ===== #
npm unpublish --force # 強制刪除
npm unpublish react-rupa@1.0.1 # 指定版本號
npm deprecate # 某些情況

# ===== npm 釋出包 其它相關 ===== #
touch .gitignore # 提交到github的過濾檔案
touch .npmignore # 提交到npm的過濾檔案
```

---

# fileDisplay

- 遞迴遍歷資料夾中所有檔案

```js
const path = require("path"); // 路徑
const fs = require("fs"); // 檔案系統
// 一個路徑或路徑片段解析成一個絕對路徑，返回解析後的路徑字串
const filePath = path.resolve("src"); // 本地檔案，從根磁碟機代號至指定資料夾的絕對路徑
const pathDist = "./dist"; // 編譯完輸出的html檔案的資料夾

fileDisplay(filePath); //

/**
 * 使用遞迴實現遍歷資料夾中所有檔案
 * @param {*} filePath 需遍歷的資料夾
 */
function fileDisplay(filePath) {
  // 讀取目錄下面的檔案，返回目錄下的檔案列表物件，如果傳入的是個檔案，返回這個檔案
  fs.readdir(filePath, (err, files) => {
    if (err) return;
    files.forEach((filename) => {
      // 獲取當前檔案的絕對路徑 ，本地的話，針對於磁碟
      let fileDir = path.join(filePath, filename);
      // 根據檔案路徑，獲取檔案資訊，返回一個 fs.Stats物件
      fs.stat(fileDir, (error, stats) => {
        if (error) return;
        // 如果是資料夾，繼續向下遍歷
        if (stats.isDirectory()) {
          // 過濾掉 include 資料夾 不處理
          if (fileDir.includes("include")) return;
          fileDisplay(fileDir); // 呼叫遞迴，繼續向下遍歷資料夾及檔案
        }
        // 如果是檔案， 需要進行某些操作
        if (stats.isFile()) {
          // 處理檔名，剩下副檔名，含句點 , 找出 .html檔案
          if (path.extname(filename) == ".html") {
            compileHTML(fileDir, filename, filePath, pathDist);
          }
          if (path.extname(filename) == ".css") {
            console.log("CSS檔案");
          }
          if (path.extname(filename) == ".js") {
            console.log("JS檔案");
          }
        }
      });
    });
  });
}
```

# compileHTML

`該方式似乎已不可取，因標準棄用`

- 可指定過濾資料夾，可分辨處理邏輯

```js
/*檔案結構示例
  原始碼: 
    src/views/demo.html  
    src/views/include/header.html
  編譯後: 
    dist/views/demo.html
 */
/**
 * 編譯HTML檔案 (如在每個有 import頁面，加上 header.html和footer.html)
 * @param {*} fileDir 當前檔案絕對路徑
 * @param {*} filename 檔名，帶字尾名
 * @param {*} src 相對路徑 [src]原始碼
 * @param {*} dist  輸出檔案時，所需的根路徑[docs/dist]
 */
function compileHTML(fileDir, filename, src, dist) {
  // 讀取檔案  readFile帶有回撥 ，readFileSync 不帶回調
  fs.readFile(fileDir, "utf-8", (err, data) => {
    let dataReplace = data.replace(
      /<link\srel="import"\shref="(.*)">/gi,
      (matchs, m1) => {
        // 返回讀取的檔案內容
        return fs.readFileSync(path.join(src, m1), "utf-8");
      }
    );
    fs.writeFile(dist + "/views/" + filename, dataReplace, "utf-8", (err) => {
      if (err) return console.log("檔案寫入錯誤 ERROR:", err);
    });
  });
}
```

---

# 搭建可訪問本地檔案的伺服器

- 同步讀取及非同步讀取

```js
const http = require("http"); // http模組
const fs = require("fs"); // 檔案系統
const url = require("url"); // url
const path = require("path"); // 路徑

const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 埠號

/**
 * http模組提供了createServer函式,這個函式會返回一個物件，將返回的物件賦值給server。
 * request:接收到的資料
 * response:響應資料
 * 通常使用response.write方法向前端返回資料，該方法可呼叫多次，返回的資料會被拼接到一起。
 * 必須呼叫response.end方法結束請求，否則前端會一直處於等待狀態，該方法也可以用來向前端返回資料
 */
const server = http.createServer((request, response) => {
  /**
   * __dirname是全域性變數,可以直接獲取。表示當前執行指令碼所在的目錄。（這裡是D:\Git\……）
   * path.join方法，拼接目錄地址
   * staticPath拼接後的目錄地址，為了跳到自己專案所在那個目錄。（這裡是D:\Git\……\view）
   */
  const staticPath = path.join(__dirname, "view");
  /**
   * request.url請求的連結（這裡輸出的是/index.html）
   * url.parse方法，解析請求的url，解決連結"\"和"/"的差異問題。
   * 解析後的request.url是個物件。
   */
  const pathObj = url.parse(request.url, true);

  // 如果沒有後綴，預設顯示 index.html
  if (pathObj.pathname == "/") pathObj.pathname += "index.html";

  /**
   * 從解析後的物件中獲取到pathname(這裡pathObj.pathname是/index.html)
   * path.join方法，拼接完整專案目錄地址。
   */
  const filePath = path.join(staticPath, pathObj.pathname);
  /**
   * fileContent拼接後的專案目錄名字（這裡是 D:\Git\……\view\index.html）
   * fs.readFile 方法，非同步讀取檔案資料
   * 讀取拼接完整後的目錄中的檔案， 'binary'表示二進位制方式讀取
   */
  fs.readFile(filePath, "binary", (err, fileContent) => {
    if (err) {
      response.writeHead(404, "Not Found");
      response.end("<h1>404 Not Found</h1>");
    } else {
      response.writeHead(200, "OK");
      response.write(fileContent, "binary");
      response.end();
    }
  });

  /**
   * fileContent拼接後的專案目錄名字（這裡是 D:\Git\……\view\index.html）
   * fs.readFileSync方法，同步讀取檔案資訊
   * 讀取拼接完整後的目錄中的檔案， 'binary'表示二進位制方式讀取
   */
  const fileContent = fs.readFileSync(filePath, "binary");
  response.write(fileContent, "binary");
  response.end();
});
// 指定伺服器埠號，開啟地址時，伺服器會接收資料，並且響應資料
server.listen(PORT, (err) => {
  if (err) {
    console.log("ERRPR:", err);
    throw err;
  }
  console.log(`伺服器已啟動: ${HOST}:${PORT}`);
});
```

# 返回 HTML 版

```js
/**
 * run.js 使用: $ node run 啟動，點選url
 */
const fs = require("fs"); // 檔案系統
const http = require("http"); // HTTP
const path = require("path"); // 路徑

const HOST = "http://localhost"; // http://127.0.0.1
const POST = 1111; // 埠號

const FAVICON = path.join(__dirname, "asset", "favicon.ico");

// 多用途網際網路郵件擴充套件型別 用於寫入響應頭
const MIMETYPE = {
  css: "text/css",
  html: "text/html",
  ico: "image/x-icon",
  jpg: "image/jpeg",
  png: "image/png",
  js: "text/javascript",
  json: "application/json",
  ttf: "application/x-font-ttf",
  txt: "text/plain",
  // 以下暫未用到
  // 'gif': 'image/gif',
  // 'jpeg': 'image/jpeg',
  // 'webp': 'image/webp',
  // 'pdf': 'application/pdf',
  // 'svg': 'image/svg+xml',
  // 'swf': 'application/x-shockwave-flash',
  // 'woff': 'application/font-woff',
  // 'woff2': 'application/font-woff2',
  // 'eot': 'application/vnd.ms-fontobject',
  // 'wav': 'audio/x-wav',
  // 'mp3': 'audio/mpeg3',
  // 'mp4': 'video/mp4',
  // 'xml': 'text/xml'
};

/**
 *  建立一個服務
 * request： 請求變數 ，客戶端請求伺服器
 * response： 響應變數，伺服器響應客戶端
 */
const server = http.createServer((request, response) => {
  // 檔案路徑 輸出 index.html  以及 ./xxx/xxx/xxx
  let fileURL = request.url === "/" ? "index.html" : "." + request.url;
  // 判斷檔案是否存在
  if (fs.existsSync(fileURL)) {
    // path.extname  返回 path 的副檔名 ，沒有則返回空字串  // 返回 .js .html
    let ext = path.extname(fileURL).slice(1); // 得到 檔案字尾名，去掉點,用來判斷用哪個響應頭
    // 讀取檔案 返回 path(檔名或檔案描述符) 的內容
    let file = fs.readFileSync(fileURL);
    let contentType = MIMETYPE[ext] || "text/plain"; // 獲取內容型別,用於寫入響應頭
    // 向請求傳送響應頭
    response.writeHead(200, {
      "Content-Type": contentType,
    });
    // if (request.url == "/favicon.ico") continue; // 跳過載入 favicon.ico
    response.write(file); // 寫入響應變數中
    response.end(); // 結束讀寫操作
  }
  // 如果是找不到的頁面，跳轉到404
  else {
    let errorHTML = fs.readFileSync("./src/404.html");
    response.writeHead(404, {
      "Content-Type": "text/html",
    });
    response.write(errorHTML);
    response.end(); // 結束讀寫操作
  }
});

server.listen(POST, (err) => {
  if (err) {
    console.log("ERRPR:", err);
    throw err;
  }
  console.log(`伺服器已啟動，埠號為:${POST}  ${HOST}:${POST}`);
});
```

# 搭建本地伺服器 簡易版

```js
const http = require("http"); // http模組
const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 埠號

/**
 * http模組提供了createServer函式,這個函式會返回一個物件，將返回的物件賦值給server。
 * request:接收到的資料
 * response:響應資料
 */
const server = http.createServer((request, response) => {
  //設定響應的頭部。狀態值 content-Type 響應資料內容的型別
  response.writeHead(200, {
    "Content-Type": "text-plain; charset=utf-8",
  });
  // response.write("寫入響應的內容"); // 響應內容 ,當啟動伺服器後，該內容寫入頁面上
  response.end("寫入響應的內容"); // 寫在這裡也行，效果同上
});
// 指定伺服器埠號，開啟地址時，伺服器會接收資料，並且響應資料
server.listen(PORT, (err) => {
  if (err) {
    console.log("ERRPR:", err);
    throw err;
  }
  console.log(`伺服器已啟動: ${HOST}:${PORT}`);
});
```

---

一個基於 Chrome V8 引擎的 JavaScript 執行環境。Node.js 使用了一個事件驅動、非阻塞式 I/O 的模型，使其輕量又高效。

Node 支援 WebAssembly

## 最佳化角色獲取建立等請求操作，帶路由方式

```js
// api/role.js
/** 角色相關 API */

const fs = require("fs");
// JSON檔案路徑
const fileJSON = "D:/Git/Lokavit/Satya/Concept/role/roleback.json";

const roleAPI = {
  /**
   * 建立欄位為 '/create'的方法
   * 用於稍後處理POST方式提交過來的資料，後續操作亦在內中
   * 此處只寫函式名，具體實現羅列在下方。
   */
  "/create": createRole,
  "/getrole": getRoles,
  "/getroleinfo": getRoleInfo,
};

/** 獲取角色列表 */
function getRoles(request, response) {
  // 讀取JSON
  fs.readFile(fileJSON, (error, buffer) => {
    const roles = JSON.parse(buffer.toString());
    // 寫入響應頭
    response.writeHead(200, {
      // 內容型別: 指定字元編碼，防止亂碼
      "Content-Type": "text/plain;charset=utf-8",
    });
    // 把讀取到的JSON檔案內容寫入響應。必須轉換
    response.write(JSON.stringify(roles));
    response.end();
  });
}

/** 獲取指定角色資訊詳情 */
function getRoleInfo(request, response) {
  console.log("請求攜帶的引數 query:", request.query);
  /** 讀取JSON
   * 引數一：讀取的檔案路徑
   * 引數二：回撥函式。其中引數一為error物件(為null表示成功)，引數二為資料(可為<string>|<Buffer>)
   */
  // fs.readFile(`./${request.url}`, (error, buffer) => {
  fs.readFile(fileJSON, (error, buffer) => {
    const roles = JSON.parse(buffer.toString());
    const temp = roles.find((item) => item.name == request.query.rolename);
    console.log("TEMP:", temp);

    // 寫入響應頭
    response.writeHead(200, {
      // 內容型別: 指定字元編碼，防止亂碼
      "Content-Type": "text/plain;charset=utf-8",
    });

    if (!temp) {
      response.write(
        JSON.stringify({
          msg: "輸入有誤",
        })
      );
      response.end();
    } else {
      // 向前端返回資料，該方法可呼叫多次，返回的資料會被拼接到一起
      // 把讀取到的JSON檔案內容寫入響應。必須轉換
      response.write(JSON.stringify(temp));
      response.end();
    }
  });
}

/** 建立新角色 */
function createRole(request, response, data) {
  //  讀取JSON
  fs.readFile(fileJSON, (error, buffer) => {
    const roles = JSON.parse(buffer.toString());
    // 從讀取的JSON中，遍歷判斷是否有重複名字的物件
    const nameIndex = roles.findIndex((item) => {
      return data.name === item.name;
    });
    if (nameIndex > 0) {
      // 寫入響應頭
      response.writeHead(200, {
        // 內容型別: 指定字元編碼，防止亂碼
        "Content-Type": "text/plain;charset=utf-8",
      });
      // 把讀取到的JSON檔案內容寫入響應。必須轉換
      response.write(
        JSON.stringify({
          msg: "角色名重複",
        })
      );
      response.end();
    } else {
      roles.push(data); // 前臺來的資料，加到 資料集中,用於寫入JSON檔案
      /**
       * 向檔案寫入資訊，若檔案不存在，則自動建立。 把JSON以字串形式寫入
       * 引數一：寫入的檔案路徑
       * 引數二：寫入內容(可為<string> | <Buffer> | <TypedArray> | <DataView>)
       * 引數三：回撥函式，傳入資料為error物件，其為null表示成功。
       */
      fs.writeFile(fileJSON, JSON.stringify(roles), () => {
        // 寫入響應頭
        response.writeHead(200, {
          // 內容型別: 指定字元編碼，防止亂碼
          "Content-Type": "text/plain;charset=utf-8",
          // 允許跨域
          "Access-Control-Allow-Origin": "http://localhost:1111",
        });
        // 把讀取到的JSON檔案內容寫入響應。必須轉換
        response.write(
          JSON.stringify({
            msg: "寫入成功",
          })
        );
        console.log(`檔案寫入成功`);
        response.end();
      });
    }
  });
  console.log("建立角色：！！！！ data:", data);
}

module.exports = {
  roleAPI,
};
```

```js
// api/routes.js
/**
 * 路由表 API
 * 解構所有模組 API
 */
const { roleAPI } = require("./role");

const routes = {
  ...roleAPI,
};

module.exports = {
  routes,
};
```

```js
// router.js
// 路由表
const fs = require("fs");
const urlParse = require("url").parse;
const { routes } = require("./api/routes"); // 路由表 API

/**
 * 路由表函式
 * @param {*} request 請求體
 * @param {*} response 響應體
 */
function route(request, response) {
  // 在 request物件中，可以獲取請求URL，透過URL判斷請求的資源
  console.log(`請求方式:${request.method},請求的URL:${request.url}`); // URL:/
  // 使用url.parse解析get資料
  let { pathname, query } = urlParse(request.url, true);
  // 輸出結果為：/getrole  QUERY: [Object: null prototype] {}
  console.log(`路由表中引數:${pathname}`, "QUERY:", query);

  /**
   *  如果有，路由表API物件中，pathname屬性
   */
  if (routes[pathname]) {
    // 如果是 POST 請求
    if (request.method == "POST") {
      // request 的監聽方法 data事件 ,
      let bufferArray = []; // 用於儲存data事件獲取的Buffer資料
      request.on("data", (buffer) => {
        bufferArray.push(buffer); // 將buffer資料儲存在資料中
      });
      // 等到資料接收完之後，end 事件觸發
      request.on("end", () => {
        // Buffer 類是一個全域性變數，使用時無需 require('buffer').Buffer。
        // Buffer.concat方法用於合併Buffer陣列。
        let buffer = Buffer.concat(bufferArray);
        // 已知Buffer資料只是字串，則可以直接用toString將其轉換成字串。
        postData = JSON.parse(buffer.toString());
        // 執行 routes(路由表API)中， 當前 pathname的函式,並將所有引數傳過去
        routes[pathname](request, response, postData);
      });
    }
    // 如果是 POST 請求
    if (request.method == "GET") {
      request.query = query; // 請求攜帶的引數。
      console.log("GET請求，引數:", request.query);
      // 執行 routes(路由表API)中， 當前 pathname的函式,並將所有引數傳過去
      routes[pathname](request, response);
    }
  }

  // GET / 返回 index.html主頁面內容
  if (pathname == "/") {
    pathname += "index.html"; // 指向 index.html
    fs.readFile(`.${pathname}`, (error, buffer) => {
      if (error) response.writeHead(400);
      // 向前端返回資料，該方法可呼叫多次，返回的資料會被拼接到一起
      else response.write(buffer);
      // 注：必須呼叫該方法結束請求，否則前端一直處於等待狀態，亦可向前端返回資料
      response.end();
    });
  }
}

module.exports = {
  route,
};
```

```js
// Server.js
const http = require("http"); // 內建 http模組
// const childProcess = require('child_process'); // 內建模組，用於設定預設瀏覽器開啟URL

const HOST = "localhost"; // 域
const PORT = "1111"; // 埠號

/** 啟動伺服器 */
function start(route) {
  /**
   * 建立一個伺服器
   * @param {*} request 請求體
   * @param {*} response 響應體
   */
  function onRequest(request, response) {
    /**
     * 路由函式 (請求體，響應體)
     * 該函式為 router.js模組中函式
     */
    route(request, response);
  }
  /**
   * 建立一個伺服器
   * onRequest: 上一步的函式
   */
  http
    .createServer(onRequest)
    // 開啟監聽
    .listen(PORT, () => {
      console.log(`伺服器啟動成功:${HOST}:${PORT}`);
      // 使用預設瀏覽器開啟
      // childProcess.exec(`start http://${HOST}:${PORT}/`);
    });
}

module.exports = {
  start,
};
```

```js
// index.js
// 主檔案。啟動伺服器
const server = require("./server");
const router = require("./router");

server.start(router.route);
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>頁面觸發GET角色，GET指定角色，POST新建角色</title>
  </head>

  <body>
    名字：<input type="text" name="name" id="name" /><br />
    資訊：<input type="text" name="info" id="info" /><br />
    <input type="button" value="新增" id="create" />
    <input type="button" value="獲取" id="getrole" />
    <input type="button" value="獲取單個角色" id="getroleinfo" />

    <p id="roles"></p>
    <p id="roles_info"></p>

    <script>
      // 獲取單個角色
      document
        .querySelector("#getroleinfo")
        .addEventListener("click", async function () {
          let name = "satya";
          const response = await fetch(`/getrole/${name}`);
          const result = await response.json();
          console.log("單個角色資訊：", result);
          // 獲取單個角色資訊， 將其顯示在 p標籤區域
          let roleShow = document.querySelector("#roles_info");
          roleShow.innerHTML = JSON.stringify(result);
        });
      // 獲取所有角色資訊
      document
        .querySelector("#getrole")
        .addEventListener("click", async function () {
          // const response = await fetch(`/getrole?name=${document.querySelector('#name').value}&info=${document.querySelector('#info').value}`)
          // 獲取當前所有角色
          const response = await fetch(`/getrole`);
          const result = await response.json();

          // 測試獲取角色資訊， 將其顯示在 p標籤區域
          let roleShow = document.querySelector("#roles");
          roleShow.innerHTML = JSON.stringify(result);
          console.log(result);
        });
      // 登入
      document
        .querySelector("#create")
        .addEventListener("click", async function () {
          const response = await fetch(`/create`, {
            method: "POST",
            body: JSON.stringify({
              name: document.querySelector("#name").value,
              info: document.querySelector("#info").value,
            }),
          });
          const result = await response.json();
          console.log(result);
          alert(result.msg);
        });
    </script>
  </body>
</html>
```

## nodejs 讀取本地檔案

```js
/** requestHandlers.js */
// 處理HTTP請求
const querystring = require("querystring"); // 處理URL中的查詢字串
const fs = require("fs");

function getText(response) {
  var text = "輸出text";
  console.log(text);
  response.writeHead(200, {
    "Content-Type": "text/plain;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  });
  response.write(text);
  response.end();
}

function getImage(response) {
  console.log("getImage");
  // fs.readFile("./images/avatar.jpg", "binary", function(error, file) {
  //"../../Book/avatar.jpg"
  fs.readFile("D:/Book/avatar.jpg", "binary", function (error, file) {
    if (error) {
      response.writeHead(500, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-Type": "image/jpg",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(file, "binary");
      response.end();
    }
  });
}

function getBigImage(response) {
  console.log("getBigImage");
  fs.readFile("D:/Book/jfd.jpg", "binary", function (error, file) {
    if (error) {
      response.writeHead(500, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-Type": "image/jpg",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(file, "binary");
      response.end();
    }
  });
}

// 後追加 獲取JSON檔案
function getJSON(response) {
  console.log("getJSON");
  // fs.readFile("./images/avatar.jpg", "binary", function(error, file) {
  //"../../Book/avatar.jpg" "D:/Book/avatar.jpg"
  fs.readFile(
    "D:/Git/Lokavit/Satya/Concept/role/roleback.json",
    "binary",
    function (error, file) {
      if (error) {
        response.writeHead(500, {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
        });
        response.write(error + "\n");
        response.end();
      } else {
        response.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        response.write(file, "binary");
        response.end();
      }
    }
  );
}

function get(query, response) {
  console.log("query: " + query);
  var queryObj = querystring.parse(query);
  for (key in queryObj) {
    console.log("key: " + key + ", value: " + queryObj[key]);
  }
  var type = queryObj["type"];
  switch (type) {
    case "text":
      getText(response);
      break;

    case "image":
      getImage(response);
      break;

    case "bigimage":
      getBigImage(response);
      break;
    case "json":
      getJSON(response);
      break;

    default:
      var text = "type " + type + " is unknown.";
      console.log(text);
      response.writeHead(200, {
        "Content-Type": "text/plain",
      });
      response.write(text);
      response.end();
      break;
  }
}

function hello(query, response) {
  console.log("Hello World");
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });
  response.write("Hello World");
  response.end();
}

exports.get = get;
exports.hello = hello;

/** router.js */
// 將HTTP請求轉發給處理函式(requestHandlers.js)
function route(pathname, request, handle, response) {
  console.log("route for " + pathname);
  if (typeof handle[pathname] === "function") {
    handle[pathname](request, response);
  } else {
    console.log(`未找到請求處理程式:${pathname}`);
    response.writeHead(404, {
      "Content-Type": "text/plain",
    });
    response.write("404 not found");
    response.end();
  }
}

exports.route = route;

/** server.js */
// 建立HTTP伺服器
const http = require("http");
const url = require("url");

const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 埠號

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    // console.log("Request for " + pathname + " received." + " query: " + query);
    console.log(`請求:${pathname}已收到,query為${query}。`);

    route(pathname, query, handle, response);
  }

  http.createServer(onRequest).listen(PORT, (err) => {
    if (err) {
      console.log("ERRPR:", err);
      throw err;
    }
    console.log(`伺服器已啟動: ${HOST}:${PORT}`);
  });
  console.log("Server has started.");
}

exports.start = start;

/** index.js */
// 伺服器主檔案
const server = require("./server");
const router = require("./router");
const requestHandlers = require("./requestHandlers");

const handle = {};
handle["/"] = requestHandlers.hello;
handle["/get"] = requestHandlers.get;

server.start(router.route, handle);
```

## Stream 流

- 解決 File System 模組佔用那次及資源使用效率低的問題

```js
const fs = require("fs"); // 內建 檔案系統
// 建立一個可讀流
const readStream = fs.createReadStream("./temp.txt");
// 建立一個可寫流
const writeStream = fs.createWriteStream("./temp2.txt");
// 將可讀流讀取的資料，透過管道pipe推送到寫入流中，即temp.txt=>temp2.txt
readStream.pipe(writeStream);
// 讀取出現錯誤，觸發error事件
readStream.on("error", (error) => {
  console.error(error);
});
// 寫入完成時，觸發finish事件
writeStream.on("finish", () => {
  console.log("finish 寫入完成");
});
```

#### 使用 Zlib 壓縮檔案

```js
const fs = require("fs"); // 內建 檔案系統
const zlib = require("zlib"); // 內建 壓縮檔案
// 建立一個可讀流
const readStream = fs.createReadStream("./zl.jpg");
// 建立一個可寫流
const writeStream = fs.createWriteStream("./zl.jpg.gz");
// 建立一個Gzip物件，用於將檔案壓縮從.gz檔案
const gzip = zlib.createGzip();
// 將可讀流讀取的資料，透過管道pipe推送到gzip中，再推入到寫入流中。
// 即，先壓縮可讀流資料，再推送到可寫流
readStream.pipe(gzip).pipe(writeStream);
// 讀取出現錯誤，觸發error事件
readStream.on("error", (error) => {
  console.error(error);
});
// 寫入完成時，觸發finish事件
writeStream.on("finish", () => {
  console.log("finish 寫入完成");
});
```

## Ajax 跨域處理

- 在實際專案中，不可以簡單地設定 res.setHeader('Access-Control-Allow-Origin', '\*')，而是要透過 req.headers.origin 判斷髮起請求的域名是否合法，再設定 Access-Control-Allow-Origin 屬性，以免出現安全問題。

## url

- 用於對 URL 的解析，常用的是 url.parse 方法。

```js
const url = require("url");
const str = "http://localhost:8080/a/b?x=1&y=2&y=3&y=4";
console.log(url.parse(str)); // 可以看到url的資訊如埠號、域名、query引數等都被解析出來了。
// 如需將query引數轉為物件，則可以為url.parse函式的第二個引數傳true，
// 如console.log(url.parse(str, true))
// 輸出：query: [Object: null prototype] { x: '1', y: [ '2', '3', '4' ] },

// 透過建構函式URL，建立一個例項，其中帶有解析後的資料。
const { URL } = require("url");
const urlObj = new URL(str);
console.log(urlObj);
console.log(urlObj.toString()); // 例項有一個toString方法，可以將例項解析為字串url。
```

## path 路徑

- 主要用來對檔案路徑進行處理，比如提取路徑、字尾，拼接路徑等。

```js
const path = require("path");
const str = "/root/a/b/1.txt";
console.log(path.dirname(str)); // 獲取檔案目錄：/root/a/b
console.log(path.basename(str)); // 獲取檔名：1.txt
console.log(path.extname(str)); // 獲取檔案字尾：.txt
// path.resolve方法，它可以接收任意個引數，然後根據每個路徑引數之間的關係，將路徑最終解析為一個絕對路徑。
console.log(path.resolve(str, "../c", "build", "strict")); // 將路徑解析為絕對路徑：C:\root\a\b\c\build\strict
console.log(path.resolve(str, "../c", "build", "strict", "../..", "assets")); // 將路徑解析為絕對路徑：C:\root\a\b\c\assets
// __dirname指的是當前模組所在的絕對路徑名稱，它的值會自動根據當前的絕對路徑變化，等同於path.dirname(__dilename)的結果。
console.log(path.resolve(__dirname, "build")); // 將路徑解析為絕對路徑：C:\projects\nodejs-tutorial\lesson12\build
```

## querystring 解析和格式化 URL 查詢字串

```js
// querystring用來對url中的query字串進行解析，常用的方法有querystring.parse和querystring.stringify。
const querystring = require("querystring");
/**
 * querystring.parse方法用於解析URL 查詢字串。
 * 解析結果為： { foo: 'bar', abc: [ 'xyz', '123' ] }
 */
console.log(querystring.parse("foo=bar&abc=xyz&abc=123"));
/**
 * querystring.stringify用於將物件轉換為URL查詢字串。
 * 解析結果為: foo=bar&baz=qux&baz=quux&corge=
 */
console.log(
  querystring.stringify({ foo: "bar", baz: ["qux", "quux"], corge: "" })
);
```

### 處理接受到的 GETorPOST 資料

- GET:獲取資料。資料放在 HTTP 請求 Header 中，透過 URL 進行傳遞
- POST:傳送資料。資料放在 HTTP 請求 body 中，容量大。
- Nodejs 自帶的 url 和 querystring 模組處理接收到的 GET 資料
- 透過 request 的 data 事件獲取每次傳輸的資料，在 end 事件呼叫時處理所有獲取的資料

```js 頁面觸發GET獲取角色及指定角色資訊，POST新增角色
const http = require("http"); // 內建 http模組

const HOST = "localhost"; // 域
const PORT = "1111"; // 埠號

const fs = require("fs"); // 內建 檔案系統
// 解析和格式化 URL 查詢字串
const querystring = require("querystring");
const url = require("url");

// JSON檔案路徑
const fileJSON = "D:/Git/Lokavit/Satya/Concept/role/roleback.json";

/**
 * 建立一個伺服器
 * requset:請求體
 * response:響應體
 */
const server = http.createServer((request, response) => {
  // 在 request物件中，可以獲取請求URL，透過URL判斷請求的資源
  console.log(`請求的URL:${request.url}`); // URL:/
  console.log("請求方式：", request.method); // GET
  let path = ""; // 路徑
  let postData = {}; // 儲存 處理接收到的POST資料

  if (request.method == "POST") {
    console.log("POST請求");
    path = request.url;
    let bufferArray = []; // 用於儲存data事件獲取的Buffer資料
    request.on("data", (buffer) => {
      bufferArray.push(buffer); // 將buffer資料儲存在資料中
    });
    // 注：必須呼叫該方法結束請求，否則前端一直處於等待狀態，亦可向前端返回資料
    request.on("end", () => {
      // Buffer 類是一個全域性變數，使用時無需 require('buffer').Buffer。
      // Buffer.concat方法用於合併Buffer陣列。
      let buffer = Buffer.concat(bufferArray);
      // 已知Buffer資料只是字串，則可以直接用toString將其轉換成字串。
      postData = JSON.parse(buffer.toString());
      console.log("處理接受到的POST資料:", postData);
    });
  }

  if (request.method == "GET") {
    console.log("GET請求");
    // 使用url.parse解析get資料
    const { pathname, query } = url.parse(request.url, true);
    path = pathname;
    get = query;
    if (path == "/") {
      console.log("非 /create");
      path += "index.html"; // 指向 index.html
      fs.readFile(`.${path}`, (error, data) => {
        if (error) response.writeHead(400);
        // 向前端返回資料，該方法可呼叫多次，返回的資料會被拼接到一起
        else response.write(data);
        // 注：必須呼叫該方法結束請求，否則前端一直處於等待狀態，亦可向前端返回資料
        response.end();
      });
    }
  }

  // 獲取單個角色資訊
  if (path == "/getrole/satya") {
    console.log("獲取單個角色資訊 PATH:", path);

    /** 讀取JSON
     * 引數一：讀取的檔案路徑
     * 引數二：回撥函式。其中引數一為error物件(為null表示成功)，引數二為資料(可為<string>|<Buffer>)
     */
    // fs.readFile(`./${request.url}`, (error, data) => {
    fs.readFile(fileJSON, (error, data) => {
      if (error) {
        // 若讀取錯誤，則向前端返回404狀態碼，以及內容 Not Found
        response.writeHead(404);
        response.write("Not Found");
        console.log(`檔案讀取失敗:${error}`);
        // 注：必須呼叫該方法結束請求，否則前端一直處於等待狀態，亦可向前端返回資料
        response.end();
      } else {
        const roles = JSON.parse(data.toString());
        console.log("讀取JSON的資料結果：", roles);

        const temp = roles.find((item) => item.name == "satya");
        console.log("TEMP:", temp);

        // 寫入響應頭
        response.writeHead(200, {
          // 內容型別: 指定字元編碼，防止亂碼
          "Content-Type": "text/plain;charset=utf-8",
        });
        // 向前端返回資料，該方法可呼叫多次，返回的資料會被拼接到一起
        // 把讀取到的JSON檔案內容寫入響應。必須轉換
        response.write(JSON.stringify(temp));
        response.end();
      }
    });
  }

  // 獲取角色資料集
  if (path == "/getrole") {
    console.log("獲取所有角色,PATH：", path);
    // 讀取JSON
    fs.readFile(fileJSON, (error, data) => {
      if (error) {
        // 若讀取錯誤，則向前端返回404狀態碼，以及內容 Not Found
        response.writeHead(404);
        response.write("Not Found");
        console.log(`檔案讀取失敗:${error}`);
        response.end();
      } else {
        const roles = JSON.parse(data.toString());
        console.log("讀取JSON的資料結果：", roles);
        // 寫入響應頭
        response.writeHead(200, {
          // 內容型別: 指定字元編碼，防止亂碼
          "Content-Type": "text/plain;charset=utf-8",
        });
        // 把讀取到的JSON檔案內容寫入響應。必須轉換
        response.write(JSON.stringify(roles));
        response.end();
      }
    });
  }

  // 建立角色 POST提交過來
  if (path == "/create") {
    console.log("PATH:", path);

    // 讀取JSON
    fs.readFile(fileJSON, (error, data) => {
      if (error) {
        // 若讀取錯誤，則向前端返回404狀態碼，以及內容 Not Found
        response.writeHead(404);
        response.write("Not Found");
        console.log(`檔案讀取失敗:${error}`);
        response.end();
      } else {
        const roles = JSON.parse(data.toString());
        console.log("讀取JSON的資料結果：", roles);

        // 從讀取的JSON中，遍歷判斷是否有重複名字的物件
        const nameIndex = roles.findIndex((item) => {
          return postData.name === item.name;
        });
        if (nameIndex > 0) {
          // 寫入響應頭
          response.writeHead(200, {
            // 內容型別: 指定字元編碼，防止亂碼
            "Content-Type": "text/plain;charset=utf-8",
          });
          // 把讀取到的JSON檔案內容寫入響應。必須轉換
          response.write(
            JSON.stringify({
              msg: "角色名重複",
            })
          );
          response.end();
        } else {
          roles.push(postData); // 前臺來的資料，加到 資料集中,用於寫入JSON檔案
          /**
           * 向檔案寫入資訊，若檔案不存在，則自動建立。 把JSON以字串形式寫入
           * 引數一：寫入的檔案路徑
           * 引數二：寫入內容(可為<string> | <Buffer> | <TypedArray> | <DataView>)
           * 引數三：回撥函式，傳入資料為error物件，其為null表示成功。
           */
          fs.writeFile(fileJSON, JSON.stringify(roles), (error) => {
            if (error) {
              response.writeHead(404);
              response.write("Not Found");
              console.log(`檔案寫入失敗:${error}`);
              response.end();
            } else {
              // 寫入響應頭
              response.writeHead(200, {
                // 內容型別: 指定字元編碼，防止亂碼
                "Content-Type": "text/plain;charset=utf-8",
              });
              // 把讀取到的JSON檔案內容寫入響應。必須轉換
              response.write(
                JSON.stringify({
                  msg: "寫入成功",
                })
              );
              console.log(`檔案寫入成功`);
              response.end();
            }
          });
        }
      }
    });
  }
});

// 開啟監聽
server.listen(PORT, () => {
  console.log(`伺服器啟動成功:${HOST}:${PORT}`);
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>頁面觸發GET角色，GET指定角色，POST新建角色</title>
  </head>

  <body>
    名字：<input type="text" name="name" id="name" /><br />
    資訊：<input type="text" name="info" id="info" /><br />
    <input type="button" value="新增" id="create" />
    <input type="button" value="獲取" id="getrole" />
    <input type="button" value="獲取單個角色" id="getroleinfo" />

    <p id="roles"></p>
    <p id="roles_info"></p>

    <script>
      // 獲取單個角色
      document
        .querySelector("#getroleinfo")
        .addEventListener("click", async function () {
          let name = "satya";
          const response = await fetch(`/getrole/${name}`);
          const result = await response.json();
          console.log("單個角色資訊：", result);
          // 獲取單個角色資訊， 將其顯示在 p標籤區域
          let roleShow = document.querySelector("#roles_info");
          roleShow.innerHTML = JSON.stringify(result);
        });
      // 獲取所有角色資訊
      document
        .querySelector("#getrole")
        .addEventListener("click", async function () {
          // const response = await fetch(`/getrole?name=${document.querySelector('#name').value}&info=${document.querySelector('#info').value}`)
          // 獲取當前所有角色
          const response = await fetch(`/getrole`);
          const result = await response.json();

          // 測試獲取角色資訊， 將其顯示在 p標籤區域
          let roleShow = document.querySelector("#roles");
          roleShow.innerHTML = JSON.stringify(result);
          console.log(result);
        });
      // 登入
      document
        .querySelector("#create")
        .addEventListener("click", async function () {
          const response = await fetch(`/create`, {
            method: "POST",
            body: JSON.stringify({
              name: document.querySelector("#name").value,
              info: document.querySelector("#info").value,
            }),
          });
          const result = await response.json();
          console.log(result);
          alert(result.msg);
        });
    </script>
  </body>
</html>
```

> #### 伺服器需具備的基本功能
>
> - 響應請求。根據客戶端請求做出回應，如返回靜態檔案
> - 資料互動。定義介面，客戶端根據介面，與服務端進行資料互動。
> - - 如:在購物流程中，客戶端向服務端請求商品資料，展現給客戶，客戶購買時，客戶端將購買的商品資訊傳送給服務端處理。
> - 資料庫。對資料庫中儲存的資料進行讀寫操作。

### http 和 fs 讀取寫入指定 JSON 檔案

```js
const http = require("http"); // 內建 http模組

const HOST = "localhost"; // 域
const PORT = "1111"; // 埠號

const fs = require("fs"); // 內建 檔案系統

// 待寫入資料
let newRole = {
  name: "Satya",
  info: "詳情",
};

// JSON檔案路徑
const fileJSON = "D:/Git/Lokavit/Satya/Concept/role/roleback.json";

/**
 * 建立一個伺服器
 * requset:請求體
 * response:響應體
 */
const server = http.createServer((request, response) => {
  // 讀取JSON
  fs.readFile(fileJSON, (error, data) => {
    if (error) {
      // 若讀取錯誤，則向前端返回404狀態碼，以及內容 Not Found
      response.writeHead(404);
      response.write("Not Found");
      console.log(`檔案讀取失敗:${error}`);
      response.end();
    } else {
      const roles = JSON.parse(data.toString());
      console.log("讀取JSON的資料結果：", roles);
      // // 寫入響應頭
      // response.writeHead(200, {
      //     // 內容型別: 指定字元編碼，防止亂碼
      //     'Content-Type': "text/plain;charset=utf-8",
      // })
      // // 把讀取到的JSON檔案內容寫入響應。必須轉換
      // response.write(JSON.stringify(roles));
      // response.end();

      roles.push(newRole);
      // 把JSON以字串形式寫入
      fs.writeFile(fileJSON, JSON.stringify(roles), (error) => {
        if (error) {
          response.writeHead(404);
          response.write("Not Found");
          console.log(`檔案寫入失敗:${error}`);
          response.end();
        } else {
          // 寫入響應頭
          response.writeHead(200, {
            // 內容型別: 指定字元編碼，防止亂碼
            "Content-Type": "text/plain;charset=utf-8",
          });
          response.write(
            JSON.stringify({
              msg: "寫入成功",
            })
          );
          console.log(`檔案寫入成功`);
          response.end();
        }
      });
    }
  });
});

// 開啟監聽
server.listen(PORT, () => {
  console.log(`伺服器啟動成功:${HOST}:${PORT}`);
});
```

### 結合 http 和 fs 實現簡易伺服器

- 建立 index.html。讀取本地指定資料夾中圖片到頁面
- 達到在瀏覽器訪問 1.html;讀取到 01/1.html,由 HTML 檔案發起對 01/zl.jpg 的請求;網頁顯示 HTML 內容和圖片
- **注**:此處讀到的是 1.html 檔案 ，而非 zl.jpg。jpg 由 HTML 檔案自主發起。

```js
const http = require("http"); // 內建 http模組
const fs = require("fs"); // 內建 檔案系統
const HOST = "localhost"; // 域
const PORT = "1111"; // 埠號
/**
 * 建立一個伺服器
 * requset:請求體
 * response:響應體
 */
const server = http.createServer((request, response) => {
  // 在 request物件中，可以獲取請求URL，透過URL判斷請求的資源
  console.log(`請求的URL:${request.url}`);
  /**
   * 引數一：讀取的檔案路徑
   * 引數二：回撥函式。其中引數一為error物件(為null表示成功)，引數二為資料(可為<string>|<Buffer>)
   */
  fs.readFile(`./01${request.url}`, (error, buffer) => {
    if (error) {
      // 若讀取錯誤，則向前端返回404狀態碼，以及內容 Not Found
      response.writeHead(404);
      response.write("Not Found");
      console.log(`檔案讀取失敗:${error}`);
    }
    // 若需要傳輸給瀏覽器可以直接用Buffer,機器之間通訊是直接用Buffer資料。
    else {
      response.write(buffer);
      console.log(`檔案讀取成功`);
    }
    response.end(); // 關閉連結
  });
});

// 開啟監聽
server.listen(PORT, () => {
  console.log(`伺服器啟動成功:${HOST}:${PORT}`);
});
```

### FileSystem 檔案系統

- 非同步檔案讀取 fs.readFile、非同步檔案寫入 fs.writeFile、同步檔案讀取 fs.readFileSync、同步檔案寫入 fs.writeFileSync。由於同步可能造成阻塞，通常使用非同步操作。
- **注**:兩者同在，根據輸出結果可見，先執行讀取，後執行寫入

```js
const fs = require("fs"); // 內建 檔案系統

let text = "被寫入內容"; // 待寫入的內容
/**
 * 向檔案寫入資訊，若檔案不存在，則自動建立。
 * 引數一：寫入的檔案路徑
 * 引數二：寫入內容(可為<string> | <Buffer> | <TypedArray> | <DataView>)
 * 引數三：回撥函式，傳入資料為error物件，其為null表示成功。
 */
fs.writeFile("./temp.txt", text, (error) => {
  if (error) console.log(`檔案寫入失敗:${error}`);
  else console.log(`檔案寫入成功`); // 內中結果為 [object Object]
});

/**
 * 引數一：讀取的檔案路徑
 * 引數二：回撥函式。其中引數一為error物件(為null表示成功)，引數二為資料(可為<string>|<Buffer>)
 */
fs.readFile("./temp.txt", (error, data) => {
  if (error) console.log(`檔案讀取失敗:${error}`);
  // 此處確定讀取的為字串，可直接用toString()將Buffer轉為字串
  // 若需要傳輸給瀏覽器可以直接用Buffer,機器之間通訊是直接用Buffer資料。
  else console.log(`檔案讀取成功`, data.toString());
});
```

### 簡易啟動伺服器

```js
const http = require("http"); // 內建 http模組
const childProcess = require("child_process"); // 內建模組，用於設定預設瀏覽器開啟URL

const HOST = "localhost"; // 域
const PORT = "1111"; // 埠號

/**
 * 建立一個伺服器
 * request:請求體
 * response:響應體
 */
const server = http.createServer((request, response) => {
  console.log(`狀態碼:${response.statusCode}`);
  // 寫入響應頭
  response.writeHead(200, {
    // 內容型別: 指定字元編碼，防止亂碼
    "Content-Type": "text/plain;charset=utf-8",
  });
  // 向前端返回資料，該方法可呼叫多次，返回的資料會被拼接到一起
  response.write("寫入");
  // 注：必須呼叫該方法結束請求，否則前端一直處於等待狀態，亦可向前端返回資料
  response.end("響應內容");
});

// 開啟監聽
server.listen(PORT, () => {
  console.log(`伺服器啟動成功:${HOST}:${PORT}`);
  // 使用預設瀏覽器開啟
  childProcess.exec(`start http://${HOST}:${PORT}/`);
});
```

## 合併 GET 和 POST 獲取資料的方法

```js 改造版

```

```js 基礎版
const http = require("http"); // http模組
const fs = require("fs"); // 檔案系統
const url = require("url"); // url
const path = require("path"); // 路徑

const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 埠號

/**
 * 建立 路由物件 。
 */
const routes = {
  /**
   * 建立欄位為 '/get' 的方法
   * 用於稍後處理GET方式提交過來的資料。後續操作亦在內中
   * 如：傳資料給其他靜態頁面，或把資料儲存到資料庫
   */
  "/get": (request, response) => {
    let name = request.query.name;
    let age = request.query.age;
    //設定響應的頭部。狀態值 content-Type 響應資料內容的型別
    response.writeHead(200, {
      "Content-Type": "text-plain; charset=utf-8",
    });
    response.end(`Name:${name},Age:${age}`);
  },
  /**
   * 建立欄位為 '/post'的方法
   * 用於稍後處理POST方式提交過來的資料，後續操作亦在內中
   * 如：傳資料給其他靜態頁面，或把資料儲存到資料庫
   */
  "/post": (request, response) => {
    let obj = {};
    request.msg.split("&").forEach((item, index) => {
      obj[item.split("=")[0]] = item.split("=")[1];
    });
    response.writeHead(200, {
      "Content-Type": "text-plain; charset=utf-8",
    });
    // response.end(`Name:${obj.name},Age:${obj.age}`);
    response.end(JSON.stringify(obj)); // 寫入響應內容 (該內容輸出在了頁面上)
  },
};

/**
 * http模組提供了createServer函式,這個函式會返回一個物件，將返回的物件賦值給server。
 * request:接收到的資料
 * response:響應資料
 */
const server = http.createServer((request, response) => {
  /**
   * request.url請求的連結（這裡輸出的是/index.html）
   * url.parse方法，解析請求的url，解決連結"\"和"/"的差異問題。
   * 解析後的request.url是個物件。
   */
  const pathObj = url.parse(request.url, true);

  /**
   * 處理路由的程式碼
   * 透過 [pathObj.pathname] 獲取到請求連結的url,
   * 然後再 routes物件中尋找是否存在這個“欄位”,
   */
  const handleFn = routes[pathObj.pathname];
  // 如果有，該欄位方法賦值給handleFn
  if (handleFn) {
    // 透過pathObj.query獲取到從get方式提交過來的資料，並執行該方法
    // 獲取 從GET方式提交過來的資料
    request.query = pathObj.query;

    // 透過 data書簡，獲取到從post方式持續提交過來的資料
    let msg = "";
    // request 的監聽方法 data ,chunk為Buffer
    request
      .on("data", (chunk) => {
        msg += chunk; // 拼接獲取到的後資料
      })
      // 等到資料接收完之後，end 事件觸發
      .on("end", () => {
        // 資料接收完觸發
        request.msg = msg; // MSG:name=Sayta&age=15
        handleFn(request, response);
      });
  } else {
    // 如果找不到欄位，就查詢靜態檔案
    /**
     * __dirname是全域性變數,可以直接獲取。表示當前執行指令碼所在的目錄。（這裡是D:\Git\……）
     * path.join方法，拼接目錄地址
     * staticPath拼接後的目錄地址，為了跳到自己專案所在那個目錄。（這裡是D:\Git\……\view）
     */
    const staticPath = path.join(__dirname, "view");
    // 如果沒有後綴，預設顯示 index.html
    if (pathObj.pathname == "/") pathObj.pathname += "index.html";
    /**
     * 從解析後的物件中獲取到pathname(這裡pathObj.pathname是/index.html)
     * path.join方法，拼接完整專案目錄地址。
     */
    const filePath = path.join(staticPath, pathObj.pathname);
    /**
     * fileContent拼接後的專案目錄名字（這裡是 D:\Git\……\view\index.html）
     * fs.readFile 方法，非同步讀取檔案資料
     * 讀取拼接完整後的目錄中的檔案， 'binary'表示二進位制方式讀取
     */
    fs.readFile(filePath, "binary", (err, fileContent) => {
      if (err) {
        response.writeHead(404, "Not Found");
        response.end("<h1>404 Not Found</h1>");
      } else {
        response.writeHead(200, "OK");
        response.write(fileContent, "binary");
        response.end();
      }
    });
  }
});
// 指定伺服器埠號，開啟地址時，伺服器會接收資料，並且響應資料
server.listen(PORT, (err) => {
  if (err) {
    console.log("ERRPR:", err);
    throw err;
  }
  console.log(`伺服器已啟動: ${HOST}:${PORT}`);
});
```

## 處理前端提交的 POST 請求

```js
const http = require("http"); // http模組
const fs = require("fs"); // 檔案系統
const url = require("url"); // url
const path = require("path"); // 路徑

const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 埠號

/**
 * 建立 路由物件 。
 */
const routes = {
  /**
   * 建立欄位為 '/get' 的方法
   * 用於稍後處理GET方式提交過來的資料。後續操作亦在內中
   * 如：傳資料給其他靜態頁面，或把資料儲存到資料庫
   */
  "/get": (request, response) => {
    //設定響應的頭部。狀態值 content-Type 響應資料內容的型別
    response.writeHead(200, {
      "Content-Type": "text-plain; charset=utf-8",
    });
    let name = request.query.name;
    let age = request.query.age;
    response.end(`Name:${name},Age:${age}`);
  },
  /**
   * 建立欄位為 '/post'的方法
   * 用於稍後處理POST方式提交過來的資料，後續操作亦在內中
   * 如：傳資料給其他靜態頁面，或把資料儲存到資料庫
   */
  "/post": (request, response) => {
    let obj = {};
    request.msg.split("&").forEach((item, index) => {
      obj[item.split("=")[0]] = item.split("=")[1];
    });
    response.writeHead(200, {
      "Content-Type": "text-plain; charset=utf-8",
    });
    response.end(`Name:${obj.name},Age:${obj.age}`);
  },
};

/**
 * http模組提供了createServer函式,這個函式會返回一個物件，將返回的物件賦值給server。
 * request:接收到的資料
 * response:響應資料
 */
const server = http.createServer((request, response) => {
  /**
   * request.url請求的連結（這裡輸出的是/index.html）
   * url.parse方法，解析請求的url，解決連結"\"和"/"的差異問題。
   * 解析後的request.url是個物件。
   */
  const pathObj = url.parse(request.url, true);

  /**
   * 處理路由的程式碼
   * 透過 [pathObj.pathname] 獲取到請求連結的url,
   * 然後再 routes物件中尋找是否存在這個“欄位”,
   */
  const handleFn = routes[pathObj.pathname];
  // 如果有，該欄位方法賦值給handleFn
  if (handleFn) {
    // 透過pathObj.query獲取到從get方式提交過來的資料，並執行該方法
    // // 獲取 從GET方式提交過來的資料
    // request.query = pathObj.query;
    // handleFn(request, response);

    // 透過 data書簡，獲取到從post方式持續提交過來的資料
    let msg = "";
    // request 的監聽方法 data ,chunk為Buffer
    request
      .on("data", (chunk) => {
        msg += chunk; // 拼接獲取到的後資料
      })
      // 等到資料接收完之後，end 事件觸發
      .on("end", () => {
        // 資料接收完觸發
        request.msg = msg; // MSG:name=Sayta&age=15
        handleFn(request, response);
      });
  } else {
    // 如果找不到欄位，就查詢靜態檔案
    /**
     * __dirname是全域性變數,可以直接獲取。表示當前執行指令碼所在的目錄。（這裡是D:\Git\……）
     * path.join方法，拼接目錄地址
     * staticPath拼接後的目錄地址，為了跳到自己專案所在那個目錄。（這裡是D:\Git\……\view）
     */
    const staticPath = path.join(__dirname, "view");
    // 如果沒有後綴，預設顯示 index.html
    if (pathObj.pathname == "/") pathObj.pathname += "index.html";
    /**
     * 從解析後的物件中獲取到pathname(這裡pathObj.pathname是/index.html)
     * path.join方法，拼接完整專案目錄地址。
     */
    const filePath = path.join(staticPath, pathObj.pathname);
    /**
     * fileContent拼接後的專案目錄名字（這裡是 D:\Git\……\view\index.html）
     * fs.readFile 方法，非同步讀取檔案資料
     * 讀取拼接完整後的目錄中的檔案， 'binary'表示二進位制方式讀取
     */
    fs.readFile(filePath, "binary", (err, fileContent) => {
      if (err) {
        response.writeHead(404, "Not Found");
        response.end("<h1>404 Not Found</h1>");
      } else {
        response.writeHead(200, "OK");
        response.write(fileContent, "binary");
        response.end();
      }
    });
  }
});
// 指定伺服器埠號，開啟地址時，伺服器會接收資料，並且響應資料
server.listen(PORT, (err) => {
  if (err) {
    console.log("ERRPR:", err);
    throw err;
  }
  console.log(`伺服器已啟動: ${HOST}:${PORT}`);
});
```

## 處理前端提交的 GET 請求

- 執行伺服器，輸入內容，點選提交，可見效果

```js
const http = require("http"); // http模組
const fs = require("fs"); // 檔案系統
const url = require("url"); // url
const path = require("path"); // 路徑

const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 埠號

/**
 * 建立 路由物件 。
 */
const routes = {
  /**
   * 建立欄位為 '/get' 的方法
   * 用於稍後處理GET方式提交過來的資料。後續操作亦在內中
   * 如：傳資料給其他靜態頁面，或把資料儲存到資料庫
   */
  "/get": (request, response) => {
    //設定響應的頭部。狀態值 content-Type 響應資料內容的型別
    response.writeHead(200, {
      "Content-Type": "text-plain; charset=utf-8",
    });
    let name = request.query.name;
    let age = request.query.age;
    response.end(`Name:${name},Age:${age}`);
  },
};

/**
 * http模組提供了createServer函式,這個函式會返回一個物件，將返回的物件賦值給server。
 * request:接收到的資料
 * response:響應資料
 */
const server = http.createServer((request, response) => {
  /**
   * request.url請求的連結（這裡輸出的是/index.html）
   * url.parse方法，解析請求的url，解決連結"\"和"/"的差異問題。
   * 解析後的request.url是個物件。
   */
  const pathObj = url.parse(request.url, true);

  /**
   * 處理路由的程式碼
   * 透過 [pathObj.pathname] 獲取到請求連結的url,
   * 然後再 routes物件中尋找是否存在這個“欄位”,
   * 如果有，該欄位方法賦值給handleFn
   * 透過pathObj.query獲取到從get方式提交過來的資料，並執行該方法
   */
  const handleFn = routes[pathObj.pathname];
  if (handleFn) {
    // 獲取 從GET方式提交過來的資料
    request.query = pathObj.query;
    handleFn(request, response);
  } else {
    // 如果找不到欄位，就查詢靜態檔案
    /**
     * __dirname是全域性變數,可以直接獲取。表示當前執行指令碼所在的目錄。（這裡是D:\Git\……）
     * path.join方法，拼接目錄地址
     * staticPath拼接後的目錄地址，為了跳到自己專案所在那個目錄。（這裡是D:\Git\……\view）
     */
    const staticPath = path.join(__dirname, "view");
    // 如果沒有後綴，預設顯示 index.html
    if (pathObj.pathname == "/") pathObj.pathname += "index.html";
    /**
     * 從解析後的物件中獲取到pathname(這裡pathObj.pathname是/index.html)
     * path.join方法，拼接完整專案目錄地址。
     */
    const filePath = path.join(staticPath, pathObj.pathname);
    /**
     * fileContent拼接後的專案目錄名字（這裡是 D:\Git\……\view\index.html）
     * fs.readFile 方法，非同步讀取檔案資料
     * 讀取拼接完整後的目錄中的檔案， 'binary'表示二進位制方式讀取
     */
    fs.readFile(filePath, "binary", (err, fileContent) => {
      if (err) {
        response.writeHead(404, "Not Found");
        response.end("<h1>404 Not Found</h1>");
      } else {
        response.writeHead(200, "OK");
        response.write(fileContent, "binary");
        response.end();
      }
    });
  }
});
// 指定伺服器埠號，開啟地址時，伺服器會接收資料，並且響應資料
server.listen(PORT, (err) => {
  if (err) {
    console.log("ERRPR:", err);
    throw err;
  }
  console.log(`伺服器已啟動: ${HOST}:${PORT}`);
});
```
