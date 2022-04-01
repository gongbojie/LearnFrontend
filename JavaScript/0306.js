function unique(arr) {
  return Array.from(new Set(arr));
}

function aclean(arr) {
  let map = new Map();

  for (const word of arr) {
    // 将单词 split 成字母， 对字母进行排序， 之后再 join 回来
    let sorted = word // PAN
      .toLowerCase() // pan
      .split('') // ['p', 'a', 'n']
      .sort() // ['a', 'n', 'p']
      .join(''); // anp
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let user = {
  name: "John",
  surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});

let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;

let animal2 = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("white Rabbit"); // rabbit.__proto__ == animal
alert( rabbit.eats); // true

function Rabbit2() {
  /* default prototype
  Rabbit.prototype = { constructor: Rabbit };
  */
}

let animal3 = {
  eats: true
};

// 创建一个以 animal 为原型的新对象
let rabbit5 = Object.create(animal3);

alert(rabbit5.eats); 

alert(Object.getPrototypeOf(rabbit) === animal);

Object.setPrototypeOf(rabbit, {});

let rabbit6 = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps);

class MyClass {
  // class 方法
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
  method2() {}
  method3() {}
}

let myclass = new MyClass("John");
myclass.sayHi();

let User = class {
  sayHi() {
    alert("Hello");
  }
};

class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still`);
  }
}

let animal6 = new Animal("My animal");

class Rabbit6 extends Animal {
  hide() {
    alert(`$this.name} hides!`)
  }
}

class Rabbit extends Animal {
  // 为没有自己的 constructor 的扩展类生成的
  constructor(...args) {
    super(...args);
  }
}

class User1 {
  static staticMethod() {
    alert(this === User);
  }
}

User1.staticMethod(); // true

class CoffeeMachine {
  waterAmount = 0; // 内部的水量

  constructor(power) {
    this.power = power;
    alert( `Created a coffee-machine, power: ${power}`);
  }
}

let coffeeMachine = new CoffeeMachine(100);

coffeeMachine.waterAmount = 200;

class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // 内建方法将使用这个作为 constructor
  static get [Symbol.species]() {
    return Array;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let user2 = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toStringTag.call(user));

let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

class User3 {
  constructor(name) {
    this.name = name;
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在User 可以打招呼

let eventMixin = {
  /**
   * 订阅事件，用法：
   * menu.on('select', function(item) { ... }
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    } 
    this._eventHandlers[eventName].push(handler);
  },

  // 取消订阅用法
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if(handlers[i] === handler) {
        handlers.split(i--, 1);
      }
    }
  },

  // 生成具有给定名称和数据的事件
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return;// 该事件名称没有对应的事件处理程序 (handler)
    }

    // 调用事件处理程序 （handler）
    this._eventHandlers[eventName].forEach(handler => handler.apply(this.args));
  }
};

// Javascript 自身定义的内建的 Error 类的 “伪代码”
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (不同的内建error 类有不同的名字)
    this.stack = "call stack";
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch (err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // 一个嵌套调用的列表，每个调用都有对应的行号
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property:" + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}

class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ReadError";
  }
}

class ValidationError extends Error{ }

class PropertyRequiredError extends ValidationError { }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let userl

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validattion Error", err);
    } else {
      throw err;
    }
  }
}

function loadScript(src, callback) {
  // 创建一个 <script> 标签， 并将其附加到页面
  // 这将使得具有给定的src 的脚本开始加载， 并在加载完成后运行
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);
  script.onerror = () => callback(new Error('Script load error for ${src}'));

  document.head.append(script);
}

function reWriteLoadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

let reWritePromise = reWriteLoadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

reWritePromise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Another handler...'));


loadScript('/my/script.js', function(err, script){
  // 在脚本加载完成后，回调函数才会执行

  if (error) {
    // 处理 error
  } else {
    // 脚本加载成功
  }
})

let promise = new Promise(function(resolve, reject) {
  // executor (生产者代码)
});

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));

new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
}).then(function(result) {
  alert(result);

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
}).then(function(result) {
  alert(result);

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
}).then(function(result) {
  alert(result);
});

loadScript("/article/promise-chaining/one.js")
.then(function(script) {
  return loadScript("/article/promise-chaining/two.js");
})
.then(function(script) {
  return loadScript("/article/promise-chaining/three.js");
})
.then(function(script) {
  // 使用在脚本中声明的函数
  // 以证明脚本确实被加载完毕了
  // one();
  // two();
  // three();
});

  // 箭头函数重写
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("two.js"))
  .then(script => loadScript("three.js"))
  .then(script => {
    // one();
    // two();
    // three();
  });

class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result);
  })
  .then(alert);


// 发送一个 user.json请求
fetch('user.json')
  // 将其加载为 JSON
  .then(response => response.json())
  // 发送一个 Github 的请求
  .then(user => fetch(`githubSite`))
  // 将响应加载为 JSON
  .then(response => response.json())
  // 显示头像图片 (githubUser.avatar_url) 3秒
  .then(githubUser => new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);00
    }, 3000);
  }))
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));

function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return loadJson(`url`);
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "name";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// 使用
loadJson('user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`finish show`));


new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(alert);


new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(function(error) {
  alert("the error is handled, continue normally");
}).then(() => alert("Next successful handler runs"));

window.addEventListener('unhandledrejection', function(event) {
  // 这个时间对象有两个特殊的属性：
  alert(event.promise); // [object promise] - 生成该全局 error 的 promise
  alert(event.reason); // Error: Whoops! - 未处理的 error 对象
});

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

loadJson('no-such-user.json')
  .catch(alert);


let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => {
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });

if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejectd', reason});
  const resolveHandler = value => ({ status: 'fulfilled', value});

  Promise.allSettled = function (promise) {
    const convertedPromises = promise.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}