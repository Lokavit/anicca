---
title: "Algorithm"
date: 2015-01-01
tags: ["Algorithm", "JavaScript"]
description: ""
---

## Filter

```js
/**
 * 過濾陣列中相同項 從陣列中，刪除重複項 [簡單的陣列項]
 */
const strings = ["AA", "BB", "AA", "AD", "BC", "AC", "AD"];
// filter函式本來就返回新陣列，所以將邏輯寫在內中，最終返回新陣列。
const filteredStrings = strings.filter((item, index) => {
  // 如果當前專案的索引與該專案的第一次出現相同，則返回到新陣列
  // console.log("ITEM:", item, `|| ${strings.indexOf(item)}`);

  return strings.indexOf(item) === index;
});
// console.log("刪除重複項", filteredStrings);

const arr1 = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
const arr2 = arr1.filter((element, index, self) => {
  return self.indexOf(element) === index;
});
console.log(arr2); // [1, 2, 3, 5, 4]
console.log(arr1); // [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4]

// 用於 過濾陣列中相同的物件
const books = [
  {
    name: "1",
    author: "A",
  },
  {
    name: "2",
    author: "B",
  },
  {
    author: "B",
    name: "2",
  },
];

/**
 * 過濾陣列中相同的物件 從陣列中，刪除重複項 [物件型別的陣列項]
 * @param {*} arr 待刪除的陣列
 * use: removeDuplicates(books)
 */
function removeDuplicates(arr) {
  const result = [];
  const duplicatesIndices = [];

  // 迴圈遍歷原始陣列中的每個專案
  arr.forEach((current, index) => {
    if (duplicatesIndices.includes(index)) return;

    result.push(current);

    // 在當前項之後迴圈遍歷陣列中的其他項
    for (
      let comparisonIndex = index + 1;
      comparisonIndex < arr.length;
      comparisonIndex++
    ) {
      const comparison = arr[comparisonIndex];
      const currentKeys = Object.keys(current);
      const comparisonKeys = Object.keys(comparison);

      // 檢查物件中的鍵數
      if (currentKeys.length !== comparisonKeys.length) continue;

      // 檢查鍵名
      const currentKeysString = currentKeys.sort().join("").toLowerCase();
      const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
      if (currentKeysString !== comparisonKeysString) continue;

      // 檢查值
      let valuesEqual = true;
      for (let i = 0; i < currentKeys.length; i++) {
        const key = currentKeys[i];
        if (current[key] !== comparison[key]) {
          valuesEqual = false;
          break;
        }
      }
      if (valuesEqual) duplicatesIndices.push(comparisonIndex);
    } // end for loop
  }); // end arr.forEach()

  return result;
}
```

## Recursion

```js
/** 基礎示例 */
/**
 * 遞減
 * @param {*} num 外部傳入的引數
 * use: countdown(5)
 */
const countdown = (num) => {
  console.log(num);
  num < 1 ? num : countdown(num - 1);
};

/**
 * 遞迴 x 的 n 次方
 * @param {*} x
 * @param {*} n
 * return:x的n次方結果
 * use: pow(3, 6)
 */
/* 三元運算子簡寫以上程式碼塊 */
const pow = (x, n) => {
  // n == 1 遞迴的基礎 。遞迴步驟：根據基礎的結果，決定是輸出結果還是再執行一遍函式
  return n == 1 ? x : x * pow(x, n - 1);
};

/** 遞迴計算不同部門的工資 2019.08.08 */
// 物件陣列
const company = {
  sales: [
    {
      name: "Asura",
      salary: 1000,
    },
    {
      name: "Satya",
      salary: 600,
    },
  ],
  development: {
    sites: [
      {
        name: "Buddha",
        salary: 2000,
      },
      {
        name: "Shakya",
        salary: 1800,
      },
    ],
    internals: [
      {
        name: "Lokavit",
        salary: 1300,
      },
    ],
  },
};
/**
 * 用來完成作業的函式 遞迴計算不同部門的工資 2019.08.08
 * @param {*} department 部門
 * use: sumSalaries(company)
 */
function sumSalaries(department) {
  // 如果傳入的是陣列
  if (Array.isArray(department)) {
    // 情況 (1) 求陣列的和
    return department.reduce((prev, current) => prev + current.salary, 0);
  } else {
    // 情況 (2)
    let sum = 0;
    // 迭代物件中的 values 屬性值 ，每個values則是一個數組
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // 遞迴呼叫子部門，對結果求和
    }
    return sum;
  }
}

/**
 * 遞迴刪除深層陣列物件中某資料 2019.10.12
 * 遞迴新增深層陣列物件中某資料 2019.10.12
 */

/** 物件陣列 */
const tableData = {
  entry: "abc",
  children: [
    {
      entry: "abc-bcd",
      children: [
        {
          entry: "abc-bcd-cde",
        },
        {
          entry: "abc-bcd-def",
        },
      ],
    },
    {
      entry: "abc-zxc",
      children: [
        {
          entry: "abc-zxc-xcv",
        },
        {
          entry: "abc-zxc-cvb",
        },
      ],
    },
  ],
};

/**
 * 遞迴刪除深層陣列物件中某資料 2019.10.12
 * data:傳入需遞迴的大陣列
 * target:需要刪除的指定值
 * use: this.recursiveDelete(this.tableData,row.entry)
 */
function recursiveDelete(data, target) {
  if (!data) return;
  if (!Array.isArray(data)) return;
  for (let i = 0; i < data.length; i++) {
    // 如果當前的[entry] == target傳入值
    if (data[i].entry == target) {
      this.$delete(data, i); // 從檢視刪除該資料
      // 呼叫刪除API [target] 為外部傳入值，亦為介面所需引數
      deleteSystemCommoncodes(target);
      return;
    }
    // 非以上情況，且data[i]有children且其長度>0
    else {
      if (data[i].children && data[i].children.length > 0) {
        // 遞迴本函式，繼續尋找 target
        this.recursiveDelete(data[i].children, target);
      }
    }
  }
}

/**
 * 遞迴新增深層陣列物件中某資料 2019.10.12
 * data:傳入需遞迴的大陣列
 * target:需要刪除的指定值
 * use:this.recursivePost(this.tableData,this.form)
 */
function recursivePost(data, target) {
  if (!data) return;
  if (!Array.isArray(data)) return;
  /** 需要考慮以下問題:
   * 透過 target.parentEntry 判斷當前需新增的是根元素還是子元素
   * 新增根元素資料:
   *    直接新增資料:this.$set(data,data.length,target)
   * 新增子元素,需先判斷待插入資料的物件中[hasElement:true]且是否有[children],
   * 如果有，則插入為:this.$set(data,data.length,target)
   * 如果沒有,則在插入資料之前，需改變待插入資料的
   */
  /** 無父節點的資料，將[target]物件直接新增到傳入的[data]中 */
  if (!target.parentEntry) {
    this.$set(data, data.length, target);
    // this.getSystemData(); // 呼叫一下請求，讓資料重新回來。似乎沒有什麼作用
    return;
  } else {
    /** 有父節點的資料，即[target.parentEntry]有值的情況下
     *  遍歷傳入陣列,從中找到某資料.entry == 傳入target.parentEntry
     */
    for (let i = 0; i < data.length; i++) {
      // 如果 某資料.entry == 傳入target.parentEntry
      if (data[i].entry == target.parentEntry) {
        /** 判斷該資料的[hasElement]是否有子元素
         * 如果 [hasElement:false]即沒有子元素，則該資料一定沒有[children]
         */
        if (!data[i].hasElement) {
          data[i].hasElement = true; // 該資料的[hasElement:true]
          data[i].children = new Array(); // 為該資料手動新增一個[children:[]]屬性
          // 以上設定完畢後,使用this.$set將資料插入到children陣列中
          this.$set(data[i].children, data[i].children.length, target);
          return;
        } else if (data[i].hasElement) {
          /** 如果 [hasElement:ture]即已有子元素 */
          /** 如果該資料沒有[children] 將其加上一個children的陣列 */
          if (!data[i].children) data[i].children = new Array();
          this.$set(data[i].children, data[i].children.length, target);
          return;
        }
      } else {
        console.log("沒找到entry == parentEntry");
        // 如果某條資料有 children，並且 長度>=0
        if (data[i].children && data[i].children.length >= 0) {
          // 遞迴本函式,直至資料成功插入整體資料的對應層級樹中
          this.recursivePost(data[i].children, target);
        }
      }
    }
  }
}
```
