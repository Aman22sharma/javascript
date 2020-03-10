let data = [
  {
    name: "John",
    age: 25,
    hobbies: ["using computer", "grocery"],
    employment: false,
    savings: null
  }
];

const str = JSON.stringify(data);

console.log(str);

const str2 = JSON.parse(str);

console.log(`${str2[0].name} is the best.`);
