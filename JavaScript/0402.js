// 微任务（Microtask）
// Promise 的处理程序（handlers）.then、.catch 和 .finally 都是异步的。

const { fuchsia } = require("color-name");

// 微任务队列（Microtask queue）
/*
* 队列（queue）是先进先出的：首先进入队列的任务会首先运行。
* 只有在 JavaScript 引擎中没有其它任务在运行时，才开始执行任务队列中的任务。
*/
// 当一个 promise 准备就绪时，它的 .then/catch/finally 处理程序（handler）就会被放入队列中：但是它们不会立即被执行。当 JavaScript 引擎执行完当前的代码，它会从队列中获取任务并执行它。

// 未处理的 rejection
// 如果一个 promise 的 error 未被在微任务队列的末尾进行处理，则会出现“未处理的 rejection”。

let promise1 = Promise.reject(new Error("Promise Failed!"));
promise.catch(err => alert('caught'));

// 不会运行：error 已经被处理
window.addEventListener('unhandledrejection', event => alert(event.reason));

// 如果忘记添加 .catch ，那么，微任务队列清空后，javascript引擎会触发下面这事件：
let promise2 = Promise.reject(new Error("Promise Failed!"));

// Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));

// Async/await

// Async/await 是以更舒适的方式使用 promise 的一种特殊语法

// Async function
async function f() {
    return 1;
}

// 在函数前面的 “async” 这个单词表达了一个简单的事情：即这个函数总是返回一个 promise。其他值将自动被包装在一个 resolved 的 promise 中。
async function f() {
    return Promise.resolve(1);
}

f().then(alert); // 1

// async 确保了函数返回一个 promise，也会将非 promise 的值包装进去。

// Await

// 只在 async 函数内工作
let value = await promise;

// 关键字 await 让 javascript 引擎等待直到 promise 完成 settle 并返回结果。

// 一秒钟后resolve的promise：
async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000);
    });

    let result = await promise; // 等待，直到 promise resolve

    alert(result); // done!
}

// await 实际上会暂停函数的执行，直到 promise 状态变为 settled，然后以 promise 的结果继续执行。
// 相比于 promise.then，它只是获取 promise 的结果的一个更优雅的语法。

// 不能载普通函数中使用 await，await只在async函数中有效。
// 改写成 async/await 的形式
// 1. 我们需要用await替换掉 .then的调用。
// 2. 另外，我们需要在函数前面加上 async关键字，以使它们能工作。

async function showAvatar() {
  // 读取我们的 JSON
  let response = await fetch('article/promise-chaining/user.json');
  let user = await response.json();

  // 读取 github 用户信息
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // 显示头像
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 等待三秒
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();

// 包装到匿名的异步函数中
(async () => {
  let response = await fetch('/user.json');
  let user = await response.json();
})();

// await 接受 “thenables”
// Class 中的 async 方法

// Error 处理
// 如果一个 promise 正常 resolve，await promise返回的就是其结果。如果 promise 被 reject，它将 throw 这个 error， 就像在这一行有一个 throw 语句那样。
async function f() {
  await Promise.reject(new Error("Whoops!"));
}

async function f() {
  throw new Error("Whoops!");
}

// 上面的两个代码一致

// 真实开发中，promise 可能需要一点时间后才 reject。在这种情况下，在 await 抛出（throw）一个 error 之前会有一个延时。我们可以用 try..catch 来捕获上面提到的那个 error，与常规的 throw 使用的是一样的方式：
async function f() {
  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
// 如果有 error 发生，执行控制权马上就会被移交至 catch 块。我们也可以用 try 包装多行 await 代码：
async function f() {

  try {
    let response = await fetch('no-user-here');
    let user = await response.json();
  } catch (err) {
    // 捕获 fetch 和 response.json 中的错误
    alert(err);
  }
}

f();
// 如果我们没有 try..catch，那么由异步函数 f() 的调用生成的 promise 将变为 rejected。我们可以在函数调用后面添加 .catch 来处理这个 error

// async/await 和 promise.then/catch

// async/await 可以和 Promise.all 一起使用

// 用async/await来重写
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

async function loadJson(url) {
  let response = await fetch(url);

  if (response.status == 200) {
    let json = await response.json();
    return json;
  }

  throw new Error(response.status);
}