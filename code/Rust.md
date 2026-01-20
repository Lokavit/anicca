# Rust

## 常用命令

```bash
rustc --version # rustc 1.51.0
rustup update # 更新
rustup self uninstall # 解除安裝。
rustup install nightly # 安裝當前 rust 版本的其他 toolchain
rustup update nightly # 更新當前 rust 版本的 toolchain
rustup doc # 開啟本地文件

# Cargo：Rust的構建與套件管理工具
cargo --version # cargo 1.51.0
cargo install <libname> # 裝載庫(name庫名)
cargo build # 透過Cargo.toml中的環境設定裝載所需庫
cargo run # 構建程式
cargo doc # 檢視文件。如下示例
cargo doc --open # pull並在瀏覽器開啟文件，可進行相關函式查閱。
cargo new <name> # 建立專案
```

## 環境及配置

- [rust-init.exe](https://www.rust-lang.org/)
- [Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)

> 開啟裝載程式，會檢測系統環境，若提示缺少 vs c++元件，則必須先裝載元件。從 vs2019 的裝載工具中，選在以下單元件`MSVC v142 -VS 2019 C++ x64/x86 生成工具(最新版)`、`Windows 10 SDK (最新版)` **沒有這項會在`cargo build`時報`link.exe`錯誤**

- 啟動`rust-init.exe`，環境檢測中可見`x86_64-pc-windows-msvc`

```bash
# 程式預設裝載於users資料夾下，可根據提示新增對應環境變數，改變裝載路徑於dev下
RUSTUP_HOME: dev/rustup # 儲存工具鏈和配置檔案
CARGO_HOME: dev/cargo # 儲存cargo的快取

# 在dev/cargo/修改或建立config檔案，輸入以下程式碼(內網映象源)
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```

---

# Basic Programming Language

# 錯誤處理

- `panic!`,列印錯誤資訊，展開並清理資料，而後退出。
- `RUST_BACKTRACE=1`,backtrace 是一個執行到目前位置所有被呼叫的函式的列表。

```toml
# 另一種painc! 展開切換為終止
[profile.release]
panic = 'abort'
```

```bash
RUST_BACKTRACE=1 cargo run
```

```rust
/*=========== 傳播錯誤及使用?運算子簡寫 ==========*/
use std::io;
use std::io::Read;
use std::fs::File;

fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();
    let mut f = File::open("hello.txt")?;
    f.read_to_string(&mut s)?;
    // 以上兩行可以鏈式為一行程式碼
    File::open("hello.txt")?.read_to_string(&mut s)?;

    Ok(s)
}

/*=========== 失敗時 panic 的簡寫：unwrap 和 expect ==========*/
use std::fs::File;

fn main() {
    // 返回Result中Ok的值，或Err下呼叫panic!
    let f = File::open("hello.txt").unwrap();
    // 允許選擇panic!的錯誤資訊，更易於追蹤panic的根源。
    let f = File::open("hello.txt").expect("Failed to open hello.txt");
}

/*=========== Result panic! 更優寫法 ==========*/
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });
}
/*=========== Result panic! ==========*/
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            // 嘗試開啟的檔案不存在，則建立該檔案
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };
}
```

# 常見集合

- 儲存在堆中。常用集合(vector、字串、雜湊 map)
- - vector:相同型別的值。相鄰排列。(文字行或購物車中商品價格)
- - HashMap:鍵值型別需相同。可以使用元組
- - - 字串值插入 HashMap，其所有權亦轉到 HashMap。

```rust
/*=========== 雜湊 map 儲存鍵值對 ==========*/
use std::collections::HashMap;

fn main() {
  // 新建
  let mut scores = HashMap::new();

  // 插入資料
  scores.insert(String::from("a"), 10);
  scores.insert(String::from("b"), 30);

  // 使用元素
  let teams = vec![String::from('a'), String::from('b')];
  let init_scores = vec![10, 30];

  /*
     使用HashMap型別註解，
     zip():建立一個元組的vector。
     collect()將元組轉換為HashMap。
  */
  let scores: HashMap<_, _> = teams.iter().zip(init_scores.iter()).collect();
  println!("{:?}", scores);

  // 訪問值 返回 Option<V>。有值裝入Some，無值返回None。
  let team_name = "a".to_string();
  let score = scores.get(&team_name);

  // 遍歷的方式訪問
  for (key, value) in &scores {
    println!("{}: {}", key, value);
  }

  // 更新 直接覆蓋
  let mut scores = HashMap::new();
  scores.insert(String::from("b"), 11);

  // 只在鍵沒有對應值時插入
  let mut scores = HashMap::new();
  scores.insert(String::from("Blue"), 10);
  /*
    entry()返回列舉。無值則插入值，
    or_insert():有值則使用返回值的可變引用，
      無值則將引數作為心智插入並返回新值的可變引用
  */
  scores.entry(String::from("Yellow")).or_insert(50);
  scores.entry(String::from("Blue")).or_insert(50);
  println!("{:?}", scores);

  // 根據舊值更新一個值
  let text = "hello world wonderful world";
  let mut map = HashMap::new();
  for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
  }
  println!("{:?}", map);
}

/*=========== String及常用處理 ==========*/
fn main() {
  // 建立空字串
  let mut s = String::new();
  // 建立並初始化字串
  let data = "hello".to_string();
  // 與上行程式碼等效
  let data = String::from("hello");
  // 增加字串
  let mut temp = "hello".to_string();
  temp.push_str(" world");
  // 使用+連線字串
  let temp1 = "hello".to_string();
  let temp3 = " world".to_string();
  // 返回結果所有權 = 獲取temp1的所有權 + temp3引用的內容 (temp1無法繼續使用)
  let temp5 = temp + &temp3;
  // 使用宏命令進行 複雜的字串拼接
  let s = format!("{}{}{}", temp1, temp3, temp5);
  // 遍歷字串
  for c in "नमस्ते".chars() {
    println!("{}", c);
  }

  // 需要被替換的字串
  let temp_comment = "<!--  -->".to_string();
  // 文字內容
  let temp = "替換註釋".to_string();
  // 模板
  let templ = "<pre><code><!--  --></code></pre>";
  // 最終輸出 <pre><code>替換註釋</code></pre>
  println!("{:?}", &templ.replace(&temp_comment, &temp));

  // 型別轉換
  let s1 = String::from("test");
  let s3 = s1.as_str();

  let s1 = "漢字-Test";
  // 是否包含指定字串
  assert_eq!(true, s1.contains("漢字"));
  // 是否以指定字串開頭
  assert_eq!(true, s1.starts_with("漢字"));
  // 是否以指定字串結尾
  assert_eq!(true, s1.ends_with("Test"));
  // 字母全轉大寫
  println!("{:?}", s1.to_uppercase());
  //請注意與  to_uppercase() 的不同
  let mut s3 = String::from("漢字-Test");
  s3.make_ascii_uppercase();
  // 字母全轉小寫
  println!("{:?}", s1.to_lowercase());
  //請注意與  to_lowercase() 的不同
  let mut s3 = String::from("漢字-Test");
  s3.make_ascii_lowercase();
  // 字串切割
  let mut s = String::from("漢字-Test");
  let result: Vec<&str> = s.split("-").collect();
  println!("{:?}", result); // -> ["漢字", "Test"]
}

/*=========== vector 用來儲存一系列的值 ==========*/
fn main() {
    // 新建vector 用於儲存i32型別的值
    let v: Vec<i32> = Vec::new();
    // 新建時包含初始值。使用宏。根據提供值建立一個新的vec
    let v = vec![1, 2, 3];

    // 更新vector。 可變變數。不可變則不能增加元素
    let mut v = Vec::new();
    v.push(3); // 增加值
    v.push(5); // 同類型值
    v.push(7); // 所以無需使用<i32>註解

    // 丟棄vector時，其所有元素亦會丟棄
    {
        let v = vec![1, 2, 3, 4];
    } // <- 這裡 v 離開作用域並被丟棄

    // 讀取vector元素。
    let v = vec![1, 2, 3, 4, 5];
    // 以索引語法獲取vector中的值。索引超出範圍會引發錯誤
    let third: &i32 = &v[2];
    println!("The third element is {}", third);
    // 以get方法獲取vector中的值。超出範圍返回None。
    match v.get(2) {
        Some(third) => println!("The third element is {}", third),
        None => println!("There is no third element."),
    }

    // 遍歷vector中的元素
    let v = vec![33, 66, 99];
    for i in &v {
        println!("{}", i)
    }

    // 遍歷可變vector中每個元素的可變引用
    let mut v = vec![11, 55, 77];
    for i in &mut v {
        *i += 50; // 解引用i += 50;
        println!("{}", i)
    }

    // 使用列舉來儲存多種型別
    enum SpreadsheetCell {
        Int(i32),
        Float(f64),
        Text(String),
    }
    let row = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Text(String::from("blue")),
        SpreadsheetCell::Float(10.12),
    ];
}
```

# 使用包、Crate 和模組

- 模組樹都植根於名為 crate 的隱式模組下
- 模組可巢狀，模組中支援結構體、列舉、常量、特性、函式
- 路徑後跟一個或多個由雙冒號（::）分割的識別符號
- - 絕對路徑（absolute path）從 crate 根開始，以 crate 名或者字面值 crate 開頭。
- - 相對路徑（relative path）從當前模組開始，以 self、super 或當前模組的識別符號開頭。
- - super 起始的相對路徑，移動模組時，變更很少程式碼。
- - use:使用該關鍵字將名稱引入作用域
- - as:使用該關鍵字提供新的名稱。用於 use 至相同名稱的情況
- Rust 中預設所有項（函式、方法、結構體、列舉、模組和常量）都是私有的
- - 父模組中的項不能使用子模組中的私有項,子模組中的項可以使用他們父模組中的項

```bash
cargo new --lib rust-lib # 建庫專案
```

```rust
/*=========== 使用 as 關鍵字提供新的名稱 ==========*/
use std::fmt::Result;
use std::io::Result as IoResult;
fn function1() -> Result {}
fn function2() -> IoResult<()> {}

/*=========== 使用 use  ==========*/
// 透過 glob 運算子將所有的公有定義引入作用域。慎用。
use std::collections::*;
// 一個是另外一個子路徑，同時引入作用域
use std::io::{self, Write};
 // 巢狀引入
use std::{cmp::Ordering, io};
// 標準庫引入，無需修改Cargo.toml
use std::collections::HashMap;
// 外部引入。需在Cargo.toml中新增庫
use rand::Rng;

/*=========== 模組分割入不同檔案 示例及註釋 ==========*/
/* src/front_of_house/hosting.rs */
pub fn add_to_waitlist() {} // 模組中函式 使用 pub 關鍵字變為公有

/* src/front_of_house.rs */
pub mod hosting;// 子模組 使用 pub 關鍵字暴露路徑

/* src/lib.rs */
mod front_of_house; // 載入同名模組檔案的內容

/*=========== 模組的相關要點 示例及註釋 ==========*/
mod front_of_house { // 這部分已拆分為單獨的檔案
    // 子模組 使用 pub 關鍵字暴露路徑
    pub mod hosting {
        // 模組中函式 使用 pub 關鍵字變為公有
        pub fn add_to_waitlist() {}
    }
}

// 使用use和相對路徑將項引入作用域
use front_of_house::hosting;
// 使用pub use 重匯出名稱
// pub use crate::front_of_house::hosting;

/** 公有函式 */
pub fn eat_at_restaurant() {
    // 絕對路徑
    crate::front_of_house::hosting::add_to_waitlist();
    // 相對路徑
    front_of_house::hosting::add_to_waitlist();
    // use 與相對路徑結合
    hosting::add_to_waitlist();

    // 公有結構體例項
    let mut meal = back_of_house::Breakfast::summer("Rye");
    meal.toast = String::from("Wheat");
    println!("{}", meal.toast);

    // 公有列舉成員使用
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}

fn server_order() {}
mod back_of_house {
    /** 公有列舉 所有成員皆為公有 */
    pub enum Appetizer {
        Soup,
        Salad,
    }
    /** 公有結構體 所有成員預設私有，公有pub需指定 */
    pub struct Breakfast {
        pub toast: String,      // 公有欄位
        seasonal_fruit: String, // 預設私有欄位
    }
    // 結構體方法
    impl Breakfast {
        //
        //
        /**
         * 公有函式 傳入字串，返回結構體
         * 具有私有欄位的結構體，需要提供該公共關聯函式來構造結構體例項
         * 若無該函式則無法在 eat_at_restaurant 中建立該結構體的例項
         */
        pub fn summer(toast: &str) -> Breakfast {
            // 結構體例項化
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }

    fn cook_order() {}
    fn fix_incorrect_order() {
        cook_order();
        // 使用 super 起始的相對路徑
        super::server_order();
    }
}
```

# 列舉和模式匹配

- match:先匹配模式，匹配到則執行關聯程式碼
- if let:處理只匹配一個模式的值而忽略其他模式的情況。

```rust
/*=========== if let 簡單控制流 ==========*/
fn main() {
    #[derive(Debug)]
    enum UsState {
        Alabama,
        Alaska,
    }
    enum Coin {
        Penny,
        Nickel,
        Dime,
        Quarter(UsState),
    }
    let coin = Coin::Penny;
    let mut count = 0;
    if let Coin::Quarter(state) = coin {
        println!("State quarter from {:?}!", state);
    } else {
        count += 1; // 對非state的進行計數
    }
}

/*=========== 匹配 Option<T> ==========*/
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None, // 要有，否則造成BUG
        Some(i) => Some(i + 1),
    }
}

fn main() {
    let five = Some(5);
    let six = plus_one(five); // 6
    let none = plus_one(None);
    println!("{:?},{:?}", six, none);

    /* _ 萬用字元 */
    let some_u8_value = 0u8;
    match some_u8_value {
        1 => println!("one"),
        3 => println!("three"),
        5 => println!("five"),
        7 => println!("seven"),
        _ => (), // 匹配所有之前沒有指定的可能的值
    }
}

/*=========== match 控制流運算子 及繫結值的模式 ==========*/
#[derive(Debug)]

/** 用於傳遞給 Coin列舉中的Quarter項 */
enum UsState { Alabama, Alaska, }
enum Coin { Penny, Nickel, Dime, Quarter(UsState), }

/** 返回值可以是任何型別 */
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        // 對應列舉中每項，此處亦可用{}
        Coin::Penny => {
            println!("Penny!");
            1
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("state:{:?}", state);
            25
        }
    }
}

fn main() {
    let temp = value_in_cents(Coin::Quarter(UsState::Alaska));
    println!("temp:{:?}", temp);
}


/*=========== Option<T> 編碼存在或不存在 ==========*/
use std::option::Option; // 引入庫

fn main() {
    let some_num = Some(5);
    let some_str = Some("a string");
    let absent_num: Option<i32> = None;
}


/*=========== 列舉使用示例 ==========*/
/* 定義列舉 */
enum IpAddr {
    V4(u8, u8, u8, u8), // 可以單獨定義資料型別
    V6(String),
}

enum Message {
    Quit,                       //沒有關聯任何資料
    Move { x: i32, y: i32 },    //包含一個匿名體結構
    Write(String),              //包含一個單獨String
    ChangeColor(i32, i32, i32), //包含三個i32型別資料
}

impl Message {
    fn call(&self) {
        println!("方法體")
    }
}

fn main() {
    // 例項化列舉::列舉項，併為其賦值
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));

    let m = Message::Write(String::from("Hello!"));
    m.call(); // 呼叫列舉的方法
}
```

# struct 結構體

- 自定義資料型別。允許命名和包裝多個相關的值，形成有意義的組合。
- 建立結構體例項。key 為欄位名：value 為資料值。順序無需一致。
- 元組結構體：即使型別相同，在函式中結構體型別的引數不能互通。

```rust
/*=========== 結構體使用示例 ==========*/
#[derive(Debug)] // 宣告debug可以列印結構體。
/** 建立結構體 */
struct Rectangle {
    width: u32,
    height: u32,
}
// 將某個型別例項能做的事情都放入impl塊中
impl Rectangle {
    // self指呼叫該方法的結構體例項
    // 使用&因只需讀取結構體的資料，不需要寫入(獲取所有權)
    fn area(&self) -> u32 {
        self.width * self.height
    }
    // 關聯函式。不以self作為引數的函式。不作用於結構體的例項。
    // 經常被用作返回一個結構體新例項的建構函式。
    // 接收一個維度引數
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}
/**
 * 每個結構體允許有多個 impl塊，但每個方法有其自己的impl塊。
 * 此處只為有效示例，非最優寫法。
 */
impl Rectangle {
    /**
     * 比較兩個結構體例項的屬性值。返回bool結果。
     * 引數一：&self，即已知的rect1也就是結構體例項化的變數
     * 引數二：結構體型別例項。即rect2或rect3
     */
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };
    // 列印結構體(結構形式輸出)
    println!("{:#?}", rect1);
    // 方法語法。在結構體例項上呼叫其方法
    println!("{}", rect1.area());
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
    // 使用結構體的關聯函式，輸入可見結果。wh皆為3
    println!("square:{:#?}", Rectangle::square(3));
}

/*=========== 元組結構體（tuple structs） ==========*/
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);
let back = Color(0,0,0); // 黑色
let origin =Point(0,0,0); // 原點
// 以元組方式使用 欄位.索引
println!("{}", back.1);
println!("{}", origin.1);

/*=========== 結構體基本使用 ==========*/
 // 宣告debug可以列印結構體。只有結構、列舉型別可用
#[derive(Debug)]
/** 定義結構體 */
struct User {
    name: String,
    age: u64,
    active: bool,
}

fn main() {
    // 呼叫構建結構體函式，並傳值
    let temp = build_user(String::from("dd"));
    // 列印結構體(單行形式輸出)
    println!("{:?}", temp);
    // 列印結構體(結構形式輸出)
    println!("{:#?}", temp);
    // 例項化結構體
    let user1 = User {
        name: String::from("aa"),
        age: 16,
        active: true,
    };
    // 例項化結構體
    let user3 = User {
        active: false,
        ..user1 // 結構體剩餘值使用user1中的值
    };
    println!("{:?}", user3);
}
/** 構建結構體函式 傳入引數，返回例項化的結構體 */
fn build_user(name: String) -> User {
    User {
        name,
        age: 15,
        active: true,
    }
}
```

# ownership 所有權

- 透過所有權系統管理記憶體
- clone():字串克隆。
- Copy:整型、浮點、布林、字元、元組(元素同類型)
- &:引用。允許使用值但不獲取其所有權。預設禁止修改引用的值。
- 借用：獲取引用作為函式引數。
- 可變引用：在特定作用域中的特定資料只能有一個可變引用。

```rust
/*=========== 字串 slice .. range(範圍) 語法 ==========*/
let s = String::from("hello");
let slice = &s[0..2];
let slice = &s[..2];
// 或者是如下寫法
let s = String::from("hello");
let len = s.len();
let slice = &s[3..len];
// 如果 slice 包含 String 的最後一個位元組，可以捨棄尾部的數字
let slice = &s[3..];
// 也可以同時捨棄這兩個值來獲取整個字串的 slice
let slice = &s[..];

/*=========== 可變引用 作用域 ==========*/
let mut s = String::from("hello");
// 不可變 = 不可變引用
let r1 = &s; // 沒問題
let r2 = &s; // 沒問題
println!("{} and {}", r1, r2); // r1r2是不可變引用
// 此位置之後 r1 和 r2 不再使用。因為最後一次使用不可變引用在宣告可變引用之前
let r3 = &mut s; // 沒問題。
println!("{}", r3);

/*=========== 可變引用 ==========*/
fn main() {
    let mut s = String::from("hello");
    // &mut s 在作用域內只能用一次。
    change(&mut s);
}
fn change(some_string: &mut String) {
    some_string.push_str(", world");
}

/*=========== 引用與借用 ==========*/
fn main() {
    let s1 = String::from("hello");
    // 建立指標，指向s1的引用
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}
// s 是對 String 的引用，因無引用值所有權，s離開作用域，不會報錯。
fn calculate_length(s: &String) -> usize { s.len() }

/*=========== 返回值與作用域 ==========*/
fn main() {
    let s1 = gives_ownership();         // gives_ownership 將返回值
                                        // 移給 s1
    let s2 = String::from("hello");     // s2 進入作用域
    let s3 = takes_and_gives_back(s2);  // s2 被移動到
                                        // takes_and_gives_back 中,
                                        // 它也將返回值移給 s3
} // 這裡, s3 移出作用域並被丟棄。s2 也移出作用域，但已被移走，
  // 所以什麼也不會發生。s1 移出作用域並被丟棄
fn gives_ownership() -> String {             // gives_ownership 將返回值移動給
                                             // 呼叫它的函式
    let some_string = String::from("hello"); // some_string 進入作用域.
    some_string                              // 返回 some_string 並移出給呼叫的函式
}
// takes_and_gives_back 將傳入字串並返回該值
fn takes_and_gives_back(a_string: String) -> String { // a_string 進入作用域
    a_string  // 返回 a_string 並移出給呼叫的函式
}

/*=========== 所有權與函式 ==========*/
fn main(){
    let s = String::from("hello");  // s 進入作用域
    takes_ownership(s);             // s 的值移動到函數里 ...
    //在此處使用s，會有編譯錯誤      // ... 所以到這裡不再有效
    let x = 5;                      // x 進入作用域
    makes_copy(x);                  // x 應該移動函數里，
                                    // 但 i32 是 Copy 的，所以在後面可繼續使用 x
}// 這裡, x 先移出了作用域，然後是 s。但因為 s 的值已被移走，
  // 所以不會有特殊操作

fn takes_ownership(some_string: String) { // some_string 進入作用域
    println!("{}", some_string);
} // 這裡，some_string 移出作用域並呼叫 `drop` 方法。佔用的記憶體被釋放

fn makes_copy(some_integer: i32) { // some_integer 進入作用域
    println!("{}", some_integer);
} // 這裡，some_integer 移出作用域。不會有特殊操作

/*=========== 移動與克隆 ==========*/
let s1 = String::from("hello");
let s2 = s1; // 此處 s1被移動，s1不再有效。
let s2 = s1.clone(); // 克隆。s1,s2皆有效。
println!("s1 = {}, s2 = {}", s1, s2);
```

# 控制流

- if:多個`if else if`最好使用`match`
- loop:重複執行。`break`停止迴圈
- while 條件迴圈。慢！因編譯器增加執行時程式碼對每次迴圈的每個元素進行條件檢查。
- for 遍歷集合。最常用。

```rust
/*=========== 控制流 使用 for 遍歷集合 ==========*/
let a = [10, 20, 30, 40, 50];
for element in a.iter() { println!("the value is: {}", element); }

// 倒計時
for number in (1..4).rev() { println!("{}!", number); }
println!("LIFTOFF!!!");

/*========= 控制流 while 條件迴圈 =============*/
let a = [10, 20, 30, 40, 50];
let mut index = 0;
while index < 5 {
    println!("the value is: {}", a[index]);
    // 每次執行，index值增1
    index = index + 1;
}

/*============ 控制流 loop 重複執行 ==========*/
let mut counter = 0;
// 最終值為20
let result = loop {
    counter += 1; // 每次+1
    // 若加到10，返回時將10*2
    if counter == 10 { break counter * 2; }
};

/*============ 控制流 if 表示式 ===============*/
let num = 7;
if num<5 {
    println!("The value: {}",num);
}else {
    println!("value of x is: {}",num);
}

// let語句中使用if
let condition = true;
// true為5，false為6 資料型別必須相同
let number = if condition {5}else{6};
```

# 函式

- 函式名`fn test_demo(){}`
- 函式引數需指定型別`fn test_demo(x:i32,y:i32){}`

```rust
// 具有返回值的函式
fn five() -> i32 {5}
// 具有引數與返回值的函式
fn plus_one(x: i32) -> i32 { x + 1 }
fn main(){
    // 表示式 y=4
    let y = {
        let x = 3;
        x + 1 // 注意，表示式結尾沒有分號
    };
    let x = five(); // 5
    let z = plus_one(5); // 6
    println!("The value of x is: {},{},{}",y, x,z);
}
```

# 資料型別

- 標量型別
- - 整數:i/u(±/+)bit(8/16/32/64/128)通常用 i32
- - 浮點:f32/f64(單精度浮點/倍精度浮點)。預設 f64
- - 布林、字元:('char')
- 複合型別
- - tuples:元組.元素型別可不同，可單獨指定。
- - arrays:陣列.每個元素型別必須相同。長度固定不可增減。

```rust
// let 預設不可變。加mut修飾符後，可變。
let test =5; // 不可變
let mut testt =5; // 可變
// 常量
const MAX_POINTS: u32 =100_000;

// 隱藏。用let關鍵字重複生命相同變數名，隱藏變數值。
let x =5;
let x =x+1;
let x = x*2;
println!("x的數值為:{}",x); // 12。即(5+1)*2

let spaces ="   "; // 此處不可加mut修飾(型別不同)。
let spaces = spaces.len();
println!("{}",spaces); // 3。

// 布林
let t = true;
let f: bool = false; // 型別詮釋的方式

// 元組。為每個元素指定型別
let tup: (i32, f64, u8) = (500, 6.4, 1);
// 解構寫法
let tup = (500, 6.4, 1);
let (x, y, z) = tup;
println!("The value of y is: {}", y);
// 索引訪問形式
let x: (i32, f64, u8) = (500, 6.4, 1);
let five_hundred = x.0;
let six_point_four = x.1;
let one = x.2;

// 陣列
let a = [1, 2, 3, 4, 5];
// 另一種寫法
let a: [i32; 5] = [1, 2, 3, 4, 5];
// let a = [3; 5]; 等價於 let a = [3, 3, 3, 3, 3];
// 訪問陣列元素
let a = [1, 2, 3, 4, 5];
let first = a[0];
let second = a[1];
```

# demo game

- 隨機 1-100 之間的數字，根據使用者輸入，反饋兩者之間的比較結果

```rust
use std::io; // i/o庫
use rand::Rng; // 隨機數庫
use std::cmp::Ordering; // 實現數字比較所需

fn main(){
    // 字串顯示在螢幕
    println!("請猜測一個數字");
    // 通常是最方便的隨機性來源
    let rand_number = rand::thread_rng().gen_range(1,101);
    println!("隨機數:{}",rand_number);
    // 程式循壞執行
    loop {
        println!("請輸入一個數字");
        // 可變變數 = String型別 靜態方法 。即新的空String例項賦值給guess變數
        let mut  guess = String::new();
        // io模組 呼叫 stdin函式
        io::stdin()
            // 呼叫函式，獲取使用者輸入。放置到guess中
            .read_line(&mut guess)
            .expect("讀取改行失敗");
        // 將輸入內容轉為數字。此寫法會在輸入非數字是，終止程式。
        // let guess: u32 = guess.trim().parse().expect("請輸入一個數字！");
        // 將輸入內容轉為數字。 注意match
        let guess: u32 = match guess.trim().parse() {
            Ok(num)=>num, // 轉換成功
            Err(_)=>continue, // 轉換失敗
        };
        println!("猜測的數字：{}",guess);

        // 比較隨機數即輸入數
        match guess.cmp(&rand_number){
            Ordering::Less => println!("{}<{}",guess,rand_number),
            Ordering::Greater => println!("{}>{}",guess,rand_number),
            Ordering::Equal =>{
                println!("{}={}",guess,rand_number);
                break; // 如果兩個數值相等，則停止迴圈。
            }
        }
    }
}
```

---

# Dir&File

- 寫入檔案到指定目錄

```rust

```

- 讀取指定路徑下的目錄或檔案

```rust
/**
 * 深層目錄需遞迴。因遞迴傳入值型別問題。
 * 此處避免轉換所以使用PathBuf型別。
 */
pub fn read_dir_or_file(path: &PathBuf) -> Result<()> {
    for entry in fs::read_dir(&path)? {
        let dir = entry?;
        let metadata = dir.metadata()?;
        // 如果是資料夾，就繼續執行
        if metadata.is_dir() {
            println!("路徑:{:?}", dir.path());
            // 此處應遞迴 傳入路徑
            read_dir_or_file(&dir.path());
        } else {
          // 程式碼不變……
        }
    }
    Ok(())
}
```

```rust

use std::fs;
use std::io::*;
extern crate chrono; // 外鏈庫
use chrono::prelude::*; // 引入庫
use std::path::PathBuf;
use std::time::SystemTime;
use std::time::UNIX_EPOCH;

/* 拆分並返回檔名 */
pub fn split_str(s: &String) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b'.' {
            return &s[0..i];
        }
    }
    &s[..]
}


/**
 * 讀取指定path下的目錄或檔案
 * 此處避免轉換所以使用PathBuf型別。
 */
pub fn read_dir_or_file(path: &PathBuf) -> Result<()> {
    for entry in fs::read_dir(&path)? {
        let dir = entry?;
        let metadata = dir.metadata()?;
        // 如果是資料夾，就繼續執行
        if metadata.is_dir() {
            println!("目錄:{:?}", dir);
            println!("路徑:{:?}", dir.path());
            println!("目錄名稱:{:?}", dir.file_name()); // 目錄或檔案的名稱
            println!("目錄型別: {:?}", dir.file_type()); // 目錄或檔案的型別
            println!("目錄元資料:{:?}", dir.metadata()); // 目錄或檔案的元資料
            println!("目錄: {:?}", metadata.is_dir()); // 是否為目錄
            let time = metadata.modified()?;
            println!("最後修改時間 格式化:{:?}", format_datetime(time));
            // 此處應遞迴 傳入路徑
            read_dir_or_file(&dir.path());
        } else {
            println!("===== 檔案 start =====");
            println!("目錄:{:?}", dir);
            println!("路徑:{:?}", dir.path());
            println!("檔名稱:{:?}", dir.file_name()); // 目錄或檔案的名稱
            println!("檔案型別: {:?}", dir.file_type()); // 目錄或檔案的型別
            println!("檔案元資料:{:?}", dir.metadata()); // 目錄或檔案的元資料
            println!("目錄: {:?}", metadata.is_dir()); // 是否為目錄
                                                       //最後修改時間
            let time = metadata.modified()?;
            println!("最後修改時間 格式化:{:?}", format_datetime(time));
            println!("===== 檔案 end =====");
            // 如果是檔案，整理為Vec
        }
    }
    Ok(())
}
/**
 * 讀取指定path下的目錄或檔案
 * use example:
 * read_dir_or_file(&String::from("../../notes/docs/rust/"));
 * desc: 需use或者使用 std::io::Result<()>{
 */
use std::io::*;
fn read_dir_or_file(path: &String) -> Result<()> {
    for entry in fs::read_dir(&path)? {
        let dir = entry?;
        let metadata = dir.metadata()?;
        // 如果是資料夾，就繼續執行
        if metadata.is_dir() {
            println!("目錄:{:?}", dir);
            println!("路徑:{:?}", dir.path());
            println!("目錄名稱:{:?}", dir.file_name()); // 目錄或檔案的名稱
            println!("目錄型別: {:?}", dir.file_type()); // 目錄或檔案的型別
            println!("目錄元資料:{:?}", dir.metadata()); // 目錄或檔案的元資料
            println!("目錄: {:?}", metadata.is_dir()); // 是否為目錄
            let time = metadata.modified()?;
            println!("最後修改時間 格式化:{:?}", format_datetime(time));
        } else {
            println!("檔名稱:{:?}", dir.file_name()); // 目錄或檔案的名稱
            println!("檔案型別: {:?}", dir.file_type()); // 目錄或檔案的型別
            println!("檔案元資料:{:?}", dir.metadata()); // 目錄或檔案的元資料
            println!("目錄: {:?}", metadata.is_dir()); // 是否為目錄
                                                       //最後修改時間
            let time = metadata.modified()?;
            println!("最後修改時間 格式化:{:?}", format_datetime(time));
        }
    }
    Ok(())
}

```

---

# DateTime

- 日期時間處理相關

### 時間戳格式化為日期時間(暫未實現)

```rust
/**
 * 嘗試自己寫個時間戳轉人類易讀
 * use example:
 * format_data_time(SystemTime::now());
 */
fn format_data_time(time: SystemTime) {
    println!("測試傳入值{:?}", time);
    // 已知的Rust 1.0釋出日期時間的毫秒值 2015-05-15T00:00:00 / 2015-05-15 08:00:00
    const DEFAULT_MILLIS_SINCE_EPOCH: u128 = 1431648000000;

    let difference = get_epoch_ms(time) - DEFAULT_MILLIS_SINCE_EPOCH;
    println!("測試 時間戳差值: {:?}", difference);

    // 186394645574  求出總秒 186394645.574
    let temp = difference as f64 / 1000 as f64;
    println!("測試 求出總秒: {:?}", temp);
    println!("測試 求出總分: {:?}", temp / 60.00);
    println!("測試 求出總小時: {:?}", temp / 60.00 / 60.00);
    println!("測試 求出總日: {:?}", temp / 86400.00);
    // println!("測試 求出總月: {:?}", temp);
    // println!("測試 求出總年: {:?}", temp);
    //    "這裡是輸出"
}
```

# use chrono

- 使用主流日期時間格式化庫
- `Cargo.toml`檔案加入庫，執行`Cargo build`命令

```toml
[dependencies]
chrono = "0.4" # 時間格式化
```

```rust
/**
 * 格式化傳入的SystemTime型別的日期時間
 * 返回格式化後的字串
 * use example:
 * format_datetime(time); time為SystemTime型別資料
 */
extern crate chrono; // 外鏈庫
use chrono::prelude::*; // 引入庫
fn format_datetime(time: SystemTime) -> String {
    // 使用as 型別強轉
    let dt: DateTime<Local> = Local.timestamp_millis(get_epoch_ms(time) as i64);
    // 格式化時間為人類易讀格式: 2021-04-09 23:54:50
    dt.format("%Y-%m-%d %H:%M:%S").to_string()
}
```

# SystemTime To UNIX Timestamp

```rust
/**
 * 將傳入的值轉為 13位時間戳
 * SystemTime:引數型別
 * u128:返回值型別
 * use example:
 * get_epoch_ms(time)
*/
fn get_epoch_ms(time: SystemTime) -> u128 {
    // SystemTime::now() 系統當前時間
    time.duration_since(UNIX_EPOCH).unwrap().as_millis()
}

/**
 * 格式化傳入的SystemTime型別的日期時間
 * 返回格式化後的字串
 * use example:
 * format_datetime(time); time為SystemTime型別資料
 */

fn format_datetime(time: SystemTime) -> String {
    // 使用as 型別強轉
    let dt: DateTime<Local> = Local.timestamp_millis(get_epoch_ms(time) as i64);
    // 格式化時間為人類易讀格式: 2021-04-09 23:54:50
    dt.format("%Y-%m-%d %H:%M:%S").to_string()
}
```

# Rust 1.8 SystemTime 處理

```rust
// 19位時間戳 轉 10位時間戳
let temp = time.duration_since(UNIX_EPOCH).expect("時間倒退");
// 10位時間戳 轉 13位時間戳
let in_ms = temp.as_secs() * 1000 + temp.subsec_nanos() as u64 / 1_000_000;
```

---

# String Operating

- 透過內容位元組組以指定字元進行分割並輸出

```rust
/**
 * 根據文字內容中第一個>，
 * is_info:true 擷取其之前所有內容為當前文字的資訊。
 * is_info:false 擷取其之後所有內容為當前文字的正文。
 * use example:
 * info_or_content(&temp, false);
 */
fn info_or_content(s: &String, is_info: bool) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b'>' {
            if is_info {
                // 擷取文章資訊
                return &s[0..i + 1];
            }
            // 擷取正文
            return &s[i + 1..];
        }
    }
    &s[..]
}
let str = include_str!("test.md");
let temp = String::from(&str.to_string());

/**
 * 根據文字內容中第一個:切分並返回文章資訊的每項屬性值
 * use example:
 * info_item(&String::from("dir:rust"));
 */
fn info_item(s: &String) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b':' {
            return &s[i + 1..];
        }
    }
    &s[..]
}
```

---

# MySQL Operating

# diesel

- [主流操作資料庫](https://diesel.rs/)
- `cargo.toml`中新增`mysql = "*"`

```rust
use mysql::*;
use mysql::prelude::Queryable;
use crate::chrono::NaiveDate;

// user結構體
struct User {
    id:u64,
    firstname:String,
    lastname:String,
    phone:String,
    reg_date:NaiveDate,
}

// 獲取mysql連線
 fn main(){
    let url = "mysql://root:****@localhost:3306/demo";
    let pool = Pool::new(url).unwrap(); // 獲取連線池
    let mut conn = pool.get_conn().unwrap();// 獲取連結
    let res = &mut conn.query_map(
        "select * from user",
        |(id,firstname,lastname,phone,reg_date)|User{
            id:id,
            firstname:firstname,
            lastname:lastname,
            phone:phone,
            reg_date:reg_date
        },
    ).expect("Query failed.");

    for i in res {
        println!(
            "{},{},{},{},{:?}",
            i.id,i.firstname,i.lastname,i.phone,i.reg_date
        )
    }
}
```

---

# WebAssembly

# WebAssembly & Deno

- `rust`程式碼編譯為`wasm`在`deno`中使用
- `deno`部分使用 TS/JS 皆可。

```bash
# 建立用於構建wasm庫的專案
cargo new --lib <project-name>
# 獲取用於生成TS/JS介面卡檔案的CLI工具
cargo install wasm-bindgen-cli
# wasm-pack編譯deno不友好；ssvmup無win系統版。
```

```toml
[dependencies]
wasm-bindgen = "0.2.70" # wasm與js互動庫

[lib]
name = "libname" # 此處定義，命令時就無需再指定
# 告知rust編譯器建立一個沒有啟動函式的wasm二進位制檔案。
# 編譯器建立動態庫(win.dll，linux.so，macos.dylib)
# 由於部署單元為wasm，因此編譯器建立.wasm檔案(如:wisesayings.wasm)
crate-type =["cdylib", "lib"]
```

```rust
/* src/lib.rs */
use wasm_bindgen::prelude::*;

#[wasm_bindgen] // 指示編譯器該程式碼的目標是wasm檔案

pub fn get_wise_saying() -> String {
    // 使用宏命令。從磁碟中獲取檔案，並將資料載入到記憶體中
    let str = include_str!("1.md");
    return str.to_string(); // 返回字串
}

/* src/main.rs */
use wisesayings::get_wise_saying;

fn main() -> std::io::Result<()> {
    let str = get_wise_saying();
    println!("{}", str);
    Ok(())
}

/* 這是MDN教程的示例程式碼 src/lib.rs 只有這一個檔案 */
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

```bash
# 將原始碼編譯為wasm
# # --lib 指標對./lib目錄中的原始碼構建庫
# # --target 指明使用編譯器，並將構建工件及wasm檔案儲存到該目錄下
cargo build --lib --target wasm32-unknown-unknown
# 此處如果報錯 error[E0463]: can't find crate for core|  = note: the "wasm32-unknown-unknown" target may not be ins。
# 解決以上報錯問題。將WASM目標新增到Rust工具鏈
rustup target add wasm32-unknown-unknown
# 重新執行 原始碼編譯為wasm

# Rust目標三重新命名約定：ARCH-VENDOR-SYS-ABI
# # ARCH:預期目標體系結構。如用於wasm檔案的wasm32，用於intel晶片的i686
# # VENDOR:釋出目標的供應商。如:Nvidai、Apple
# # SYS:作業系統。如:Windows、Linux
# # ABI:指明過程如何啟動。
# # # wasm32-unknown-unknown指明是一個作業系統及ABI未知的二進位制檔案
```

- 使用 Deno 部署二進位制檔案伺服器端

```bash
# wasm-bindgen 建立介面卡檔案和特殊wasm的命令
# --target deno 編譯為deno版本
# --out-dir ./server 編譯完成，檔案的存放位置
# ./target/xxxx.wasm 表示原始wasm檔案的位置
wasm-bindgen --target deno ./target/wasm32-unknown-unknown/debug/demo.wasm --out-dir ./server
# server 中可見生成的檔案清單。`xxx_bg.wasm`為 bindgen 縮寫
# # demo_bg.wasm
# # demo_bg.wasm.d.ts
# # demo.d.ts
# # demo.js
```

```ts
/* server/main.ts 也可以寫js */
import { serve } from "https://deno.land/std/http/server.ts";
import { get_wise_saying } from "./wisesayings.js";

const env = Deno.env.toObject();

let port = 8080;
if (env.WISESAYING_PORT) {
  port = Number(env.WISESAYING_PORT);
}

const server = serve({ hostname: "0.0.0.0", port: 8080 });
console.log(
  `HTTP webserver running at ${new Date()}.  Access it at:  http://localhost:${port}/`
);

for await (const request of server) {
  const saying = get_wise_saying();
  // 亂碼，但如果是給前端，則不會有亂碼問題。
  request.respond({ status: 200, body: JSON.stringify({ data: saying }) });
}
```

```js
/* MDN教程示例程式碼的編譯後使用 main.js */
import { serve } from "https://deno.land/std@0.92.0/http/server.ts";
import { greet } from "./demo.js";

const s = serve({ port: 8080 });
console.log("http://localhost:8080/");
// 注意：需有引數值。否則會報錯。
console.warn("greet:", greet("Lokavit"));

for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

```bash
# cd到server目錄下 執行以下命令
deno run --allow-read --allow-net --allow-env main.ts
# # --allow-read：允許讀取磁碟檔案
# # --allow-net:允許訪問網路
# # --allow-env:讀取環境變數
```

- 前端 fetch 請求並渲染到頁面

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>前端</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  </head>

  <body>
    <article></article>
    <script>
      // 測試連線Deno伺服器，並讀取返回的資料
      async function getContent() {
        const res = await fetch(`http://localhost:8080/`);
        const result = await res.json();
        console.warn("result:", result);
        document.querySelector("article").innerHTML = marked(result.data);
      }
      getContent();
    </script>
  </body>
</html>
```
