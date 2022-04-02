// Promisification

// 将一个接受回调的函数转换为一个返回promise的函数。

// 由于许多函数和库都是基于回调的，因此，在实际开发中经常会需要进行这种转换。因为使用 promise 更加方便，所以将基于回调的函数和库 promisify 是有意义的。
// 例子：

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);

}

// 用法：
// loadScript('path/script.js', (err, script) => {...})

// promisify化

let loadScriptPromisify = function(src) {
    return new Promise((resolve, reject) => {
        loadScript(src, (err, reject) => {
            if (err) reject(err);
            else resolve(script);
        });
    });
};

// 用法:
// loadScriptPromisify('path/script.js').then(...)


// promisify(f)：它接受一个需要被 promisify 的函数 f，并返回一个包装（wrapper）函数。

function promisify(f, manyArgs = false) {
    return function (...args) { // 返回一个包装函数 (wrapper-function)
        return new Promise((resolve, reject) => {
            function callback(err, ...results) { // 我们对 f 的自定义的回调
              if (err) {
                  reject(err);
              } else {
                  // 如果 manyArgs 被指定，则使用所有回调的结果 resolve
                  resolve(manyArgs ? results : results[0]);
              }
            }

            args.push(callback); // 将我们的自定义的回调附加到 f 参数(argument)的末尾

            f.call(this, ... args); // 调用原始的函数
        });
    };
}

// 用法
// let loadScriptPromise = promisify(loadScript);
// loadScriptPromise(...).then(...);

// 一个 promise 可能只有一个结果，但从技术上讲，一个回调可能被调用很多次。
// 因此，promisification 仅适用于调用一次回调的函数。进一步的调用将被忽略。