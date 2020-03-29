const app = () => {
  // LOOPING A TRIANGLE
  const symbolInput = document.querySelector("#input-symbol");
  const symbolButton = document.querySelector("#btn-symbol");
  const symbol = document.querySelector("#symbol");
  symbol.classList.add("d-none");
  const getSymbol = str => {
    let result = ``;
    symbol.innerHTML = ``;
    for (let i = 0; i < 7; i++) {
      result += str;
      symbol.innerHTML += `${result}<br>`;
    }
  };
  symbolButton.addEventListener("click", e => {
    e.preventDefault();
    if (!symbolInput.value.replace(/\s/g, "")) {
      symbol.classList.add("d-none");
      symbol.innerHTML += ``;
      return;
    }
    symbol.classList.remove("d-none");
    getSymbol(symbolInput.value);
  });
  // FIZZBUZZ
  const fizzbuzz = document.querySelector("#fizzbuzz");
  const getFizzbuzz = () => {
    for (let i = 1; i <= 100; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        fizzbuzz.innerHTML += `<span class="text-success">${i}: FizzBuzz</span><br>`;
        continue;
      } else if (i % 5 === 0) {
        fizzbuzz.innerHTML += `<span class="text-danger">${i}: Buzz</span><br>`;
        continue;
      } else if (i % 3 === 0) {
        fizzbuzz.innerHTML += `<span class="text-info">${i}: Fizz</span><br>`;
        continue;
      } else {
        fizzbuzz.innerHTML += `${i}<br>`;
      }
    }
  };
  getFizzbuzz();
  // CHESSBOARD
  const gridInput = document.querySelector("#input-grid");
  const gridButton = document.querySelector("#btn-grid");
  const grid = document.querySelector("#grid");
  grid.classList.add("d-none");
  const getWord = (length, s1, s2) => {
    let result = ``;
    let limit = length % 2 === 0 ? length / 2 : Math.ceil(length / 2);
    for (let i = 0; i < limit; i++) {
      if (length % 2 !== 0 && i === limit - 1) {
        result += `${s2}`;
        continue;
      }
      result += `${s1}`;
    }
    return result;
  };
  const getGrid = limit => {
    let result = ``;
    grid.innerHTML = ``;
    for (let i = 0; i < limit; i++) {
      if (i % 2 !== 0) {
        result = getWord(limit, "OX", "O");
        grid.innerHTML += `${result}<br>`;
        continue;
      }
      result = getWord(limit, "XO", "X");
      grid.innerHTML += `${result}<br>`;
    }
  };
  gridButton.addEventListener("click", e => {
    e.preventDefault();
    if (
      !gridInput.value.replace(/\s/g, "") ||
      gridInput.value < 2 ||
      gridInput.value > 100
    ) {
      grid.classList.add("d-none");
      grid.innerHTML += ``;
      return;
    }
    grid.classList.remove("d-none");
    getGrid(Number(gridInput.value));
  });
};

app();
