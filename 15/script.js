let name = prompt("What is your name?");
name !== null && name.length !== 0 && name.trim() !== "" && print(name);

function print(name) {
  document.getElementById(`app`).innerHTML = `<h1>${name}</h1>`;
  const text = document.querySelector("h1");
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
  }, 25);
}
