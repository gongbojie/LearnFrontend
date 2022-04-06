// 搜索：getElement*，querySelector*
// document.getElementById 或者只使用 id
// 如果一个元素有 id 特性（attribute），那我们就可以使用 document.getElementById(id) 方法获取该元素
let elem = document.getElementById('elem');
elem.style.background = 'red';

// 除非我们声明一个具有相同名称的 JavaScript 变量，否则它具有优先权
// 请不要使用以 id 命名的全局变量来访问元素

// id 必须是唯一的：如果有多个元素都带有同一个 id，那么使用它的方法的行为是不可预测的

// querySelectorAll
// 到目前为止，最通用的方法是 elem.querySelectorAll(css)，它返回 elem 中与给定 CSS 选择器匹配的所有元素。
let elements = document.querySelectorAll('ul > li:last-child');

for (const elem of elements) {
  alert(elem.innerHTML); // test passed
}

// querySelector
// elem.querySelector(css) 调用会返回给定 CSS 选择器的第一个元素。
// 结果与 elem.querySelectorAll(css)[0] 相同，但是后者会查找 所有 元素，并从中选取一个，而 elem.querySelector 只会查找一个。因此它在速度上更快，并且写起来更短。

// matches
// elem.matches(css) 不会查找任何内容，它只会检查 elem 是否与给定的 CSS 选择器匹配。它返回 true 或 false。

// closest
// elem.closest(css) 方法会查找与 CSS 选择器匹配的最近的祖先。elem 自己也会被搜索。

// getElementsBy*
// 还有其他通过标签，类等查找节点的方法。如今，它们大多已经成为了历史，因为 querySelector 功能更强大，写起来更短。
/*
  * elem.getElementsByTagName(tag) 查找具有给定标签的元素，并返回它们的集合。tag 参数也可以是对于“任何标签”的星号 "*"。
  * elem.getElementsByClassName(className) 返回具有给定CSS类的元素。
  * document.getElementsByName(name) 返回在文档范围内具有给定 name 特性的元素。很少使用。
*/

// 获取文档中的所有 div
let divs = document.getElementsByTagName('div');

// 它返回的是一个集合，不是一个元素！
// document.getElementsByTagName('input').value = 5;❌
// document.getElementsByTagName('input')[0].value = 5;✅

// 实时的集合
// 所有的 "getElementsBy*" 方法都会返回一个 实时的（live） 集合。
// querySelectorAll 返回的是一个 静态的 集合。就像元素的固定数组。

// 节点属性：type、tag和content
// DOM 节点类

// 层次结构（hierarchy）的根节点是 EventTarget，Node 继承自它，其他 DOM 节点继承自 Node。
/*
  * EventTarget — 是根的“抽象（abstract）”类。该类的对象从未被创建。它作为一个基础，以便让所有 DOM 节点都支持所谓的“事件（event）”
  * Node — 也是一个“抽象”类，充当 DOM 节点的基础。它提供了树的核心功能：parentNode，nextSibling，childNodes 等（它们都是 getter）。Node 类的对象从未被创建。但是有一些继承自它的具体的节点类，例如：文本节点的 Text，元素节点的 Element，以及更多异域（exotic）类，例如注释节点的 Comment。
  * Element — 是 DOM 元素的基本类。它提供了元素级的导航（navigation），例如 nextElementSibling，children，以及像 getElementsByTagName 和 querySelector 这样的搜索方法。浏览器中不仅有 HTML，还会有 XML 和 SVG。Element 类充当更多特定类的基本类：SVGElement，XMLElement 和 HTMLElement。
  * HTMLElement — 最终是所有 HTML 元素的基本类。各种 HTML 元素均继承自它：
    * HTMLInputElement — <input> 元素的类
    * HTMLBodyElement — <body> 元素的类
    * HTMLAnchorElement — <a> 元素的类
*/

// constructor.name 就是它的名称
alert( document.body.constructor.name ); // HTMLBodyElement
alert( document.body ); // [object HTMLBodyElement]
// 还可以使用 instanceof 来检查继承
alert( document.body instanceof HTMLBodyElement ); // true

/*
  * onsole.log(elem) 显示元素的 DOM 树。
  * console.dir(elem) 将元素显示为 DOM 对象，非常适合探索其属性。
*/

// “nodeType” 属性
// nodeType 属性提供了另一种“过时的”用来获取 DOM 节点类型的方法。
/*
  * 对于元素节点 elem.nodeType == 1，
  * 对于文本节点 elem.nodeType == 3，
  * 对于 document 对象 elem.nodeType == 9，
  * 在 规范 中还有一些其他值。
*/
// 在现代脚本中，我们可以使用 instanceof 和其他基于类的检查方法来查看节点类型，但有时 nodeType 可能更简单。我们只能读取 nodeType 而不能修改它。

// 标签：nodeName 和 tagName
// 给定一个 DOM 节点，我们可以从 nodeName 或者 tagName 属性中读取它的标签名
/*
  * tagName 属性仅适用于 Element 节点。
  * nodeName 是为任意 Node 定义的：
    * 对于元素，它的意义与 tagName 相同。
    * 对于其他节点类型（text，comment 等），它拥有一个对应节点类型的字符串。
*/
// tagName 仅受元素节点支持（因为它起源于 Element 类），而 nodeName 则可以说明其他节点类型。
// 只处理元素，那么 tagName 和 nodeName 这两种方法都可以使用，没有区别。

// innerHTML 内容
// innerHTML 属性允许将元素中的 HTML 获取为字符串形式。更改页面最有效的方法之一

// 小心：“innerHTML+=” 会进行完全重写
/* innerHTML+= 做了以下工作
  1. 移除旧的内容。
  2. 写入新的 innerHTML（新旧结合）
*/

// outerHTML：元素的完整 HTML
// outerHTML 属性包含了元素的完整 HTML。
// 注意：与 innerHTML 不同，写入 outerHTML 不会改变元素。而是在 DOM 中替换它。
