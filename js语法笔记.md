# 基础大纲

1. 环境安装 + 基本变量
string 字符串
number 数字
true false boolean 
undefined
null


=== 相等
!== 不相等

2. list & object
3. 流程控制 if else 和 switch case
4. 循环控制 for while
5. 函数function

普通函数
返回值函数
构造函数

```js
function createCard(initName) {
  this.name = initName;
}

const a1 = new createCard('小明');
```

声明方式

```js
function hello() {}

let hello = function () {}

let hello = () => {}
```

6. 类别 class

```js
class Card {
  constructor(initName) {
    this.name = initName
  }
}

const c1 = new Card("xxx")
```

当下执行的类就是this

继承

```js
class Car {
  start() {
  }
}

class Porshe extends Car {}
```

7. HTML DOM操作

window
document

```js
// 网页加载完成调用
window.addEventListener('load', function () {
  // 改变文本
  const p1 = document.getElementById('title')
  p1.innerText = "订阅"

  // 监听按钮点击事件
  const b1 = document.getElementById('btn')
  b1.addListener('click', function () {
    console.log('点击')
  })

  // 注入html
  const box1 = document.getElementById('box')
  box1.innerHTML = '<p>Test</p>'

  // 监听文本变化
  const in1 = document.getElementById('input1')
  in1.addEventListener('keyup', function (2) {
    console.log('e.target.value', e.target.value)
  })
})
```



8. 练习

# 进阶

1. Fetch API
2.  Promise、Async、Await、 JS的非同步
3.  JS的this
4.  原型链条
5.  ES6阵列操作
6.  import export JS的模块化概念