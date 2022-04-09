import { Person } from './person';

export function promoto(){};

export default class Teacher extends Person {
  constructor(name, degree) {
    super(name);
    this.degree = degree;  
  }
  teach() {
    console.log("teacher");
  }
}