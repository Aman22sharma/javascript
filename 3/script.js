const app = document.getElementById("app");
const main = document.getElementById("main");
const country = document.getElementById("country");
const city = document.getElementById("city");
const form = document.getElementById("form");

city.style.display = `none`;
main.textContent = `You can find how's the weather in your city for next one month? Get the ball rolling by selecting your country and city!`;

const getWeather = async keyword => {
  try {
    let response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://pro.openweathermap.org/data/2.5/climate/month?q=${keyword}&appid=b1b15e88fa797225412429c1c50c122a1&units=metric`
    );
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const getCountryList = async () => {
  try {
    let response = await fetch(`./country.json`);
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const getCityList = async () => {
  try {
    let response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://github.com/lutangar/cities.json/raw/master/cities.json`
    );
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const makeDOM = (el, data) => {
  let container = document.createElement(`div`);
  container.classList.add("container");
  let html = ``;
  data.list.map(i => {
    html += `<div class="card"><p class="d">${moment(
      new Date(i.dt * 1000)
    ).format("dddd, LL")}</p><p class="h"><strong>Humidity:</strong> ${
      i.humidity
    }</p><p class="p"><strong>Pressure:</strong> ${
      i.pressure
    }</p><p class="w"><strong>Wind Speed:</strong> ${
      i.wind_speed
    }</p><div class="temps"><p class="t1"><span>Average</span><span>${Math.floor(
      i.temp.average
    )}&deg;C</span></p><p class="t2"><span>Average (Max.)</span><span>${Math.floor(
      i.temp.average_max
    )}&deg;C</span></p><p class="t3"><span>Average (Min.)</span><span>${Math.floor(
      i.temp.average_min
    )}&deg;C</span></p><p class="t4"><span>Record (Max.)</span><span>${Math.floor(
      i.temp.record_max
    )}&deg;C</span></p><p class="t5"><span>Record (Min.)</span><span>${Math.floor(
      i.temp.record_min
    )}&deg;C</span></p></div></div>`;
  });
  container.innerHTML = html;
  el.appendChild(container);
};

let option = document.createElement("option");
option.setAttribute(`selected`, true);
option.setAttribute(`disabled`, true);
option.textContent = `Select a country`;
country.appendChild(option);

getCountryList()
  .then(data => {
    data
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(i => {
        let option = document.createElement("option");
        option.setAttribute("value", i.code);
        option.textContent = i.name;
        country.appendChild(option);
      });
  })
  .catch(error => {
    console.log(error);
    main.textContent = `Sorry, we could not get country list data. Please try again later.`;
  });

country.addEventListener("change", e => {
  city.style.display = `none`;
  city.innerHTML = ``;
  let option = document.createElement("option");
  option.setAttribute(`selected`, true);
  option.setAttribute(`disabled`, true);
  option.textContent = `Select a city`;
  city.appendChild(option);
  getCityList()
    .then(d => {
      main.textContent = `Good job! Let us select your city, press "Go" and we will get you weather information for next month!`;
      let cityList = d.filter(i => i.country === e.target.value);
      cityList
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(i => {
          let option = document.createElement("option");
          option.setAttribute("value", i.name);
          option.textContent = i.name;
          city.appendChild(option);
        });
      city.style.display = `inline`;
    })
    .catch(error => {
      console.log(error);
      main.textContent = `Sorry, we could not get city list data. Please try again later.`;
    });
});

form.addEventListener("submit", e => {
  e.preventDefault();
  getWeather(e.target[1].value)
    .then(data => {
      main.textContent = ``;
      makeDOM(main, data);
    })
    .catch(error => {
      console.log(error);
      main.textContent = `Sorry, we could not get weather data. Please try again later.`;
    });
});
