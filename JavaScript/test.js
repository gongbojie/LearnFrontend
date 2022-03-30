let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // 将价格转换为数组，将每个键/值对映射为另一对
  // 然后通过 fromEntries 再将结果转换为对象
  
  Object.entries(prices)
        .map(entry => [entry[0], entry[1] * 2])
);


let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 350
};

function sumSalaries(salaries) {
  
  let sum = 0;
  for (const salary of Object.values(salaries)) {
    sum += salary;
  }
}

let user = {
  name: "John",
  year: 30
};

let {name, year: age, isAdmin = false} = user;

function topSalary(salaries) {
  
  let maxSalary = 0;
  let maxName = null;

  for (const [name, salary] of Object.entries(salaries)) {
    if (maxSalary < salary) {
      maxSalary = salary;
      maxName = name;
    }
  }
  return maxName;
}

function sumSalaries(department) {
  if (Array.isArray(department)) {
    return department.reduce((prev, current) => prev + current.salary, 0);
  } else {
    let sum = 0;
    for (const subdep of Object.values(department)) {
      sum += sumSalaries(subdep);// 递归调用所有子部门，对结果求和
    }
    return sum;
  }
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }

    let result = func(x);

    cache.set(x, result);
    return result;
  }
}

function work(a, b) {
  alert(a + b); // work 是一个任意的函数或方法
}

work = spy(work);

function spy(func) {
  function wrapper(...args) {
    // using ...args instead of arguments to store "real" array in wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}

let user1 = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // john

let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
  }
};

group.showList();