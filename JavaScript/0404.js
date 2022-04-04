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