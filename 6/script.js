const oneBox = document.getElementById(`1`);
const twoBox = document.getElementById(`2`);
const threeBox = document.getElementById(`3`);
const fourBox = document.getElementById(`4`);
const fiveBox = document.getElementById(`5`);
const sixBox = document.getElementById(`6`);
const sevenBox = document.getElementById(`7`);
const eightBox = document.getElementById(`8`);
const nineBox = document.getElementById(`9`);

let now = new Date();

oneBox.textContent = now;

twoBox.textContent = now.toUTCString();

threeBox.textContent = now.toTimeString();

fourBox.textContent = new Date(1990, 6, 3, 9, 30, 45);

fiveBox.textContent = new Date(1990, 6, 3, 9, 30, 45).toUTCString();

sixBox.textContent = new Date(7126312378912);

sevenBox.textContent = new Date("July 3 1990").getMonth();

now.setMonth(11);

eightBox.textContent = now;

let before = new Date().getTime();
for (let i = 0; i <= 10000000; i++) {}
let end = new Date().getTime();

nineBox.textContent = (end - before);
