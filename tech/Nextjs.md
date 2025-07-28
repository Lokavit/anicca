---
title: Next-js
date: '2023-12-11'
tags: ['code']
draft: true
---

```
# 建立專案資料夾，執行以下程式碼
npx create-next-app@latest 

What is your project named?  my-app
Would you like to use TypeScript?   [Yes]
Would you like to use ESLint?  [No] 
Would you like to use Tailwind CSS?   [Yes]
Would you like to use `src/` directory?  [No] 
Would you like to use App Router? (recommended)  [Yes]
Would you like to customize the default import alias (@/*)?  [Yes]
```


```
https://github.com/rabbyalone/myblog https://blog.rabbyhasan.com.bd/ nextjs13 特效
https://github.com/zS1m/nextjs-contrails https://www.contrails.space/ nextjs13
```




### 
- 客戶端渲染，必須在第一行指定，js或ts檔案
```js
'use client'

```

### DIR 目錄說明
- app
- - xxx: 按照路由為資料夾名稱。每個頁面一個資料夾
- - - page.tsx: 內容
- - - layout.tsx: 佈局
- - ui: 零散通用元件
- - layout.tsx: HTML
- - page.tsx: main主體
- lib: 非DOM
- public: 資原始檔
- - images: 存放影像檔案
- - svgs:存放SVG檔案
- scripts: 指令碼檔案，或許有後端程式碼
```

https://commte.net/nextjs-metadata




SolflareWalletAdapter https://docs.solflare.com/solflare/

```bash
npm install swiper
npm install framer-motion
npm i tailwindcss-animated https://www.tailwindcss-animated.com/
npm i lottie-react https://lottiereact.com/components/Lottie


https://www.youtube.com/watch?v=2djbqUOtFgg

https://codepen.io/Osbro/pen/LYLXRae

webflow

```

```
https://github.com/ArfinHasib/Restaurant-website-nextjs14-tailwind-framer-motion
https://github.com/nextArtDev/next-14-mini-projects

```

framer motion

```
app/dashbord/page.tsx
app/dashbord/customer/page.tsx
app/dashbord/invoices/page.tsx
app/layout.tsx # 以上三個頁面皆生效
```

## 裝載相關依賴
npm upgrade tailwindcss --latest
npm install @headlessui/react@latest
npm install @headlessui/tailwindcss@latest
npm install swiper
npm install clsx
npm install tailwind-merge
# 向無法控制的任何普通 HTML 新增漂亮的排版預設值，例如從 Markdown 渲染的 HTML 或從 CMS 提取的 HTML。
npm install tailwindcss/typography
npm i tailwindcss-animated # 動畫擴充套件 https://www.tailwindcss-animated.com/

# npm install fullpage.js # 類swiper的工具，高階功能需付費。 https://github.com/alvarotrigo/fullpage.js
# npm install @fullpage/react-fullpage

npm i tailwindcss-animated # 一些基本動畫  https://www.tailwindcss-animated.com/
npm install animejs # 一些動畫 https://animejs.com/  https://github.com/juliangarnier/anime
# 過時，無法裝載  https://github.com/plus1tv/react-anime/tree/master # 似乎可以改一改

# Framer Motion https://www.framer.com/motion/introduction/
npm install framer-motion

# React Spring  https://www.react-spring.dev/examples
# npm i @react-spring/web 

npm install @types/node-fetch -D


# 錢包介面卡 https://github.com/solana-labs/wallet-adapter
# https://github.com/solana-labs/wallet-adapter/blob/master/APP.md
# https://github.com/solflare-wallet/metamask-adapter-wallet-standard

npm install --save \
    @solana/wallet-adapter-base \
    @solana/wallet-adapter-react \
    @solana/wallet-adapter-react-ui \
    @solana/wallet-adapter-wallets \
    @solana/web3.js

npm install --save @solana/pay # 支付
npm install --save @solana/spl-token # 

# 一個錢包連結的示例
# https://github.com/Woody4618/workshops_fork/tree/main
# https://www.youtube.com/watch?v=V9ZE24WJ2GQ 


# 實現使用者識別符號功能
npm install bs58 tweetnacl
npm install next-auth # 身份驗證
# https://dev.to/ducdang/build-an-web3-authentication-method-with-solana-wallets-5bfh


https://github.com/serpentacademy/Stripe-subscription-checkout-react
```

### DIR

- app 頁面，資料夾及檔名以路由格式
- - layout.tsx 主頁面佈局。
- - page.tsx 頁面內容
- - Main.tsx 
- - theme-providers.tsx 主題上下文容器，用於動態切換主題['light' 'drak']。所有內容被該容器包裹
- components
- - Header.tsx 頁首
- - Link.tsx 超連結
- - MobileNav 移動端導航
- - social-icons 一些主流站的icon
- - - icons.tsx 主流站的SVG
- - - index.tsx 
- - CharacterTabs.tsx 遊戲角色卡
- - ArmsInfo.tsx 武器展示 
- - ConnectWallet.tsx 連線錢包的按鈕
- tabs1 # 一種tabs切換，使用framer-motion
- tabs-1 # 微調 tabs1


- css
- data
- - siteMetaData.js 站點原資料設定
- - headerNavLinks.ts 頂部導航路由
- layouts
- lib
- public
- script


@lottiefiles/react-lottie-player

# swiper的代替產品。有滾動指示，減少程式碼。
https://alvarotrigo.com/fullPage/#page1

https://alvarotrigo.com/fullPage/extensions/
# fullPage + swiper
https://codepen.io/jangmang/pen/ZEavYgB

# AE to Lottie  Lottie-React
https://docs.lottiefiles.com/lottie-player/components/lottie-react


# 橫排，左移，緩動，迴圈
https://www.builder.io/blog/scrolling-logo-animation-tailwindcss

https://motion.dev/examples
https://tailwindcss.com/showcase/wander
https://www.aceternity.com/components
https://www.aceternity.com/components/container-scroll-animation
https://www.freecodecamp.org/news/create-scroll-animations-with-framer-motion-and-react/
https://www.hover.dev/components
https://github.com/timlrx/tailwind-nextjs-starter-blog
https://framer.university/resources
https://www.framer.com/motion/
https://docs.pmnd.rs/react-three-fiber/getting-started/examples

https://nextui.org/docs/components/tabs
https://www.material-tailwind.com/docs/react/tabs
https://github.com/codebucks27/Next.js-Developer-Portfolio-Starter-Code
https://devdreaming.com/videos/nextjs-tutorial-build-portfolio-tailwind-css-framer-motion#code-links
https://play.tailwindcss.com/wfzSFIYmBF
https://alvarotrigo.com/blog/scroll-horizontally-with-mouse-wheel-vanilla-java/
https://framer.university/resources/spooky-spectacle-website



https://brc-dd.github.io/animated-tailwindcss/installation
https://anime.js.cn/
https://css-tricks.com/svg-line-animation-works/
https://segmentfault.com/a/1190000023090287

- Three.js
- https://animejs.com/
https://github.com/alpinejs/alpine

react-facebook-pixel
Facebook Pixel 是您新增到網站中的一段程式碼，用於跟蹤使用者行為並允許您跟蹤轉化併為未來的廣告構建自定義受眾群體。

fbevents.js 是 Facebook 使用的 JavaScript 庫，用於跟蹤和衡量使用 Facebook Pixel 的網站上的轉化。

packages/config/tailwind.config.js

https://dev.to/franklin030601/how-to-use-lottie-animations-react-js-cn0


https://github.com/colinhacks/zod

https://fkhadra.github.io/react-toastify/introduction

https://github.com/animate-css/animate.css


https://flowbite.com/blocks/marketing/header/

## 
tailwindcss警告
```
裝載外掛：Tailwind CSS IntelliSense
設定 settings.json
  "files.associations": {
    "*.css": "tailwindcss"
  }
```

