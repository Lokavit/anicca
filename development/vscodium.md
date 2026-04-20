---
title: "VSCodium"
date: 2015-01-30
tags: ["VSCodium", "Extension"]
description: ""
---

## keybingings.json
- ctrl+shift+p，输入`>Preferences:Open Keyboard Shortcuts(JSON) `

```json
// Place your key bindings in this file to override the defaults
[
    // 全角空格，适用于写作段首空两格
    {
        "key": "ctrl+alt+space",
        "command": "type",
        "args": {
            "text": "　　"
        },
        "when": "editorTextFocus && editorLangId == 'markdown'"
    },
    // 对话符号  快速插入「」并定位光标
    {
        "key": "ctrl+alt+9",
        "command": "editor.action.insertSnippet",
        "args": {
            "snippet": "「$1」"
        },
        "when": "editorTextFocus"
    },
    // 选中后加入对话符号
    {
        "key": "ctrl+alt+0",
        "command": "editor.action.insertSnippet",
        "args": {
            "snippet": "「${TM_SELECTED_TEXT}」"
        },
        "when": "editorTextFocus"
    },
    // timeline 模板
    {
        "key": "ctrl+alt+1",
        "command": "editor.action.insertSnippet",
        "args": {
            "snippet": "## ${1:1999-02-15}\n> **事件**：${2:填写事件}\n- **人物**：${3:人物列表}\n- **地点**：${4:地点}\n- **备注**：${5:备注}\n- **状态**：[${6:未使用|第x章使用}]\n\n$0"
        },
        "when": "editorTextFocus && editorLangId == 'markdown'"
    },
    // 章节设计模板
    {
        "key": "ctrl+alt+2",
        "command": "editor.action.insertSnippet",
        "args": {
            "snippet": "# 第 ${1} 章：${2}\n- **时间**：${3}\n- **场景**：${4}\n- **视角**：${5}\n- **核心冲突**：${6}\n- **概括**：${7}\n## 情节列表:[5-8个最合适|主语+谓语+宾语]\n- ${8}\n\n## 章末钩子[悬念型|转折型|情感型]\n- ${9}\n"
        },
        "when": "editorTextFocus && editorLangId == 'markdown'"
    },
    // # 第 1 章：标题 自动空一行
    {
        "key": "ctrl+alt+3",
        "command": "editor.action.insertSnippet",
        "args": {
            "snippet": "# 第 ${1:1} 章：${2:章节标题}\n\n$0"
        },
        "when": "editorTextFocus && editorLangId == 'markdown'"
    }
]
```

## VSCode Ext Note

```bash
# 全域性安裝 用於生成vscode外掛開發的專案
$ sudo npm install -g yo generator-code
# 建立專案,在此步驟簡單配置
$ yo code
```

## 直接複製資料夾到外掛目錄下

## 打包成 vsix 外掛

```bash
npm i vsce -g
vsce package

# VSCodium ->Extension ->...->Install from vsix
```

## 釋出到外掛市場

- 在`marketplace`申請建立者，被`google`驗證牆的死去活來。

```bash
$ npm install -g @vscode/vsce
$ vsce package
# 去註冊、建立釋出者(牆！牆！！牆！！！)
$ vsce login Lokavit
# paste your token .驗證成功
The Personal Access Token verification succeeded for the publisher 'Your Name'.
# 釋出命令
$ vsce publish
# 提示你建立倉庫，順便推送到遠端github託管
$ git remote add origin https://……/倉庫名.git
$ git branch -M main
# 正常status add . commit -m
$ git push -u origin main
# 釋出命令 注意將package.json中需要資訊填寫完整
$ vsce publish # 此處依然需要開著飛機，否者無法驗證透過
# 更新時，記得更改package.json中的version。
$ vsce publish 0.0.3 # 更新外掛
```

## Stupa

`Activating extension 'Lokavit.stupa' failed: name is not defined.`

### Insert file info to file

```html
<!-- 
FileName:檔名。
ProjectName:專案名(單本小說視為一個專案)
FileBirthtime:檔案建立時間
FileMtime: 2023/9/29 17:15:21
Author:作者
WordCount:字數統計
 -->

<!-- 對於寫小說可能會需要的一些功能
左側加一個書本的圖示或emoji。
自建以.book為字尾的檔案,也支援多本小說共用一套設定檔案。
如:mybook.timeline.book:時間線相關設定。
mybook.role.book:小說.角色設定
mybook.gis.book:小說對於地理相關的設定。
該檔案中的一些關鍵詞，做處理，用於正文使用時能夠浮現提示。
在寫正文的時候，輸入角色名，會彈出該角色在角色設定裡面的內容。
考慮將這些資料與drawio的資料互通。

 -->
```

```js
/**
 * 以下程式碼段，適用於多個tab儲存，或是多個編輯操作進行。
 * 但是，在_updateWordCount（）{}中會阻止快捷鍵儲存事件
 */
/**
 * 對文字多次操作使用
 */
let _textEdits = [];
/**
 * 每個文件內容替換，都push一個替換方法(範圍,替換內容)
 */
_textEdits.push(builder.replace(_range, `${_count} 字`));
/**
 * 用於多次替換。用於同時對多個文件進行多次操作
 */
let _workspaceEdit = new vscode.WorkspaceEdit();
/**
 * 使用set方法，傳入當前文件的uri，以及替換操作的陣列
 */
_workspaceEdit.set(_doc.uri, _textEdits);
vscode.workspace.applyEdit(_workspaceEdit);
```

任何程式語言，任何註釋模板

- 自定義程式語言的註釋模板
- 自定義正則表示式

```html
<!-- 
 FileName:${name}
 Project:${project}
 
 -->
```

```js
/**
 * 透過傳入的語言ID，尋找對應的註釋塊。
 * 用大陣列物件，似乎太重了。
 */
switch (lang) {
  case "html":
    ``;
}
// 使用者自己定義，自己佈局
const _tempLangAndTpl = [
  {
    lang: "javascript",
    tpl: [
      "=====<< 卍 · Copyright · 卍 >>=====",
      "FileName: ${fileName}",
      "FilePath: ${FilePath}",
      "Project: ${Project}",
      "Author: ${Author}",
      "Birthtime: ${birthime}",
      "-----",
      "Mtime: 2023/9/29 17:15:21
      "WordCount: ${WordCount} 字",
      "-----",
      "Copyright © 1911 - 2023 Lokavit",
      "    卍 · 小僧過境　眾生甦醒 · 卍",
      "=====<< 卍 · Description · 卍 >>=====",
    ],
  },
];
// _tempTPL輸出為未解析的字串，需要加一些處理。
/** Birthtime: ${birthime} */
// let _tempTPL = _tempLangAndTpl[0].tpl[5];
// console.info("獲取某行:", _tempTPL);
// const getBirth = (birthime) => `${_tempTPL.split(":")[0]}:${birthime}`;
// const getTest = (val) => `Test:${val}`;

const tplArry = [
  {
    lang: "html",
    comment: {
      begin: "<!--",
      prefix: "",
      end: "-->",
    },
  },
  {
    lang: "javascript",
    comment: {
      begin: "/**",
      prefix: "*",
      end: "*/",
    },
  },
  {
    lang: "CSharp",
    comment: {
      begin: "#",
      prefix: "#",
      end: "#",
    },
  },
];
```

```json
  // 標頭檔案
  "psi-header.config": {
    "forceToTop": true,
    "blankLinesAfter": 6,
    "license": "Custom"
  },
  "psi-header.changes-tracking": {
    "isActive": true,
    "modAuthor": "Modified By: ",
    "modDate": "Last Modified: ",
    "modDateFormat": "date",
    "include": [],
    // "exclude": ["markdown", "json", "jsonc"],
    "exclude": ["json", "jsonc"],
    // "excludeGlob": ["out/**", "src/**/*.xyz"],
    "excludeGlob": ["out/**"],
    "autoHeader": "manualSave"
  },
  "psi-header.license-text": ["    卍 · 小僧過境　眾生甦醒 · 卍"],
  "psi-header.variables": [
    ["company", "Lokavit"],
    ["author", "Lokavit"],
    ["authoremail", "*"]
  ],
  "psi-header.lang-config": [
    {
      "language": "lua",
      "begin": "--[[",
      "prefix": "--",
      "end": "--]]",
      "blankLinesAfter": 0
    },
    {
      "language": "python",
      "begin": "###",
      "prefix": "# ",
      "end": "###",
      "blankLinesAfter": 0,
      "beforeHeader": ["#!/usr/bin/env python3", "# -*- coding:utf-8 -*-"]
    },
    {
      "language": "javascript",
      "begin": "/**",
      "prefix": " * ",
      "end": " */",
      "blankLinesAfter": 2,
      "forceToTop": false
    },
    {
      "language": "typescript",
      "mapTo": "javascript"
    },
    {
      "language": "markdown",
      "begin": "<!-- ",
      "prefix": "  ",
      "end": " -->",
      "blankLinesAfter": 2,
      "forceToTop": false
    }
  ],
  "psi-header.templates": [

    {
      "language": "markdown",
      "template": [
        //　版權宣告 起始
        "=====<< 卍 · Copyright · 卍 >>=====",
        // 檔案在專案中的路徑及檔名字尾名
        "File: <<filerelativepath>>",
        // 專案名
        "Project: <<projectname>>",
        // 作者
        "Author: <<author>>",
        // 檔案建立時間
        "Created Date: <<filecreated('YYYY-MM-DD h:mm:ss')>>",
        "-----",
        // 檔案最後修改時間
        "Last Modified: <<dateformat('YYYY-MM-DD h:mm:ss')>>",
        // 檔案最後修改人
        // "Modified By: <<author>>",
        "-----",
        // 版權宣告
        "Copyright © <<yeartoyear(1911,now)>> <<company>>",
        "<<licensetext>>",
        //　對當前檔案的描述，或許要註明的更改
        "=====<< 卍 · Description · 卍 >>=====",
        ""
      ]
    },
    {
      "language": "javascript",
      "template": [
        //　版權宣告 起始
        "=====<< 卍 · Copyright · 卍 >>=====",
        "",
        // 檔案在專案中的路徑及檔名字尾名
        "File: <<filerelativepath>>",
        // 專案名
        "Project: <<projectname>>",
        // 作者
        "Author: <<author>>",
        // 檔案建立時間
        "Created Date: <<filecreated('YYYY-MM-DD h:mm:ss')>>",
        "-----",
        // 檔案最後修改時間
        "Last Modified: <<dateformat('YYYY-MM-DD h:mm:ss')>>",
        // 檔案最後修改人
        // "Modified By: <<author>>",
        "-----",
        // 版權宣告
        "Copyright © <<yeartoyear(1911,now)>> <<company>>",
        "",
        "<<licensetext>>",
        "",
        //　對當前檔案的描述，或許要註明的更改
        "=====<< 卍 · Description · 卍 >>=====",
        ""
      ]
    },
    {
      "language": "css",
      "template": [
        //　版權宣告 起始
        "=====<< 卍 · Copyright · 卍 >>=====",
        "",
        // 檔案在專案中的路徑及檔名字尾名
        "File: <<filerelativepath>>",
        // 專案名
        "Project: <<projectname>>",
        // 作者
        "Author: <<author>>",
        // 檔案建立時間
        "Created Date: <<filecreated('YYYY-MM-DD h:mm:ss')>>",
        "-----",
        // 檔案最後修改時間
        "Last Modified: <<dateformat('YYYY-MM-DD h:mm:ss')>>",
        // 檔案最後修改人
        // "Modified By: <<author>>",
        "-----",
        // 版權宣告
        "Copyright © <<yeartoyear(1911,now)>> <<company>>",
        "",
        "<<licensetext>>",
        "",
        //　對當前檔案的描述，或許要註明的更改
        "=====<< 卍 · Description · 卍 >>=====",
        ""
      ]
    },
    {
      "language": "typescript",
      "template": [
        //　版權宣告 起始
        "=====<< 卍 · Copyright · 卍 >>=====",
        "",
        // 檔案在專案中的路徑及檔名字尾名
        "File: <<filerelativepath>>",
        // 專案名
        "Project: <<projectname>>",
        // 作者
        "Author: <<author>>",
        // 檔案建立時間
        "Created Date: <<filecreated('YYYY-MM-DD h:mm:ss')>>",
        "-----",
        // 檔案最後修改時間
        "Last Modified: <<dateformat('YYYY-MM-DD h:mm:ss')>>",
        // 檔案最後修改人
        // "Modified By: <<author>>",
        "-----",
        // 版權宣告
        "Copyright © <<yeartoyear(1911,now)>> <<company>>",
        "",
        "<<licensetext>>",
        "",
        //　對當前檔案的描述，或許要註明的更改
        "=====<< 卍 · Description · 卍 >>=====",
        ""
      ]
    }
  ],
```
