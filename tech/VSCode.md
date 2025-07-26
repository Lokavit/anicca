---
title: VSCodium VSCode
date: '2019-05-11'
tags: ['code']
draft: false
---

# VSCode Ext Note

```bash
# 全局安装 用于生成vscode插件开发的项目 
$ sudo npm install -g yo generator-code
# 创建项目,在此步骤简单配置
$ yo code
```
## 直接复制文件夹到插件目录下

## 打包成vsix插件
```bash
npm i vsce -g
vsce package

# VSCodium ->Extension ->...->Install from vsix
```






## 发布到插件市场

- 在`marketplace`申请创建者，被`google`验证墙的死去活来。

```bash
$ npm install -g @vscode/vsce
$ vsce package
# 去注册、创建发布者(墙！墙！！墙！！！)
$ vsce login Lokavit
# paste your token .验证成功
The Personal Access Token verification succeeded for the publisher 'Your Name'.
# 发布命令
$ vsce publish
# 提示你创建仓库，顺便推送到远程github托管
$ git remote add origin https://……/仓库名.git
$ git branch -M main
# 正常status add . commit -m
$ git push -u origin main
# 发布命令 注意将package.json中需要信息填写完整
$ vsce publish # 此处依然需要开着飞机，否者无法验证通过
# 更新时，记得更改package.json中的version。
$ vsce publish 0.0.3 # 更新插件
```

## Stupa

`Activating extension 'Lokavit.stupa' failed: name is not defined.`

### Insert file info to file

```html
<!-- 
FileName:文件名。
ProjectName:项目名(单本小说视为一个项目)
FileBirthtime:文件创建时间
FileMtime: 2023/9/29 17:15:21
Author:作者
WordCount:字数统计
 -->

<!-- 对于写小说可能会需要的一些功能
左侧加一个书本的图标或emoji。
自建以.book为后缀的文件,也支持多本小说共用一套设定文件。
如:mybook.timeline.book:时间线相关设定。
mybook.role.book:小说.角色设定
mybook.gis.book:小说对于地理相关的设定。
该文件中的一些关键词，做处理，用于正文使用时能够浮现提示。
在写正文的时候，输入角色名，会弹出该角色在角色设定里面的内容。
考虑将这些数据与drawio的数据互通。

 -->
```

```js
/**
 * 以下代码段，适用于多个tab保存，或是多个编辑操作进行。
 * 但是，在_updateWordCount（）{}中会阻止快捷键保存事件
 */
/**
 * 对文本多次操作使用
 */
let _textEdits = [];
/**
 * 每个文档内容替换，都push一个替换方法(范围,替换内容)
 */
_textEdits.push(builder.replace(_range, `${_count} 字`));
/**
 * 用于多次替换。用于同时对多个文档进行多次操作
 */
let _workspaceEdit = new vscode.WorkspaceEdit();
/**
 * 使用set方法，传入当前文档的uri，以及替换操作的数组
 */
_workspaceEdit.set(_doc.uri, _textEdits);
vscode.workspace.applyEdit(_workspaceEdit);
```

任何编程语言，任何注释模板

- 自定义编程语言的注释模板
- 自定义正则表达式

```html
<!-- 
 FileName:${name}
 Project:${project}
 
 -->
```

```js
/**
 * 通过传入的语言ID，寻找对应的注释块。
 * 用大数组对象，似乎太重了。
 */
switch (lang) {
  case "html":
    ``;
}
// 使用者自己定义，自己布局
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
      "    卍 · 小僧過境　衆生甦醒 · 卍",
      "=====<< 卍 · Description · 卍 >>=====",
    ],
  },
];
// _tempTPL输出为未解析的字符串，需要加一些处理。
/** Birthtime: ${birthime} */
// let _tempTPL = _tempLangAndTpl[0].tpl[5];
// console.info("获取某行:", _tempTPL);
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
  // 头文件
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
  "psi-header.license-text": ["    卍 · 小僧過境　衆生甦醒 · 卍"],
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
        //　版权声明 起始
        "=====<< 卍 · Copyright · 卍 >>=====",
        // 文件在项目中的路径及文件名后缀名
        "File: <<filerelativepath>>",
        // 项目名
        "Project: <<projectname>>",
        // 作者
        "Author: <<author>>",
        // 文件创建时间
        "Created Date: <<filecreated('YYYY-MM-DD h:mm:ss')>>",
        "-----",
        // 文件最后修改时间
        "Last Modified: <<dateformat('YYYY-MM-DD h:mm:ss')>>",
        // 文件最后修改人
        // "Modified By: <<author>>",
        "-----",
        // 版权声明
        "Copyright © <<yeartoyear(1911,now)>> <<company>>",
        "<<licensetext>>",
        //　对当前文件的描述，或许要注明的更改
        "=====<< 卍 · Description · 卍 >>=====",
        ""
      ]
    },
    {
      "language": "javascript",
      "template": [
        //　版权声明 起始
        "=====<< 卍 · Copyright · 卍 >>=====",
        "",
        // 文件在项目中的路径及文件名后缀名
        "File: <<filerelativepath>>",
        // 项目名
        "Project: <<projectname>>",
        // 作者
        "Author: <<author>>",
        // 文件创建时间
        "Created Date: <<filecreated('YYYY-MM-DD h:mm:ss')>>",
        "-----",
        // 文件最后修改时间
        "Last Modified: <<dateformat('YYYY-MM-DD h:mm:ss')>>",
        // 文件最后修改人
        // "Modified By: <<author>>",
        "-----",
        // 版权声明
        "Copyright © <<yeartoyear(1911,now)>> <<company>>",
        "",
        "<<licensetext>>",
        "",
        //　对当前文件的描述，或许要注明的更改
        "=====<< 卍 · Description · 卍 >>=====",
        ""
      ]
    },
    {
      "language": "css",
      "template": [
        //　版权声明 起始
        "=====<< 卍 · Copyright · 卍 >>=====",
        "",
        // 文件在项目中的路径及文件名后缀名
        "File: <<filerelativepath>>",
        // 项目名
        "Project: <<projectname>>",
        // 作者
        "Author: <<author>>",
        // 文件创建时间
        "Created Date: <<filecreated('YYYY-MM-DD h:mm:ss')>>",
        "-----",
        // 文件最后修改时间
        "Last Modified: <<dateformat('YYYY-MM-DD h:mm:ss')>>",
        // 文件最后修改人
        // "Modified By: <<author>>",
        "-----",
        // 版权声明
        "Copyright © <<yeartoyear(1911,now)>> <<company>>",
        "",
        "<<licensetext>>",
        "",
        //　对当前文件的描述，或许要注明的更改
        "=====<< 卍 · Description · 卍 >>=====",
        ""
      ]
    },
    {
      "language": "typescript",
      "template": [
        //　版权声明 起始
        "=====<< 卍 · Copyright · 卍 >>=====",
        "",
        // 文件在项目中的路径及文件名后缀名
        "File: <<filerelativepath>>",
        // 项目名
        "Project: <<projectname>>",
        // 作者
        "Author: <<author>>",
        // 文件创建时间
        "Created Date: <<filecreated('YYYY-MM-DD h:mm:ss')>>",
        "-----",
        // 文件最后修改时间
        "Last Modified: <<dateformat('YYYY-MM-DD h:mm:ss')>>",
        // 文件最后修改人
        // "Modified By: <<author>>",
        "-----",
        // 版权声明
        "Copyright © <<yeartoyear(1911,now)>> <<company>>",
        "",
        "<<licensetext>>",
        "",
        //　对当前文件的描述，或许要注明的更改
        "=====<< 卍 · Description · 卍 >>=====",
        ""
      ]
    }
  ],
```
