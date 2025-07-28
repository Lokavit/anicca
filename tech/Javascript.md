---
title: Javascript
date: '2013-07-11'
tags: ['code']
draft: false
---

```js
/**
 佛曆計算的方法：將佛降生於公元前623年減去佛壽80歲，得543為佛涅盤年數（佛涅盤於公元前543年）；
2019年加543年是2562年。佛曆是2562年4月7日。
到今年佛誕（每年的農曆四月初八）起，應增加1年；
如：公元2019年5月12日（農曆四月初八），應增加1年，佛曆是：2563年4月8日；
計算佛曆方法，依此類推。 
佛曆/泰歷：2566年2月6日
公曆/西曆：2023年9月17日
農曆/陰曆：二月初六
*/
function calcBuddhimDate() {
    // '2023癸卯年八月初三星期日 16:19:57'
    // const toCnDate = date => date.toLocaleString('zh-u-ca-chinese', { dateStyle: 'full' }) + ' ' + date.toLocaleTimeString(0, { hour12: false });
    // toCnDate(new Date);
    // ja-JP-u-ca-japanese
    // 'วันอาทิตย์ที่ 17 กันยายน พ.ศ. 2566 16:18:43'
    const toCnDate = date => date.toLocaleString('th-u-ca-thai', { year: "numeric" }) + ' ' + date.toLocaleTimeString(0, { hour12: false });
    const buddhimYear = toCnDate(new Date).split(' ')[1];
    const dateTime = new Date().toLocaleDateString('zh').split('/');
    return {
        date: `${buddhimYear} 年 ${dateTime[1]} 月 ${dateTime[2]} 日`,
        // time: new Date().toLocaleTimeString('zh'),
    }
}
```

```js
// test.js
const Coordinate = function (x, y) {
  this.x = x;
  this.y = y;
};
Coordinate.equals = function (a, b) {/** some code */}
Coordinate.prototype.translate = function (tx, ty) {/** some code */}
export default Coordinate;
```

### 堆、棧、佇列
- 堆：存基本型別。(優先佇列、堆排序等場景)
- 棧：存引用型別，後進先出。（字串匹配、資料反轉等場景）
- 佇列：先進先出。（任務佇列）

---

```
瀏覽器支援import的方式，以Edge/Chrome為例：
1.輸入 edge://flags=>搜尋js相關。
2.將 Experimental JavaScript 設定為啟用。
```

解析器發現非阻塞資源，例如一張圖片，瀏覽器會請求這些資源並且繼續解析。當遇到一個 CSS 檔案時，解析也可以繼續進行，但是對於 <script> 標籤（特別是沒有 async 或者 defer 屬性的）會阻塞渲染並停止 HTML 的解析。儘管瀏覽器的預載入掃描器加速了這個過程，但過多的指令碼仍然是一個重要的瓶頸。


```js
跨頁面傳值
window.addEventListener('storage', e => {});
```

# js Object

```js
const Person = {
  isHuman: false,
  say() {
    // say:function(){/* do some */}
    // 作用域問題，函式內呼叫其它屬性需要this.
    console.log(`Hello ${this.isHuman}`);
    // 此處若無return，則呼叫時最後會多輸出一個undefined
    return "say()函式的返回值";
  },
};
console.log(Object.create(Person));

const Test = Object.create(Person);
console.log(Test.isHuman);
console.log(Test.say());

/** 建立一個原型為null的空物件。該物件中無任何屬性 */
const ObjNull = Object.create(null);
console.log("原型為null的空物件：", ObjNull);
// 報錯 Uncaught TypeError: Object prototype may only be an Object or null: undefined
// const ObjNull2 = Object.create();
// console.log('()建立形式:',ObjNull2);

/** 建立一個物件，__proto__: Object */
const ObjProto = new Object();
console.log("new Object()形式建立物件:", ObjProto);
const ObjProto2 = {}; // 控制檯看起來與new Object()同樣
console.log("{}形式建立物件:", ObjProto2);

function fn() {}
console.dir(fn);
```

# ask

```js
/*
You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

Implement a function , which must take in input array, containing the names of people who like an item. It must return the display text as shown in the examples:likes :: [String] -> String

likes [] -- must be "no one likes this"
likes ["Peter"] -- must be "Peter likes this"
likes ["Jacob", "Alex"] -- must be "Jacob and Alex like this"
likes ["Max", "John", "Mark"] -- must be "Max, John and Mark like this"
likes ["Alex", "Jacob", "Mark", "Max"] -- must be "Alex, Jacob and 2 others like this"

*/
//
function likes(names) {
  switch (names.length) {
    case 0:
      return "no one likes this";
    case 1:
      return `${names[0]} likes this`;
    case 2:
      return `${names[0]} and ${names[1]} like this`;
    case 3:
      return `${names[0]}, ${names[1]} and ${names[2]} like this`;
    default:
      return `${names[0]}, ${names[1]} and ${
        names.length - 2
      } others like this`;
  }
  return str;
}
```

```js
/**
 * @function 在指定範圍內，生成隨機不重複指定長度的整數
 * @param {*} len 指定長度
 * @param {*} start 開始值
 * @param {*} end 結束值
 * @example generateRandInt(30, 0, 35);
 */
export function generateRandInt(len, start, end) {
  let temp = [];
  function _inner(start, end) {
    let span = end - start;
    return parseInt(Math.random() * span + start);
  }
  while (temp.length < len) {
    let num = _inner(start, end);
    if (temp.indexOf(num) == -1) {
      temp.push(num);
    }
  }
  return temp;
}
```

## Progressive Web Apps 漸進式網路應用

### App shell 程式外殼

- 儘快載入最小的使用者介面並快取它，以便後續訪問可以離線使用.然後載入應用趁墟的所有內容。下次從裝置訪問時，UI 立即從快取載入，並從伺服器請求新的內容(如果它已在快取中不可用)
- 使用者立即看到內容，而非載入動畫或空白頁，感覺很快，且可離線。
- 透過 service worker 控制從伺服器請求的內容以及從快取中檢索的內容。
- 新增到主螢幕或推送通知，更像原生應用。

```css
/* 響應式佈局 */
```

```js
/* app.js */
// 模板字串
// 註冊 service worker
// 點選按鈕時請求使用者許可權，用來向用戶推送通知
// 建立通知,隨機展示列表中的一個專案

/* sw.js */
// 引入 game.js檔案 (也就是資料 資料物件)
self.importScripts("data/games.js");
// 程式對app shell和主體內容(content)裡面的資料建立一個快取列表
// 配置service worker，快取 列表的工作在此執行
// 如果條件允許，service worker將從快取中請求content中所需的資料，從而提供離線應用功能
```

### Service Workers

- 是瀏覽器和網路之間的虛擬代理。正確快取網站資源並使其在使用者裝置離線時可用。
- API 是非阻塞的，且可以在不同上下文之間傳送和接收通訊
- 分配給 SW 一些任務，並在使用基於 Promise 的方法當任務完成時收到結果
- 主要:離線功能、處理通知、在單獨的執行緒上執行繁重的計算
- 控制網路請求，修改網路請求，返回快取的自定義響應，或合成響應。
- 需使用 HTTPS，使用 web storage 無效，因其不返回 Promise。
- 獨立於主執行緒、在後臺執行的指令碼。不能直接操縱 dom
- 被 install 後就永遠存在，除非被手動解除安裝
- 可程式設計攔截請求和返回，快取檔案。sw 可以透過 fetch 這個 api，來攔截網路和處理網路請求，再配合 cacheStorage 來實現 web 頁面的快取管理以及與前端 postMessage 通訊。
- 非同步實現，sw 大量使用 promise。
- “離線優先”或“快取優先”模式是向用戶提供內容的最流行策略。 如果資源已快取且可離線使用，請在嘗試從伺服器下載資源之前先將其返回。 如果它已經不在快取中，請下載並快取以備將來使用。

- service worker 的生命週期
  service worker 從程式碼的編寫，到在瀏覽器中的執行，主要經過下面幾個階段 installing -> installed -> activating -> activated -> redundant;

installing：這個狀態發生在 service worker 註冊之後，表示開始安裝。在這個過程會觸發 install 事件回撥指定一些靜態資源進行離線快取。
installed：sw 已經完成了安裝，進入了 waiting 狀態，等待其他的 Service worker 被關閉（在 install 的事件回撥中，可以呼叫 skipWaiting 方法來跳過 waiting 這個階段）
activating： 在這個狀態下沒有被其他的 Service Worker 控制的客戶端，允許當前的 worker 完成安裝，並且清除了其他的 worker 以及關聯快取的舊快取資源，等待新的 Service Worker 執行緒被啟用。
activated： 在這個狀態會處理 activate 事件回撥，並提供處理功能性事件：fetch、sync、push。（在 acitive 的事件回撥中，可以呼叫 self.clients.claim()）
redundant：廢棄狀態，這個狀態表示一個 sw 的使命週期結束

### 版本更新

```js
contentToCache.push("/notes/pwa/js13kpwa/icons/icon-32.png");
// ...
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open("js13kPWA-v2").then(function (cache) {
      return cache.addAll(contentToCache);
    })
  );
});
```

### 其它用途

可以把比較耗時的計算從主執行緒中提取出來，在 SW 中計算完成，從 SW 中取得計算結果；可以在 SW 中對即將使用的資源進行預載入。

### 從裝置啟動

- js13kpwa.webmanifest：清單檔案，列舉網站所有資訊

```html
<link rel="manifest" href="js13kpwa.webmanifest" />
```

## WebComponents 另一種使用方式

- 嘗試將 WebComponents 的類元件形式，實現 Modal 的類形式
- 如果以上成立，則可以將頁面元件拆分，分別以類的形式實現
- 最終頁面為拼接類元件形式展現

## 原生實現 狀態管理

- 訂閱釋出/觀察者模式 當物件的某種狀態發生改變,所有依賴它的物件都將得到通知,觸發已經註冊的事件

### Generator

```js
/** 封裝了一個非同步操作，該操作先讀取一個遠端介面，然後從 JSON 格式的資料解析資訊 */
function* gen() {
  const URL = `https://api.github.com/users/Lokavit`;
  // 啟動生成器之後就開始請求資料
  let result = yield fetch(URL);
  console.log("* gen() result:", result);
  let res = yield result.json();
  // console.log("yield result.json() :", result.json());
  // let res = yield result;
  // 從第二次呼叫 next(data)中輸出指定結果，
  console.log("請求結果:", result.name);
}
// 執行以上生成器函式 獲取遍歷器物件
let g = gen();
// 執行非同步任務的第一階段。相當於啟動 gen()生成器
let result = g.next();
console.log("result:", result); // 1.最先輸出該語句
// 繼續向下執行 .value中是一個promise，所以在.then中呼叫下一個next()方法
result.value
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    // 2. 其次輸出該語句
    console.log("data:", data);
    // 表示執行 gen()生成器 的
    g.next(data);
  });
```

---

```js
// Intl.DateTimeFormat() constructor
/** 將 2020-07-30T04:00:00Z 轉換為 2020年7月30日 */
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
console.log(formatDate(new Date())); // 2020年7月30日
```

### classList

```html
<div id="el"></div>
<script>
  const el = document.querySelector("#el");
  // Add a class
  el.classList.add("open");

  // Add many classes
  el.classList.add("this", "little", "piggy");
  let classes = ["is-message", "is-warning"];
  el.classList.add(...classes);

  // Remove a class
  el.classList.remove("open");

  // Remove multiple classes
  el.classList.remove("this", "little", "piggy");

  // Loop over each class
  el.classList; // DOMTokenList (pretty much an array)
  el.classList.forEach((className) => {
    // don't use "class" as that's a reserved word
    console.log(className);
  });
  // $0.classList 從控制檯更新其屬性
  for (let className of $0.classList) {
    console.log(className);
  }

  el.classList.length; // integer of how many classes there are

  // Replace a class (replaces first with second)
  el.classList.replace("is-big", "is-small");

  // Toggle a class (if it's there, remove it, if it's not there, add it)
  el.classList.toggle("open");
  // Remove the class
  el.classList.toggle("open", false);
  // Add the class
  el.classList.toggle("open", true);
  // Add the class with logic
  el.classList.toggle("raining", weather === "raining");

  // Check if element has class (returns true or false)
  el.classList.contains("open");

  // Look at individual classes <div class="hot dog">
  el.classList.item(0); // hot
  el.classList.item(1); // dog
  el.classList.item(2); // null
  el.classList[1]; // dog
</script>
```

```js
let btn = document.querySelector(".btn");
console.log(btn.classList);
// ["btn", "show", value: "btn show"]

console.log(btn.classList[1]); // show

// 向元素新增一個或多個類
btn.classList.add("xxx", "yyy");
// 元素中是否存在指定類
console.log(btn.classList.contains("show")); // true
// 獲取指定索引的類
console.log(btn.classList.item(2)); // yyy
// 向元素移除一個或多個類
btn.classList.remove("show", "make", "me");

// 切換 toggle
if (btn.classList.contains("yyy")) {
  btn.classList.remove("xxx");
} else {
  btn.classList.add("show");
}

/** 點選按鈕，如果沒有test就加上，有就移除test */
btn.addEventListener("click", () => {
  btn.classList.toggle("test");
});

// 使用展開語法新增或移除多個類值
const cls = ["foo", "bar"];
btn.classList.add(...cls);
btn.classList.remove(...cls);

// 將類值 "foo" 替換成 "bar"
btn.classList.replace("foo", "bar");
```

# String

- 字串處理相關工具速查

## fileName

```js
/**
 * fileName.md => fileName
 */
let str = "fileName.md";
str = str.subString(0, str.lastIndexOf(".")); // fileName

// 轉駝峰後，首字母轉大寫。移除末尾副檔名
upperFirst(camelCase(str));
```

### 檔名提取

```js
let fileName = "./Material/ListMaterial.vue";
// 先將最後一個斜槓前面剔除，再從下標0開始，至上一步擷取的結果中，剔除字尾名部分
// 最終返回： ListMaterial
fileName
  .substring(fileName.lastIndexOf("/") + 1, fileName.length)
  .substring(
    0,
    fileName
      .substring(fileName.lastIndexOf("/") + 1, fileName.length)
      .lastIndexOf(".")
  );
```

## upperFirst

```js
/**
 * 首字母轉大寫
 * @param {String} str 需處理字串
 * use:upperFirst("abc")
 * result: Abc
 */
export function upperFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}
```

## camelCase

```js
/**
 * 字串轉駝峰
 * @param {String} str 需處理的字串
 * use:camelCase("ab-cd-ef")
 * result:abCdEf
 */
export function camelCase(str) {
  let arr = str.split("");
  if (arr[0] == "-") {
    arr.splice(0, 1);
  }
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] == "-") {
      arr.splice(i, 1);
      arr[i] = arr[i].toUpperCase();
    }
  }
  return arr.join("");
}
```

## getToURL

```js
console.log("請求攔截中的url：", config.url);
console.log("請求攔截中的params:", config.params);
if (config.params != undefined) {
  // 轉為鍵值對陣列形式 ,然後使用 reduce 將其拼接，最後替換掉第一個'&'為'?'
  let result = Object.entries(config.params)
    .reduce((prev, curr) => {
      return prev + ("&" + curr[0] + "=" + curr[1]);
    }, "")
    .replace("&", "?");
  console.log("處理完畢的params轉url:", result);

  config.url = config.url + result;
}
```

```js
// 排列演算法，n中m個元素。m不能大於n
// n! 就是 n(n-1)(n-2)(n-3)……(n-m+1)
// 如：7個人拍成一列，有幾種排法？因每人都可以移動，所以是a的下7上7 =

/*
在數學中有排列組合，用來計算機率。

比如：從4個數字中，任意選擇兩個的情況。從5個數字中任意選擇3個數字的情況。（這裡我們只考慮沒有順序的情況）。

公式：C(n,m)=n!/[m!(n-m)!]=n*(n-1)*...*(n-m+1)/[1*2*...*m],如C(5,2)=[5*4]/[1*2]=10.

舉例說明：有 1,2,3,4 四個數字，從這四個數字中，任意選擇兩個數字一共有多少種情況：[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]一共有這六種情況。

下面用程式碼實現從5個數字中任意選擇3個的情況(不考慮順序)。
 */

var array = [1, 2, 3, 4, 5];
for (var i = 0, len1 = array.length; i < len1; i++) {
  var a2 = array.concat();
  /*
    排除之前已經組合過的資料
    比如：第一次的時候，i[0] = 1, 這個時候2層迴圈, 只迴圈 2~5, 
    第二次的時候, i[1] = 2, 這個時候2層迴圈, 只迴圈 3~5
    同理：3層迴圈也是相比於2層迴圈來
    */
  a2.splice(0, i + 1);
  for (var j = 0, len2 = a2.length; j < len2; j++) {
    var a3 = a2.concat();
    a3.splice(0, j + 1);
    for (var k = 0, len3 = a3.length; k < len3; k++) {
      console.log(array[i] + " " + a2[j] + " " + a3[k]);
    }
  }
}

// 組合演算法。

// 資料庫的傳統集合運算（並、差、交、笛卡爾積）和專門的關係運算（選擇、投影、連線、除運算）

// SKU 笛卡爾積

// 將陣列新增到另一個數組
let array = ["a", "b"];
let elements = [0, 1, 2];
array.push.apply(array, elements);
// console.info(array); // ["a", "b", 0, 1, 2]

// 陣列求和
let arr = [1, 2, 3, 4, 5];
// 方式一
let result = arr.reduce((sum, current) => sum + current, 0);
// alert(result); // 15
// 方式二
arr.reduce((prev, current) => {
  return prev + current;
}, 0);

// eval() 函式會將傳入的字串當做 JavaScript 程式碼進行執行
// 比其他替代方法更慢，因為它必須呼叫 JS 直譯器。慎用
// console.log("SUM:", eval(arr.join("+")));

// 根據輸入值，輸出該值所在範圍

/**
 * 業務中獨立的變數轉化成陣列和物件結構
 * 陣列多重對比，確定所屬範圍的邏輯,根據毫秒數，返回顏色值
 * 綠：0-30mm ； 黃：30-100mm ； 橙：100-250mm； 紅：>250mm
 */
let datas = [
  {
    time: 30,
    color: "normal",
  },
  {
    time: 100,
    color: "orange",
  },
  {
    time: 250,
    color: "yellow",
  },
];

// 再透過高效的api進行處理
function iconFilter(num, data) {
  if (num < 0) return;
  let selectData = data.find((item) => num <= item.time);
  return selectData ? selectData.color : "red";
}
// console.log(iconFilter(88, datas));

// 陣列物件比較
/* 以資料中的 [baseEntry] 及 [baseLineId] 作為判定 */
let table = [
  {
    baseEntry: 2,
    baseLineId: 2,
    id: 2,
    itemCode: "B00002",
    itemDescription: "或天戟",
    quantity: 1,
    openQuantity: 1,
  },
  {
    baseEntry: 3,
    baseLineId: 3,
    id: 3,
    itemCode: "B00002",
    itemDescription: "或天戟",
    quantity: 9,
    openQuantity: 9,
  },
];
let args = [
  {
    baseEntry: 2,
    baseLineId: 2,
    id: 2,
    itemCode: "B00002",
    itemDescription: "或天戟",
    quantity: 1,
    openQuantity: 1,
  },
  {
    baseEntry: 3,
    baseLineId: 4,
    id: 4,
    itemCode: "B00004",
    itemDescription: "計都刀",
    quantity: 7,
    openQuantity: 7,
  },
];

/**
 * 暫存 每次嚮導操作完成後，帶過來的[args]資料集
 * map一下 args ，於 table中find 基本[baseEntry]單據編號相同，[baseLineId]基本行號相同，則認為是重複資料
 * 若find為 undefind ，則將該項，push到temp ，最後為陣列，新增到 table
 */
let temp = []; // 暫存滿足條件的資料
args.map((argsItem) => {
  // 根據條件查詢 ： 單項資料的基本[baseEntry]單據編號相同，並且[baseLineId]基本行號相同，則認為是重複資料
  if (
    table.find(
      (item) =>
        item.baseEntry === argsItem.baseEntry &&
        item.baseLineId === argsItem.baseLineId
    ) == undefined
  ) {
    // console.log(`ArgsITEM:${argsItem.baseEntry},${argsItem.baseLineId}`);
    temp.push(argsItem);
  }
});
// apply() 方法呼叫一個具有給定this值的函式，以及作為一個數組（或類似陣列物件）提供的引數。
table.push.apply(table, temp);

// 合併陣列物件相同 KEY 的值
// 測試比較陣列物件， 相同key相加
let res = [
  {
    id: "B00001",
    batches: [
      {
        name: "A1",
        count: 3,
      },
      {
        name: "A2",
        count: 6,
      },
      {
        name: "A1",
        count: 9,
      },
      {
        name: "B1",
        count: 6,
      },
      {
        name: "A1",
        count: 12,
      },
    ],
  },
  {
    id: "B00002",
    batches: [
      {
        name: "B1",
        count: 4,
      },
      {
        name: "B2",
        count: 5,
      },
      {
        name: "B1",
        count: 6,
      },
      {
        name: "A1",
        count: 12,
      },
    ],
  },
];
for (let i = 0; i < res.length; i++) {
  if (!res[i].batches) continue;
  let newRES = [];
  // 用於確定一個 cur ，作為key值的判定條件
  res[i].batches.reduce((pre, cur) => {
    let temp = res[i].batches
      // 過濾 返回， key值相同的批次資料集
      .filter((i) => i.name === cur.name)
      // 計算上一步結果資料集中，指定屬性的值合併結果
      .reduce((p, c) => {
        // 將其返回為一個新的物件
        return {
          name: p.name,
          count: p.count + c.count,
        };
      });
    // 如果新陣列中，找不到key值相同的元素，
    if (newRES.find((i) => i.name === temp.name) == undefined) {
      // 將該元素，新增到 新陣列
      newRES.push(temp);
    }
  }, 0);
  // 將處理好的新陣列，賦值給當前資料中的批次資料集
  res[i].batches = newRES;
}
// console.log("RES:", res);

// 陣列完全展開，代替 flat不支援的情況
function myFlat(arr) {
  while (arr.some((t) => Array.isArray(t))) {
    arr = [].concat.apply([], arr);
  }
  return arr;
}
let arrTest1 = [1, [2, 3, [4]], 5, 6, [7, 8], [[9, [10, 11], 12], 13], 14];
// Expected Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
// console.log(myFlat(arrTest1));

/** chrome 69以上才支援 */
let arr1 = [1, 2, [3, 4]];
// console.log("陣列拍平", arr1.flat()); // 陣列拍平，一層
let arr2 = [1, 2, [3, [4, 5]]];
// console.log("陣列拍平", arr2.flat(2)); // 陣列拍平多層
let arr3 = [1, [2, [3, [4]]]];
// console.log("陣列降維", arr3.flat(Infinity)); //陣列拍平無限層級

/**
 * 對比兩個物件是否相等
 * @param {*} obj1 物件1
 * @param {*} obj2 物件2
 */
export function equalObject(obj1, obj2) {
  // 型別對比
  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;
  // obj.toString() 效果與上相同 [object object]，但[↑返回true/false]，[↓返回string]
  // if (!obj1.toString() || !obj2.toString()) return false;
  // 長度對比
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  // 每個key對比
  return Object.keys(obj1).every((v) => obj1[v] === obj2[v]);
}

let obj1 = {
  a: "1",
  b: "2",
};
let obj2 = {
  b: "2",
  a: "1",
};
// console.log(equalObject(obj1, obj2));

/**
 * 字串轉陣列 將文章名字按照一個數字一位，進行轉換，如10轉換為['1','0']
 * @param {*} value 傳入的字串，將其切分為陣列
 */
const stringToArray = (value) => value.split("");

/**
 * 陣列轉字串，如['一','〇']轉換為一〇
 * @param {*} value
 */
const arrayToString = (value) => value.join("");

/**
 * 數字轉為漢字
 * @param {*} value 傳入的數字，只接收單個數字
 */
const numberToString = (value) => {
  // console.log("傳入的數字:", value); // 切分為單個數字
  let result = "";
  switch (value) {
    case "0":
      result = "〇";
      break;
    case "1":
      result = "一";
      break;
    case "2":
      result = "二";
      break;
    case "3":
      result = "三";
      break;
    case "4":
      result = "四";
      break;
    case "5":
      result = "五";
      break;
    case "6":
      result = "六";
      break;
    case "7":
      result = "七";
      break;
    case "8":
      result = "八";
      break;
    case "9":
      result = "九";
      break;
    default:
      return;
  }
  // console.log('轉換後的值：', result);
  return result;
};

/**
 * 切割檔案字尾名
 * @param {*} value 需切割的檔名(含字尾名)
 */
const excisionFileExtension = (value) =>
  value.substring(0, value.lastIndexOf("."));

/** 資料格式，後臺返回為:{name:"1.md",download_url:"https://raw.githubusercontent.com"}
 * 檔名切割，物件中新增id，值為檔名；新增一個轉換後的漢字數字
 * 根據 item.id排序後顯示
 */

const tempCurry = (name) => (download_url) =>
  `Name:${name} | download_url:${download_url}`;
console.log(`輸出:`, tempCurry("aa")("bb"));

resultData.map((item) => tempCurry(item.name)(item.download_url));
console.log("新的資料結果：", resultData);
```

## 2020.10.19

- 組合模式(把方法提取到獨立的類和輔助物件中，然後組合起來，但不使用繼承) 組合勝過繼承

### 類

- 定義不能提升，受塊作用域限制
- 類繼承：繼承類，也可繼承普通建構函式

### 繼承

- 原型鏈繼承 (缺點:原型包含引用值會在所有例項間共享)
- 盜用建構函式(缺點:必須在建構函式中定義方法，函式不能重用)
- 組合繼承（綜合以上兩種的優點）(缺點:被繼承物件的例項屬性重複呼叫)
- 原型式繼承 (Object.create()適合無需單獨建立建構函式,又需物件間共享資訊)
- 寄生式繼承
- 寄生式組合繼承，實現基於型別繼承的最有效的方式

```js
/** 寄生式組合繼承 */
/**
 * 不透過呼叫父類建構函式為子類原型賦值，取得父類克原型副本
 * childC :子類建構函式
 * parentC:父類建構函式
 */
function inheritPrototype(childC, parentC) {
  // 建立物件 建立父類原型副本
  let prototype = Object(parentC.prototype);
  // 增強物件 設定constructor屬性，解決重寫原型導致constructor丟失問題
  prototype.constructor = childC;
  // 賦值物件 新建立的物件賦值給子型別的原型
  childC.prototype = prototype;
}
function Demo(val) {
  this.val = val;
  this.colors = ["red", "aqua", "blue"];
}
Demo.prototype.fun = function () {
  console.log("this.val:", this.val);
};
function Demo2(val, val2) {
  //繼承屬性 或者 Demo.apply(this,val)
  Demo.call(this, val);
  this.val2 = val2;
}
// 呼叫子型別原型賦值函式
inheritPrototype(Demo2, Demo);

Demo2.prototype.fun2 = function () {
  console.log("this.val2:", this.val2);
};

let instance1 = new Demo2("satya", 1);
instance1.colors.push("black");
console.log("colors:", instance1.colors);
instance1.fun();
instance1.fun2();

let instance2 = new Demo2("lokavit", 3);
console.log("colors:", instance2.colors);
instance2.fun();
instance2.fun2();
```

```js
/** 組合繼承 */
function Demo(val) {
  this.val = val;
  this.colors = ["red", "aqua", "blue"];
}
Demo.prototype.fun = function () {
  console.log("this.val:", this.val);
};
function Demo2(val, val2) {
  //繼承屬性 或者 Demo.apply(this,val)
  Demo.call(this, val);
  this.val2 = val2;
}
// 繼承方法
Demo2.prototype = new Demo();
Demo2.prototype.fun2 = function () {
  console.log("this.val2:", this.val2);
};

let instance1 = new Demo2("satya", 1);
instance1.colors.push("black");
console.log("colors:", instance1.colors);
instance1.fun();
instance1.fun2();

let instance2 = new Demo2("lokavit", 3);
console.log("colors:", instance2.colors);
instance2.fun();
instance2.fun2();
```

### 建立物件

- 原型模式

```js
function Demo() {}
let Demoo = function () {};

// 避免 Object.setPrototypeOf()造成的效能下降，改為建立物件並指定原型
let demo1 = { a: 1 };
let demo2 = Object.create(demo1);
demo2.b = "val";
console.log(Object.getPrototypeOf(demo2) === demo1);

// 原型語法
function Demo3() {}
Demo3.prototype.a = "val-a";
Demo3.prototype.fun = function () {
  console.log("a:", this.a);
};

// 其他原型語法
function Demo4() {}
Demo4.prototype = {
  // constructor:Demo4, // [[enumerable]]:true
  a: "val-a",
  fun: function () {
    console.log("a:", this.a);
  },
};
// 追加恢復constructor
Object.defineProperty(Demo4.prototype, "constructor", {
  enumerable: false,
  value: Demo4,
});
```

- 建立物件 建構函式模式

```js
function Demo(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  // 該函式可以定義在外部
  this.fun = function () {
    console.log(this.a);
  };
  this.fun2 = fun2;
}
function fun2() {
  console.log(this.a);
}

let demo = new Demo("vala", "valb", "valc");
demo.fun();

let Demo2 = function Demo(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.fun = function () {
    console.log(this.a);
  };
};
// 建構函式
let demo2 = new Demo2("vala", "valb", "valc");
demo2.fun();

// 作為函式呼叫，新增到window物件
Demo2("a-val", "b-val", "c-val");

/**
 * 在另一個物件的作用域呼叫
 * 物件o為Demo2內部的this值，執行後所有屬性和方法會新增到物件o上。
 */
let o = new Object();
Demo2.call(o, "a-val", "b-val", "c-val");
o.fun();
```

## DOM 操作

### 選擇器

- Element.querySelector()
- Element.closest()
- Element.matches()

## 字串處理

### String Format

```js
/* 按照指定位數及指定分隔符進行分割 */
const STRING_FORMAT = (s, sp, sep) => {
  sp = sp || 3;
  sep = sep || ",";
  var i = s.length % sp,
    r = i ? [s.slice(0, i)] : [];
  for (; i < s.length; i += sp) {
    r.push(s.substr(i, sp));
  }
  return r.join(sep);
};

/* 使用方式 */
STRING_FORMAT("315576000"); // '315,576,000'
STRING_FORMAT("315576000", 2, " "); // '3 15 57 60 00'
STRING_FORMAT("315576", 1, "-"); // '3-1-5-5-7-6'
```

### HTMLSTRING TO DOM

#### 按照效能

- document.createDocumentFragment()一次新增多節點
- Range.createContextualFragment()•優勝者（最快在火狐）
- Element.insertAdjacentHTML()•優勝者
- Element.innerHTML•優勝者
- DOMParser.parseFromString()•慢 90%

#### document.createDocumentFragment()

```js
const htmlToElement = (html) => ({
  /* ... */
});
const fragment = document.createDocumentFragment();
items.forEach((item) => {
  const node = htmlToElement(`<div>${item.name}</div>`);
  fragment.appendChild(node);
});
document.body.appendChild(fragment);
```

#### Range.createContextualFragment()

```js
const table = document.createElement(`table`);
const tbody = document.createElement(`tbody`);
table.appendChild(tbody);

const range = document.createRange();
range.selectNodeContents(tbody);
const node = range.createContextualFragment(`<tr><td>Foo</td></tr>`); //=> tr

//
const template = document.createElement("template");
template.innerHTML = `<tr><td>Foo</td></tr>`;
const node = template.content.firstElementChild; //=> tr
```

#### Element.insertAdjacentHTML()

```js
// 原為 <div id="one">one</div>
var d1 = document.getElementById("one");
d1.insertAdjacentHTML("afterend", '<div id="two">two</div>');
// 此時，新結構變成：
// <div id="one">one</div><div id="two">two</div>

// 將指定的文字解析為 Element 元素，並將結果節點插入到DOM樹中的指定位置
el.insertAdjacentHTML("beforebegin", string_of_html);
el.insertAdjacentHTML("afterbegin", string_of_html);
el.insertAdjacentHTML("beforeend", string_of_html);
el.insertAdjacentHTML("afterend", string_of_html);
```

#### DOMParser.parseFromString()

```js
// HTML字串轉dom,t
let dom = new DOMParser().parseFromString(string_of_html, "text/html");
```

---

### getComputedStyle()

```js
/**
 * 獲取指定元素對應CSS屬性的最終計算值。只讀
 *  @param {*} element 指定的元素
 *  @param {*} pseudoElt 可選。表示指定元素的偽元素(:before、:after等)
 */
window.getComputedStyle(element, [pseudoElt]);
window.getComputedStyle(first, null);
window.getComputedStyle(first, ":before");

/** 小封裝一下，便於使用
 * 檢查元素中是否有style的指定屬性
 * @param {*} el 需檢查的指定元素
 * @param {*} attr 元素中style的指定屬性
 * @return 返回屬性值
 */
const CHECK_STYLE = (el, attr) => {
  let attr_value = getComputedStyle(el, null)[attr];
  // 如果沒有該屬性樣式值 或者屬性樣式值是'static',返回 ""，否則返回屬性值
  return !attr_value || attr_value === "static" ? "" : attr_value;
};
```

```js
// 假設 .css檔案中 html{--color-accent: #00eb9b;}
const colorAccent = getComputedStyle(document.documentElement).getPropertyValue(
  "--color-accent"
); // #00eb9b
```

---

```js
/**
 * 建立dom元素 [隱式return寫法]
 * @param {*} element 元素名
 * return:根據傳入的元素名，返回建立的元素
 * use:createElement('div');
 */
export const createElement = (element) => document.createElement(element);

/**
 * 建立Input 元素，設定其必要屬性
 * @param {*} name 元素的name屬性值(外部傳入)
 * @param {*} text 元素的提示明文(外部傳入)
 */
export const createInput = (name, text) => {
  let _input = createElement("input");
  // _input.type = "text"; // input型別
  _input.name = name; // name屬性
  _input.required = "required"; // 校驗
  _input.placeholder = `請輸入${text}`; // 輸入提示
  _input.style.marginLeft = "20px"; // input的外左邊距
  return _input; // 返回建立的元素
};

/**
 * 建立Label 元素，設定必要屬性
 * @param {*} text 元素的明文(外部傳入)
 */
export const createLabel = (text) => {
  let _label = createElement("label");
  _label.innerHTML = `${text}`;
  _label.style.paddingRight = "20px"; // label的內右邊距
  return _label;
};

/** form.js */
/** 表單序列化
 * 獲取form下所有輸入值，最終輸出為JSON物件
 * @param {*} formName 表單的name屬性值
 * @return JSON物件，用於POST提交的body
 */
export function serializeForm(formName) {
  // let formData = {}; // 用於儲存序列化的JSON物件
  // 利用 FormData 物件獲取 roleForm 提交內容
  const formData = new FormData(formName);
  // // 這是一種取值的方式。具體如何組織內容，此處不展開
  // console.table([...formData.entries()]);
  // 獲取所有 當前表單中，所有 label 標籤。返回結果為類陣列形式
  let allLabel = formName.getElementsByTagName("label");
  console.log("所有LABEL:", allLabel);
  let infoData = []; // 用於儲存info陣列物件
  /**
   * 將類陣列轉陣列，而後遍歷
   * 引數一:待轉換類陣列
   * 引數二:在集合中每個專案上呼叫的函式。即將遍歷函式作為引數二使用。
   * 也可寫作:Array.from(allLabel).forEach((item,index)=>{some code ……})
   */
  Array.from(allLabel, (item, index) => {
    // 每個label的明文內容，其下input的 name屬性值，以及其value
    // console.log(`ITEM內容:${item.textContent},其第一個子元素input的name屬性值:${item.firstElementChild.name},及value:${item.firstElementChild.value}`);
    // 如果是名字項
    if (item.firstElementChild.name == "name") {
      // 最終返回表單物件的name屬性，賦值為當前項的value
      formData.name = item.firstElementChild.value;
    }
    // 如果 input的name屬性值，包含[info_]字串，將他們存為一個數組物件
    if (item.firstElementChild.name.indexOf("info_") > -1) {
      console.log(`找到包含info_字首的:${item.firstElementChild.name}`);
      infoData.push({
        key: item.textContent, // "年齡",即label的明文
        value: item.firstElementChild.value, //
      });
    }
  });

  console.table(infoData);
  formData.info = infoData;

  // formData = {
  //     // name: formName.name.value,
  //     // info: [{
  //     //     key: config.role.info[0].key,
  //     //     value: formName.info_0.value,
  //     // }, {
  //     //     key: config.role.info[1].key,
  //     //     value: formName.info_1.value
  //     // }]
  //     // infoData,
  // }

  console.log("表單資料:", formData);
  return formData;
}

/** modal.js */
class Modal {
  constructor() {}

  /**
   * 建立一個彈層，展示章節具體內容
   * @param {*} data modal中顯示的內容
   */
  createModal(data) {
    let modalMask = document.createElement("div"); // modal遮罩
    modalMask.setAttribute("class", "modal_mask"); // 遮罩樣式
    modalMask.setAttribute("id", "modal"); // 遮罩id
    modalMask.style.display = "block"; // 遮罩塊級

    let modal = document.createElement("div"); // modal整體
    modal.setAttribute("class", "modal"); // modal整體樣式

    let modalHeader = document.createElement("header"); // modal 頭部
    let cwordCount = document.createElement("label"); // header 字數統計部分
    cwordCount.innerText = `字數:${data.length}`; // 此處呼叫字數統計函式，
    modalHeader.appendChild(cwordCount);
    let close = document.createElement("span"); // 頭部右側關閉按鈕
    close.innerText = "X";
    close.onclick = (event) => {
      closeModal(); // 點選按鈕，呼叫關閉事件
    };
    modalHeader.appendChild(close);
    let modalBody = document.createElement("main"); // 內容主體
    modalBody.setAttribute("class", "scrollbar"); // 主體下超長隱藏所需div
    let scrollbarInsetDiv = document.createElement("div"); // 主體下超長隱藏所需div 之內層div
    scrollbarInsetDiv.setAttribute("class", "scrollbar_inset_div");
    let modalSection = document.createElement("section"); // 實際渲染的文章內容區域
    modalSection.innerText = data; // 請求的文章內容，原樣輸出 [innerHTML則會改格式]

    scrollbarInsetDiv.appendChild(modalSection);
    modalBody.appendChild(scrollbarInsetDiv);
    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);

    modalMask.appendChild(modal);
    document.body.appendChild(modalMask);
  }
}

export default new Modal();

/**
 * 關閉 模態框 事件
 */
function closeModal() {
  let modal = document.getElementById("modal");
  modal.style.display = "none";
  modal.parentElement.removeChild(modal); // 找到modal父級，刪除modal節點
}

/** util.js */
/**
 * 切割檔案字尾名
 * @param {*} value 需切割的檔名(含字尾名)
 */
export const excisionFileExtension = (value) =>
  value.substring(0, value.lastIndexOf("."));

/**
 * 字串轉陣列 將文章名字按照一個數字一位，進行轉換，如10轉換為['1','0']
 * @param {*} value 傳入的字串，將其切分為陣列
 */
export const stringToArray = (value) => value.split("");

/**
 * 陣列轉字串，如['一','〇']轉換為一〇
 * @param {*} value 待轉換的陣列
 */
export const arrayToString = (value) => value.join("");

/**
 * 將陣列元素反轉
 * @param {*} value 待反轉的陣列
 */
export const arrayReverse = (value) => value.reverse();

/**
 * 數字轉為漢字 0-9=> 〇-九
 * @param {*} value 傳入的數字，只接收單個數字
 */
export const numberToString = (value) => {
  console.log("傳入的數字:", value); // 切分為單個數字
  let result = "";
  switch (value) {
    case "0":
      result = "〇";
      break;
    case "1":
      result = "一";
      break;
    case "2":
      result = "二";
      break;
    case "3":
      result = "三";
      break;
    case "4":
      result = "四";
      break;
    case "5":
      result = "五";
      break;
    case "6":
      result = "六";
      break;
    case "7":
      result = "七";
      break;
    case "8":
      result = "八";
      break;
    case "9":
      result = "九";
      break;
    default:
      return;
  }
  console.log("轉換後的值：", result);
  return result;
};

/**
 * 產生隨機整數，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之間的一個隨機整數
 */
export function randomIntNumber(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
 * 生成隨機值
 * @param {*} data 可以隨機的陣列
 * return: 陣列中，隨機值的那個元素值
 */
export function genterateRandomString(data) {
  if (!data.length) return;
  return data[randomIntNumber(0, data.length - 1)];
}

/**
 * 返回隨機值下標的字元
 * @param {*} data 字串
 * return:下標所指的字元
 */
export function genterateRandomChar(data) {
  if (!data) return;
  return data.charAt(randomIntNumber(0, data.length - 1));
}

/**
 * 處理檔名，去掉字尾名
 * @param {*} name 傳入的檔名(含字尾名)
 * return: 去掉字尾名的檔名
 */
export function fileName(name) {
  return name.substring(0, name.lastIndexOf("."));
}

/**
 * 顏色隨機
 * return: 返回一個隨機顏色值
 */
export function randomColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += ((Math.random() * 16) | 0).toString(16);
  }
  return color;
}

/**
 * 對比兩個物件是否相等
 * @param {*} obj1 物件1
 * @param {*} obj2 物件2
 */
export function equalObject(obj1, obj2) {
  // 型別對比
  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;
  // obj.toString() 效果與上相同 [object object]，但[↑返回true/false]，[↓返回string]
  // if (!obj1.toString() || !obj2.toString()) return false;
  // 長度對比
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  // 每個key對比
  return Object.keys(obj1).every((v) => obj1[v] === obj2[v]);
}
```

- 動態生成

```js
const Systems = [
  {
    folder: "article",
    title: "ESSAY",
    name: "隨筆",
  },
  {
    folder: "game",
    title: "GAME",
    name: "遊戲",
  },
  {
    folder: "article",
    title: "FICTION",
    name: "小說",
  },
  {
    folder: "script",
    title: "SCRIPT",
    name: "劇本",
  },
  {
    folder: "design",
    title: "DESIGN",
    name: "設計",
  },
  {
    folder: "example",
    title: "EXAMPLE",
    name: "示例",
  },
];

let nav_systems = document.querySelector(".nav_system");

Systems.forEach((item) => {
  let system_item = `
    <section data-folder="${item.folder}">
       <span class="box-title">${item.title}</span>
       <div class="hsl">
           <h1>${item.name}</h1>
       </div>
   </section>
   `;
  nav_systems.innerHTML += system_item;
});

/** 獲取頁面所有子系統 */
Array.from(nav_systems.children).forEach((nav_item) => {
  nav_item.onclick = function () {
    // 每次點選時，優先清理快取的書籍資訊
    localStorage.removeItem("system");
    /** 跳轉到指定頁面 */
    location.href = `./system/${nav_item.dataset.folder}/index.html`;
    // 重新快取選中的書籍資訊
    localStorage.setItem(
      "system",
      nav_item.firstElementChild.textContent.toLowerCase()
    );
  };
});
```

# Temp Note

```js
function fn() {}
console.dir(fn); // prototype __proto__
const fn2 = (a, b) => console.log(a + b);
console.dir(fn2); // __proto__
// 由上可知:箭頭函式沒有prototype。不是函式建構函式，不能用作原型
```

```js
/**
 * 建立prototype的新例項
 * 使用 new 的語法
 * 1. 函式呼叫建構函式
 * 2.new object{} 已建立
 * 3. __proto__ 已新增
 * 4. props已新增(可選)
 * 5. 物件由建構函式返回
 * @param {*} props
 */
function CivilPlane(props) {
  console.log(this); // {__proto__:...}
  console.log(this.__proto__); // CiviPlane.prototype
  this.numberOfSeats = props.numberOfSeats;
  console.log(this); // {numberOfSeats:...,__proto__:...}

  /** 不要這樣寫。該方法將新增到原型每個例項中 */
  //   this.seatsInfo = function () {
  //     console.log(`?${this.numberOfSeats}`);
  //   };
}

/** 此為，正確將方法新增到原型的方式
 * 注:此方式不可寫為箭頭函式形式,會發生undefined(因箭頭函式會this到window)
 */
CivilPlane.prototype.seatsInfo = function () {
  console.log(this); // 原型例項
  console.log(`?${this.numberOfSeats}`);
};

CivilPlane.prototype.modifySeatsNumber = function (newSeatsOty) {
  this.numberOfSeats = newSeatsOty;
};

const propsForSmallPlane = {
  numberOfSeats: 5,
};
const smallPlane = new CivilPlane(propsForSmallPlane);
console.log(smallPlane);
console.log(smallPlane.__proto__ === CivilPlane.prototype); // true
console.log(smallPlane.seatsInfo());
smallPlane.seatsInfo(); // 5
smallPlane.modifySeatsNumber(7); // 7
smallPlane.seatsInfo(); // 7
smallPlane.numberOfSeats = 9; // 直接改變其值

const propsForLagePlane = { numberOfSeats: 333 };
const lagePlane = new CivilPlane(propsForLagePlane);

const Parent = {
  type: "Parent",
  typeInfo: function () {
    console.log(`form ${this.type}`);
  },
  modifyType: function (newType) {
    this.type = newType;
  },
};
console.log(Parent.type); // "Parent"
Parent.typeInfo(); // form Parent
console.log(Parent.prototype); // undefined

/** 這樣建立的child __proto__是Parent相關 */
const child = Object.create(Parent);
console.log(child.__proto__ === Parent); // true
child.typeInfo(); // from Parent
child.type = "Child"; //Child
child.typeInfo(); // from Child
child.modifyType("Modified Child");
console.log(child.type); // Modified Child
child.typeInfo(); // from Modified Child

// 17節 原型鏈

// 21節 instanceof typeof
smallPlane instanceof CivilPlane; // true
CivilPlane instanceof Airplane; // false
// 以上兩個不同結果，則因前者new 建立，後者Object.create()建立
```

## 庫 函式版

```js
/** lib/uid.js */
export function GenerateUID() {}
export const Add = () => {};

/** lib/convert-types.js */
export const StyleToString = (styleObj) => {
  return str;
};

/** lib/index.js */
import * as Uid from "./uid";
import * as ConvertTypes from "./convert-types";
export default { ConvertTypes, Uid };

/** use/test.js */
import Commonjs from "commonjs";
console.log("CLASS:", Commonjs);
// 如下:呼叫通用庫中型別轉換模組下的樣式轉字串函式
this.props.domElement.style.cssText = Commonjs.ConvertTypes.StyleToString(
  this.props.style
);
```

## 庫 類-物件 prototype

```js
/** lib/colour.js */
class Colour {
  constructor() {
    this._colour = "black";
  }
  getColour() {
    console.log("類=獲取顏色函式:", this._colour);
    return "aqua";
  }
}
export default Colour;

/** lib/index.js */
import * as Colour from "./colour";
export default { Colour };

/** use/test.js */
import Commonjs from "commonjs";
console.log("引入私有庫:", Commonjs.Colour.default.prototype.getColour());
```

## 庫 類版 使用時類例項化

```js
/** lib/colour.js */
class Colour {
  constructor() {
    this._colour = "black";
  }
  getColour() {
    console.log("類=獲取顏色函式:", this._colour);
    return "aqua";
  }
}
export default Colour;

/** lib/index.js */
import Colour from "./colour";
export default { Colour };

/** use/test.js */
import Commonjs from "commonjs";
let Colour = new Commonjs.Colour();
console.log("顏色類例項化:", Colour.getColour());
```

- 頁面自動跳轉

```js
<script language="javascript">
    function goHome() {
        var url = "./client/index.html";
        location.href = url;
    }
</script>

<body onload="setTimeout('goHome()', 500);"> </body>
```

- github API

```js
const USER_URL = "https://api.github.com/users/Lokavit";

fetchGithub(USER_URL).then((data) => {
  let uNameParent = document.getElementById("uname");
  let h1 = document.createElement("h1");
  h1.setAttribute("class", "uname");
  h1.innerHTML = data.name;
  uNameParent.appendChild(h1);

  let h3 = document.createElement("h3");
  h3.setAttribute("class", "bio");
  h3.innerHTML = data.bio;
  uNameParent.appendChild(h3);
});

async function fetchGithub(url) {
  try {
    // 鏈式：
    // return fetch(url).then(res => res.json()).then(data => alert(data.name));
    const res = await fetch(url);
    console.log("RES:", res);
    const data = await res.json();
    console.log("data:", data);
    return data;
    // return alert(data.name);
  } catch (e) {
    console.error(e);
  }
}
```

- 驗證

```js
//這些驗證有關的資訊一般可能來自 別的模組 或者 AJAX請求
const validationList = [
  {
    name: "username",
    pattern: /正則表示式/,
    content: "6-20位字母、數字或“_”,字母開頭",
  },
  {
    name: "password",
    pattern: /正則表示式/,
    content: "6-18位，包括數字字母或符號，中間不能有空格",
  },
  {
    name: "check_password",
    pattern: /正則表示式/,
    content: "請輸入相同的密碼",
  },
  {
    name: "fullname",
    pattern: /正則表示式/,
    content: "真姓名，兩位到四位的中文漢字",
  },
  {
    name: "id_number",
    pattern: /正則表示式/,
    content: "5位或者18位的數字，18位時最後一位可能是x",
  },
  {
    name: "mail",
    pattern: /正則表示式/,
    content: "請輸入正確的郵箱地址",
  },
  {
    name: "phone_number",
    pattern: /正則表示式/,
    content: "請輸入正確的手機號碼",
  },
];

const container = document.querySelector("form#form_container"); //獲取包裝元素 用於事件委託
const passwordElement = document.querySelector("[name=password]"); //使用者密碼
const checkPasswordElement = document.querySelector("[name=check_password]"); //確認密碼
const checkPasswordHintEl = document.querySelector("span.checkpwd_hint"); //確認密碼的提示資訊 span
const inputs = document.querySelectorAll("input.user_input");
const spans = document.querySelectorAll("span.hint");

passwordElement.addEventListener("change", () => {
  //如果使用者密碼修改 清空 確認密碼 清空提示span
  checkPasswordElement.value = "";
  checkPasswordHintEl.innerText = "";
});

//事件代理
container.addEventListener("focusout", (event) => {
  event.stopPropagation(); //阻止冒泡
  const { value, name } = event.target;

  validationList.forEach((item, index) => {
    //處理邊界
    if (item.name !== name) {
      return;
    }

    //處理邊界
    if (item.name === "check_password") {
      const passwordValue = passwordElement.value;
      value === passwordValue
        ? (spans[index].innerText = "OK")
        : (spans[index].innerText = item.content);
      return;
    }

    item.pattern.exec(value)
      ? (spans[index].innerText = "OK")
      : (spans[index].innerText = item.content);
  });
});

container.addEventListener("submit", (event) => {
  event.preventDefault(); //阻止預設跳頁
  let sum = 0;
  spans.forEach((item, index) => {
    spans[index].innerText === "OK" && sum++;
  });
  sum === spans.length ? alert("驗證成功") : alert("驗證失敗");
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* .box{
            width: 0;
            height: 0;
            border: 100px #000 solid;
            border-color: #f00 #0f0 #00f #0ff;
            border-right: none;
            border-top: 100px solid transparent;
            border-bottom: 100px solid transparent;
        } */
      body {
        position: relative;
        margin: 20%;
      }

      .box {
        width: 120px;
        height: 208px;
        background-color: #0f0;
      }
      .box:before {
        content: "";
        width: 0;
        height: 0;
        border-right: 60px #0f0 solid;
        border-left: none;
        border-top: 104px solid transparent;
        border-bottom: 104px solid transparent;
        position: absolute;
        top: 0;
        left: -60px;
      }
      .box:after {
        content: "";
        width: 0;
        height: 0;
        border-left: 60px #0f0 solid;
        border-right: none;
        border-top: 104px solid transparent;
        border-bottom: 104px solid transparent;
        position: absolute;
        top: 0;
        left: 120px;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

## Module

- 天然嚴格模式
- import 關鍵字允許從其他模組中匯入一些諸如函式之類的功能等等。[取代 require]
- export 關鍵字表示在當前模組之外可以訪問的變數和功能。[取代 module.exports]
- 如果模組只有一個輸出值，就使用 export default，多個則在 function 前加[export],不要同時使用
- 不要在模組匯入中使用萬用字元。確保模組之中，有一個預設輸出（export default）

### 無憑證

如果請求來自同一個源（域名一樣），大多數基於 CORS 的 API 將傳送憑證（如 cookie 等），但 fetch()和模組指令碼是例外 – 除非您要求，否則它們不會發送憑證。

- crossorigin:HTML 屬性,可以明確<script>以及<img>等可外鏈元素在獲取資源時候，是否帶上憑證。
- anonymous:元素的跨域資源請求不需要憑證標誌設定。
- use-credentials:元素的跨域資源請求需要憑證標誌設定，意味著該請求需要提供憑證。
- 只要 crossOrigin 的屬性值不是 use-credentials，全部都會解析為 anonymous

```html
/* 未標記[type="module"]的 js 會優先且完整執行。 */
<script src="./recursion.js" type="module"></script>
/* 若皆標記[type="module"]則視為 js 模組，按照書寫順序執行。 */
<script src="./filter.js"></script>

/* ① 獲取資源會帶上憑證（如cookie等） 傳統JS載入，都是預設帶憑證的 */
<script src="1.js"></script>

/* ② 獲取資源不帶憑證 module模組載入預設不帶憑證 */
<script type="module" src="1.mjs"></script>

/* ③ 獲取資源帶憑證 -設定crossOrigin為匿名anonymous，將帶憑證 ->
<script type="module" crossorigin src="1.mjs?"></script>

/* ④ 獲取資源不帶憑證  import模組跨域，則設定crossOrigin為anonymous不帶憑證 */
<script type="module" crossorigin src="//cdn.zhangxinxu.com/.../1.mjs"></script>

/* ⑤ 獲取資源帶憑證 import模組跨域，且明確設定crossOrigin為使用憑證use-credentials，則帶憑證 */
<script
  type="module"
  crossorigin="use-credentials"
  src="//cdn.zhangxinxu.com/.../1.mjs?"
></script>
```

```js IIFE 立即呼叫函式表示式
// 因IIFE是一個函式，函式會建立新的變數作用域，常用於宣告不會影響IIFE外程式碼的變數
var a = 15;
(function IIFE(){
  var a = 11;
  console.log(a); // 11;
})();
console.log(a) // 15;

// 也可以是返回值形式
var x = (function IIFE{
  return 13;
})();
console.log(x) // 13;

```

```html
<body>
  <script>
    // 封裝請求函式 返回請求結果
    function getData() {
      return fetch("http://xxx.xxx.xx.xx:1111/roles").then((result) =>
        result.json()
      );
    }

    // 非同步函式 return只能是promise 所以資料在內部處理
    async function fetchData() {
      let res = await getData();

      console.warn(res.content);

      let _div = document.createElement("div");
      _div.innerHTML = res.content;
      document.body.appendChild(_div);
    }

    // 呼叫非同步函式
    fetchData();
  </script>
</body>
```

```js
var a = {
  value: 0,
  valueOf: function () {
    this.value++;
    return this.value;
  },
};
console.log(a == 1 && a == 2); //true
```

```js
/**
 * Normalize 8-bit color (RGB / RGBA) to [0, 1]. If A is missing, use 1.0.
 */
export function normalize8bitColor(color8bit: Vec3 | Vec4): Vec4 {
  return [...color8bit.map(x => x / 255), 1.0].slice(0, 4) as Vec4
}
```

```js 計時
const startTime = new Date().getTime(); // 開始時間
const endTime = new Date().getTime(); // 結束時間
let myTime = endTime - startTime; // 計算出來耗時
```

```html
<label id="label1" for="test">Label 1</label>
<input id="test" />
<label id="label2" for="test">Label 2</label>
<script>
  // HTMLInputElement.labels 為只讀屬性，它返回一個NodeList 例項，綁定當前的<input> 節點的<label> 元素。
  window.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("test");
    for (var i = 0; i < input.labels.length; i++) {
      console.log(input.labels[i].textContent); // "Label 1" and "Label 2"
    }
  });
</script>
```

```js
/** 表單驗證 */

console.log("找到所有帶驗證的", demo);
demo.setAttribute("novalidate", true);

document.addEventListener(
  "blur",
  (event) => {
    let error = hasError(event.target);
    console.log("錯誤:", error);
  },
  true
);

let hasError = (field) => {
  console.log("處理錯誤:", field);
  // Don't validate submits, buttons, file and reset inputs, and disabled fields
  if (
    field.disabled ||
    field.type === "file" ||
    field.type === "reset" ||
    field.type === "submit" ||
    field.type === "button"
  )
    return;

  // Get validity
  let validity = field.validity;
  console.log("validity:", validity);
};
```

---

## Document

- DOM 集合非陣列，只讀，即時，可用 for..of 迭代，不要 for..in 來遍歷

```js
<html> = document.documentElement
<body> = document.body 值可能為null[指令碼無法訪問在執行時不存在的元素]
<head> = document.head
childNodes, 集合提供了對所有子節點包括其中文字節點的訪問
firstChild, lastChild:訪問第一個和最後一個子元素的快捷方式
elem.hasChildNodes() 用於檢測節點是否有子節點
for (let node of document.body.childNodes) {
  alert(node); // shows all nodes from the collection
}
parentNode:父節點;nextSibling:下一個兄弟節點;previousSibling:上一個兄弟節點
只考慮元素節點時更多的導航連結:
children —— 只獲取型別為元素節點的子節點。
firstElementChild，lastElementChild —— 第一個和最後一個子元素。
previousElementSibling，nextElementSibling —— 兄弟元素。
parentElement —— 父元素。
for (let elem of document.body.children) { // 只顯示元素
  alert(elem); // DIV, UL, DIV, SCRIPT
}
table:除了以上，還有自己的屬性:
table.rows — 用於表示表中 <tr> 元素的集合。
table.caption/tHead/tFoot — 用於訪問元素 <caption>、<thead>、<tfoot>
table.tBodies — <tbody> 元素的集合（根據標準該元素數量可以很多）
<thead>、<tfoot>、<tbody> 元素提供了 rows 屬性:tbody.rows — 表內部 <tr> 元素的集合。
<tr>：
tr.cells — 在給定 <tr> 元素下 <td> 和 <th> 單元格的集合。
tr.sectionRowIndex — 在封閉的 <thead>/<tbody> 中 <tr> 的編號。
tr.rowIndex — 在表中 <tr> 元素的編號。
<td> 和 <th>：td.cellIndex — 在封閉的 <tr> 中單元格的編號。
```

```js
<table id="table">
  <tr><td>one</td><td>two</td></tr>
  <tr><td>three</td><td>four</td></tr>
</table>
<script>
  // 獲取第一行中第二個單元格的內容
  alert( table.rows[0].cells[1].innerHTML ) // "two"
</script>
```

```js
elem.querySelectorAll(css) 的呼叫將返回與給定 CSS 選擇器匹配 elem 中的所有元素
<ul><li>The</li><li>test</li></ul>
<ul><li>has</li><li>passed</li></ul>
let elements = document.querySelectorAll('ul > li:last-child');
for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
CSS 選擇器的偽類，如 :hover 和 :active
document.querySelectorAll(':hover')

elem.matches(css) 用於檢查 elem 與給定的 CSS 選擇器是否匹配。
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>
<script>
  // 不一定是 document.body.children，也可以是任何集合
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("The archive reference: " + elem.href );
    }
  }
</script>
elem.closest(css) 用於查詢與給定 CSS 選擇器相匹配的最近的祖先。elem 本身也會被檢查。
<h1>Contents</h1>
<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>
<script>
  let chapter = document.querySelector('.chapter'); // LI
  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV
  alert(chapter.closest('h1')); // null（因為 h1 不是祖先）
</script>
```

```js
// hidden 指定元素是否可見
<div hidden>With the attribute "hidden"</div>
<div id="elem">JavaScript assigned the property "hidden"</div>
<script>
  elem.hidden = true;
</script>

所有以 “data-” 開頭的特性值可以給程式設計人員正常使用，同時它還是 dataset 合法值。
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
<style>
  .order[data-order-state="new"] {color: green;}
  .order[data-order-state="pending"] {color: blue;}
  .order[data-order-state="canceled"] {color: red;}
</style>
<div id="order" class="order" data-order-state="new">A new order.</div>
<script>
  // 讀取
  alert(order.dataset.orderState); // new
  // 修改
  order.dataset.orderState = "pending"; // (*)
</script>
```

## 瀏覽器事件

- 函式應該作為 test 進行分發，而不是 test(),新增括號將是函式執行的結果

```js
button.onclick = test; // right
button.onclick = test(); // wrong
```

```html
<button onclick="openFormModal()">無參</button>
<button onclick="onTest(this)">傳元素</button>
<button onclick="onTestEvent(event)">傳事件</button>
<button onclick="onTestParam(123)">傳值</button>
<button onclick="onTestParams('321')">傳值</button>

<script>
  // 非箭頭函式寫法
  function onTest(args) {
    console.log(args);
  }

  // 箭頭函式寫法
  onTest = (args) => {
    console.log(args);
  };
  onTestEvent = (event) => {
    console.log(event);
  };
  onTestParam = (val) => {
    console.log(val);
  };
  onTestParams = (val) => {
    console.log(val);
  };
</script>
```

```html
<div class="book" id="zfem">
  <img
    src="https://raw.githubusercontent.com/…………/master/IMG/zfem.jpg"
    alt="ZFEM"
  />
</div>
<script>
  let zfemBtn = document.getElementById("zfem");
  zfemBtn.onclick = (event) => {
    console.log("EVENT:", event.target.alt);
    getZFEMContent(event.target.alt);
  };

  async function getZFEMContent(book) {
    const res = await httpGet(BASE_URL + book);
    console.log("RES:", JSON.parse(res));
  }
</script>
```

## Class 類

- class, extends, super
- class import export 多種寫法

```js
/**
 * 寫法一:
 */
/* demo.js */
class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }
}
export default Demo;
/* use.js 具體使用 */
import Demo from "./demo.js";
let demo = new Demo(); // 例項化類
demo.test(); // output: demo.js Demo test()!

/**
 * 寫法二:
 */
/* demo.js */
class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }
}
export default new Demo(); // 匯出時候就例項化
/* use.js 具體使用 */
import Demo from "./demo.js";
Demo.test(); // 無需例項化，直接使用

/**
 * 寫法三:
 */
/* demo.js */
export default class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }
}
/* use.js 具體使用 */
import Demo from "./demo.js";
let demo = new Demo();
demo.test();
```

### 建構函式

- getter,setter

```js
export class Demo {
  /**
   * 建構函式 constructor內定義的方法和屬性是例項物件自己的，而constructor外定義的方法和屬性則是所有例項物件可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    // 呼叫 setter
    this.name = name;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
}

/* use.js 具體使用 */
let demo = new Demo("satya");
// let demo = new Demo(''); // Name too short.
alert(demo.name);
```

### extends

- 意味著 Child.prototype.**proto** 將是 Parent.prototype，所以方法被繼承

```js
/**
 * 寫法四: 一個js裡，多個需要匯出的 or 匯出繼承的
 */
/* demo.js */
export class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }

  /**
   * 建構函式 constructor內定義的方法和屬性是例項物件自己的，而constructor外定義的方法和屬性則是所有例項物件可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stoped!`);
  }
}

/**
 * 類繼承 [extends]
 */
export class DemoChild extends Demo {
  hide() {
    alert(`${this.name}hides!`);
  }
}
/* use.js 具體使用 */
import { Demo, DemoChild } from "./demo.js";
let demo = new Demo("satya");
demo.test();
demo.run(10);
let demoChild = new DemoChild("shakya");
demoChild.hide();
```

### super

- 繼承父類函式，將其功能性擴充套件
- 執行 super.method(...) 呼叫父類方法
- 執行 super(...) 呼叫父類建構函式（只能在子類的建構函式中執行）。
- 箭頭函式沒有自己的 this 或 super

```js
/* demo.js */
export class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }

  /**
   * 建構函式 constructor內定義的方法和屬性是例項物件自己的，而constructor外定義的方法和屬性則是所有例項物件可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stoped!`);
  }
}

/**
 * 類繼承 [extends]
 */
export class DemoChild extends Demo {
  hide() {
    alert(`${this.name}hides!`);
  }

  stop() {
    super.stop(); // 呼叫父類的stop函式
    this.hide();
  }
}

/* use.js 具體使用 */
import { Demo, DemoChild } from "./demo.js";
let demo = new Demo("satya");
demo.test();
demo.run(10);
let demoChild = new DemoChild("shakya");
demoChild.stop();
```

### 重寫建構函式

- 如果一個類繼承了另一個類並且沒有 constructor，那麼將生成“空” constructor
- 繼承類的建構函式必須呼叫 super(...)，並且 (!) 一定要在使用 this 之前呼叫

```js
class DemoChild extends Demo {
  // 為沒有建構函式的繼承類生成以下的建構函式
  // 呼叫了父類的 constructor，並傳遞了所有的引數
  constructor(...args) {
    super(...args);
  }
}
```

```js
export class Demo {
  /**
   * 建構函式 constructor內定義的方法和屬性是例項物件自己的，而constructor外定義的方法和屬性則是所有例項物件可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stoped!`);
  }
}

/**
 * 類繼承 [extends]
 */
export class DemoChild extends Demo {
  /**
   * 重寫建構函式
   * @param {*} name
   * @param {*} earLength
   */
  constructor(name, earLength) {
    // 繼承類的建構函式必須呼叫 super(...)，並且 (!) 一定要在使用 this 之前呼叫
    // this.name = name;
    super(name); // super必須在 this.xxx= xxx 之前
    this.earLength = earLength;
  }

  hide() {
    alert(`${this.name}hides!`);
  }

  stop() {
    super.stop(); // 呼叫父類的stop函式
    this.hide();
  }
}
```

## destructuring 解構

### ES6 解構賦值

```js
let cat = "ken";
let dog = "lili";
let zoo = { cat, dog };
console.log(zoo); //Object {cat: "ken", dog: "lili"}

let dog = { type: "animal", many: 2 };
let { type, many } = dog;
console.log(type, many); //animal 2
```

## default, Rest parameters 剩餘引數

- 如果函式的最後一個命名引數以...為字首，則它將成為一個由剩餘引數組成的真陣列，其中從 0（包括）到 theArgs.length（排除）的元素由傳遞給函式的實際引數提供
- 只包含那些沒有對應形參的實參,是真正的 Array，可用直接使用所有的陣列方法，比如 sort，map，forEach 或 pop

- 當需要對物件中某一個或幾個屬性進行再處理時

```js
let { a, b, c, ...other } = this.form;
this.form = {
  a: "a的值",
  b: "b的值",
  c: "c的值",
  ...other,
};
```

- 當需要對傳入的物件引數進行處理時

```js
/**
  * 獲取當前頁面列表資料集
  * page: 當前頁
  * size: 每頁資料集條數
  * search: 於查詢框輸入的值,當其為物件時，使用[...search]解構
  */
async fetchData(page, size, search = {}) {
  let params = {
    page: page > 0 ? page - 1 : 0,
    size: this.tableData.size,
    ...search // 解構賦值
  };
  this.loading = true;
  try {
    let res = await getActivities(params);
    console.log("中日程列表資料集:", res);
    this.tableData = res;
    this.loading = false;
  } catch (err) {
    this.loading = false;
  }
},
```

- 當 剩餘引數作為函式引數的時候

```js
// 計算傳入不定引數結果
function sum(...theArgs) {
  alert(theArgs.length); // 可以使用length屬性得到剩餘引數的個數
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}
console.log(sum(1, 2, 3)); // expected output: 6
console.log(sum(1, 2, 3, 4)); // expected output: 10

// 解構剩餘引數
function f(...[a, b, c]) {
  return a + b + c;
}
f(1); // NaN (b and c are undefined)
f(1, 2, 3); // 6
f(1, 2, 3, 4); // 6 (the fourth parameter is not destructured)

// 剩餘引數包含了從第二個到最後的所有實參，然後用第一個實參依次乘以它們
function multiply(multiplier, ...theArgs) {
  return theArgs.map(function (element) {
    return multiplier * element;
  });
}
var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]

// 在剩餘引數上使用任意陣列方法
function sortRestArgs(...theArgs) {
  var sortedArgs = theArgs.sort();
  return sortedArgs;
}
alert(sortRestArgs(5, 3, 7, 1)); // 彈出 1,3,5,7
```

## async/await

- async:函式前面的「async」：該函式總是返回一個 promise。允許在函式內部使用 await。
- await:讓 JS 引擎等待直到 promise 完成並返回結果

```js
async function f() {
  return 1;
}
f().then(alert); // 1

async function f() {
  return Promise.resolve(1); // 顯式返回一個 promise
}
f().then(alert); // 1

async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });
  let result = await promise; // 等待直到 promise 決議 (*)
  alert(result); // "done!" // 一秒後顯示的
}
f();

// 包裹在一個匿名 async 函式中
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

## Promise

- 非同步程式設計的一種解決方案，比傳統的——回撥函式和事件——更合理更強大

```js
  /**
   * get 請求
   * @param {*} url 請求的url
   * @param {*} responseType  響應型別
   * return Promise
   * use: HTTP.get(BASE_URL_RAW + 'novel.json').then(data => rendererBook(Object.values(JSON.parse(data))));
   */
  get(url, responseType = "") {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function() {
        if (this.status === 200) {
          // Success
          resolve(this.response);
        } else {
          // Something went wrong (404 etc.)
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function() {
        reject(new Error("XMLHttpRequest Error: " + this.statusText));
      };
      request.open("GET", url);
      request.responseType = responseType;
      request.send();
    });
  }

/* ues.js 具體使用 */
import HTTP from "./common/http.js";
const roleJSONURL = "https://raw.githubusercontent.com/……role.json"; // 檔案url
HTTP.get(roleJSONURL).then(data => console.log("DATA:", JSON.parse(data)));

/**
 * 請求一個json，根據指定屬性值，請求資料集，渲染至頁面
 */
loadContent(BASE_URL_RAW);
async function loadContent(url) {
  const data = await HTTP.get(url + "novel.json");
  const content = await HTTP.get(BASE_URL + JSON.parse(data).kgyy.folder);
  return render(JSON.parse(content));
}
```

```js
// 第一種方式
export function getMaterial(params) {
  return http({
    url: "/materials",
    method: "get",
    params,
  });
}
// 第二種方式
export function getMaterial(query) {
  return http({
    url: "/materials",
    method: "get",
    params: query,
  });
}
```

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// 用法： loadScript('path/script.js', (err, script) => {...})

let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// 用法： loadScriptPromise('path/script.js').then(...)
```

## fetch

```js
// 可以是鏈式
function loadJson(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => alert(data.name));
}
// 該程式碼塊為vscode建議寫法,效果與上相同
async function loadJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  return alert(data.name);
}
```

```js
async function fetchJson(url) {
  try {
    let request = await fetch(url);
    let text = await request.text();
    return JSON.parse(text);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}
fetchJson("http://example.com/some_file.json").then((obj) => console.log(obj));
```

```js
/** 進階版  */
const roleJSONURL = `${BASE_URL}/Concept/role/hong.json`;
async function showAvatar() {
  // 讀取JSON檔案
  let response = await fetch(roleJSONURL);
  let user = await response.json();

  // 讀取Github使用者資訊
  let githubResponse = await fetch(`https://api.github.com/users/${name}`);
  let githubUser = await githubResponse.json();

  // 顯示頭像
  let img = document.createElement("img");
  img.src = githubUser.avatar_url; // 傳入使用者的頭像地址
  img.className = "promise-avatar-example";
  document.body.append(img); // 新增到body下

  // 等待3秒
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  img.remove(); // 移除img元素
  return githubUser;
}
showAvatar();

/* 使用 async/await 重寫以下示例 */

const roleJSONURL = "https://raw.githubusercontent.com/……role.json"; // 檔案url
/**
 * 向指定URL傳送請求,並從伺服器載入內容
 * @param {*} url 請求的url
 * 使用 response.json() 把遠端內容解析為 JSON
 * 注：編輯器建議使用 async/await方式
 */
async function loadJson(url) {
  const response = await fetch(url);
  console.log("RES:", response);
  return await response.json();
}

/**
 * 發一個請求到 GitHub，載入使用者資訊
 * @param {*} name 使用者名稱
 */
async function loadGithubUser(name) {
  const response = await fetch(`https://api.github.com/users/${name}`);
  console.log("RES:", response);
  return await response.json();
}

/**
 * 根據上一步請求得到的使用者資訊，獲取其中的頭像url
 * 於頁面建立img元素，顯示使用者頭像
 * @param {*} githubUser 使用者資訊
 * 注：作為一個規律，一個非同步動作應該永遠返回一個 promise。
 */
async function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url; // 傳入使用者的頭像地址
    img.className = "promise-avatar-example";
    document.body.append(img); // 新增到body下

    setTimeout(() => {
      img.remove(); // 移除img元素？
      /**
             * 為了使鏈可擴充套件，我們需要在頭像結束顯示時返回一個 resolved 狀態的 promise。
            在 setTimeout 後執行 img.remove()，然後呼叫 resolve(githubUser)，這樣鏈中的控制流程走到下一個 .then 並傳入使用者資料。作為一個規律，一個非同步動作應該永遠返回一個 promise。這讓它規劃下一步動作成為可能。雖然現在我們沒打算擴充套件鏈，我們可能在日後需要它。
             */
      resolve(githubUser); // 該行，對應使用時的最後一個.then，alert一個字串。
    }, 3000);
  });
}

/** 使用以上封裝好的函式 達到鏈式操作效果 */
loadJson(roleJSONURL)
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  // showAvatar函式中，setTimeout中的 [resolve]
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
```

```js
/* 向指定URL傳送請求,並從伺服器載入內容 
發一個請求到 GitHub，載入使用者資訊並顯示頭像
alert之後，移除載入的頭像元素 */

const roleJSONURL = "https://raw.githubusercontent.com/……role.json"; // 檔案url

/* 載入指定url的內容 */
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}
/* 根據傳入name，載入指定使用者資訊 */
function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`).then((response) =>
    response.json()
  );
}
/* 根據傳入使用者名稱，獲取並顯示頭像於頁面 */
function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}
// 使用它們
loadJson(roleJSONURL)
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
```

#### 請求錯誤

```js
const roleJSONURLERROR = `${BASE_URL}/Satya/master/Concept/role/role.json`;
/**
 * 檢查具有HTTP狀態的[response.status]屬性,非200丟擲錯誤
 * 為 HTTP 錯誤建立一個自定義類用於區分 HTTP 錯誤和其他型別錯誤
 * 建構函式接受 response 物件，並將其儲存到 error 中,能夠獲得響應資料
 */
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}
/**
 * 將請求（requesting）和錯誤處理程式碼包裝進一個函式，它能夠 fetch url 並 將所有狀態碼不是 200 視為錯誤
 */
async function loadJsonAddHttpError(url) {
  const response = await fetch(url);
  // 新增對狀態碼進行判斷
  if (response.status == 200) {
    return await response.json();
  } else {
    throw new HttpError(response);
  }
}

loadJsonAddHttpError(roleJSONURLERROR).catch(alert);
```

```js
/**
 * 建立請求，如果得到 404 就可以告知使用者修改資訊
 * 從 GitHub 載入給定名稱的使用者。如果沒有這個使用者，它將告知使用者填寫正確的名稱
 * 如果有載入指示（load-indication），.finally 是一個很好的處理程式，在 fetch 完成時停止它
 */
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  document.body.style.opacity = 0.3; // (1) 開始指示（indication）調暗文件指示載入

  return loadJson(`https://api.github.com/users/${name}`)
    .finally(() => {
      // (2) 停止指示（indication） fetch成功or錯誤，觸發終止載入
      document.body.style.opacity = "";
      // 瀏覽器技巧 (*) 是從 finally 返回零延時（zero-timeout）的 promise
      return new Promise((resolve) => setTimeout(resolve)); // (*)
    })
    .then((user) => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

```js
// 瀏覽器裡，可以使用 unhandledrejection 事件來捕獲這類錯誤
window.addEventListener("unhandledrejection", function (event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - 產生錯誤的 promise
  alert(event.reason); // Error: Whoops! - 未處理的錯誤物件
});

new Promise(function () {
  throw new Error("Whoops!");
}); // 沒有 catch 處理錯誤
//如果發生錯誤且沒有 .catch 捕獲，unhandledrejection 處理程式就會被觸發並獲取具有相關錯誤資訊的 event 物件，此時我們就能做一些處理了。通常這種錯誤是不可恢復的，所以我們最好的辦法是告知使用者有關問題的資訊，並可能將事件報告給伺服器。
```

#### Promise.all

```js
const BASE_URL_DICT = `${BASE_URL}/Dict/zh/`;
let fileNames = [
  "surname.txt",
  "cn.txt",
  "baijiaxing.txt",
  "qianziwen.txt",
  "idiom.txt",
];

let requests = fileNames.map((fileName) => fetch(BASE_URL_DICT + fileName));

Promise.all(requests)
  .then((responses) => {
    // 所有響應都就緒時，顯示HTTP狀態碼
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // 每個url都顯示200
    }
    return responses;
  })
  // 對映 responses 陣列到 response.text()中讀取它們的內容
  .then((responses) => Promise.all(responses.map((res) => res.text())));
```

```js
let names = ["iliakan", "remy", "jeresig"];
let requests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(requests)
  .then((responses) => {
    // 所有響應都就緒時，我們可以顯示 HTTP 狀態碼
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // 每個 url 都顯示 200
    }

    return responses;
  })
  // 對映 response 陣列到 response.json() 中以讀取它們的內容
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // 所有 JSON 結果都被解析：“users” 是它們的陣列
  .then((users) => users.forEach((user) => alert(user.name)));
```

### 基礎示例

```js
/**
 * 返回一個 promise
 * @param {*} src  script的url
 */
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error: " + src));

    document.head.append(script);
  });
}

let promise = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"
);

promise.then(
  (script) => alert(`${script.src} is loaded!`),
  (error) => alert(`Error: ${error.message}`)
);

promise.then((script) => alert("One more handler to do something else!"));
```

### 製作快速載入的 HTML 頁面

- 減小頁面的大小[排除不必要空格，註釋，動態內嵌指令碼，和放入外部檔案的 CSS 等]
- 最小化檔案數量，減少域名查詢，快取重用的內容，高效地排列頁面元件，減少內聯指令碼的數量
- 使用現代 CSS 和合法標記
- 給內容分塊[用 <div> 替代基於 TABLE 的佈局或者將 TABLE 拆分為更小的 TABLE]

### 非同步載入指令碼：Defer/Async

- defer 這個布林屬性被設定用來通知瀏覽器該指令碼將在文件完成解析後
- async 該布林屬性指示瀏覽器是否在允許的情況下非同步執行該指令碼
- 以上屬性對於內聯指令碼無作用 (即沒有 src 屬性的指令碼）

```html
/*非同步執行*/
<script src="one.js" async></script>
/*延遲執行*/
<script src="one.js" defer></script>
```

# Array&Object

```js
export default function groupBy(array, f) {
  const groups = {};
  array.forEach(function (o) {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
}
```

```js
let array = [1, 2, 1, 4, 5, 3, "1"];
console.log("陣列去重", [...new Set(array)]);

// （2） 實現並集、交集、差集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 並集
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter((x) => b.has(x))); // set {2, 3}
// 差集
let difference = new Set([...a].filter((x) => !b.has(x))); // Set {1}
```

- for…of 迭代

```js
// 輸出物件種每個 key-value ，若內中有陣列，則依然輸出陣列
for (let [key, value] of Object.entries(obj)) {
  console.log(key, value); // 每個 key value
}

// 將每個key-value作為陣列形式輸出["key","value"],遇到物件陣列,照例輸出
console.log(Object.entries(obj));
```

### 兩個物件或陣列是否相等

```js
// 如果鍵值對相等，則兩個物件相等
let obj1 = { a: 1, b: 2 };
let obj2 = { b: 2, a: 1 };
equalObject(obj1, obj2); // true
equalObject({ a: [] }, { a: [] }); // false

// 如果陣列項一樣，則兩個陣列相等
let arr1 = [1, 2, 5, 7, 9];
let arr2 = [1, 2, 5, 7, 9];
euqalObject([1, 2], [1, 2]); // true
euqalObject([1, 2], ["1", "2"]); // false

// 實現一個方法，只要內容形態一致，則陣列或物件相等
let obj1 = { a: [1, "2"], b: 2 };
let obj2 = { b: 2, a: [1, "2"] };
let arr1 = [1, 2, { a: 1, b: 2 }, 9];
let arr2 = [1, 2, { b: 2, a: 1 }, 9];
euqal(obj1, obj2); // true
euqal(arr1, arr2); // true
euqal(obj1, arr1); // false

// 補充，應該再加上型別一致性判斷，否則[1, 2] 和 {'0': 1, '1': 2} 會認為相等。

let equalObject = (o1, o2) => {
  if (!(o1 instanceof Object) || !(o2 instanceof Object)) {
    return false;
  }
  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }
  return Object.keys(o1).every((v) => o1[v] === o2[v]);
};

let equalArray = equalObject;

let equal = (o1, o2) => {
  if (!(o1 instanceof Object) || !(o2 instanceof Object)) {
    return false;
  }
  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }
  return Object.keys(o1).every((v) => {
    if (o1[v] instanceof Object) {
      return equal(o1[v], o2[v]);
    } else {
      return o1[v] === o2[v];
    }
  });
};
```

## Array 陣列方法

- from() 從一個類似陣列或可迭代物件建立一個新的，淺複製的陣列例項。
- forEach、map、filter、find、every、some、reduce
- forEach(),遍歷，無返回值。
- forEach 與 map 最大區別，前者沒有返回值
- filter(),返回根據條件過濾後的陣列
- find(),返回找到的符合條件的第一個元素
- findIndex(),返回第一個符合條件的索引
- every(),當所有元素滿足條件時，返回 true,否則返回 false
- some(), 當所有元素中，有一個以上滿足條件時,返回 true,否則返回 false
- reduce(),遞迴累計,返回計算結果.
- reduceRight(),以上，從又至左

### from()

- 第一個引數允許任意可迭代物件。

```js
// 類陣列中每項*2
const someNumbers = { 0: 10, 1: 15, length: 2 };
console.log(Array.from(someNumbers, (value) => value * 2)); // [20,30]
```

```js
/** 將類陣列物件轉換成陣列
  * 通常的類陣列物件:
  *    函式的 arguments 關鍵字
  *    DOM集合
  */
// 對函式的引數求和
sumArguments() {
  return Array.from(arguments).reduce((sum, num) => sum + num);
},
// 類陣列轉換陣列 之 對函式的引數求和
console.log(this.sumArguments(1, 2, 3));

// 對DOM集合的操作
testDOM() {
  // document.getElementsByTagName("li");
  let li = this.$el.getElementsByTagName("li");
  console.log("LI:", li); // 所有<li>標籤
  let newLI = Array.from(li).filter(item => item.textContent != "B");
  console.log("newLI:", newLI); // 輸出結果：AC
}
```

```js
// 陣列最大值
[1, 4, 6].reduce(function (a, b) {
  return Math.max(a, b);
}); //6

// 遍歷
numbers = [1, 2, 3, 4, 5];
numbers.forEach((number) => {
  console.log(number); //1 2 3 4 5
});

// 將陣列中所有數字相加（這裡用了函式抽離的方式）
numbers = [1, 2, 3, 4, 5];
var sum = 0;
function add(num) {
  sum += num;
}
numbers.forEach(add);
console.log(sum); //15

// map() 原陣列被“對映”成對應新陣列,返回一個新陣列
// 案例1將原陣列的每個數字都*2

var numbers = [1, 2, 3, 4, 5];
var doublnumbers = numbers.map((number) => {
  return number * 2;
});
console.log(doublnumbers); //[2,4,6,8,10]

// 將A物件陣列中某個屬性存到B陣列中
let building = [
  { name: "the Great Wall", location: "BeiJing" },
  { name: "Eiffel Tower", location: "Paris " },
];
let citys = building.map((item) => {
  return item.location;
});
console.log(citys); //["BeiJing", "Paris "]

// 案例2假定有兩個陣列(A,B),根據A中id值,過濾掉B陣列不等於A中id的資料

var post = { id: 4, title: "Javascript" };
var comments = [
  { postId: 4, content: "Angular4" },
  { postId: 2, content: "Vue.js" },
  { postId: 3, content: "Node.js" },
  { postId: 4, content: "React.js" },
];
function commentsForPost(post, comments) {
  return comments.filter(function (comment) {
    return comment.postId === post.id;
  });
}

console.log(commentsForPost(post, comments)); //[ {postId:4,content:"Angular4"},{postId:4,content:"React.js"}]

// 案例2假定有兩個陣列(A,B),根據A中id值,找到B陣列等於A中id的資料

var post = { id: 4, title: "Javascript" };
var comments = [
  { postId: 4, content: "Angular4" },
  { postId: 2, content: "Vue.js" },
  { postId: 3, content: "Node.js" },
  { postId: 4, content: "React.js" },
];
function commentsForPost(post, comments) {
  return comments.find(function (comment) {
    return comment.postId === post.id;
  });
}

console.log(commentsForPost(post, comments)); // {postId:4,content:"Angular4"}
```

```js
/**
 * 靜態方法 Reflect.ownKeys() 返回一個由目標物件自身的屬性鍵組成的陣列。
 */
const object1 = {
  property1: 42,
  property2: 13,
};
var array1 = [];
console.log(Reflect.ownKeys(object1));
// expected output: Array ["property1", "property2"]
console.log(Reflect.ownKeys(array1));
// expected output: Array ["length"]
```

# JS_INFO

## Object 物件

- 排序:數字從小至大;非數字由建立順序決定
- 物件的屬性鍵只能是 String 型別或者 Symbol 型別

```js
let a = new Object(); // 建構函式的語法
let b = {}; // 字面量的語法

/**
 * Object.assign 複製和合並
 * 語法:Object.assign(dest[, src1, src2, src3...])
 * 複製src1-srcN所有物件到dest
 * 如果接收的物件已經有了同樣屬性名的屬性，前面的會被覆蓋
 */
let user = {
  name: "John",
};
let permissions1 = {
  canView: true,
};
let permissions2 = {
  canEdit: true,
};
// 把 permissions1 和 permissions2 的所有屬性都複製給 user
Object.assign(user, permissions1, permissions2);
// 現在 user = { name: "John", canView: true, canEdit: true }
```

### Symbol 型別

- 值表示唯一的識別符號,無法自動轉換;
- 保證是唯一的。即使我們建立了許多具有相同描述的 Symbol，它們的值也是不同。描述只是一個不影響任何東西的標籤。
- 隱藏物件屬性，屬性不參與 for..in 迴圈

```js
// id 是 symbol 的一個例項化物件
let id = Symbol();
// id 是描述為 "id" 的 Symbol
let id = Symbol("id");
let id1 = Symbol("id");
let id2 = Symbol("id");
alert(id1 == id2); // false

let id3 = Symbol("id");
alert(id3.toString()); // Symbol(id)

/**
 * 全域性 symbol
 * 全域性 symbol 登錄檔
 */
// 從全域性登錄檔中讀取
let id = Symbol.for("id"); // 如果該 Symbol 不存在，則建立它

// 再次讀取
let idAgain = Symbol.for("id");

// 相同的 Symbol
alert(id === idAgain); // true

/**
 * 透過全域性 symbol 返回一個名稱
 * 語法： Symbol.keyFor(sym)
 */
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 從 symbol 中獲取 name
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id
```

### 物件方法和 this

- 物件方法：儲存在物件中的函式
- 方法可以將該物件引用為 this
- this 不受限制，可以用於任何函式
- this 在執行時求值，可以為任何值
- 箭頭函式沒有自己的 this

```js
/**
 * 物件方法
 */
let user = {
  name: "Satya",
  age: 15,
};
// user.sayHi = function () {
//   alert("Hello!");
// }
// 箭頭函式寫法
user.sayHi = () => alert("Hello!");
user.sayHi();

/**
 * 方法簡寫
 */
let use = {
  sayHi() {
    alert("Hello!!");
  },
};
use.sayHi(); // 呼叫

/**
 * 方法中的 this
 * 為了訪問該物件，方法中可以使用 this 關鍵字
 * this 的值就是在點之前的這個物件，即呼叫該方法的物件
 */
let us = {
  name: "Satya",
  age: 15,
  sayHi() {
    alert(this.name); // this=us物件
  },
};

/**
 * 不同物件呼叫同一函式，this值不同
 */
let user1 = {
  name: "Satya",
};
let user2 = {
  name: "Shakya",
};

function sayHi() {
  alert(this.name);
}
// 在兩個物件中使用同一個函式
user1.f = sayHi;
user2.f = sayHi;
// 它們呼叫時有不同的 this 值。
// 函式內部的 "this" 是點之前的這個物件。
user1.f(); // Satya (this=user1)
user2.f(); // Shakya (this=user2)

/**
 * 嚴格模式下：this = undefined
 * 非嚴格模式: this = 全域性物件[瀏覽器的window]
 */
function sayHi() {
  alert(this);
}
sayHi(); // undefined
```

### 建構函式和運算子【new】

- 大寫字母命名，只能用[new]運算子來執行
- 建構函式的主要目的 — 實現可重用的物件建立程式碼
- 通常建構函式沒有 return 語句

```js
/**
 * 建構函式
 * 當函式作為 new User()執行時，步驟如下：
 * 1.一個新的空物件被建立並分配給this
 * 2.函式體執行，通常會修改this,為其新增新屬性
 * 3.返回this的值
 */
function User(name) {
  this.name = name;
  this.isAdmin = false;
  this.sayHi = () => alert("Say Hi!");
}
// 建立新物件，分配給this
let user = new User("Satya");
alert(user.name);
alert(user.isAdmin);
user.sayHi();
```

### 數字型別

- 所有數字函式（包括 isFinite）中的空字串或空格字串均被視為 0

```js
/**
 * 數字型別 科學計數
 * "e" 把數字乘以 1 後面跟著指定數量的 0
 * e 後面的負數表示除以 1 後面跟著給定數量的 0
 */
let num1 = 1e3; // 1*1000
let num2 = 1.23e6; // 1.23*1000000
let num3 = 1e-3; // 1/1000(=0.001)
let num4 = 1.23e-6; //1.23/1000000(=0.00000123)

/**
 * toString(base)
 * 返回帶有給定base的進制中的字串表示
 * base可以從2變到36，預設為10
 * base=16 用於十六進位制顏色，字元編碼等，數字可以是 0..9 或 A..F。
 * base=2 主要用於除錯按位操作，數字可以是 0 或 1
 * base=36 是最大值，數字可以是 0..9 或 A..Z
 */
let num5 = 255;
alert(num5.toString(16)); // ff
alert(num5.toString(2)); // 11111111
// 需要將一個較長的數字識別符號變成較短，如做一個簡短的URL。可以簡單地用基數為 36 的數字系統表示：
alert((123456).toString(36)); // 2n9c // 直接在數字上呼叫方法需要兩個點

alert(0.1 + 0.2 == 0.3); // false
alert(0.1 + 0.2); // 0.30000000000000004
/**
 * 損失精度的解決方式
 * toFixed 總是返回一個字串。它確保它在小數點後有 2 位數字
 */
let sum = 0.1 + 0.2;
alert(sum.toFixed(2)); // 0.30
alert(+sum.toFixed(2)); // 0.3 使用一元加號，強制為一個數字
alert((0.1 * 10 + 0.2 * 10) / 10); // 0.3

// Hello! I'm a self-increasing number!
alert(9999999999999999); // shows 10000000000000000

/**
 * isNaN(value) 將其引數轉換為數字，然後測試它是否為 NaN
 * 值 “NaN” 是獨一無二的，它不等於任何東西，包括它本身
 */
alert(isNaN(NaN)); // true
alert(isNaN("str")); // true
alert(NaN === NaN); // false

/**
 * isFinite(value) 將其引數轉換為數字，如果是常規數字，則返回 true，而不是 NaN / Infinity / -Infinity
 */
alert(isFinite("15")); // true
alert(isFinite("str")); // false, because a special value: NaN
alert(isFinite(Infinity)); // false, because a special value: Infinity
// 驗證字串值是否為常規數字
let num = +prompt("Enter a number", "");
alert(isFinite(num)); // 結果會是 true，除非輸入無窮或不是數字

/**
 * parseInt 和 parseFloat
 * 從字串中讀取數字
 * parseInt() 函式有一個可選的第二個引數，可以解析十六進位制數字，二進位制數字等字串
 */
alert(parseInt("100px")); // 100
alert(parseFloat("12.5em")); // 12.5
alert(parseInt("0xff", 16)); // 255
alert(parseInt("ff", 16)); // 255, without 0x also works
alert(parseInt("2n9c", 36)); // 123456

/**
 * 其它常用Math
 */
alert(Math.random()); // 隨機數 0-1,不含1
alert(Math.max(3, 5, -10, 0, 1)); // 5 返回最大值
alert(Math.min(1, 2)); // 1 返回最小值
// 返回經過 n 進位制轉換的 power 值
alert(Math.pow(2, 10)); // 2 in power 10 = 1024
```

### 互動 alert prompt confirm

```js
/**
 * alert 瀏覽器彈出資訊，並贊同指令碼，直到使用者點選確定
 */
alert("alert");

/**
 * prompt 瀏覽器顯示帶有文字訊息的模態框，還有input和確定取消按鈕
 * 語法：result = prompt(title[, default]);
 * title:顯示給使用者的文字
 * default:可選參，指定input的初始值
 * result:返回輸入的文字，取消輸入返回null
 */
let age = prompt("How old are you?", 100);
alert(`You are ${age} years old!`);

/**
 * confirm 顯示一個帶有question和兩個按鈕的模態框[確定|取消]
 * 點選確定返回true,點選取消返回false
 * 語法：result = confirm(question);
 */
let isBoss = confirm("Are you the boss?");
alert(isBoss);

/**
 * 輸入 name 並輸出它。
 */
let name = prompt("Input your name", "user");
alert(`My name is:${name}`);
```

### 條件

```js
let age = prompt("age?", 18);

let message =
  age < 3
    ? "Hi, baby!"
    : age < 18
    ? "Hello!"
    : age < 100
    ? "Greetings!"
    : "What an unusual age!";

alert(message);
```

### Proxy 物件

- 用於定義基本操作的自定義行為(屬性查詢，賦值，列舉，函式呼叫等)

```js
/* 語法：
 * target:需攔截的物件，用Proxy包裝的目標物件(可以是任何型別的物件,包括原生陣列，函式，甚至另一個代理(proxy))
 * handler:定製攔截行為，一個物件，其屬性是當執行一個操作時定義代理的行為的函式。
 */
let p = new Proxy(target, handler);
```

針對物件
不需要對 keys 進行遍歷。這解決 Object.defineProperty() 的第二個問題.Proxy 是針對整個 obj 的。所以 obj 內部包含的所有的 key ，都可以走進 set。(省了一個 Object.keys() 的遍歷)

```js
let obj = {
  name: "Eason",
  age: 30,
};
let handler = {
  get(target, key, receiver) {
    console.log("get", key);
    // Reflect 內建物件,提供攔截js操作的方法。
    // 獲取物件身上某個屬性的值，類似於 target[name]
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    // 將值分配給屬性的函式,返回一個Boolean，如果更新成功，則返回true。
    return Reflect.set(target, key, value, receiver);
  },
};
let proxy = new Proxy(obj, handler);
proxy.name = "Zoe"; // set name Zoe
proxy.age = 18; // set age 18
```

#### 支援陣列

```js
let arr = [1, 2, 3];
let proxy = new Proxy(arr, {
  get(target, key, receiver) {
    console.log("get", key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    return Reflect.set(target, key, value, receiver);
  },
});
proxy.push(4);
// 能夠打印出很多內容
// get push     (尋找 proxy.push 方法)
// get length   (獲取當前的 length)
// set 3 4      (設定 proxy[3] = 4)
// set length 4 (設定 proxy.length = 4)
```

巢狀支援
Proxy 也是不支援巢狀的，這點和 Object.defineProperty() 是一樣的。因此也需要透過逐層遍歷來解決。Proxy 的寫法是在 get 裡面遞迴呼叫 Proxy 並返回

```js
let obj = {
  info: {
    name: "eason",
    blogs: ["webpack", "babel", "cache"],
  },
};
let handler = {
  get(target, key, receiver) {
    console.log("get", key);
    // 遞迴建立並返回
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], handler);
    }
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    return Reflect.set(target, key, value, receiver);
  },
};
let proxy = new Proxy(obj, handler);
// 以下兩句都能夠進入 set
proxy.info.name = "Zoe";
proxy.info.blogs.push("proxy");
```

```js
let cur = 0;
Object.defineProperty(window, "x", {
  get() {
    cur++;
    console.log(cur);
    return cur;
  },
});
console.log(x === 1 && x === 2 && x === 3); // true
```

```js
/* 實現：(a == 1 && a == 2 && a == 3) */
let a = {
  i: 1,
  toString: function () {
    return a.i++;
  },
};
if (a == 1 && a == 2 && a == 3) {
  console.log("Hello World!");
  console.log(a); // Object物件 Object:{i:4,toString:function(){return a.i++;}}
  console.log(a.i); // 4
  console.log(a.toString); // function(){return a.i++}
}
```

## 事件流分析

- 冒泡流，支援 IE6+
- window[1]-document[2]-body[3]-div[4]-[5](text)[6]-div[7]-body[8]-document[9]-window[10]
- 1-5 捕獲過程,5-6 目標過程,6-10 冒泡過程
- 以下先輸出[btn1],後輸出[content]

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div style="width:200px;height:200px;background:lightblue" id="content">
      <div
        style="width:100px;height:100px;background: lightyellow;"
        id="btn1"
      ></div>
    </div>
  </body>
  <script type="text/javascript">
    var content = document.getElementById("content");
    var btn1 = document.getElementById("btn1");
    btn1.onclick = function () {
      alert("btn1"); // 先執行
    };
    content.onclick = function () {
      alert("content"); // 後執行
    };
  </script>
</html>
```

### 自定義物件

- 基於原型的程式語言,沒有 class,把函式用作類;

**Example** 姓名的示例

```Javascript
// 人名函式 (名,姓)
function PersonName(first, last) {
    return {
        first: first,
        last: last,
        // 全名
        fullName: function () {
            return this.first + ' ' + this.last;
        },
        // 名姓 翻轉
        fullNameReversed: function () {
            return this.last + ',' + this.first;
        }
    }
}

var p1 = PersonName("Lokavit", "Shakya");
console.log(p1); // 返回的是物件
console.log(p1.fullName()); // Lokavit Shakya
console.log(p1.fullNameReversed()); // Shakya,Lokavit


// this
s = PersonName("Simon", "Willison");
var fullName = s.fullName;
fullName(); // undefined undefined(因為指向了全域性)

// 使用this 改進PersonName函式:
// this的特定函式不會返回任何值,只會修改this物件本身
function PersonName2(first, last) {
    this.first = first;
    this.last = last;
    // 全名
    this.fullName = function () {
        return this.first + ' ' + this.last;
    }
    // 名姓 翻轉
    this.fullNameReversed = function () {
        return this.last + ',' + this.first;
    }
}

var p2 =new PersonName2("Lokavit", "Shakya");


// 建立一次方法函式,在建構函式中引用:
function PersonName3(first,last){
    this.first =first;
    this.last =last;
}
// 返回全名
// prototype:可以被所有PersonName3例項共享的物件;
PersonName3.prototype.fullName =function(){
    return this.first+' '+this.last;
}
// 返回名姓翻轉
PersonName3.prototype.fullNameReversed =function(){
    return this.last +','+this.first;
}


// 執行時,給已存在的物件新增額外方法:
var p3 =new PersonName3("Lokavit", "Shakya");
// 給新例項新增一個 名轉大寫的函式
PersonName3.prototype.firstNameCaps =function(){
    return this.first.toUpperCase();
}
p3.firstNameCaps(); // LOKAVIT


// 將物件轉換成字串:
var p4 =new PersonName3("Lokavit", "Shakya");

PersonName3.prototype.toString =function(){
    return '<Person:'+this.fullName()+'>';
}
// <Person:Lokavit Shakya>
console.log(p4.toString());


// 使用call():設定this,但它帶有一個擴充套件的引數列表，非陣列
function lastNameCaps(){
    return this.last.toUpperCase();
}

var p5 =new PersonName3("Lokavit", "Shakya");
lastNameCaps.call(p5); // SHAKYA
// 和以下方式等價
p5.lastNameCaps =lastNameCaps;
p5.lastNameCaps();
```

---

## GitHub

```js
// 個人主資訊
let url = "https://api.github.com/users/使用者名稱";
// 個人所有repo
let url = "https://api.github.com/users/使用者名稱/repos";
// repo詳細資訊
let url = "https://api.github.com/repos/使用者名稱/倉庫名";
// 獲取某個repo的內容列表
let url = "https://api.github.com/repos/使用者名稱/倉庫名/contents";
// 獲取repo中子目錄的內容列表 獲取repo中某檔案資訊（不包括內容）
let url =
  "https://api.github.com/repos/使用者名稱/倉庫名/contents/子資料夾/子子資料夾";
// 獲取某檔案的原始內容（Raw） 也就是每個.md檔案的內容
let url =
  "https://raw.githubusercontent.com/使用者名稱/倉庫名/master/子資料夾/子子資料夾/檔名.md";
let url =
  "https://raw.githubusercontent.com/使用者名稱/倉庫名/master/子資料夾/子子資料夾/" +
  title;
```
