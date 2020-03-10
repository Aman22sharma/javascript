// IIFE

(function foo() {
  let bar = 1;
  console.log(bar);
})();

// IIFE with function expression

(temp = function(val = 1) {
  console.log(`Your number is: ${val}`);
})();

temp(10);
temp(20);

// Let

let a = 10;
console.log(a);

{
  let a = 15;
  console.log(a);
}

console.log(a);
