# Syntax

## Fundamentals

### Comments

```javascript
// Single line

/*
Multi line
*/
```

### Primitive Values

```javascript
// Boolean
true;
false;

// Numbers
1;
1.1;

// Strings
("a");
("a");
```

### Debugging

```javascript
// Assertion - In Node environment
assert.equal(1 + 3, 4);

// Log
console.log("Hello");

// Error
console.error("Error message");
```

### Variable

```javascript
let x;

x = 10;

let y = "Hi";

const z = 3;
```

### Control Flow Statements

```javascript
if (true) {
  console.log("Hi");
}
```

### Functions

```javascript
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Arrow function with a return code block
const add = (a, b) => {
  return a + b;
};
```

### Objects

```javascript
const car = {
  name: "Honda",
  color: "Silver",
  getName() {
    return this.name;
  }
};
car.name = "Ford";
```

### Arrays

```javascript
const bucket = [1, 2, 3, 4, 5];

console.log(bucket[1]);
```

## Naming Conventions

- Lower (camel case): functions, variables
- Hyphens: CSS class selectors
- Capitalize: classes
- Uppercase: constants
- Unused parameter / Private class property: underscores

## Strict Mode

Always user strict mode.