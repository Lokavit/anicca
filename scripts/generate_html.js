const fs = require("fs");
const path = require("path");
const marked = require("marked"); // Markdown 渲染庫

// 從環境變量獲取目錄路徑
const contentSourceDir = process.env.CONTENT_SOURCE_DIR || "anicca-content";
const outputHtmlDir = process.env.OUTPUT_HTML_DIR || "generated_html_output";

// 定義你的內容文件夾結構
const contentStructure = {
  logs: "随笔",
  novel: "原创小说",
  pili: "布袋戏",
  tech: "编程",
};

// 確保輸出目錄存在
if (!fs.existsSync(outputHtmlDir)) {
  fs.mkdirSync(outputHtmlDir, { recursive: true });
}

async function generateHtmlFiles() {
  console.log("Starting content generation...");
  let indexHtmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Anicca Content Index</title>
            <style>
                body { font-family: sans-serif; line-height: 1.6; margin: 2em; background-color: #f4f4f4; color: #333; }
                .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                h1, h2 { color: #333; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 0.5em; }
                a { color: #007bff; text-decoration: none; }
                a:hover { text-decoration: underline; }
                .category-section { margin-bottom: 2em; border-bottom: 1px solid #eee; padding-bottom: 1em; }
                .category-section:last-child { border-bottom: none; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Lokavit's Anicca Archives</h1>
                <p>This is an automatically generated index of my thoughts, novels, Pili notes, and tech articles.</p>
    `;

  // 遍歷定義的內容結構
  for (const folderName in contentStructure) {
    const folderPath = path.join(contentSourceDir, folderName);
    const categoryTitle = contentStructure[folderName];
    const categoryHtmlDir = path.join(outputHtmlDir, folderName);

    if (!fs.existsSync(categoryHtmlDir)) {
      fs.mkdirSync(categoryHtmlDir, { recursive: true });
    }

    indexHtmlContent += `<div class="category-section"><h2>${categoryTitle}</h2><ul>`;

    if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        if (file.endsWith(".md")) {
          const filePath = path.join(folderPath, file);
          const markdownContent = fs.readFileSync(filePath, "utf8");
          const htmlContent = marked.parse(markdownContent); // 渲染 Markdown 到 HTML

          const outputFileName = file.replace(".md", ".html");
          const outputPath = path.join(categoryHtmlDir, outputFileName);

          // 生成單篇文章的完整 HTML 結構
          const fullHtmlPage = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>${file.replace(
                              ".md",
                              ""
                            )} - ${categoryTitle}</title>
                            <style>
                                body { font-family: sans-serif; line-height: 1.6; margin: 2em; background-color: #f4f4f4; color: #333; }
                                .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                                h1 { color: #333; }
                                pre { background-color: #eee; padding: 1em; border-radius: 4px; overflow-x: auto; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <p><a href="../../index.html">&lt; Back to Anicca Index</a></p>
                                <h1>${file.replace(".md", "")}</h1>
                                ${htmlContent}
                            </div>
                        </body>
                        </html>
                    `;
          fs.writeFileSync(outputPath, fullHtmlPage);
          console.log(`Generated: ${outputPath}`);

          // 添加到主索引頁面
          indexHtmlContent += `<li><a href="${folderName}/${outputFileName}">${file.replace(
            ".md",
            ""
          )}</a></li>`;
        }
        // 處理 _doc.md 文件作為目錄
        else if (file === "_doc.md") {
          const docFilePath = path.join(folderPath, file);
          const docMarkdown = fs.readFileSync(docFilePath, "utf8");
          const docHtml = marked.parse(docMarkdown);
          const docOutputPath = path.join(categoryHtmlDir, "index.html"); // 用 index.html 作為目錄頁

          const fullDocPage = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>${categoryTitle} Index</title>
                            <style>
                                body { font-family: sans-serif; line-height: 1.6; margin: 2em; background-color: #f4f4f4; color: #333; }
                                .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                                h1 { color: #333; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <p><a href="../index.html">&lt; Back to Anicca Index</a></p>
                                <h1>${categoryTitle}</h1>
                                ${docHtml}
                            </div>
                        </body>
                        </html>
                    `;
          fs.writeFileSync(docOutputPath, fullDocPage);
          console.log(`Generated category index: ${docOutputPath}`);
        }
      }
    }
    indexHtmlContent += `</ul></div>`;
  }

  indexHtmlContent += `
            </div>
        </body>
        </html>
    `;
  // 將生成的總索引頁面寫入輸出目錄
  fs.writeFileSync(path.join(outputHtmlDir, "index.html"), indexHtmlContent);
  console.log("Finished content generation.");
}

generateHtmlFiles();
