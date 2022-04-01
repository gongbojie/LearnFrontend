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