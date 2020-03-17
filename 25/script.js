const updateClock = () => {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  let currentSecond = currentTime.getSeconds();
  let timeOfDay = currentTime < 12 ? "AM" : "PM";
  currentHour = (currentHour < 10 ? "0" : "") + currentHour;
  currentMinute = (currentMinute < 10 ? "0" : "") + currentMinute;
  currentSecond = (currentSecond < 10 ? "0" : "") + currentSecond;
  currentHour = currentHour > 12 ? currentHour - 12 : currentHour;
  currentHour = currentHour == 0 ? 12 : currentHour;
  let currentTimeString = `${currentHour}:${currentMinute}:${currentSecond} ${timeOfDay}`;
  document.getElementById("app").innerHTML = currentTimeString;
};

setInterval(() => {
  updateClock();
}, 1000);
