---
title: Rust
date: '2020-01-17'
tags: ['code']
draft: false
---

# 常用命令

```bash
rustc --version # rustc 1.51.0
rustup update # 更新
rustup self uninstall # 卸载。
rustup install nightly # 安装当前 rust 版本的其他 toolchain
rustup update nightly # 更新当前 rust 版本的 toolchain
rustup doc # 打开本地文档

# Cargo：Rust的构建与套件管理工具
cargo --version # cargo 1.51.0
cargo install <libname> # 装载库(name库名)
cargo build # 通过Cargo.toml中的环境设置装载所需库
cargo run # 构建程式
cargo doc # 查看文档。如下示例
cargo doc --open # pull并在浏览器打开文档，可进行相关函数查阅。
cargo new <name> # 创建项目
```

# 环境及配置

- [rust-init.exe](https://www.rust-lang.org/)
- [Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)

> 打开装载程式，会检测系统环境，若提示缺少 vs c++组件，则必须先装载组件。从 vs2019 的装载工具中，选在以下单组件`MSVC v142 -VS 2019 C++ x64/x86 生成工具(最新版)`、`Windows 10 SDK (最新版)` **没有这项会在`cargo build`时报`link.exe`错误**

- 启动`rust-init.exe`，环境检测中可见`x86_64-pc-windows-msvc`

```bash
# 程式默认装载于users文件夹下，可根据提示添加对应环境变量，改变装载路径于dev下
RUSTUP_HOME: dev/rustup # 存储工具链和配置文件
CARGO_HOME: dev/cargo # 存储cargo的缓存

# 在dev/cargo/修改或创建config文件，输入以下代码(内网镜像源)
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```

---

# Basic Programming Language

# 错误处理

- `panic!`,打印错误信息，展开并清理数据，而后退出。
- `RUST_BACKTRACE=1`,backtrace 是一个执行到目前位置所有被调用的函数的列表。

```toml
# 另一种painc! 展开切换为终止
[profile.release]
panic = 'abort'
```

```bash
RUST_BACKTRACE=1 cargo run
```

```rust
/*=========== 传播错误及使用?运算符简写 ==========*/
use std::io;
use std::io::Read;
use std::fs::File;

fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();
    let mut f = File::open("hello.txt")?;
    f.read_to_string(&mut s)?;
    // 以上两行可以链式为一行代码
    File::open("hello.txt")?.read_to_string(&mut s)?;

    Ok(s)
}

/*=========== 失败时 panic 的简写：unwrap 和 expect ==========*/
use std::fs::File;

fn main() {
    // 返回Result中Ok的值，或Err下调用panic!
    let f = File::open("hello.txt").unwrap();
    // 允许选择panic!的错误信息，更易于追踪panic的根源。
    let f = File::open("hello.txt").expect("Failed to open hello.txt");
}

/*=========== Result panic! 更优写法 ==========*/
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
            // 尝试打开的文件不存在，则创建该文件
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };
}
```

# 常见集合

- 存储在堆中。常用集合(vector、字符串、哈希 map)
- - vector:相同类型的值。相邻排列。(文本行或购物车中商品价格)
- - HashMap:键值类型需相同。可以使用元组
- - - 字符串值插入 HashMap，其所有权亦转到 HashMap。

```rust
/*=========== 哈希 map 储存键值对 ==========*/
use std::collections::HashMap;

fn main() {
  // 新建
  let mut scores = HashMap::new();

  // 插入数据
  scores.insert(String::from("a"), 10);
  scores.insert(String::from("b"), 30);

  // 使用元素
  let teams = vec![String::from('a'), String::from('b')];
  let init_scores = vec![10, 30];

  /*
     使用HashMap类型注解，
     zip():创建一个元组的vector。
     collect()将元组转换为HashMap。
  */
  let scores: HashMap<_, _> = teams.iter().zip(init_scores.iter()).collect();
  println!("{:?}", scores);

  // 访问值 返回 Option<V>。有值装入Some，无值返回None。
  let team_name = "a".to_string();
  let score = scores.get(&team_name);

  // 遍历的方式访问
  for (key, value) in &scores {
    println!("{}: {}", key, value);
  }

  // 更新 直接覆盖
  let mut scores = HashMap::new();
  scores.insert(String::from("b"), 11);

  // 只在键没有对应值时插入
  let mut scores = HashMap::new();
  scores.insert(String::from("Blue"), 10);
  /*
    entry()返回枚举。无值则插入值，
    or_insert():有值则使用返回值的可变引用，
      无值则将参数作为心智插入并返回新值的可变引用
  */
  scores.entry(String::from("Yellow")).or_insert(50);
  scores.entry(String::from("Blue")).or_insert(50);
  println!("{:?}", scores);

  // 根据旧值更新一个值
  let text = "hello world wonderful world";
  let mut map = HashMap::new();
  for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
  }
  println!("{:?}", map);
}

/*=========== String及常用处理 ==========*/
fn main() {
  // 创建空字符串
  let mut s = String::new();
  // 创建并初始化字符串
  let data = "hello".to_string();
  // 与上行代码等效
  let data = String::from("hello");
  // 增加字符串
  let mut temp = "hello".to_string();
  temp.push_str(" world");
  // 使用+连接字符串
  let temp1 = "hello".to_string();
  let temp3 = " world".to_string();
  // 返回结果所有权 = 获取temp1的所有权 + temp3引用的内容 (temp1无法继续使用)
  let temp5 = temp + &temp3;
  // 使用宏命令进行 复杂的字符串拼接
  let s = format!("{}{}{}", temp1, temp3, temp5);
  // 遍历字符串
  for c in "नमस्ते".chars() {
    println!("{}", c);
  }

  // 需要被替换的字符串
  let temp_comment = "<!--  -->".to_string();
  // 文本内容
  let temp = "替换注释".to_string();
  // 模板
  let templ = "<pre><code><!--  --></code></pre>";
  // 最终输出 <pre><code>替换注释</code></pre>
  println!("{:?}", &templ.replace(&temp_comment, &temp));

  // 类型转换
  let s1 = String::from("test");
  let s3 = s1.as_str();

  let s1 = "汉字-Test";
  // 是否包含指定字符串
  assert_eq!(true, s1.contains("汉字"));
  // 是否以指定字符串开头
  assert_eq!(true, s1.starts_with("汉字"));
  // 是否以指定字符串结尾
  assert_eq!(true, s1.ends_with("Test"));
  // 字母全转大写
  println!("{:?}", s1.to_uppercase());
  //请注意与  to_uppercase() 的不同
  let mut s3 = String::from("汉字-Test");
  s3.make_ascii_uppercase();
  // 字母全转小写
  println!("{:?}", s1.to_lowercase());
  //请注意与  to_lowercase() 的不同
  let mut s3 = String::from("汉字-Test");
  s3.make_ascii_lowercase();
  // 字符串切割
  let mut s = String::from("汉字-Test");
  let result: Vec<&str> = s.split("-").collect();
  println!("{:?}", result); // -> ["汉字", "Test"]
}

/*=========== vector 用来储存一系列的值 ==========*/
fn main() {
    // 新建vector 用于存储i32类型的值
    let v: Vec<i32> = Vec::new();
    // 新建时包含初始值。使用宏。根据提供值创建一个新的vec
    let v = vec![1, 2, 3];

    // 更新vector。 可变变量。不可变则不能增加元素
    let mut v = Vec::new();
    v.push(3); // 增加值
    v.push(5); // 同类型值
    v.push(7); // 所以无需使用<i32>注解

    // 丢弃vector时，其所有元素亦会丢弃
    {
        let v = vec![1, 2, 3, 4];
    } // <- 这里 v 离开作用域并被丢弃

    // 读取vector元素。
    let v = vec![1, 2, 3, 4, 5];
    // 以索引语法获取vector中的值。索引超出范围会引发错误
    let third: &i32 = &v[2];
    println!("The third element is {}", third);
    // 以get方法获取vector中的值。超出范围返回None。
    match v.get(2) {
        Some(third) => println!("The third element is {}", third),
        None => println!("There is no third element."),
    }

    // 遍历vector中的元素
    let v = vec![33, 66, 99];
    for i in &v {
        println!("{}", i)
    }

    // 遍历可变vector中每个元素的可变引用
    let mut v = vec![11, 55, 77];
    for i in &mut v {
        *i += 50; // 解引用i += 50;
        println!("{}", i)
    }

    // 使用枚举来存储多种类型
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

# 使用包、Crate 和模块

- 模块树都植根于名为 crate 的隐式模块下
- 模块可嵌套，模块中支持结构体、枚举、常量、特性、函数
- 路径后跟一个或多个由双冒号（::）分割的标识符
- - 绝对路径（absolute path）从 crate 根开始，以 crate 名或者字面值 crate 开头。
- - 相对路径（relative path）从当前模块开始，以 self、super 或当前模块的标识符开头。
- - super 起始的相对路径，移动模块时，变更很少代码。
- - use:使用该关键字将名称引入作用域
- - as:使用该关键字提供新的名称。用于 use 至相同名称的情况
- Rust 中默认所有项（函数、方法、结构体、枚举、模块和常量）都是私有的
- - 父模块中的项不能使用子模块中的私有项,子模块中的项可以使用他们父模块中的项

```bash
cargo new --lib rust-lib # 建库项目
```

```rust
/*=========== 使用 as 关键字提供新的名称 ==========*/
use std::fmt::Result;
use std::io::Result as IoResult;
fn function1() -> Result {}
fn function2() -> IoResult<()> {}

/*=========== 使用 use  ==========*/
// 通过 glob 运算符将所有的公有定义引入作用域。慎用。
use std::collections::*;
// 一个是另外一个子路径，同时引入作用域
use std::io::{self, Write};
 // 嵌套引入
use std::{cmp::Ordering, io};
// 标准库引入，无需修改Cargo.toml
use std::collections::HashMap;
// 外部引入。需在Cargo.toml中添加库
use rand::Rng;

/*=========== 模块分割入不同文件 示例及注释 ==========*/
/* src/front_of_house/hosting.rs */
pub fn add_to_waitlist() {} // 模块中函数 使用 pub 关键字变为公有

/* src/front_of_house.rs */
pub mod hosting;// 子模块 使用 pub 关键字暴露路径

/* src/lib.rs */
mod front_of_house; // 加载同名模块文件的内容

/*=========== 模块的相关要点 示例及注释 ==========*/
mod front_of_house { // 这部分已拆分为单独的文件
    // 子模块 使用 pub 关键字暴露路径
    pub mod hosting {
        // 模块中函数 使用 pub 关键字变为公有
        pub fn add_to_waitlist() {}
    }
}

// 使用use和相对路径将项引入作用域
use front_of_house::hosting;
// 使用pub use 重导出名称
// pub use crate::front_of_house::hosting;

/** 公有函数 */
pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();
    // 相对路径
    front_of_house::hosting::add_to_waitlist();
    // use 与相对路径结合
    hosting::add_to_waitlist();

    // 公有结构体实例
    let mut meal = back_of_house::Breakfast::summer("Rye");
    meal.toast = String::from("Wheat");
    println!("{}", meal.toast);

    // 公有枚举成员使用
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}

fn server_order() {}
mod back_of_house {
    /** 公有枚举 所有成员皆为公有 */
    pub enum Appetizer {
        Soup,
        Salad,
    }
    /** 公有结构体 所有成员默认私有，公有pub需指定 */
    pub struct Breakfast {
        pub toast: String,      // 公有字段
        seasonal_fruit: String, // 默认私有字段
    }
    // 结构体方法
    impl Breakfast {
        //
        //
        /**
         * 公有函数 传入字符串，返回结构体
         * 具有私有字段的结构体，需要提供该公共关联函数来构造结构体实例
         * 若无该函数则无法在 eat_at_restaurant 中创建该结构体的实例
         */
        pub fn summer(toast: &str) -> Breakfast {
            // 结构体实例化
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }

    fn cook_order() {}
    fn fix_incorrect_order() {
        cook_order();
        // 使用 super 起始的相对路径
        super::server_order();
    }
}
```

# 枚举和模式匹配

- match:先匹配模式，匹配到则执行关联代码
- if let:处理只匹配一个模式的值而忽略其他模式的情况。

```rust
/*=========== if let 简单控制流 ==========*/
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
        count += 1; // 对非state的进行计数
    }
}

/*=========== 匹配 Option<T> ==========*/
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None, // 要有，否则造成BUG
        Some(i) => Some(i + 1),
    }
}

fn main() {
    let five = Some(5);
    let six = plus_one(five); // 6
    let none = plus_one(None);
    println!("{:?},{:?}", six, none);

    /* _ 通配符 */
    let some_u8_value = 0u8;
    match some_u8_value {
        1 => println!("one"),
        3 => println!("three"),
        5 => println!("five"),
        7 => println!("seven"),
        _ => (), // 匹配所有之前没有指定的可能的值
    }
}

/*=========== match 控制流运算符 及绑定值的模式 ==========*/
#[derive(Debug)]

/** 用于传递给 Coin枚举中的Quarter项 */
enum UsState { Alabama, Alaska, }
enum Coin { Penny, Nickel, Dime, Quarter(UsState), }

/** 返回值可以是任何类型 */
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        // 对应枚举中每项，此处亦可用{}
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


/*=========== Option<T> 编码存在或不存在 ==========*/
use std::option::Option; // 引入库

fn main() {
    let some_num = Some(5);
    let some_str = Some("a string");
    let absent_num: Option<i32> = None;
}


/*=========== 枚举使用示例 ==========*/
/* 定义枚举 */
enum IpAddr {
    V4(u8, u8, u8, u8), // 可以单独定义数据类型
    V6(String),
}

enum Message {
    Quit,                       //没有关联任何数据
    Move { x: i32, y: i32 },    //包含一个匿名体结构
    Write(String),              //包含一个单独String
    ChangeColor(i32, i32, i32), //包含三个i32类型数据
}

impl Message {
    fn call(&self) {
        println!("方法体")
    }
}

fn main() {
    // 实例化枚举::枚举项，并为其赋值
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));

    let m = Message::Write(String::from("Hello!"));
    m.call(); // 调用枚举的方法
}
```

# struct 结构体

- 自定义数据类型。允许命名和包装多个相关的值，形成有意义的组合。
- 创建结构体实例。key 为字段名：value 为数据值。顺序无需一致。
- 元组结构体：即使类型相同，在函数中结构体类型的参数不能互通。

```rust
/*=========== 结构体使用示例 ==========*/
#[derive(Debug)] // 声明debug可以打印结构体。
/** 创建结构体 */
struct Rectangle {
    width: u32,
    height: u32,
}
// 将某个类型实例能做的事情都放入impl块中
impl Rectangle {
    // self指调用该方法的结构体实例
    // 使用&因只需读取结构体的数据，不需要写入(获取所有权)
    fn area(&self) -> u32 {
        self.width * self.height
    }
    // 关联函数。不以self作为参数的函数。不作用于结构体的实例。
    // 经常被用作返回一个结构体新实例的构造函数。
    // 接收一个维度参数
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}
/**
 * 每个结构体允许有多个 impl块，但每个方法有其自己的impl块。
 * 此处只为有效示例，非最优写法。
 */
impl Rectangle {
    /**
     * 比较两个结构体实例的属性值。返回bool结果。
     * 参数一：&self，即已知的rect1也就是结构体实例化的变量
     * 参数二：结构体类型实例。即rect2或rect3
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
    // 打印结构体(结构形式输出)
    println!("{:#?}", rect1);
    // 方法语法。在结构体实例上调用其方法
    println!("{}", rect1.area());
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
    // 使用结构体的关联函数，输入可见结果。wh皆为3
    println!("square:{:#?}", Rectangle::square(3));
}

/*=========== 元组结构体（tuple structs） ==========*/
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);
let back = Color(0,0,0); // 黑色
let origin =Point(0,0,0); // 原点
// 以元组方式使用 字段.索引
println!("{}", back.1);
println!("{}", origin.1);

/*=========== 结构体基本使用 ==========*/
 // 声明debug可以打印结构体。只有结构、枚举类型可用
#[derive(Debug)]
/** 定义结构体 */
struct User {
    name: String,
    age: u64,
    active: bool,
}

fn main() {
    // 调用构建结构体函数，并传值
    let temp = build_user(String::from("dd"));
    // 打印结构体(单行形式输出)
    println!("{:?}", temp);
    // 打印结构体(结构形式输出)
    println!("{:#?}", temp);
    // 实例化结构体
    let user1 = User {
        name: String::from("aa"),
        age: 16,
        active: true,
    };
    // 实例化结构体
    let user3 = User {
        active: false,
        ..user1 // 结构体剩余值使用user1中的值
    };
    println!("{:?}", user3);
}
/** 构建结构体函数 传入参数，返回实例化的结构体 */
fn build_user(name: String) -> User {
    User {
        name,
        age: 15,
        active: true,
    }
}
```

# ownership 所有权

- 通过所有权系统管理内存
- clone():字符串克隆。
- Copy:整型、浮点、布尔、字元、元组(元素同类型)
- &:引用。允许使用值但不获取其所有权。默认禁止修改引用的值。
- 借用：获取引用作为函数参数。
- 可变引用：在特定作用域中的特定数据只能有一个可变引用。

```rust
/*=========== 字符串 slice .. range(范围) 语法 ==========*/
let s = String::from("hello");
let slice = &s[0..2];
let slice = &s[..2];
// 或者是如下写法
let s = String::from("hello");
let len = s.len();
let slice = &s[3..len];
// 如果 slice 包含 String 的最后一个字节，可以舍弃尾部的数字
let slice = &s[3..];
// 也可以同时舍弃这两个值来获取整个字符串的 slice
let slice = &s[..];

/*=========== 可变引用 作用域 ==========*/
let mut s = String::from("hello");
// 不可变 = 不可变引用
let r1 = &s; // 没问题
let r2 = &s; // 没问题
println!("{} and {}", r1, r2); // r1r2是不可变引用
// 此位置之后 r1 和 r2 不再使用。因为最后一次使用不可变引用在声明可变引用之前
let r3 = &mut s; // 没问题。
println!("{}", r3);

/*=========== 可变引用 ==========*/
fn main() {
    let mut s = String::from("hello");
    // &mut s 在作用域内只能用一次。
    change(&mut s);
}
fn change(some_string: &mut String) {
    some_string.push_str(", world");
}

/*=========== 引用与借用 ==========*/
fn main() {
    let s1 = String::from("hello");
    // 创建指针，指向s1的引用
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}
// s 是对 String 的引用，因无引用值所有权，s离开作用域，不会报错。
fn calculate_length(s: &String) -> usize { s.len() }

/*=========== 返回值与作用域 ==========*/
fn main() {
    let s1 = gives_ownership();         // gives_ownership 将返回值
                                        // 移给 s1
    let s2 = String::from("hello");     // s2 进入作用域
    let s3 = takes_and_gives_back(s2);  // s2 被移动到
                                        // takes_and_gives_back 中,
                                        // 它也将返回值移给 s3
} // 这里, s3 移出作用域并被丢弃。s2 也移出作用域，但已被移走，
  // 所以什么也不会发生。s1 移出作用域并被丢弃
fn gives_ownership() -> String {             // gives_ownership 将返回值移动给
                                             // 调用它的函数
    let some_string = String::from("hello"); // some_string 进入作用域.
    some_string                              // 返回 some_string 并移出给调用的函数
}
// takes_and_gives_back 将传入字符串并返回该值
fn takes_and_gives_back(a_string: String) -> String { // a_string 进入作用域
    a_string  // 返回 a_string 并移出给调用的函数
}

/*=========== 所有权与函数 ==========*/
fn main(){
    let s = String::from("hello");  // s 进入作用域
    takes_ownership(s);             // s 的值移动到函数里 ...
    //在此处使用s，会有编译错误      // ... 所以到这里不再有效
    let x = 5;                      // x 进入作用域
    makes_copy(x);                  // x 应该移动函数里，
                                    // 但 i32 是 Copy 的，所以在后面可继续使用 x
}// 这里, x 先移出了作用域，然后是 s。但因为 s 的值已被移走，
  // 所以不会有特殊操作

fn takes_ownership(some_string: String) { // some_string 进入作用域
    println!("{}", some_string);
} // 这里，some_string 移出作用域并调用 `drop` 方法。占用的内存被释放

fn makes_copy(some_integer: i32) { // some_integer 进入作用域
    println!("{}", some_integer);
} // 这里，some_integer 移出作用域。不会有特殊操作

/*=========== 移动与克隆 ==========*/
let s1 = String::from("hello");
let s2 = s1; // 此处 s1被移动，s1不再有效。
let s2 = s1.clone(); // 克隆。s1,s2皆有效。
println!("s1 = {}, s2 = {}", s1, s2);
```

# 控制流

- if:多个`if else if`最好使用`match`
- loop:重复执行。`break`停止循环
- while 条件循环。慢！因编译器增加运行时代码对每次循环的每个元素进行条件检查。
- for 遍历集合。最常用。

```rust
/*=========== 控制流 使用 for 遍历集合 ==========*/
let a = [10, 20, 30, 40, 50];
for element in a.iter() { println!("the value is: {}", element); }

// 倒计时
for number in (1..4).rev() { println!("{}!", number); }
println!("LIFTOFF!!!");

/*========= 控制流 while 条件循环 =============*/
let a = [10, 20, 30, 40, 50];
let mut index = 0;
while index < 5 {
    println!("the value is: {}", a[index]);
    // 每次执行，index值增1
    index = index + 1;
}

/*============ 控制流 loop 重复执行 ==========*/
let mut counter = 0;
// 最终值为20
let result = loop {
    counter += 1; // 每次+1
    // 若加到10，返回时将10*2
    if counter == 10 { break counter * 2; }
};

/*============ 控制流 if 表达式 ===============*/
let num = 7;
if num<5 {
    println!("The value: {}",num);
}else {
    println!("value of x is: {}",num);
}

// let语句中使用if
let condition = true;
// true为5，false为6 数据类型必须相同
let number = if condition {5}else{6};
```

# 函数

- 函数名`fn test_demo(){}`
- 函数参数需指定类型`fn test_demo(x:i32,y:i32){}`

```rust
// 具有返回值的函数
fn five() -> i32 {5}
// 具有参数与返回值的函数
fn plus_one(x: i32) -> i32 { x + 1 }
fn main(){
    // 表达式 y=4
    let y = {
        let x = 3;
        x + 1 // 注意，表达式结尾没有分号
    };
    let x = five(); // 5
    let z = plus_one(5); // 6
    println!("The value of x is: {},{},{}",y, x,z);
}
```

# 数据类型

- 标量类型
- - 整数:i/u(±/+)bit(8/16/32/64/128)通常用 i32
- - 浮点:f32/f64(单精度浮点/倍精度浮点)。默认 f64
- - 布尔、字元:('char')
- 复合类型
- - tuples:元组.元素类型可不同，可单独指定。
- - arrays:数组.每个元素类型必须相同。长度固定不可增减。

```rust
// let 预设不可变。加mut修饰符后，可变。
let test =5; // 不可变
let mut testt =5; // 可变
// 常量
const MAX_POINTS: u32 =100_000;

// 隐藏。用let关键字重复生命相同变量名，隐藏变量值。
let x =5;
let x =x+1;
let x = x*2;
println!("x的数值为:{}",x); // 12。即(5+1)*2

let spaces ="   "; // 此处不可加mut修饰(类型不同)。
let spaces = spaces.len();
println!("{}",spaces); // 3。

// 布尔
let t = true;
let f: bool = false; // 型別詮釋的方式

// 元组。为每个元素指定类型
let tup: (i32, f64, u8) = (500, 6.4, 1);
// 解构写法
let tup = (500, 6.4, 1);
let (x, y, z) = tup;
println!("The value of y is: {}", y);
// 索引访问形式
let x: (i32, f64, u8) = (500, 6.4, 1);
let five_hundred = x.0;
let six_point_four = x.1;
let one = x.2;

// 数组
let a = [1, 2, 3, 4, 5];
// 另一种写法
let a: [i32; 5] = [1, 2, 3, 4, 5];
// let a = [3; 5]; 等价于 let a = [3, 3, 3, 3, 3];
// 访问数组元素
let a = [1, 2, 3, 4, 5];
let first = a[0];
let second = a[1];
```

# demo game

- 随机 1-100 之间的数字，根据用户输入，反馈两者之间的比较结果

```rust
use std::io; // i/o库
use rand::Rng; // 随机数库
use std::cmp::Ordering; // 实现数字比较所需

fn main(){
    // 字符串显示在屏幕
    println!("请猜测一个数字");
    // 通常是最方便的随机性来源
    let rand_number = rand::thread_rng().gen_range(1,101);
    println!("随机数:{}",rand_number);
    // 程式循坏执行
    loop {
        println!("请输入一个数字");
        // 可变变量 = String类型 静态方法 。即新的空String实例赋值给guess变量
        let mut  guess = String::new();
        // io模组 调用 stdin函数
        io::stdin()
            // 调用函数，获取用户输入。放置到guess中
            .read_line(&mut guess)
            .expect("读取改行失败");
        // 将输入内容转为数字。此写法会在输入非数字是，终止程式。
        // let guess: u32 = guess.trim().parse().expect("請輸入一個數字！");
        // 将输入内容转为数字。 注意match
        let guess: u32 = match guess.trim().parse() {
            Ok(num)=>num, // 转换成功
            Err(_)=>continue, // 转换失败
        };
        println!("猜测的数字：{}",guess);

        // 比较随机数即输入数
        match guess.cmp(&rand_number){
            Ordering::Less => println!("{}<{}",guess,rand_number),
            Ordering::Greater => println!("{}>{}",guess,rand_number),
            Ordering::Equal =>{
                println!("{}={}",guess,rand_number);
                break; // 如果两个数值相等，则停止循环。
            }
        }
    }
}
```

---

# Dir&File

- 写入文件到指定目录

```rust

```

- 读取指定路径下的目录或文件

```rust
/**
 * 深层目录需递归。因递归传入值类型问题。
 * 此处避免转换所以使用PathBuf类型。
 */
pub fn read_dir_or_file(path: &PathBuf) -> Result<()> {
    for entry in fs::read_dir(&path)? {
        let dir = entry?;
        let metadata = dir.metadata()?;
        // 如果是文件夹，就继续执行
        if metadata.is_dir() {
            println!("路径:{:?}", dir.path());
            // 此处应递归 传入路径
            read_dir_or_file(&dir.path());
        } else {
          // 代码不变……
        }
    }
    Ok(())
}
```

```rust

use std::fs;
use std::io::*;
extern crate chrono; // 外链库
use chrono::prelude::*; // 引入库
use std::path::PathBuf;
use std::time::SystemTime;
use std::time::UNIX_EPOCH;

/* 拆分并返回文件名 */
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
 * 读取指定path下的目录或文件
 * 此处避免转换所以使用PathBuf类型。
 */
pub fn read_dir_or_file(path: &PathBuf) -> Result<()> {
    for entry in fs::read_dir(&path)? {
        let dir = entry?;
        let metadata = dir.metadata()?;
        // 如果是文件夹，就继续执行
        if metadata.is_dir() {
            println!("目录:{:?}", dir);
            println!("路径:{:?}", dir.path());
            println!("目录名称:{:?}", dir.file_name()); // 目录或文件的名称
            println!("目录类型: {:?}", dir.file_type()); // 目录或文件的类型
            println!("目录元数据:{:?}", dir.metadata()); // 目录或文件的元数据
            println!("目录: {:?}", metadata.is_dir()); // 是否为目录
            let time = metadata.modified()?;
            println!("最后修改时间 格式化:{:?}", format_datetime(time));
            // 此处应递归 传入路径
            read_dir_or_file(&dir.path());
        } else {
            println!("===== 文件 start =====");
            println!("目录:{:?}", dir);
            println!("路径:{:?}", dir.path());
            println!("文件名称:{:?}", dir.file_name()); // 目录或文件的名称
            println!("文件类型: {:?}", dir.file_type()); // 目录或文件的类型
            println!("文件元数据:{:?}", dir.metadata()); // 目录或文件的元数据
            println!("目录: {:?}", metadata.is_dir()); // 是否为目录
                                                       //最后修改时间
            let time = metadata.modified()?;
            println!("最后修改时间 格式化:{:?}", format_datetime(time));
            println!("===== 文件 end =====");
            // 如果是文件，整理为Vec
        }
    }
    Ok(())
}
/**
 * 读取指定path下的目录或文件
 * use example:
 * read_dir_or_file(&String::from("../../notes/docs/rust/"));
 * desc: 需use或者使用 std::io::Result<()>{
 */
use std::io::*;
fn read_dir_or_file(path: &String) -> Result<()> {
    for entry in fs::read_dir(&path)? {
        let dir = entry?;
        let metadata = dir.metadata()?;
        // 如果是文件夹，就继续执行
        if metadata.is_dir() {
            println!("目录:{:?}", dir);
            println!("路径:{:?}", dir.path());
            println!("目录名称:{:?}", dir.file_name()); // 目录或文件的名称
            println!("目录类型: {:?}", dir.file_type()); // 目录或文件的类型
            println!("目录元数据:{:?}", dir.metadata()); // 目录或文件的元数据
            println!("目录: {:?}", metadata.is_dir()); // 是否为目录
            let time = metadata.modified()?;
            println!("最后修改时间 格式化:{:?}", format_datetime(time));
        } else {
            println!("文件名称:{:?}", dir.file_name()); // 目录或文件的名称
            println!("文件类型: {:?}", dir.file_type()); // 目录或文件的类型
            println!("文件元数据:{:?}", dir.metadata()); // 目录或文件的元数据
            println!("目录: {:?}", metadata.is_dir()); // 是否为目录
                                                       //最后修改时间
            let time = metadata.modified()?;
            println!("最后修改时间 格式化:{:?}", format_datetime(time));
        }
    }
    Ok(())
}

```

---

# DateTime

- 日期时间处理相关

### 时间戳格式化为日期时间(暂未实现)

```rust
/**
 * 尝试自己写个时间戳转人类易读
 * use example:
 * format_data_time(SystemTime::now());
 */
fn format_data_time(time: SystemTime) {
    println!("测试传入值{:?}", time);
    // 已知的Rust 1.0发布日期时间的毫秒值 2015-05-15T00:00:00 / 2015-05-15 08:00:00
    const DEFAULT_MILLIS_SINCE_EPOCH: u128 = 1431648000000;

    let difference = get_epoch_ms(time) - DEFAULT_MILLIS_SINCE_EPOCH;
    println!("测试 时间戳差值: {:?}", difference);

    // 186394645574  求出总秒 186394645.574
    let temp = difference as f64 / 1000 as f64;
    println!("测试 求出总秒: {:?}", temp);
    println!("测试 求出总分: {:?}", temp / 60.00);
    println!("测试 求出总小时: {:?}", temp / 60.00 / 60.00);
    println!("测试 求出总日: {:?}", temp / 86400.00);
    // println!("测试 求出总月: {:?}", temp);
    // println!("测试 求出总年: {:?}", temp);
    //    "这里是输出"
}
```

# use chrono

- 使用主流日期时间格式化库
- `Cargo.toml`文件加入库，执行`Cargo build`命令

```toml
[dependencies]
chrono = "0.4" # 时间格式化
```

```rust
/**
 * 格式化传入的SystemTime类型的日期时间
 * 返回格式化后的字符串
 * use example:
 * format_datetime(time); time为SystemTime类型数据
 */
extern crate chrono; // 外链库
use chrono::prelude::*; // 引入库
fn format_datetime(time: SystemTime) -> String {
    // 使用as 类型强转
    let dt: DateTime<Local> = Local.timestamp_millis(get_epoch_ms(time) as i64);
    // 格式化时间为人类易读格式: 2021-04-09 23:54:50
    dt.format("%Y-%m-%d %H:%M:%S").to_string()
}
```

# SystemTime To UNIX Timestamp

```rust
/**
 * 将传入的值转为 13位时间戳
 * SystemTime:参数类型
 * u128:返回值类型
 * use example:
 * get_epoch_ms(time)
*/
fn get_epoch_ms(time: SystemTime) -> u128 {
    // SystemTime::now() 系统当前时间
    time.duration_since(UNIX_EPOCH).unwrap().as_millis()
}

/**
 * 格式化传入的SystemTime类型的日期时间
 * 返回格式化后的字符串
 * use example:
 * format_datetime(time); time为SystemTime类型数据
 */

fn format_datetime(time: SystemTime) -> String {
    // 使用as 类型强转
    let dt: DateTime<Local> = Local.timestamp_millis(get_epoch_ms(time) as i64);
    // 格式化时间为人类易读格式: 2021-04-09 23:54:50
    dt.format("%Y-%m-%d %H:%M:%S").to_string()
}
```

# Rust 1.8 SystemTime 处理

```rust
// 19位时间戳 转 10位时间戳
let temp = time.duration_since(UNIX_EPOCH).expect("时间倒退");
// 10位时间戳 转 13位时间戳
let in_ms = temp.as_secs() * 1000 + temp.subsec_nanos() as u64 / 1_000_000;
```

---

# String Operating

- 通过内容字节组以指定字元进行分割并输出

```rust
/**
 * 根据文本内容中第一个>，
 * is_info:true 截取其之前所有内容为当前文本的信息。
 * is_info:false 截取其之后所有内容为当前文本的正文。
 * use example:
 * info_or_content(&temp, false);
 */
fn info_or_content(s: &String, is_info: bool) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b'>' {
            if is_info {
                // 截取文章信息
                return &s[0..i + 1];
            }
            // 截取正文
            return &s[i + 1..];
        }
    }
    &s[..]
}
let str = include_str!("test.md");
let temp = String::from(&str.to_string());

/**
 * 根据文本内容中第一个:切分并返回文章信息的每项属性值
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

- [主流操作数据库](https://diesel.rs/)
- `cargo.toml`中添加`mysql = "*"`

```rust
use mysql::*;
use mysql::prelude::Queryable;
use crate::chrono::NaiveDate;

// user结构体
struct User {
    id:u64,
    firstname:String,
    lastname:String,
    phone:String,
    reg_date:NaiveDate,
}

// 获取mysql连接
 fn main(){
    let url = "mysql://root:****@localhost:3306/demo";
    let pool = Pool::new(url).unwrap(); // 获取连接池
    let mut conn = pool.get_conn().unwrap();// 获取链接
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

- `rust`代码编译为`wasm`在`deno`中使用
- `deno`部分使用 TS/JS 皆可。

```bash
# 创建用于构建wasm库的项目
cargo new --lib <project-name>
# 获取用于生成TS/JS适配器文件的CLI工具
cargo install wasm-bindgen-cli
# wasm-pack编译deno不友好；ssvmup无win系统版。
```

```toml
[dependencies]
wasm-bindgen = "0.2.70" # wasm与js交互库

[lib]
name = "libname" # 此处定义，命令时就无需再指定
# 告知rust编译器创建一个没有启动函数的wasm二进制文件。
# 编译器创建动态库(win.dll，linux.so，macos.dylib)
# 由于部署单元为wasm，因此编译器创建.wasm文件(如:wisesayings.wasm)
crate-type =["cdylib", "lib"]
```

```rust
/* src/lib.rs */
use wasm_bindgen::prelude::*;

#[wasm_bindgen] // 指示编译器该代码的目标是wasm文件

pub fn get_wise_saying() -> String {
    // 使用宏命令。从磁盘中获取文件，并将数据加载到内存中
    let str = include_str!("1.md");
    return str.to_string(); // 返回字符串
}

/* src/main.rs */
use wisesayings::get_wise_saying;

fn main() -> std::io::Result<()> {
    let str = get_wise_saying();
    println!("{}", str);
    Ok(())
}

/* 这是MDN教程的示例代码 src/lib.rs 只有这一个文件 */
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
# 将源代码编译为wasm
# # --lib 指针对./lib目录中的源代码构建库
# # --target 指明使用编译器，并将构建工件及wasm文件存储到该目录下
cargo build --lib --target wasm32-unknown-unknown
# 此处如果报错 error[E0463]: can't find crate for core|  = note: the "wasm32-unknown-unknown" target may not be ins。
# 解决以上报错问题。将WASM目标添加到Rust工具链
rustup target add wasm32-unknown-unknown
# 重新执行 源代码编译为wasm

# Rust目标三重命名约定：ARCH-VENDOR-SYS-ABI
# # ARCH:预期目标体系结构。如用于wasm文件的wasm32，用于intel芯片的i686
# # VENDOR:发布目标的供应商。如:Nvidai、Apple
# # SYS:操作系统。如:Windows、Linux
# # ABI:指明过程如何启动。
# # # wasm32-unknown-unknown指明是一个操作系统及ABI未知的二进制文件
```

- 使用 Deno 部署二进制文件服务器端

```bash
# wasm-bindgen 创建适配器文件和特殊wasm的命令
# --target deno 编译为deno版本
# --out-dir ./server 编译完成，文件的存放位置
# ./target/xxxx.wasm 表示原始wasm文件的位置
wasm-bindgen --target deno ./target/wasm32-unknown-unknown/debug/demo.wasm --out-dir ./server
# server 中可见生成的文件清单。`xxx_bg.wasm`为 bindgen 缩写
# # demo_bg.wasm
# # demo_bg.wasm.d.ts
# # demo.d.ts
# # demo.js
```

```ts
/* server/main.ts 也可以写js */
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
  // 乱码，但如果是给前端，则不会有乱码问题。
  request.respond({ status: 200, body: JSON.stringify({ data: saying }) });
}
```

```js
/* MDN教程示例代码的编译后使用 main.js */
import { serve } from "https://deno.land/std@0.92.0/http/server.ts";
import { greet } from "./demo.js";

const s = serve({ port: 8080 });
console.log("http://localhost:8080/");
// 注意：需有参数值。否则会报错。
console.warn("greet:", greet("Lokavit"));

for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

```bash
# cd到server目录下 执行以下命令
deno run --allow-read --allow-net --allow-env main.ts
# # --allow-read：允许读取磁盘文件
# # --allow-net:允许访问网路
# # --allow-env:读取环境变量
```

- 前端 fetch 请求并渲染到页面

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
      // 测试连接Deno服务器，并读取返回的数据
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
