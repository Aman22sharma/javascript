console.log(this);

console.log(this === window);

this.foo = "foo";

console.log(window.foo);

const func = () => {
  return this;
};

console.log(func());

function func2() {
  "use strict";
  return this;
}

console.log(func2());

const func3 = () => {
  "use strict";
  return this;
};

console.log(func3());

// Call - Object takes parameters

const testObj = { a: 1, b: 2 };
function sum(c, d) {
  return this.a + this.b + c + d;
}

console.log(sum.call(testObj, 3, 4));

// Apply - Object takes array

const testObj2 = { a: 1, b: 2 };
function sum2(c, d) {
  return this.a + this.b + c + d;
}

console.log(sum2.apply(testObj2, [3, 4]));

// Bind

function foo2() {
  return this.bar;
}

const foo3 = foo2.bind({ bar: "test" });
const foo4 = foo3.bind({ bar: "test2" });

console.log(foo3());
console.log(foo4());

// This in arrow functions

const myObj = {
  old: function() {
    console.log(this, myObj, myObj === this);
  },
  new: () => {
    console.log(this, myObj, myObj === this);
  }
};

myObj.old();
myObj.new();

// This in an object's method

const person = {
  name: "John",
  speak: function() {
    console.log(`Hello, I am ${this.name}.`);
  }
};

person.speak();

// This on an object from an outside function

const car = {
  name: "Honda"
};

function doService() {
  console.log(`${this.name} has been service for 1 year.`);
}

car.doService = doService;

car.doService();
