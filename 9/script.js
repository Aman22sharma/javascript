// Basics

const sayMyName = () => {
  const name = `Foo`;

  const print = () => {
    console.log(name);
  };

  return print;
};

const firstTime = sayMyName();
console.log(`---1--- Returns a function that has access to local variable "name" where it was defined.`);
const secondTime = firstTime();
console.log(`---2--- Returns a value.`);

// Exercise

const counter = () => {
  let count = 0;
  const change = newValue => (count += newValue);

  return {
    add() {
      return change(1);
    },
    sub() {
      return change(-1);
    },
    print() {
      return count;
    }
  };
};

let init = counter();
console.log(init.print());
init.add();
console.log(init.print());
init.add();
init.sub();
console.log(init.print());
