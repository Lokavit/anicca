---
title: Functional
date: '2016-01-11'
tags: ['code']
draft: false
---

## 函數語言程式設計入門經典

- 函式的原則:小,更小。
- 引用透明性
- 宣告式，抽象

### 函式與方法的區別

```js
// 函式
let simple = a => {
  return a;
};
simple(5);

// 方法
let obj = {
  simple: a => {
    return a;
  },
};
obj.simple(5); // 用其名稱及其關聯物件呼叫。
```

### 純函式

- 產生可測試的程式碼
- 不應改變任意一個外部變數，就能馬上理解其中含義
- 純函式總能夠根據輸入來做快取

```js
// 非純函式
let number = 1;
const increment = () => (number += 1);
increment(); // 2

// 純函式
const increment = n => n + 1;
increment(1); // 2

// 純函式 ，加法計算。
const sum = (a, b) => a + b;
sum(3, sum(5, 8)); // 16
sum(1, sum(2, sum(3, 4))); // 10
```

### 高階函式

- 函式把其他函式當做引數傳遞使用或者返回一個函式
- 最常見的應用如 map, reduce. 都是以傳入不同的函式來以不同的方式運算元組元素

#### 函式作為返回值輸出

- isType 函式:判斷型別的時候可以透過 Object.prototype.toString.call 來獲取對應物件返回的字串

```js
let isString = obj => Object.prototype.toString.call(obj) === "[object String]";
let isArray = obj => Object.prototype.toString.call(obj) === "[object Array]";
let isNumber = obj => Object.prototype.toString.call(obj) === "[object Number]";

// 封裝成一個判斷型別的方法
let isType = type => obj => {
  return Object.prototype.toString.call(obj) === "[object " + type + "]";
};
isType("String")("123"); // true
isType("Array")([1, 2, 3]); // true
isType("Number")(123); // true
// 這裡就是一個高階函式，因為 isType 函式將 obj => { ... } 這一函式作為返回值輸出。
```

```js
// 加法
const sum = (x, y) => x + y;
const calculate = (fn, x, y) => fn(x, y);
calculate(sum, 1, 2); // 3

// filter
let students = [{ name: "Asura", grade: 6 }, { name: "Satya", grade: 4 }, { name: "Shakya", grade: 9 }];
const isApproved = student => student.grade >= 6; // filter
const byName = obj => obj.name; // map
// 鏈式 使用 filter 和 map
console.log(students.filter(isApproved).map(byName));

// Reduce
const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);
totalGrades; // 19

// 物件排序 [逆序則將減號左右的xy互換]
[{ id: 1, name: "one" }, { id: 3, name: "three" }, { id: 2, name: "two" }, { id: 5, name: "five" }, { id: 4, name: "four" }].sort((x, y) => x.id - y.id);
```

```js 命令式&宣告式
// 命令式 命令式的迴圈要求你必須先例項化一個數組，而且執行完這個例項化語句之後，直譯器才繼續執行後面的程式碼。然後再直接迭代 cars 列表，手動增加計數器，把各種零零散散的東西都展示出來
var makes = [];
for (i = 0; i < cars.length; i++) {
  makes.push(cars[i].make);
}
// 宣告式
var makes = cars.map(function(car) {
  return car.make;
});

// compose 表示式只是簡單地指出了這樣一個事實：使用者驗證是 toUser 和 logIn 兩個行為的組合。

// 命令式
var authenticate = function(form) {
  var user = toUser(form);
  return logIn(user);
};
// 宣告式
var authenticate = compose(
  logIn,
  toUser,
);
```

```js
// 命令式   獲取陣列中所有偶數
const even = n => n % 2 == 0;
const listOfNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
listOfNumbers.filter(even); // [0, 2, 4, 6, 8, 10]

/** 宣告式
 *  可以理解為，將filter的條件提取出來，宣告一下，然後在filter中使用
 */
// 獲取陣列中<3的數
function smaller(number) {
  return number < this;
}
function filterArray(x, listOfNumbers) {
  // filter函式中的第二個引數表示上面 this， 也就是 x 值
  return listOfNumbers.filter(smaller, x);
}
let numbers = [10, 9, 8, 2, 7, 5, 1, 3, 0];
filterArray(3, numbers); // [2, 1, 0]

// 找出age>21的人
const olderThan21 = person => person.age > 21;
const overAge = people => people.filter(olderThan21);
overAge(people); // [{ name: 'TK', age: 26 }, { name: 'Kazumi', age: 30 }]

// 購物車裡型別為 books的總數
let shoppingCart = [{ productTitle: "Functional Programming", type: "books", amount: 10 }, { productTitle: "Kindle", type: "eletronics", amount: 30 }, { productTitle: "Shoes", type: "fashion", amount: 20 }, { productTitle: "Clean Code", type: "books", amount: 60 }];
// 一個reduce就可以搞定：
let sum = shoppingCart.reduce((item, next) => {
  return next.type === "books" ? item + next.amount : item;
}, 0);
console.log(sum);
```

### curry 柯里化

- 傳遞給函式一部分引數來呼叫它，返回一個函式去處理剩下的引數
- 一個函式有多個引數,把每個引數透過鏈式的形式返回下一個函式,直到最後返回結果

```js
// 加法函式柯里化   [ES6寫法，也是比較正統的函式式寫法]
const add = x => y => x + y;
const increment = add(1);
const addFive = add(5);
increment(3); //4
addFive(10); // 15

//比較容易讀懂的ES5寫法
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

// 物件柯里化
const student = name => grade => `Name: ${name} | Grade: ${grade}`;
student("Matt")(8); // Name: Matt | Grade: 8

// 柯里化函式介面
var multiple = function(a) {
  return function(b) {
    return +b * a + "";
  };
};
var plus = function(a) {
  return function(b) {
    return +b + a + "";
  };
};
var concatArray = function(chars, stylishChar) {
  return chars.map(stylishChar).reduce(function(a, b) {
    return a.concat(b);
  });
};
console.log(concatArray(["1", "2", "3"], multiple(2)));
console.log(concatArray(["1", "2", "3"], plus(2)));

// 寫一個函式，可以連線字串陣列 如 f(['1','2']) => '12'
var concatArray = function(chars) {
  return chars.reduce(function(a, b) {
    return a.concat(b);
  });
};
concat(["1", "2", "3"]); // => '123'
// 將所有數字+1
var concatArray = function(chars, inc) {
  return chars
    .map(function(char) {
      return +char + inc + "";
    })
    .reduce(function(a, b) {
      return a.concat(b);
    });
};
console.log(concatArray(["1", "2", "3"], 1)); // => '234'
// 所有數字乘以2
var multiple = function(a, b) {
  return +a * b + "";
};
var concatArray = function(chars, inc) {
  return chars
    .map(function(char) {
      return multiple(char, inc);
    })
    .reduce(function(a, b) {
      return a.concat(b);
    });
};
console.log(concatArray(["1", "2", "3"], 2)); // => '246'
```

```js
const changeGender = gender => () => (user.gender = gender);
$("input[value=male]").onChange(changeGender("male"));
$("input[value=female]").onChange(changeGender("female"));
```

### Compose 程式碼組合

- 透過組合兩個或更多的函式生成一個新的函式

```js
// 組合兩個函式生成一個新的函式
const compose = (f, g) => x => f(g(x));
const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const angry = compose(
  exclaim,
  toUpperCase,
);
angry("stop this"); // STOP THIS!

// 組合三個函式生成一個新的
const compose = (f, g) => x => f(g(x));
const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const moreExclaim = x => `${x}!!!!!`;
const reallyAngry = compose(
  exclaim,
  compose(
    toUpperCase,
    moreExclaim,
  ),
);
reallyAngry("stop this"); // STOP THIS!!!!!!

// 結合律: （associativity）  無論是把 g 和 h 分到一組，還是把 f 和 g 分到一組都不重要
// var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
// 因呼叫分組不重要，結果一樣。所以可以寫一個可變的組合

groupedTasks = [[{ completed: false, id: 1 }, { completed: true, id: 2 }], [{ completed: false, id: 4 }, { completed: true, id: 3 }]];
var completedAndSorted = compose(
  sortBy(task => task.id),
  filter(task => task.completed === true),
);
map(completedAndSorted, groupedTasks);
```

### 解構

- 從陣列中提取資料或物件使用一種語法混合陣列和物件文字的建設。或“模式匹配”。

```js
// Select from pattern
const foo = () => [1, 2, 3];
const [a, b] = foo();
console.log(a, b); // 1 2

// 接收 rest 值
const [a, ...b] = [1, 2, 3];
console.log(a, b); // 1 [2, 3]

// 可選引數
const ajax = ({ url = "localhost", port: p = 80 }, ...data) => console.log("Url:", url, "Port:", p, "Rest:", data);
ajax({ url: "someHost" }, "additional", "data", "hello");
// Url: someHost Port: 80 Rest: [ 'additional', 'data', 'hello' ]
ajax({}, "additional", "data", "hello");
// Url: localhost Port: 80 Rest: [ 'additional', 'data', 'hello' ]
```

#### pointfree 模式

- 函式無須提及將要操作的資料是什麼

```js
// 非 pointfree，因為提到了資料：word
var snakeCase = function(word) {
  return word.toLowerCase().replace(/\s+/gi, "_");
};

// pointfree
var snakeCase = compose(
  replace(/\s+/gi, "_"),
  toLowerCase,
);
```

#### 獲取所有偶數

```js
// 該函式接收一個斷言[值為true or false]
const unless = (predicate, fn) => {
  if (!predicate) fn();
};
// 查詢列表中的偶數
const times = (times, fun) => {
  for (let i = 0; i < times; i++) {
    fun(i);
  }
};
/**
 * 引數一:傳入一個 number型別的數值
 * 引數二:一個引數為n的函式
 * 使用[unless]函式，其中引數如下:
 * 引數一:[n%2]得偶數
 * 引數二:一個匿名無參函式
 * output:最終輸出[number]內所有偶數
 */
times(100, n => {
  unless(n % 2, () => {
    console.log(`${n} is even`);
  });
});
```

- every 檢查陣列的所有元素是否為 true

```js
/** [實際上低效,應該在遇到第一個不匹配條件的元素時就停止迭代陣列]
 * @param {*} arr 傳入的陣列
 * @param {*} fn 傳入的fn需返回一個布林值
 * 使用[&&]運算確保所有的陣列內容遵循fn給出的條件
 */
const every = (arr, fn) => {
  let result = true;
  for (let i = 0; i < arr.length; i++) result = result && fn(arr[i]);
  return result;
};

console.log(every([NaN, NaN, NaN], isNaN)); // true
console.log(every([NaN, NaN, 4], isNaN)); // false
```

- sortBy 排序

```js
/* 接收一個屬性，並返回另一個函式 */
const sortBy = property => {
  return (a, b) => {
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result;
  };
};
// 使用。接收一個屬性，並返回另一個函式,返回函式作為[比較函式]傳給sort
arr.sort(sortBy("firstName"));
```

- unary 函式

```js
let array = ["1", "2", "3"];
/* 由於[parseInt]接收兩個引數(parse,radix)如果可能該函式會把傳入的[parse]轉換為數字.
    如果把[parseInt]傳給map函式,map會把index的值傳給parseInt的tadix引數。導致結果如下: */
array.map(parseInt); // 輸出結果為: [1,NaN,NaN]

/**
 * 改善以上，使其正確輸出。把parseInt函式轉換為另一個只接受一個引數的函式。
 * @param {*} fn
 * 接受一個給定的多引數函式，並把它轉換為一個只接受一個引數的函式
 * 檢查fn是否有一個長度為1的引數列表,如果沒有，就返回一個新函式
 * 它只接受一個引數arg，並用該引數呼叫fn
 */
const unary = fn => (fn.length === 1 ? fn : arg => fn(arg));
/* 返回了一個新函式(parseInt的克隆體),只接受一個引數。
如此,map函式傳入的index,arr引數就不會對程式產生影響 */
array.map(unary(parseInt)); // [1, 2, 3]
```

- once 函式 控制函式被呼叫的次數

```js
/* 接受一個引數fn並透過呼叫它的apply方法返回結果 
    宣告一個done變數，初始值為false。返回的函式會形成一個覆蓋它的閉包作用域.
    返回的函式會訪問並檢查done是否為true，是則返回undefined,否則將done設定為true[阻止下次執行] 
    並用必要的引數呼叫函式fn */
const once = fn => {
  let done = false;
  return function() {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};
let doPayment = once(() => {
  console.log("Payment is done");
});
doPayment();
console.log("模擬二次呼叫:", doPayment()); // undefined
```

- memoized 函式 使函式能夠記住其計算結果

```js
const memoized = fn => {
  const lookupTable = {};
  /* 返回函式將接受一個引數並檢查它是否存在 [lookupTable]中
        如果存在，返回對應值;否則，使用新的輸入作為key，fn的結果作為value，更新[lookupTable]物件 */
  return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg));
};

let fastFactorial = memoized(n => {
  if (n === 0) return 1;
  return n * fastFactorial(n - 1);
});

console.log(fastFactorial(5)); // 120
console.log(fastFactorial(3)); // 6
console.log(fastFactorial(7)); //5040
```

### 陣列的函數語言程式設計

### SVG

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// 這條路徑將先移動到點 (M10 10) 然後再水平移動80個單位(h 80)，然後下移8個單位 (v 8)，接著左移80個單位 (h -80)，再回到起點處 (z)。
let p = new Path2D("M10 10 h 80 v 8 h -80 Z");
ctx.fill(p);
```

```js
let percentValue = 5;
let calculateTax = value => {
  return (value / 100) * (100 + percentValue);
};

/** 最佳化以上程式碼
 * 將 [percentValue] 作為函式的引數
 */
let calculateTax2 = (value, percentValue) => {
  return (value / 100) * (100 + percentValue);
};

// 引用透明性
let identity = i => {
  return i;
};
// 用命令式方法迭代陣列
let arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
// 用宣告方式迭代陣列
arr.forEach(element => console.log(element));

const sortBy = property => {
  return (a, b) => {
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result;
  };
};
// 使用
// arr.sort(sortBy('firstName'));

// page:75

const double = n => n * 2;
const increment = n => n + 1;

// 沒有用管道運算子
double(increment(double(5))); // 22

let Chain = {
  sav: "",
  a1: function(val) {
    this.sav = this.sav + val;
    return this;
  },
};
Chain.a1("aaa")
  .a1("bbb")
  .a1("ccc");
console.log(Chain.sav); //返回 aaabbbccc
```
