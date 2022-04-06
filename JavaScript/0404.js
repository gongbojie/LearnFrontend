// 模块 module

// 一个模块就是一个文件。一个脚本就是一个模块。
// 模块可以相互加载，并可以用特殊的指令export和import来交换功能，从另一个模块调用一个模块的函数：
/*
* export 关键字标记了可以从当前模块外部访问的变量和函数。
* import 关键字允许从其他模块导入功能
*/

// js文件导出函数
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// 另一个文件导入并使用了这个函数：
import { sayHi } from './sayHi.js';

alert(sayHi);
sayHi('John');

// 模块核心功能
// 始终使用 "use strict"
// 模块级作用域
// 一个模块中的顶级作用域变量和函数在其他脚本中是不可见的。
// 对于模块，我们使用导入/导出而不是依赖全局变量。

// 模块代码仅在第一次导入时被解析
// 如果同一个模块被导入到多个其他位置，那么它的代码只会执行一次，即在第一次被导入时。
// 顶层模块代码应该用于初始化，创建模块特定的内部数据结构。
// 模块可以提供需要配置的通用功能。
/*
 1. 模块导出一些配置方法，例如一个配置对象。
 2. 在第一次导入时，我们对其进行初始化，写入其属性。可以在应用顶级脚本中进行操作。
 3. 进一步地导入使用模块。
*/

// import.meta 对象包含关于当前模块的信息。

// 在一个模块中，“this” 是 undefined

// 浏览器特定功能
// 模块脚本是延迟的
// 模块脚本 总是 被延迟的，与 defer 特性（在 脚本：async，defer 一章中描述的）对外部脚本和内联脚本（inline script）的影响相同。
/*
 *  下载外部模块脚本 <script type="module" src= "..."> 不会阻塞HTML的处理，它们会与其他资源并行加载。
 *  模块脚本会等到 HTML 文档完全准备就绪（即使它们很小并且比 html 加载速度更快），然后才会运行。
 *  保持脚本的相对顺序： 在文档中排在前面的脚本先执行。
*/

// 他的一个副作用是， 模块脚本总是会看到已经完全加载的HTML页面，包括在它们下方的 HTML元素。
// 模块脚本是被延迟的，所以要等到 HTML 文档被处理完成才会执行它。而常规脚本则会立即运行，所以我们会先看到常规脚本的输出。
// 当使用模块脚本时，我们应该知道 HTML 页面在加载时就会显示出来，在 HTML 页面加载完成后才会执行 JavaScript 模块，因此用户可能会在 JavaScript 应用程序准备好之前看到该页面。某些功能那时可能还无法正使用。我们应该放置“加载指示器（loading indicator）”，否则，请确保不会使用户感到困惑。


// Async 适用于内联脚本（inline script）

// 外部脚本
// 具有 type="module" 的外部脚本（external script）在两个方面有所不同
/*
 1. 具有相同 src 的外部脚本仅运行一次
 2. 从另一个源（例如另一个网站）获取的外部脚本需要 CORS header，如我们在 Fetch：跨源请求 一章中所讲的那样。换句话说，如果一个模块脚本是从另一个源获取的，则远程服务器必须提供表示允许获取的 header Access-Control-Allow-Origin。
*/

// 不允许裸模块（“bare” module）
// 在浏览器中，import 必须给出相对或绝对的 URL 路径。没有任何路径的模块被称为“裸（bare）”模块。在 import 中不允许这种模块。

// 兼容性，“nomodule”
// 旧时的浏览器不理解 type="module"。未知类型的脚本会被忽略。对此，我们可以使用 nomodule 特性来提供一个后备

// 构建工具
//  Webpack，将它们打包在一起，然后部署到生产环境的服务器。
/*
构建工具做以下这些事儿：
1. 从一个打算放在HTML中的 <script type="module"> 主模块开始。
2. 分析它的依赖：他的导入，以及它的导入的导入。
3. 适用所有的模块构建一个文件（或者多个文件，这是可调的），并用打包函数（bundler function）替代原生的 import 调用，以使其正常工作。还支持 HTML/CSS” 等“特殊的模块类型。
4. 在处理过程中，可能会应用其他转换和优化：
  * 删除无法访问的代码
  *  删除未使用的导出（tree-shaking）。
  *  删除特定于开发的像 console 和 debugger 这样的语句。
  *  可以使用 Babel将前沿的现代的javascript语法转换为具有类似功能的旧的 js语法。
  *   压缩生成的文件（删除空格，用短的名字替换变量等）
*/

// 如果我们使用打包工具，那么脚本会被打包进一个单一文件（或者几个文件），在这些脚本中的 import/export 语句会被替换成特殊的打包函数（bundler function）。因此，最终打包好的脚本中不包含任何 import/export，它也不需要 type="module"，我们可以将其放入常规的 <script>：

// 导出和导入
// 在声明前导出
// 可以通过在声明之前放置 export 来标记任意声明为导出，无论声明的是变量，函数还是类都可以。

// 导出数组
export let months = ['Jan', 'Feb', 'Mar'];
// 导出 const 声明的变量
export const MODULES_BECAME_STANDARD_YEAR = 2015;
// 导出类
export class User {
  constructor(name) {
    this.name = name;
  }
}

// 导出 class/function 后没有分号
// 大部分 JavaScript 样式指南都不建议在函数和类声明后使用分号。

// 导出与声明分开
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export { sayHi, sayBye}; // 导出变量列表

// Import *
// 要导入的东西列在花括号 import {...} 中
import {sayHi, sayBye} from './say.js';

sayHi('John');
sayBye('John');

// 如果有很多要导入的内容，我们可以使用 import * as <obj> 将所有内容导入为一个对象
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');

/* 要明确列出我们需要导入的内容
 1. 现代的构建工具（webpack 和其他工具）将模块打包到一起并对其进行优化，以加快加载速度并删除未使用的代码。优化器（optimizer）就会检测到它，并从打包好的代码中删除那些未被使用的函数，从而使构建更小。这就是所谓的“摇树（tree-shaking）”。
 2. 明确列出要导入的内容会使得名称较短：sayHi() 而不是say.sayHi();
 3. 导入的显式列表可以更好地概述代码结构：使用的内容和位置。它使得代码支持重构，并且重构起来更容易。
*/

// Import "as"
// 可以使用 as 让导入具有不同的名字。
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John');
bye('John');

// Export "as"
// 导出也有类似的语法。
export {sayHi as hi, sayBye as bye}; // say.js

// main.js
import * as say from './say.js';

say.hi('John');
say.bye('John');

// Export default
// 在实际中，主要有两种模块。
/*
 * 包含库或函数包的模块，像上面的 say.js。
 * 声明单个实体的模块，例如模块 user.js 仅导出 class User。
*/

// 模块提供了一个特殊的默认导出 export default 语法，以使“一个模块只做一件事”的方式看起来更好。
// 将 export default 放在要导出的实体前
// user.js
export default class User { // 只需要添加 "default" 即可
  constructor(name) {
    this.name = name;
  }
}

// 每个文件可能只有一个 export default：
// 然后将其导入而不需要花括号：

// 📁 main.js
import User from './user.js'; // 不需要花括号 {User}，只需要写成 User 即可

new User('John');

// import 命名的导出时需要花括号，而 import 默认的导出时不需要花括号。
// 模块要么是命名的导出要么是默认的导出。

/*
export default class { // 没有类名
  constructor() { }
}

export default function(user) { // 没有函数名
  alert(`Hello, ${user}!`);
}

// 导出单个值，而不使用变量
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

不指定名称是可以的，因为每个文件只有一个 export default，因此不带花括号的 import 知道要导入的内容是什么。
*/

// “default” 名称
// 在某些情况下，default 关键词被用于引用默认的导出。
// 要将函数与其定义分开导出：
export {sayHi as default};

// 命名的导出会强制我们使用正确的名称进行导入：
import {User} from './user.js';

// 对于默认的导出，我们总是在导入时选择名称：
import User from './user.js'; // 有效
import MyUser from './user.js'; // 也有效

// 重新导出
// “重新导出（Re-export）”语法 export ... from ... 允许导入内容，并立即将其导出（可能是用的是其他的名字）
export {sayHi} from './say.js'; // 重新导出 sayHi
export {default as User} from './user.js'; // 重新导出 default

// 实际导出的功能分散在 package 中，所以我们可以将它们导入到 auth/index.js，然后再从中导出它们：

// 📁 auth/index.js

// 导入 login/logout 然后立即导出它们
import {login, logout} from './helpers.js';
export {login, logout};

// 将默认导出导入为 User，然后导出它
import User from './user.js';
export {User};

// 使用我们 package 的人可以 import {login} from "auth/index.js"。
// 语法 export ... from ... 只是下面这种导入-导出的简写：

// 📁 auth/index.js
// 重新导出 login/logout
export {login, logout} from '.....js'
// 将默认导出重新导出为 User
export {default as User} from '.user.js';

// 重新导出默认导出 
// 重新导出时，默认导出需要单独处理。

// 动态导入
// import() 表达式
// import(module) 表达式加载模块并返回一个promise，该promise resolve为一个包含所有导出的模块对象。
// let modulePath = prompt("which module to load?");

// import(modulePath)
//   .then(obj => <module object>)
//   .catch(err => <loading error, e.g. if no such module)