"use strict";

const assignMistake = () => {
  "use strict";
  foo = 1; // NO in strict mode
};

// assignMistake();

let foo = 10;
delete foo; // NO in strict mode

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode