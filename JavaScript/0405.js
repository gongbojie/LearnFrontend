// 杂项

// Proxy 和 Reflect
// 一个 Proxy 对象包装另一个对象并拦截诸如读取/写入属性和其他操作，可以选择自行处理它们，或者透明地允许该对象处理它们。

// Proxy
let proxy = new Proxy(target, handler)

/*
 * target -- 是要包装的对象，可以是任何东西，包括函数。
 * handler -- 代理配置：带有“捕捉器”（traps，即拦截操作的方法）的对象。
*/

// 对 proxy 进行操作，如果在 handler 中存在相应的捕捉器，则它将运行，并且 Proxy 有机会对其进行处理，否则将直接对 target 进行处理。

// 创建一个没有任何捕捉器的代理（Proxy）：
let target = {};
let proxy = new Proxy(target, {}); // 空的 handler 对象

proxy.test = 5; // 写入 proxy 对象
alert(target.test); // 5， test 属性出现在了 target 中！

alert(proxy.test); // 5， 我们也可以从proxy对象读取它

for(let key in proxy) alert(key); // test，迭代也正常工作

/* 由于没有捕捉器，所有对 proxy 的操作都直接转发给了 target。
  1.  写入操作 proxy.test= 会将值写入 target
  2. 读取操作 proxy.test 会从 target 返回对应值。
  3. 迭代 proxy 会从 target 返回对应的值。
*/

// 带有 “get” 捕捉器的默认值 （TODO：）

// Eval：执行代码字符串
// 内建函数 eval 允许执行一个代码字符串。

let result = eval(code);
let code = 'alert("Hello")';
eval(code);

// eval 内的代码在当前词法环境（lexical environment）中执行，因此它能访问外部变量

// 也可以更改外部变量

// 严格模式下，eval 有属于自己的词法环境。因此我们不能从外部访问在 eval 中声明的函数和变量。
// 如果不启用严格模式，eval 没有属于自己的词法环境，因此我们可以从外部访问变量 x 和函数 f。

// 使用 “eval”
// 现代编程中，已经很少使用 eval 了。
// eval 访问外部变量的能力会产生副作用。
// eval 会导致代码压缩率降低。
// 在 eval 中使用外部局部变量也被认为是一个坏的编程习惯，因为这会使代码维护变得更加困难

/* 有两种方法可以完全避免此类问题。
   * 如果 eval 中的代码没有使用外部变量，请以 window.eval(...) 的形式调用 eval
   * 如果 eval 中的代码需要访问局部变量，我们可以使用 new Function 替代 eval，并将它们作为参数传递
*/

// 柯里化（Currying）
// 柯里化（Currying）是一种关于函数的高阶技术。它不仅被用于 JavaScript，还被用于其他编程语言。柯里化是一种函数的转换，它是指将一个函数从可调用的 f(a, b, c) 转换为可调用的 f(a)(b)(c)。柯里化不会调用函数。它只是对函数进行转换。

/*
 * 柯里化之后，我们没有丢失任何东西：log 依然可以被正常调用。
 * 我们可以轻松地生成偏函数，例如用于生成今天的日志的偏函数。
*/

// 高级柯里化实现
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

// Reference Type (TODO:)

// BigInt
// BigInt 是一种特殊的数字类型，它提供了对任意长度整数的支持。

//创建 bigint 的方式有两种：在一个整数字面量后面加 n 或者调用 BigInt 函数，该函数从字符串、数字等中生成 bigint。
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // 与 10n 相同

// 数学运算符
// BigInt 大多数情况下可以像常规数字类型一样使用
alert(1n + 2n); // 3

alert(5n / 2n); // 2

// 不可以把 bigint 和常规数字类型混合使用
// 应该显式地转换它们：使用 BigInt() 或者 Number()

// BigInt 不支持一元加法

// 比较运算符
// 比较运算符，例如 < 和 >，使用它们来对 bigint 和 number 类型的数字进行比较

// 由于 number 和 bigint 属于不同类型，它们可能在进行 == 比较时相等，但在进行 ===（严格相等）比较时不相等
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false

// 布尔运算
// 当在 if 或其他布尔运算中时，bigint 的行为类似于 number。

// 例如，在 if 中，bigint 0n 为假，其他值为 true

// 布尔运算符，例如 ||，&& 和其他运算符，处理 bigint 的方式也类似于 number
alert( 1n || 2 ); // 1（1n 被认为是真）

alert( 0n || 2 ); // 2（0n 被认为是假）

// Polyfill
// JSBI 库的开发者提出了另一种解决方案

// 浏览器：文档，事件，接口
// Document
// 浏览器环境，规格
/* 有一个叫做 window 的“根”对象。它有两个角色：
  1. 首先，它是 JavaScript 代码的全局对象，如 全局对象 一章所述。
  2. 其次，它代表“浏览器窗口”，并提供了控制它的方法。
*/

// 文档对象模型（DOM）
// 文档对象模型（Document Object Model），简称 DOM，将所有页面内容表示为可以修改的对象。
// document 对象是页面的主要“入口点”。我们可以使用它来更改或创建页面上的任何内容。

// 浏览器对象模型（BOM）
// 浏览器对象模型（Browser Object Model），表示由浏览器（主机环境）提供的用于处理文档（document）之外的所有内容的其他对象。

// 函数 alert/confirm/prompt 也是 BOM 的一部分：它们与文档（document）没有直接关系，但它代表了与用户通信的纯浏览器方法。

// DOM 树
/*
1. 由于历史原因，<head> 之前的空格和换行符均被忽略。
2. 如果我们在 </body> 之后放置一些东西，那么它会被自动移动到 body 内，并处于 body 中的最下方，因为 HTML 规范要求所有内容必须位于 <body> 内。所以 </body> 之后不能有空格。
*/

// 字符串开头/结尾处的空格，以及只有空格的文本节点，通常会被工具隐藏

// 自动修正
// 如果浏览器遇到格式不正确的 HTML，它会在形成 DOM 时自动更正它。

// 其他节点类型
// 除了元素和文本节点外，还有一些其他的节点类型。 例如 注释 <!-- comment -->
// HTML 中的所有内容，甚至注释，都会成为 DOM 的一部分。

/* 一共有 12 种节点类型。实际上，我们通常用到的是其中的 4 种：

1. document — DOM 的“入口点”。
2. 元素节点 — HTML 标签，树构建块。
3. 文本节点 — 包含文本。
4. 注释 — 有时我们可以将一些信息放入其中，它不会显示，但 JS 可以从 DOM 中读取它。

*/

/* 子选项卡
* Styles — 我们可以看到按规则应用于当前元素的 CSS 规则，包括内建规则（灰色）。几乎所有内容都可以就地编辑，包括下面的方框的 dimension/margin/padding。
* Computed — 按属性查看应用于元素的 CSS：对于每个属性，我们可以都可以看到赋予它的规则（包括 CSS 继承等）。
* Event Listeners — 查看附加到 DOM 元素的事件侦听器
*/

// 遍历 DOM
// 在最顶层：documentElement 和 body
// 最顶层的树节点可以直接作为 document 的属性来使用：
// <html> = document.head
// <head> 标签可以通过 document.head 访问
// document.body 的值可能是 null
// 在 DOM 的世界中，null 就意味着“不存在”

// 子节点：childNodes，firstChild，lastChild
/*
  * 子节点（或者叫作子） — 对应的是直系的子元素。换句话说，它们被完全嵌套在给定的元素中。例如，<head> 和 <body> 就是 <html> 元素的子元素。
  * 子孙元素 — 嵌套在给定元素中的所有元素，包括子元素，以及子元素的子元素等。
*/

// childNodes 集合列出了所有子节点，包括文本节点。

// firstChild 和 lastChild 属性是访问第一个和最后一个子元素的快捷方式。

elem.childNodes[0] === elem.firstChild

// elem.hasChildNodes() 用于检查节点是否有子节点。

// DOM 集合
/* childNodes 看起来就像一个数组。但实际上它并不是一个数组，而是一个 集合 — 一个类数组的可迭代对象。
  1. 我们可以使用 for..of 来迭代它
  2. 无法使用数组的方法，因为它不是一个数组
*/

// DOM 集合是只读的: 不能通过类似 childNodes[i] = ... 的操作来替换一个子节点。
// DOM 集合是实时的
// 不要使用 for..in 来遍历集合

// 兄弟节点和父节点
// 兄弟节点（Sibling） 是指有同一个父节点的节点。

// 纯元素导航

// 搜索：getElement*，querySelector*