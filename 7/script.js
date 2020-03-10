const person = {
  name: "John",
  age: 20
};

if (person.name) {
  console.log(
    `Object has key "name". Not recommended to check key in an object like this.`
  );
}

//--- BEST
console.log(person.hasOwnProperty(`name`)); // true

console.log(`name` in person); // true
