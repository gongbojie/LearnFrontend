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