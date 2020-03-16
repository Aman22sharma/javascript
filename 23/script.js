const time = document.getElementById("time");
const set = document.getElementById("set");
const counter = document.getElementById("counter");
const clip = `https://www.myinstants.com/media/sounds/the-screaming-sheep.mp3`;

let picker = new Picker(time, {
  format: "YYYY/MM/DD HH:mm"
});

const beep = () => {
  let audio = new Audio(clip);
  audio.play();
  audio.loop = true;
};

const handleSet = e => {
  e.preventDefault();
  const userTime = Date.parse(time.value && time.value);
  const now = Date.now();
  let alarmTime = userTime - now;
  if (alarmTime >= 0) {
    setInterval(() => {
      alarmTime -= 1000;
      counter.textContent = (alarmTime / 1000).toFixed();
    }, 1000);
    setTimeout(() => {
      beep();
    }, alarmTime);
  }
};

set.addEventListener("click", e => handleSet(e));
