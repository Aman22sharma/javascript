import '../styles/index.scss';

let result = 0;
let lastOperator = null;
let cached = '0';
let screen = document.querySelector('.screen');

refreshScreen();

document.querySelector('.app').addEventListener('click', event => {
  if(event.target.tagName === 'A') handleButton(event.target.textContent);
});

function handleButton(value) {
  (isNaN(parseInt(value))) ? handleOperator(value) : handleNumber(value);
  refreshScreen();
}

function handleNumber(value) {
  cached === '0' ? cached = value : cached += value;
}

function handleOperator(value) {
  switch(value) {
    case 'C':
      result = 0;
      cached = '0';
      lastOperator = null;
      break;
    case '=':
      if(lastOperator == null) return;
      flushOperation(parseInt(cached));
      lastOperator = null;
      cached = '' + result;
      result = 0;
      break;
    case 'D':
      cached.length === 1 ? cached = '0' : cached = cached.substr(0, cached.length - 1);
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intCached = parseInt(cached);
  if(result === 0) result = intCached;
  else flushOperation(intCached);
  lastOperator = value;
  cached = '0';
}

function flushOperation(value) {
  if(lastOperator === '+') result += value;
  else if(lastOperator === '-') result -= value;
  else if(lastOperator === '/') result /= value;
  else result *= value;
}

function refreshScreen() {
  screen.value = cached;
}

