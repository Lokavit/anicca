# Kid

# 緣

> 己亥年的工作，接手之前未曾瞭解相關，特地調研數日，決定接下工作。其一，面向程式設計教育的程式設計工具，造福人類；其二，自我挑戰。世事如棋，不盡人意。在年關前結束了一系列工作，很可惜，很無奈。想來不會再做相關開發，在此對這段時期的工作做個經驗總結。唉，沒記性的人全靠筆記。

---

# 起

### Google 出品 Blockly

- 一套 JS 版本的積木拖拽拼接工具。
  > 要說把這玩意兒從 Github 中 clone 下來可真不容易，在經歷無數次嘗試才拉取成功，接下來的編譯過程，那就更是相當不容易。這套開原始碼，使用了 Google 自家的 js 元件庫，以及自家的程式碼編譯壓縮混淆庫。所以，即使它是一個 js 專案，也需要在電腦上先配置環境`Python`、`jdk`

```bash
# 根據專案根目錄的buld.py檔案提示，裝載對應版本的python
python2.7
# 在根據報錯提示，裝載對應版本的jdk
jdk1.8.0_251
# 以上裝載完成，若還有報錯，善用搜索，逐步排查。
```

編譯起來，檢視專案 demos 資料夾中的示例，基本無憂使用。

- 引入及匯出.js 的寫法

```js
/**
 * 建立一個名稱空間 函式可確保其引數指示的 JavaScript 物件結構的存在。它檢查路徑表示式中的每個物件屬性是否存在，如果不存在，則將其初始化
 * utils/test.js */
goog.provide("Blockly.utils.test");
// 該模組的具體內容

/**
 * 從給定的名稱空間中“匯入”程式碼，以便閉包編譯器可以找到它。
 *  所需要的檔案.js */
goog.require("Blockly.utils.test");
// 具體使用。
Blockly.utils.test.testMethod();
Blockly.utils.test.isShow;
```

- Closure Tools 實際上，似乎並未用到高階編譯壓縮功能。

- - Closure Compiler:JS 編譯及壓縮 `高階壓縮,移除未用到的程式碼`
- - Closure Library:JS 類庫(函式及元件)
- - Closure Templates:JS 模板機制函式庫(\*.soy)
- - Compiler 的 Advanced 壓縮模式:寫法需遵循一定規則

### KID-CODE

- 使用`Blockly`編譯完成的庫，實現程式設計工具中的圖形化到 Python 程式碼的過程。
- 使用開源的線上程式碼編輯器做程式碼展示、高亮、格式化等；
- 未做真實伺服器端 Python 編譯，而是以 JS 編譯結果輸出到頁面繪製的控制檯區域；
- 對工具的 XML 檔案實現:新建、開啟、下載、雲端儲存。

### Google 出品 BlocklyGames

> 該專案編譯成功需在 Linux 系統下，且連通國際網路。由於編譯後大部分程式碼依然不在本地，只好將該編譯後的該專案整個扔上伺服器，未作任何改動。

### Microsoft 出品 pxt-blockly

> 微軟大廠，基於 Google 二開，修復大量 Edge 下的問題，並附帶一系列 pxt 擴充套件

把 Github 中幾個類似的庫進行比較，發現其實微軟的更適合二開。然而，該提議被駁回。

---

## KID 系列

> 在著手二開 LLK 那套少兒程式設計工具時，看到有關新聞，為規避，更名為`KID`。這套開原始碼，網路上無數復刻版。還有專門為這套原始碼二開做付費諮詢的，可謂商機無限。但是隨著新聞爆出，一道網路遮蔽，不少復刻版網站，一片 404。而手上的專案，因為已經開發部分功能，直連自家伺服器，成功避開此次危機。

- 該專案由以下幾個專案組成
- - kid-blocks:基於 Blockly 二開的積木工具
- - kid-vm:對應積木工具的虛擬引擎，積木指令的實現。
- - kid-storage:快取。主要用在資源部分。
- - kid-svg-renderer:svg 渲染。
- - kid-render:渲染器的一些處理
- - kid-gui:頁面呈現。對以上庫的引用及使用。
- - kid-parser:對專案專屬檔案的解析。
- - kid-...:另外還有一些不曾改動的原有庫，因具有依賴關係，不做改變。

### Blocks

> 基於 Google 出品的 Blockly 二次開發的積木工具。刪掉了原本的部分功能，比如積木工具的自動收縮、多種程式語言程式碼庫的生成等；改寫了部分功能，比如 svg 的資料構成形式等；也添加了各別功能，比如 checkbox 的積木。

> 按照需求，在該版本之上，二開出來專案所需的少兒版與幼兒版。其中幼兒版改動及追加功能較多，涉及到對 SVG 資料的變更、音樂及繪畫擴充套件提取到初始工具庫、積木全部圖示化、去文字，隱藏部分高階積木、重寫部分初級積木，如移動與方向、速度結合；跳躍與速度、方向結合；外觀的一些簡單指令積木等。二開的邏輯基本如下：
>
> > - kid-blocks 中找到積木編輯的對應檔案，按照指定資料結構追加積木，注意命名;
> > - kid-vm 中找到積木實現的對應檔案，按照積木命名建立函式，實現積木執行邏輯;
> > - kid-gui 中找到 xml.js，新增新增的積木，注意 XML 結構及積木命名。

### 示例

- 新增繪畫分類積木塊 需在 vm 庫中，對該積木塊邏輯進行對應實現

```js
/** msg\messages.js */
Blockly.Msg.PEN_CLEAR = "%1";

/** msg\scratch_msgs.js */
PEN_CLEAR: "%1",

/** blocks_vertical\extensions.js
 * 目前將新增的繪畫分類下的自定義積木塊，寫在該檔案內
 * 後期需想辦法，另起一個pen.js檔案，寫在內
 */
/** 繪畫分類 之 清理 */
Blockly.Blocks["pen_clear"] = {
  /**
   * 清理
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      // 明文內容:對應msg/messages.js檔案中對應常量
      message0: Blockly.Msg.PEN_CLEAR,
      // 該積木塊所需的引數對應設定
      args0: [
        // 第一個引數
        {
          type: "field_image", // 欄位_圖片 型別
          // 圖片的src,通常採用 media\xxxxx.svg下的svg檔案
          src: Blockly.mainWorkspace.options.pathToMedia + "pen.svg",
          width: 24, // 圖示的寬度
          height: 24, // 圖示的高度
        },
      ],
      // 分類:分類.運動分類
      category: Blockly.Categories.pen,
      // :[設定運動類相簿的顏色，設定本積木塊的形狀]
      extensions: ["colours_pen", "shape_statement"],
    });
  },
};

/** blocks_vertical\default_toolbox.js */
  '<category name="%{BKY_CATEGORY_PEN}" id="pen" colour="#0FBD8C" secondaryColour="#0DA57A" iconURI="../media/pen.svg">' +
  // 新增加的積木塊
  '<block type="pen_clear"></block>' +
  "</category>" +
```

- 新增分類並註冊該分類

```js
/** core\colours.js */
// 追加 音樂分類圖示三色設定
  music: {
    primary: "#0FBD8C",
    secondary: "#0DA57A",
    tertiary: "#DB6E00",
  },

/** msg\messages.js
 *  再次檔案中，定義新增的分類
 */
Blockly.Msg.CATEGORY_MUSIC = "Music"; // 音樂
Blockly.Msg.CATEGORY_PEN = "Pen"; // 繪畫

/** msg\scratch_msgs.js
 * 在此檔案中，追加以定義的分類，明文國際化
 */
  CATEGORY_MUSIC: "音樂",
  CATEGORY_PEN: "繪畫",

/** blocks_vertical\vertical_extensions.js
 *  該檔案主要註冊所有積木塊
 */
 Blockly.ScratchBlocks.VerticalExtensions.registerAll=()=>{
   // 在分類名字陣列中，新增以下[音樂、繪畫]分類名
    var categoryNames = [ "music","pen" ];
 }
```

- 積木塊多行，如:message1,args1;message2,args2

```js
import ScratchBlocks from "scratch-blocks";
ScratchBlocks.Blocks["control_if_else"] = {
  init: function () {
    this.jsonInit({
      type: "control_if_else",
      // 積木如果要支援多語言，就需要用 ScratchBlocks.Msg 物件來設定 message
      message0: ScratchBlocks.Msg.CONTROL_IF, // zh: 如果 1% 那麼
      message1: "%1",
      message2: ScratchBlocks.Msg.CONTROL_ELSE, // zh: 否則
      message3: "%1",
      args0: [
        {
          type: "input_value",
          name: "CONDITION",
          check: "Boolean",
        },
      ],
      args1: [
        {
          type: "input_statement",
          name: "SUBSTACK",
        },
      ],
      args3: [
        {
          type: "input_statement",
          name: "SUBSTACK2",
        },
      ],
      // 分類也用 ScratchBlocks.Categories 物件來設定，避免不一致
      category: ScratchBlocks.Categories.control,
      extensions: ["colours_control", "shape_statement"],
    });
  },
};
```

- 將原有分類的圓形純色圖塊，改為自定義圖示，並附加 icon.svg

```js
/** core\toolbox.js
 * 給一個分類建立DOM(原來的藍色圓形)
 * Create the DOM for a category in the toolbox.
 */
Blockly.Toolbox.Category.prototype.createDom = function () {
  /**
   * 該函式中的this指向每個分類圓形圖示，即(bubble)
   * 透過是否有 iconURI，為該分類圖示設定不同class樣式
   * 自定義時，在內部邏輯中實現
   * 此內部函式也可以繼續建立元素，做出更復雜的分類圖示比如以下程式碼
  */
if (this.iconURI_) {
    // bubble 即
    this.bubble_ = goog.dom.createDom("div", {
      class: "scratchCategoryItemIcon",
    });
    // this.bubble_.style.backgroundImage = "url(" + this.iconURI_ + ")";
    // 追加程式碼：即使設定了.svg檔案，也依然保留背景色
    this.bubble_.style.backgroundColor = this.colour_;

    // 此處添加了一個div ，並將icon.svg作為該div的背景圖渲染出來
    this.icon_svg = goog.dom.createDom("div", {
      class: "scratchCategoryItemIcon",
    });
    this.icon_svg.style.backgroundImage = "url(" + this.iconURI_ + ")";
    this.bubble_.appendChild(this.icon_svg);
  }
}

/** blocks_vertical\default_toolbox.js
 * 該xml結構中，追加 iconURI屬性，並設定其icon.svg指向
*/
  '<xml id="toolbox-categories" style="display: none">' +
  // 分類 分類名 id  該分類(圓圈)的顏色 第二色
  // '<category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">' +
  '<category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC" ' +
  // 此處指定iconURI,即可達到將原有圓形圖示替換為自定義.svg圖示
  'iconURI="../media/move-left.svg" showStatusButton="true">' +

/** core\css.js
 * 在該檔案中，更改每個分類div的樣式設定，以及其子元素樣式設定，如下：
 */

// 注：以上變更並編譯完成後，需在gui庫下lib\make-toolbox-xml.js
//  注：iconURI的地址為 ./static/blocks-media/icon.svg
    return `
    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC" iconURI="./static/blocks-media/move-left.svg" >………………`;
```

- 檔案定義所有常量，並賦值明文及佔位符

```js
/** msg/messages.js */
// Motion blocks
Blockly.Msg.MOTION_MOVESTEPS = "%1 %2";
Blockly.Msg.MOTION_TURNLEFT = "%1 %2";
Blockly.Msg.MOTION_TURNRIGHT = "%1 %2";
```

- 檔案實現所有定義的常量，賦值預設值，及佔位符

```js
/** msg/scratch_msgs.js */
Blockly.ScratchMsgs.locales["en"] = {
  MOTION_MOVESTEPS: "%1 %2",
  MOTION_TURNLEFT: "%1 %2",
  MOTION_TURNRIGHT: "%1 %2",
};
```

- 建立每個所需積木塊

```js
/** blocks_vertical\motion.js */
// 以移動為例
Blockly.Blocks["motion_movesteps"] = {
  /**
   * Block to move steps.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      // 明文內容:對應msg/messages.js檔案中對應常量
      message0: Blockly.Msg.MOTION_MOVESTEPS,
      // 該積木塊所需的引數對應設定
      args0: [
        // 第一個引數
        {
          type: "field_image", // 欄位_圖片 型別
          // 圖片的src,通常採用 media\xxxxx.svg下的svg檔案
          src: Blockly.mainWorkspace.options.pathToMedia + "move-left.svg", // 目前該svg不存在
          width: 24, // 圖示的寬度
          height: 24, // 圖示的高度
        },
        // 第二個引數
        {
          type: "input_value", // 輸入值型別
          name: "STEPS", // 步，可以看作單位？
        },
      ],
      // 分類:分類.運動分類
      category: Blockly.Categories.motion,
      // :[設定運動類相簿的顏色，設定本積木塊的形狀]
      extensions: ["colours_motion", "shape_statement"],
    });
    console.log(
      "blocks_vertical建立運動類下第一個積木塊:",
      Blockly.mainWorkspace
    );
  },
};

// 其中的pathToMedia在core\options.js中定義

var pathToMedia = "https://blockly-demo.appspot.com/static/media/";
if (options["media"]) {
  pathToMedia = options["media"];
} else if (options["path"]) {
  // 'path'為已棄用選項，由'media'代替
  pathToMedia = options["path"] + "media/";
}
```

- 將建立的積木塊，新增到 xml 檔案

```js
/** blocks_vertical\default_toolbox.js */
Blockly.Blocks.defaultToolbox = "在這裡註釋掉不需要的預設積木塊xml結構";
```

- 示例: 新增重置功能的積木塊

- - 在 block_vertical/motion.js 中建立一個重置的積木塊

```js
/**
 * 運動 之 重置 即舞臺角色迴歸至 0,0
 */
Blockly.Blocks["motion_reset"] = {
  /**
   * Block to move steps. 向右移動
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      // 明文內容:對應msg/messages.js檔案中對應常量
      message0: Blockly.Msg.MOTION_RESET,
      // 該積木塊所需的引數對應設定
      args0: [
        // 第一個引數
        {
          type: "field_image", // 欄位_圖片 型別
          // 圖片的src,通常採用 media\xxxxx.svg下的svg檔案
          src: Blockly.mainWorkspace.options.pathToMedia + "reset.svg",
          width: 24, // 圖示的寬度
          height: 24, // 圖示的高度
        },
      ],
      // 分類:分類.運動分類
      category: Blockly.Categories.motion,
      // :[設定運動類相簿的顏色，設定本積木塊的形狀]
      extensions: ["colours_motion", "shape_statement"],
    });
    console.log(
      "blocks_vertical建立運動類下第一個積木塊:",
      Blockly.mainWorkspace
    );
  },
};
```

- - 在 block_vertical/default_toolbox.js 新增新增重置積木塊的結構，可見效果

```js
'<block type="motion_reset" id="motion_reset">' +
  "</block>" +
```

core\block_render_svg_vertical.js // 處理渲染 svg 成型的檔案

```bash
$ npm run translate # 更改msg\messages.js檔案後，執行該命令
```

---

## 常見錯誤及解決方案

- 'python'不是內部或外部命令……
  > **解決**:裝 python2.7,配置環境變數(系統 PATH 指定 python27，以及指定 python/script)，重啟 vscode

```bash
C:\Python27
C:\Python27\Scripts
```

- python 檔案編譯錯誤

```bash
# 錯誤程式碼如下：
Traceback (most recent call last):
  File "build.py", line 574, in <module>
    test_proc = subprocess.Popen(test_args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
  File "C:\Python27\lib\subprocess.py", line 394, in __init__
    errread, errwrite)
  File "C:\Python27\lib\subprocess.py", line 644, in _execute_child
    startupinfo)
WindowsError: [Error 2]

# 解決方式 https://github.com/LLK/scratch-blocks/issues/1620
build.py檔案約 331行 程式碼替換
      # proc = subprocess.Popen(args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
      outfile = open("dash_args.txt","w+")
      outfile.write("\n".join(args[11:]))
      outfile.close()
      args =  args[:11]
      args.extend(['--flagfile','dash_args.txt'])
      proc = subprocess.Popen(args, stdin=subprocess.PIPE, stdout=subprocess.PIPE, shell = True)

build.py檔案約 579行 程式碼替換
    # test_proc = subprocess.Popen(test_args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    test_proc = subprocess.Popen(test_args, stdin=subprocess.PIPE, stdout=subprocess.PIPE,shell=True)
```

- 缺少 jdk 環境錯誤

```bash
Could not find "java" in your PATH.
Using remote compiler: closure-compiler.appspot.com ...

Error: Closure not found.  Read this:
  developers.google.com/blockly/guides/modify/web/closure

解決：裝jdk8
環境變數 系統使用者新建
變數名：JAVA_HOME
變數值：C:\Program Files\Java\jdk1.8.0_251
PATH追加：%JAVA_HOME%\bin，移動到頂部
```

- 解決 HTTPS 問題

> Chrome 等現代瀏覽器，呼叫攝像頭及錄音功能需要在 HTTPS 模式下，將該專案設定為 HTTPS 請求方式後，需將內中使用外鏈資源及 API 皆改為 HTTPS

- 程式碼最佳化
- - 壓縮使用 terser-webpack-plugin
- - 程式碼分塊 optimization.splitChunks{}中設定

---

# 性

這段工作經歷，不但涉獵了程式設計+教育，而且對教育界有一些瞭解。從而悟出，工具放在那裡，使用者如何使用，非是他人能夠左右。許多人性化設計，不入使用者法眼，倒是那些懶人模式的操作，更得使用者喜歡。程式設計+教育，面對的群體特殊`老師`、`家長`、`學生`。三個群體之中，老師則透過程式設計工具及學生獲得自身利益，家長訴求簡單，透過孩子獲知相關資訊，看到孩子與眾不同；學生則是一個被動的角色，基本指哪兒打哪兒，參加比賽，拿到好成績。僅僅是程式設計工具，根本無法吸引學生，即便有了`BlocklyGames`，或者亥廠的`codecombat(漢化版)`。由於三方之中各有利益，就會達成某些無需說明的一致。老話說得好`上有政策下有對策`，開發方向從打造優秀的程式設計工具及平臺，服務學生，潛移默化地過渡到為了虛假繁榮。當察覺程式設計+教育的真實操作情況，會懷疑自己在助紂為虐。

---

# 空

帶新需謹慎，徒勞一場空。
人生中又多幾名過客，既是過客，不提也罷。
