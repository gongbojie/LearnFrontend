// Generator，高级 iteration
// Generator
// 常规函数只会返回一个单一值（或者不返回任何值）。而 Generator 可以按需一个接一个地返回（“yield”）多个值。它们可与 iterable 完美配合使用，从而可以轻松地创建数据流。

// Generator 函数
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

/*
next() 的结果始终是一个具有两个属性的对象：
* 1. value: 产出的（yielded）的值。
* 2. done: 如果 generator 函数已执行完成则为 true，否则为 false。
*/

/*
function* f(…) 或 function *f(…)？
这两种语法都是对的。

但是通常更倾向于第一种语法，因为星号 * 表示它是一个 generator 函数，它描述的是函数种类而不是名称，因此 * 应该和 function 关键字紧贴一起。
*/

// Generator 是可迭代的
// 可以使用 for...of 循环遍历它所有的值：

// 使用 generator 进行迭代
let range = {
  from: 1,
  to: 5,

  // for..of range 在一开始就调用这个
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        // 它应该以对象 {done:..., value:...} 的形式返回值
        if (this.current <= this.last) {
          return {done: false, value: this.current++ };
        } else {
          return { done: true};
        }
      }
    };
  }
};

alert([...range]);

// Generator 可以永远产出（yield）值

// Generator 组合
// Generator 组合（composition）是 generator 的一个特殊功能，它允许透明地（transparently）将 generator 彼此“嵌入（embed）”到一起。

// 一个生成数字序列的函数
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

// 异步迭代和 generator

// 向对象 range 添加 迭代能力。
// 使用Symbol.iterator 的特殊方法来实现

/*
* 当循环开始时，该方法被 for..of 结构调用，并且它应该返回一个带有 next 方法的对象。
* 对于每次迭代，都会为下一个值调用 next() 方法。
* next() 方法应该以 {done: true/false, value:<loop value>} 的格式返回一个值，其中 done:true 表示循环结束。
*/

let range1 = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() { // 在 for..of 循环开始时被调用一次
    return {
      current: this.from,
      last: this.to,

      async next() { // 每次迭代时都会被调用，来获取下一个值

        // 注意： 我们可以在 async next 内部使用 "await"
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }

      }
    };

  }
};

(async () => {
  for await (let value of range) {
    alert(value);
  }
})();

// 异步可迭代对象
// 当值是以异步的形式出现时，例如在 setTimeout 或者另一种延迟之后，就需要异步迭代。
// 要使对象异步迭代：
/*
 1. 使用 Symbol.asyncIterator 取代 Symbol.iterator
 2. next()方法返回一个 promise （带有下一个值， 并且状态为 fulfilled）。
   * 关键字 async 可以实现这一点， 我们可以简单使用 async next()。
 3. 我们应该使用 for await (let item iterable) 循环来迭代这样的对象
   * 注意关键字 await
*/

// 回顾 generator
// 要创建一个可迭代对象时，我们会使用 generator
// generator 是“生成（yield）值的函数”
// Generator 是标有 function*（注意星号）的函数，它使用 yield 来生成值，并且我们可以使用 for..of 循环来遍历它们。

// 异步 generator (finally)
// 语法：在 function* 前面加上 async。然后使用 for await (...) 来遍历它
async function* generateSequence(start, end) {
  for (let i = start; i < end; i++) {
    // 
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value);
  }
})();

// 实际的例子：分页的数据