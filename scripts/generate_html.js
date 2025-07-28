const fs = require("fs");
const path = require("path");
const marked = require("marked");

// --- 配置部分 ---
const contentSourceDir = process.env.CONTENT_SOURCE_DIR || "anicca-content";
const outputHtmlDir = process.env.OUTPUT_HTML_DIR || "generated_html_output";
const SITE_USERNAME = "Lokavit"; // 你的 GitHub 用戶名
const CONTENT_REPO_NAME = "Anicca"; // 你的內容倉庫名

// 定義頂層內容分類，用於主索引頁面和遍歷
const topLevelContentCategories = {
  logs: "隨筆",
  novel: "原創小說",
  pili: "霹靂布袋戲",
  tech: "編程遊戲",
};

// --- 主題顏色配置 ---
const themeColors = {
  background: "#121212", // 暗色背景
  textColor: "#E0E0E0", // 正文文字顏色 (淺灰，確保可讀性)
  linkPrimary: "#00CED1", // teal，非正文內容的文字顏色（用於主要鏈接）
  linkSecondary: "#00FFFF", // aqua，非正文內容的文字顏色（用於次要鏈接或懸停效果）
  containerBg: "#1E1E1E", // 容器背景色，比主背景稍亮
  borderColor: "#333333", // 邊框顏色
};

// --- HTML 模板函數 ---
function createFullHtmlPage(title, content, relativePathToRoot) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} - ${SITE_USERNAME}'s ${CONTENT_REPO_NAME}</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 2em;
                    background-color: ${themeColors.background};
                    color: ${themeColors.textColor};
                }
                .container {
                    max-width: 800px;
                    margin: auto;
                    background: ${themeColors.containerBg};
                    padding: 20px 30px;
                    border-radius: 8px;
                    box-shadow: 0 0 15px rgba(0,0,0,0.5);
                    border: 1px solid ${themeColors.borderColor};
                }
                h1, h2, h3, h4, h5, h6 {
                    color: ${themeColors.linkPrimary}; /* 標題使用 teal */
                    border-bottom: 1px solid ${themeColors.borderColor};
                    padding-bottom: 0.3em;
                    margin-top: 1.5em;
                }
                h1 { font-size: 2.2em; }
                h2 { font-size: 1.8em; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 0.5em; }
                a {
                    color: ${themeColors.linkPrimary}; /* 鏈接使用 teal */
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                a:hover {
                    color: ${themeColors.linkSecondary}; /* 懸停時變為 aqua */
                    text-decoration: underline;
                }
                .back-link {
                    display: block;
                    margin-bottom: 1.5em;
                    font-size: 0.9em;
                    color: ${themeColors.linkSecondary}; /* 返回鏈接使用 aqua */
                }
                pre {
                    background-color: #2D2D2D; /* 代碼塊背景 */
                    padding: 1em;
                    border-radius: 4px;
                    overflow-x: auto;
                    color: ${themeColors.textColor};
                    border: 1px solid ${themeColors.borderColor};
                }
                code {
                    font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
                    background-color: #3C3C3C; /* 行內代碼背景 */
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                }
                blockquote {
                    border-left: 4px solid ${themeColors.linkPrimary};
                    margin: 1.5em 0;
                    padding: 0.5em 1em;
                    background-color: #282828;
                    color: ${themeColors.textColor};
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5em 0;
                }
                th, td {
                    border: 1px solid ${themeColors.borderColor};
                    padding: 0.8em;
                    text-align: left;
                }
                th {
                    background-color: #282828;
                    color: ${themeColors.linkPrimary};
                }
            </style>
        </head>
        <body>
            <div class="container">
                <p class="back-link"><a href="${relativePathToRoot}index.html">&lt; 返回 Anicca 總索引</a></p>
                <h1>${title}</h1>
                ${content}
            </div>
        </body>
        </html>
    `;
}

// 遞歸處理目錄的函數
// currentSourcePath: 當前正在處理的源目錄的絕對路徑 (例如 anicca-content/novel/budaixi)
// currentOutputPath: 當前正在生成的輸出目錄的絕對路徑 (例如 generated_html_output/novel/budaixi)
// relativeUrlPath: 從 generated_html_output 到當前文件的相對 URL 路徑 (例如 novel/budaixi/)
async function processDirectory(
  currentSourcePath,
  currentOutputPath,
  relativeUrlPath
) {
  console.log(`Processing directory: ${currentSourcePath}`);
  if (!fs.existsSync(currentOutputPath)) {
    fs.mkdirSync(currentOutputPath, { recursive: true });
  }

  const files = fs.readdirSync(currentSourcePath);
  let docHtmlContent = ""; // 用于收集 _doc.md 的內容
  let indexItems = []; // 用于收集當前目錄下的文件/子目錄列表

  // 第一次遍歷：處理 _doc.md 和收集文件/子目錄信息
  for (const file of files) {
    const filePath = path.join(currentSourcePath, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      indexItems.push({ name: file, type: "dir" });
    } else if (fileStat.isFile() && file.endsWith(".md")) {
      if (file === "_doc.md") {
        docHtmlContent = marked.parse(fs.readFileSync(filePath, "utf8"));
        // _doc.md 代表本目錄的索引，但在列表時不單獨列出
      } else {
        indexItems.push({
          name: file.replace(".md", ""),
          type: "file",
          path: file.replace(".md", ".html"),
        });
      }
    }
  }

  // 生成當前目錄的索引頁 (index.html)
  let currentDirIndexContent = "";
  const currentDirTitle = path.basename(currentSourcePath) || "Content"; // 獲取當前文件夾名作為標題

  if (docHtmlContent) {
    currentDirIndexContent = docHtmlContent; // 如果有 _doc.md，用它的內容作為索引頁主體
  } else {
    // 如果沒有 _doc.md，生成一個默認列表
    currentDirIndexContent += `<h2>${currentDirTitle} - 內容列表</h2>`;
  }

  currentDirIndexContent += `<ul>`;
  // 將子目錄和文件按名稱排序，以便列表更整潔
  indexItems.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );

  for (const item of indexItems) {
    const itemUrl = item.type === "dir" ? `${item.name}/` : item.path;
    currentDirIndexContent += `<li><a href="${itemUrl}">${item.name}</a></li>`;
  }
  currentDirIndexContent += `</ul>`;

  // 計算返回根索引的路徑深度
  const depth = relativeUrlPath.split("/").filter((p) => p !== "").length;
  const relativePathToRoot = "../".repeat(depth) + (depth > 0 ? "" : "./"); // 確保深度為0時是 `./`

  // 將當前目錄的索引頁寫入文件
  fs.writeFileSync(
    path.join(currentOutputPath, "index.html"),
    createFullHtmlPage(
      `${currentDirTitle} 索引`,
      currentDirIndexContent,
      relativePathToRoot
    )
  );
  console.log(
    `Generated directory index: ${path.join(currentOutputPath, "index.html")}`
  );

  // 第二次遍歷：處理文件和遞歸子文件夾
  for (const file of files) {
    const filePath = path.join(currentSourcePath, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      // 遞歸調用處理子文件夾
      await processDirectory(
        filePath,
        path.join(currentOutputPath, file),
        path.join(relativeUrlPath, file)
      );
    } else if (
      fileStat.isFile() &&
      file.endsWith(".md") &&
      file !== "_doc.md"
    ) {
      const markdownContent = fs.readFileSync(filePath, "utf8");
      const htmlContent = marked.parse(markdownContent);

      const outputFileName = file.replace(".md", ".html");
      const outputPath = path.join(currentOutputPath, outputFileName);
      const pageTitle = file.replace(".md", "");

      fs.writeFileSync(
        outputPath,
        createFullHtmlPage(pageTitle, htmlContent, relativePathToRoot)
      );
      console.log(`Generated: ${outputPath}`);
    }
  }
}

// --- 主執行函數 ---
async function generateAllContent() {
  console.log("Starting full content generation...");

  let mainIndexHtmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${SITE_USERNAME}'s ${CONTENT_REPO_NAME} Content</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 2em;
                    background-color: ${themeColors.background};
                    color: ${themeColors.textColor};
                }
                .container {
                    max-width: 800px;
                    margin: auto;
                    background: ${themeColors.containerBg};
                    padding: 20px 30px;
                    border-radius: 8px;
                    box-shadow: 0 0 15px rgba(0,0,0,0.5);
                    border: 1px solid ${themeColors.borderColor};
                }
                h1, h2, h3, h4, h5, h6 {
                    color: ${themeColors.linkPrimary};
                    border-bottom: 1px solid ${themeColors.borderColor};
                    padding-bottom: 0.3em;
                    margin-top: 1.5em;
                }
                h1 { font-size: 2.2em; }
                h2 { font-size: 1.8em; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 0.5em; }
                a {
                    color: ${themeColors.linkPrimary};
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                a:hover {
                    color: ${themeColors.linkSecondary};
                    text-decoration: underline;
                }
                .category-section {
                    margin-bottom: 2em;
                    border-bottom: 1px solid ${themeColors.borderColor};
                    padding-bottom: 1em;
                }
                .category-section:last-child {
                    border-bottom: none;
                }
                p.welcome-text {
                    color: ${themeColors.linkSecondary}; /* 歡迎語使用 aqua */
                    font-style: italic;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>歡迎來到 ${SITE_USERNAME} 的 ${CONTENT_REPO_NAME} 內容檔案</h1>
                <p class="welcome-text">這是我的隨筆、原創小說、霹靂布袋戲整理和編程文章的自動生成索引。</p>
    `;

  // 遍歷頂層分類
  for (const folderName in topLevelContentCategories) {
    const sourcePath = path.join(contentSourceDir, folderName);
    const outputPath = path.join(outputHtmlDir, folderName);
    const relativeUrlPath = folderName; // 相對於根輸出目錄的 URL 路徑

    mainIndexHtmlContent += `<div class="category-section"><h2>${topLevelContentCategories[folderName]}</h2><ul>`;
    mainIndexHtmlContent += `<li><a href="${folderName}/index.html">進入 ${topLevelContentCategories[folderName]} 目錄</a></li>`; // 每個頂層分類都有一個 index.html
    mainIndexHtmlContent += `</ul></div>`;

    // 確保源文件夾存在，否則 processDirectory 會出錯
    if (fs.existsSync(sourcePath) && fs.lstatSync(sourcePath).isDirectory()) {
      await processDirectory(sourcePath, outputPath, relativeUrlPath);
    } else {
      console.warn(`Source directory not found: ${sourcePath}. Skipping.`);
    }
  }

  mainIndexHtmlContent += `
            </div>
        </body>
        </html>
    `;
  fs.writeFileSync(
    path.join(outputHtmlDir, "index.html"),
    mainIndexHtmlContent
  );
  console.log("Finished full content generation.");
}

generateAllContent();
