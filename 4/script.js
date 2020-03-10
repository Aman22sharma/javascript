const stopHello = document.getElementById(`stopHello`);
const stopBernie = document.getElementById(`stopBernie`);

const hello = () => {
  console.log(`Hello ran...`);
  alert(`Hello after 2 seconds!`);
};

// setTimeout
const helloRef = setTimeout(hello, 2000);

const bernie = () => {
  console.log(`Bernie ran...`);
  alert(`Bernie is a politician with good intent.`);
};

// setInterval
const bernieRef = setInterval(bernie, 4000);

// Event Listeners
stopHello.addEventListener(`click`, e => {
  e.preventDefault();
  clearTimeout(helloRef);
});

stopBernie.addEventListener(`click`, e => {
  e.preventDefault();
  clearInterval(bernieRef);
});
