const fs = require("fs");
const path = require("path");
const marked = require("marked");

// --- 配置部分 ---
const contentSourceDir = process.env.CONTENT_SOURCE_DIR || "anicca-content";
const outputHtmlDir = process.env.OUTPUT_HTML_DIR || "generated_html_output";
const SITE_USERNAME = "Monk"; // 你的 GitHub 用戶名
const CONTENT_REPO_NAME = "Anicca"; // 你的內容倉庫名

// 定義頂層內容分類，用於主索引頁面和遍歷
const topLevelContentCategories = {
  novel: "Novel",
  code: "Code",
  bio: "Bio",
  // pili: "PILI",
};

// 文件名格式化爲網站顯示易讀文章標題。
function formatTitle(fileName, relativeUrlPath) {
  // 將路徑轉化為小寫以進行不區分大小寫的匹配
  const pathLower = relativeUrlPath.toLowerCase();

  // 1. 如果是純數字（如 001, 002），直接返回，保留章節感
  if (/^\d+$/.test(fileName)) {
    if (pathLower.includes("novel")) {
      return `第 ${fileName} 章`;
    }
    if (pathLower.includes("pili")) {
      return `第 ${fileName} 集`;
    }
    return fileName; // 其他目錄下的純數字保持原樣
  }

  // 2. 處理連字符命名 (xxx-bbb -> Xxx Bbb)
  if (fileName.includes("-")) {
    return fileName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // 3. 如果是單個單詞且已經是大寫開頭（如 Algorithm, Android），直接返回
  // 如果是小寫單單詞，則將其首字母大寫
  return fileName.charAt(0).toUpperCase() + fileName.slice(1);
}

// --- HTML 模板函數 ---
function createFullHtmlPage(title, content, relativePathToRoot) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} - ${SITE_USERNAME}'s ${CONTENT_REPO_NAME}</title>
            <link rel="stylesheet" href="${relativePathToRoot}index.css" />
            <style>
              .container {
                padding: 20px 30px;
                border-radius: 8px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
                border: 1px solid #333333;
              }
            </style>
          </head>
          <body>
            <header class="flex items-center justify-between" style="gap: 8px">
              <div>
                <h1 class="hader_site_name">Monk's Personal Site</h1>
                <div class="hader_site_tip">Novel. Coding. Essays. Games</div>
              </div>
              <div class="flex-1"></div>
              <div></div>
            </header>
            <main style="padding-top: 20px">
            <div class="container">
                <p class="back-link"><a href="${relativePathToRoot}index.html">&lt; 返回 Anicca 總索引</a></p>
                <h1>${title}</h1>
                ${content}
            </div>  </main>
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
        const rawName = file.replace(".md", "");
        indexItems.push({
          name: formatTitle(rawName, relativeUrlPath),
          type: "file",
          path: rawName + ".html",
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
    currentDirIndexContent += `<h2>${currentDirTitle} - List</h2>`;
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
  const relativePathToRoot = "../".repeat(depth) + (depth + 1 > 0 ? "" : "./"); // 確保深度為0時是 `./`

  // 將當前目錄的索引頁寫入文件
  fs.writeFileSync(
    path.join(currentOutputPath, "index.html"),
    createFullHtmlPage(
      `${currentDirTitle} Index`,
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
            <link rel="stylesheet" href="../index.css" />
            <style>
              .container {
                padding: 20px 30px;
                border-radius: 8px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
                border: 1px solid #333333;
              }
            </style>
        </head>
        <body>
          <header class="flex items-center justify-between" style="gap: 8px">
            <div>
              <h1 class="hader_site_name">Monk's Personal Site</h1>
              <div class="hader_site_tip">Novel. Code. Bio. Game</div>
            </div>
            <div class="flex-1"></div>
            <div></div>
          </header>
          <main style="padding-top: 20px">
    `;

  // 遍歷頂層分類
  for (const folderName in topLevelContentCategories) {
    const sourcePath = path.join(contentSourceDir, folderName);
    const outputPath = path.join(outputHtmlDir, folderName);
    const relativeUrlPath = folderName; // 相對於根輸出目錄的 URL 路徑

    mainIndexHtmlContent += `<div class="category-section"><a href="${folderName}/index.html"><h2>${topLevelContentCategories[folderName]}</h2></a></div>`;

    // 確保源文件夾存在，否則 processDirectory 會出錯
    if (fs.existsSync(sourcePath) && fs.lstatSync(sourcePath).isDirectory()) {
      await processDirectory(sourcePath, outputPath, relativeUrlPath);
    } else {
      console.warn(`Source directory not found: ${sourcePath}. Skipping.`);
    }
  }

  mainIndexHtmlContent += `
            </div>    </main>
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
