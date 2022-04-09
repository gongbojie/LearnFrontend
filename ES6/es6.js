// 课程地址：https://www.youtube.com/watch?v=NCwa_xi0Uuc
// ES6 Tutorial: Learn Modern JavaScript in 1 Hour

// 1. Var Let Const

// var -> function
// let -> block
// const -> block （read-only）
// var一般不用，prefer const over let

// 2. Objectst

// 3. the this keyword
// person.walk(); 具体的方法，具体object的方法
// walk(); undefined window的方法

// 4. Binding this
// const walk = person.walk.bind(person);

// 5. Arrow Functions
// const square = function(number) {
//   return number * number;
// }

const square = number => number * number;

const jobs = [
  { id: 1, isActive: true },
  { id: 2, isActive: true },
  { id: 3, isActive: false },
];

// const activeJobs = jobs.filter(function(job) { return job.isActive; });
const activeJobs = jobs.filter(job => job.isActive);

// 6. Arrow Function and this
// arrow function dont reblind this keyword

// 7. Array.map()
const colors = ['red', 'green', 'blue'];
// const items = colors.map(function(color) {
//   return '<li>' + color + '</li>';
// });

const items = colors.map(color => `<li>${color}</li>`);

// 8. Object destructuring

// 9. Spread Operator
const first1 = [1, 2, 3];
const second1 = [4, 5, 6];

// const combined = first.concat(second);
// const combined = [...first, 'a', ...second, 'b'];
const clone = [...first1]; 
// first： 1 2 3
// clone：1 2 3 

const first2 = { name: "Mosh" };
const second2 = { job: "Instructor" };

const combined = { ...first2, ...second2, location: "Australia" };
console.log(combined);

// 10. Classes
class Person {
  constructor(name) {
    this.name = name;
  }


  walk() {
    console.log("walk");
  }
}

// 11. Inheritance
class Teacher extends Person {
  constructor(name, degree) {
    super(name);
    this.degree = degree;  
  }
  teach() {
    console.log("teacher");
  }
}

const teacher = new Teacher("Mosh", "MAc");
teacher.walk();

// 12. Modules
import { Teacher } from './teacher';

// 13. Named and Default Exports
import Teacher, { promoto } from './teacher';

// Default -> import ... from '';
// Named -> import { ... } from '';