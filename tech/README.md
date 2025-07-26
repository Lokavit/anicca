---
title: README
date: '2019-05-11'
tags: ['code']
draft: true
---

# IDEA & ACTION

- CS50 2023
- - ✅ Lecture 0 - Scratch
- - Lecture 1 - C
- - Lecture 2 - Arrays
- - Lecture 3 - Algorithms
- - Lecture 4 - Memory


- 指令生成故事，全屏自动播放。使用OBS录屏。


## Linux
- ~~**Arch**~~：有墙，没做路由出境，装不上。
- ✅ **Garuda**：平替。当年官网还能打开是下载镜像，做双系统
- - ✅ **VirtualBox**: 用于装Win10
- - **输入法**： 小狼毫 => 鼠须管
- - ✅ **编程**： VSCodium。替换`VSCode` https://vscodium.com/
- - ✅ **影音**： mpv、~~foobar2000~~
- - ✅ **游戏**： Steam
- - **非编**： ？？？
- - ***电子书**:calibre 
- - ffmpeg for linux
- - calibre for linux
- - Internet Download Manager ??
- - ✅ OBS
- - 数据库管理软件

### 转入 VM Win10
- AE、PS、PR、ME,Adobe系列
- 一些win系老游戏
- 微信 QQ

### share 
- 创建虚拟机时，选择共享文件夹
- 启动虚拟机中系统后，在设备中，安装增强，即可打开共享文件夹。


PILI Puppet Drama


## 网路

- 软路由



karma:业[非唯一]
sutra:真谛
stupa:塔,佛塔,舍利塔
sumeru:须弥山
prajna:般若
bhiksu:比丘
lokavit:世间解
SahaLand 娑婆世界
SAMSARA　轮回转世

Sumeru：作为site,内容大部分是从别的仓库外链进来，走fetch请求。
- src：自身的源代码写在这里。


/*
类名大驼峰，方法名小驼峰。数据库表名用下划线，字段名小驼峰。
变量小驼峰，常量大写＿大写，值关键字大写＿大写，
临时变量下划线，样式类名用下划线。

*/

源代码项目，实现一个类似Docsify的运行时渲染。

主页主题内容区域：`flex`布局，随机内容做成卡片形式
ＨＳ：(横屏)左侧边栏小按钮，可展开。
ＶＳ：(竖屏)同款小按钮，改为紧贴移动端底部。
以当前屏幕宽高，判断当前屏幕为横屏或竖屏，切换对应ｃｓｓ文件。
- h.css:横屏
- v.css:竖屏
- c.css:通用

Archive:对以前项目的存档，以及制作的其他轻量级页面,css特效等。
Games:制作的游戏项目展示,每个游戏再分文件夹。 
WebDev:一些较大的web项目，按项目分文件夹。
JSLib：一些可以封装起来的库。
Dialog:对话式小说。(可能使用模板生成的方式，数据写在项目中，还是数据库中？)
Novel:存放小说等文字作品。
Devdocs:存放开发相关的文档。
English:学习英语相关的文档。
Database:一个用作数据库的仓库，内中对所需项目的数据以文件夹形式区分。




Python/Rust/nodejs:一个用于生成侧边栏目录文件的工具。



一


写一个从网站自动生成内容的工具：
1.从https://blinkdl.github.io/AI-Writer/ 获取select以及

写一个处理文本的工具：
1.获取文本内容，
.正则其中的章节(如：第0-9章，第零-九章，0-9章，零-九章等)，将它们移除。
.以9000-9999区间切分为章节，自动以0.md开始编号。


<!-- 
实现思路
一个构建html的页面。
通过字符串拼接出构建后的完整的 html 文件
使用 Blob 构造出一个 Blob 文件对象
使用 window.URL.createObjectURL 将文件对象解析成 url
将 url 放入 <a> 使用 a 标签的 download 属性下载
使用 window.URL.revokeObjectURL(url) 释放 url

代码实现
export2Excel() {
    // 生成html字符串
    const html = gethtml("前端小蜗");
    // 创建一个a标签
    var a = document.createElement("a");
    // 创建一个包含blob对象的url
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
