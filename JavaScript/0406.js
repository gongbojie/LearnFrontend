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

// nodeValue/data：文本节点内容
// innerHTML 属性仅对元素节点有效。
let text = document.body.firstChild;
alert(text.data); // Hello

let comment = text.nextSibling;
alert(comment.data); // comment

// textContent：纯文本
// textContent 提供了对元素内的 文本 的访问权限：仅文本，去掉所有 <tags>。

// 写入 textContent 要有用得多，因为它允许以“安全方式”写入文本。
/* 假设我们有一个用户输入的任意字符串，我们希望将其显示出来。
  * 使用 innerHTML，我们将其 作为 HTML 插入， 带有所有HTML标签。
  * 使用 textContent， 将其 作为文本插入，所有哦符号（symbol）均按字面意义处理
*/

// “hidden” 属性
// “hidden” 特性（attribute）和 DOM 属性（property）指定元素是否可见。

// 更多属性
/*  元素还有其他属性，特别是那些依赖于 class 的属性：
  * value — <input>，<select> 和 <textarea>（HTMLInputElement，HTMLSelectElement……）的 value。
  * href — <a href="...">（HTMLAnchorElement）的 href。
  * id — 所有元素（HTMLElement）的 “id” 特性（attribute）的值。
*/

// 特性和属性（Attributes and properties）
// DOM 属性
// DOM 节点是常规的 JavaScript 对象。我们可以 alert 它们。
/* DOM 属性和方法的行为就像常规的 Javascript 对象一样：
  * 它们可以有很多值。
  * 它们是大小写敏感的（要写成 elem.nodeType，而不是 elem.NoDeTyPe）。
*/

// HTML 特性
// 在 HTML 中，标签可能拥有特性（attributes）。当浏览器解析 HTML 文本，并根据标签创建 DOM 对象时，浏览器会辨别 标准的 特性并以此创建 DOM 属性。所以，当一个元素有 id 或其他 标准的 特性，那么就会生成对应的 DOM 属性。但是非 标准的 特性则不会。
// 如果一个特性不是标准的，那么就没有相对应的 DOM 属性。
/*  所有特性都可以通过使用以下方法进行访问：

  * elem.hasAttribute(name) — 检查特性是否存在。
  * elem.getAttribute(name) — 获取这个特性值。
  * elem.setAttribute(name, value) — 设置这个特性值。
  * elem.removeAttribute(name) — 移除这个特性。
  
* 这些方法操作的实际上是 HTML 中的内容。
*/

/*
HTML 特性有以下几个特征：

它们的名字是大小写不敏感的（id 与 ID 相同）。
它们的值总是字符串类型的。

1. getAttribute('About') — 这里的第一个字母是大写的，但是在 HTML 中，它们都是小写的。但这没有影响：特性的名称是大小写不敏感的。
2. 我们可以将任何东西赋值给特性，但是这些东西会变成字符串类型的。所以这里我们的值为 "123"。
3. 所有特性，包括我们设置的那个特性，在 outerHTML 中都是可见的。
4. attributes 集合是可迭代对象，该对象将所有元素的特性（标准和非标准的）作为 name 和 value 属性存储在对象中。
*/

// 属性—特性同步
// 当一个标准的特性被改变，对应的属性也会自动更新，（除了几个特例）反之亦然。
// input.value 只能从特性同步到属性，反过来则不行

// DOM 属性是多类型的
// DOM 属性不总是字符串类型的。
// input.checked 属性（对于 checkbox 的）是布尔型的
// style 特性是字符串类型的，但 style 属性是一个对象

// 非标准的特性，dataset
// 有时，非标准的特性常常用于将自定义的数据从 HTML 传递到 JavaScript，或者用于为 JavaScript “标记” HTML 元素。
// 所有以 “data-” 开头的特性均被保留供程序员使用。它们可在 dataset 属性中使用。

// 修改文档（document）
// 创建一个元素
// document.createElement(tag)
// 用给定的标签创建一个新 元素节点（element node）：let div = document.createElement('div');
// document.createTextNode(text)

// 插入方法
// append：document.body.append(div)。

/*
  * node.append(...nodes or strings) —— 在 node 末尾 插入节点或字符串，
  * node.prepend(...nodes or strings) —— 在 node 开头 插入节点或字符串，
  * node.before(...nodes or strings) —— 在 node 前面 插入节点或字符串，
  * node.after(...nodes or strings) —— 在 node 后面 插入节点或字符串，
  * node.replaceWith(...nodes or strings) —— 将 node 替换为给定的节点或字符串。
*/

// insertAdjacentHTML/Text/Element
/* 该方法的第一个参数是代码字（code word），指定相对于 elem 的插入位置。必须为以下之一：
  *  "beforebegin" — 将 html 插入到 elem 前插入，
  *  "afterbegin" — 将 html 插入到 elem 开头，
  *  "beforeend" — 将 html 插入到 elem 末尾，
  *  "afterend" — 将 html 插入到 elem 后。
*/
// 第二个参数是 HTML 字符串，该字符串会被“作为 HTML” 插入。

// 节点移除
// 想要移除一个节点，可以使用 node.remove()。
// 请注意：如果我们要将一个元素 移动 到另一个地方，则无需将其从原来的位置中删除。所有插入方法都会自动从旧位置删除该节点。

// 克隆节点：cloneNode

// DocumentFragment：是一个特殊的 DOM 节点，用作来传递节点列表的包装器（wrapper）。

// 样式和类