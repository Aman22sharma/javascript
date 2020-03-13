let name = prompt("What is your name?");
name !== null && name.length !== 0 && name.trim() !== "" ? print(`<h1>${name}</h1>`) : print(`<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Windows_XP_logo.svg/200px-Windows_XP_logo.svg.png" alt="Windows">`);

console.log('name :', name);

function print(name) {
  document.getElementById(`app`).innerHTML = `<div id="hook">${name}</div>`;
  const text = document.querySelector("#hook");
  let x = 0,
    y = 0,
    reverseX = false,
    reverseY = false;
  setInterval(() => {
    x === innerWidth - text.offsetWidth
      ? (x--, (reverseX = true))
      : x === 0
      ? (x++, (reverseX = false))
      : reverseX
      ? x--
      : x++;
    y === innerHeight - text.offsetHeight
      ? (y--, (reverseY = true))
      : y === 0
      ? (y++, (reverseY = false))
      : reverseY
      ? y--
      : y++;
    text.style.transform = `translate(${x}px, ${y}px)`;
    text.style.background = `transparent`;
  }, 25);
}
