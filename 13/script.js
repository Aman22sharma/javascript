let num = 0;

function p() {
  let count = ++num; // 1
  console.log(count + ": Started - Sync code started"); // 1

  let p1 = new Promise(function(resolve, reject) {
    let time = Math.random() * 8000 + 1000;
    console.log(count + ": Promise started - Async code started");
    console.log("Time: ", `${Math.floor(time / 1000)} seconds`);
    window.setTimeout(function() {
      resolve(count);
    }, time);
  });

  p1.then(function(val) {
    console.log(val + ": Promise fulfilled - Async code terminated");
  }).catch(function(reason) {
    console.log("Handle rejected promise (" + reason + ") here.");
  });

  console.log(count + ": Promise made - Sync code terminated");
}

p();
p();
p();

// Run in console

function Father(name, age) {
  this.name = name;
  this.age = age;
}

Father.prototype.getName = function() {return this.name;}
Father.prototype.getAge = function() {return this.age;}
Father.prototype.setAge = function(age) {this.age = age;}
Father.prototype.setName = function(name) {this.name = name;}

const f1 = new Father('Rob', 21);

console.log(f1);
f1.setName('balls');
f1.setAge(32);
console.log(f1);

function Son(name, age, games) {
Father.call(this, name, age);
this.games = games;
}

Son.prototype = Object.create(Father.prototype);

Son.prototype.constructor = Father;

const s1 = new Son('Bob', 4, 'csgo');

s1.setName('chob')

console.log(Father, Son, f1, s1);

class Mother {
constructor(name, age) {
  this.age = age;
  this.name = name;
}
getName() {
  return this.name;
}
static add(a,b) {
  return a+b;
}
}

const m1 = new Mother('ria', 19);

console.log(m1, m1.getName(), Mother.add(5,4))

class Daughter extends Mother {
constructor(name, age, books) {
  super(name, age);
  this.books = books;
}
getInfo() {
  return `${this.name}, ${this.age}, ${this.books}`
}
static mul(a,b) {
  return a * b;
}
}

const d1 = new Daughter('nina', 6, 'c++')

console.log(d1, d1.getInfo(), d1.getName())