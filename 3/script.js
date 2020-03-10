const app = document.getElementById("app");
const main = document.getElementById("main");
const message = document.getElementById("message");
const country = document.getElementById("country");
const province = document.getElementById("province");
const city = document.getElementById("city");
const form = document.getElementById("form");
const flipToggle = document.querySelector(".flipToggle");
let isToggle = false;
let countryBasket;
let selectedCountryCode;

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
    let response = await fetch(
      `https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json`
    );
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const getProvinceList = async () => {
  try {
    let response = await fetch(
      `https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json`
    );
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const getCityList = async () => {
  try {
    let response = await fetch(
      `https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json`
    );
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const makeDOM = (el, data, e) => {
  let container = document.createElement(`div`);
  let heading = document.createElement(`h1`);
  heading.textContent = e;
  container.classList.add("container");
  let html = ``;
  data.list.map(i => {
    html += `<div class="card"><p class="d">${moment(
      new Date(i.dt * 1000)
    ).format("dddd, LL")}</p><p class="h"><strong>Humidity:</strong> ${
      i.humidity
    }%</p><p class="p"><strong>Pressure:</strong> ${
      i.pressure
    } hPa</p><p class="w"><strong>Wind Speed:</strong> ${
      i.wind_speed
    } m/s, ${Math.floor(
      i.wind_speed * 1.60934
    )} km/s</p><div class="temps"><p class="t1"><span>Average</span><span><span class="flip">${Math.floor(
      i.temp.average
    )}</span><span>&deg;C</span></span></p><p class="t2"><span>Average (Max.)</span><span><span class="flip">${Math.floor(
      i.temp.average_max
    )}</span><span>&deg;C</span></span></p><p class="t3"><span>Average (Min.)</span><span><span class="flip">${Math.floor(
      i.temp.average_min
    )}</span><span>&deg;C</span></span></p><p class="t4"><span>Record (Max.)</span><span><span class="flip">${Math.floor(
      i.temp.record_max
    )}</span><span>&deg;C</span></span></p><p class="t5"><span>Record (Min.)</span><span><span class="flip">${Math.floor(
      i.temp.record_min
    )}</span><span>&deg;C</span></span></p></div></div>`;
  });
  container.innerHTML = html;
  el.appendChild(heading);
  el.appendChild(container);
};

const handleWeather = e => {
  getWeather(e)
    .then(data => {
      main.textContent = ``;
      message.textContent = ``;
      makeDOM(main, data, e);
      flipToggle.style.display = `inline`;
    })
    .catch(error => {
      console.log(error);
      message.textContent = `Sorry, we could not get weather data. Please try again later.`;
    });
};

const handleCity = e => {
  city.style.display = `none`;
  flipToggle.style.display = `none`;
  city.innerHTML = ``;
  let optionCity = document.createElement("option");
  optionCity.setAttribute(`selected`, true);
  optionCity.setAttribute(`disabled`, true);
  optionCity.textContent = `Select a city`;
  city.appendChild(optionCity);
  getCityList()
    .then(data => {
      // if (data.filter(i => i.state_code === e).length === 0) {
      //   message.textContent = `There are no cities listed for this province.`;
      //   let singleProvince = countryBasket.filter(i => i.code === e);
      //   console.log(singleProvince)
      //   handleWeather(singleProvince[0].name);
      //   return;
      // }
      message.textContent = `Good job! Let us select your city, press "Go" and we will get you weather information for next month!`;
      let cityList = data.filter(i => i.state_code === e && i.country_code === selectedCountryCode);
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
      message.textContent = `Sorry, we could not get city list data. Please try again later.`;
    });
};

const handleProvince = e => {
  city.style.display = `none`;
  province.style.display = `none`;
  flipToggle.style.display = `none`;
  province.innerHTML = ``;
  getProvinceList()
    .then(data => {
      if (data.filter(i => i.country_code === e).length === 0) {
        message.textContent = `There are no province listed for this country.`;
        let singleCountry = countryBasket.filter(i => i.code === e);
        handleWeather(singleCountry[0].name);
        country.focus();
        return;
      }
      message.textContent = `Good job! Let us select your province/state!`;
      let option = document.createElement("option");
      option.setAttribute(`selected`, true);
      option.setAttribute(`disabled`, true);
      option.textContent = `Select a province`;
      province.appendChild(option);
      data
        .filter(i => i.country_code === e)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(i => {
          let option = document.createElement("option");
          option.setAttribute("value", i.state_code);
          option.textContent = i.name;
          province.appendChild(option);
        });
      province.style.display = `inline`;
    })
    .catch(error => {
      console.log(error);
      message.textContent = `Sorry, we could not get province list data. Please try again later.`;
    });
};

const handleCountry = () => {
  city.style.display = `none`;
  province.style.display = `none`;
  flipToggle.style.display = `none`;
  message.textContent = `You can find how's the weather in your city for next one month? Get the ball rolling by selecting your country!`;

  let option = document.createElement("option");
  option.setAttribute(`selected`, true);
  option.setAttribute(`disabled`, true);
  option.textContent = `Select a country`;
  country.appendChild(option);

  getCountryList()
    .then(data => {
      countryBasket = data.map(i => ({ name: i.name, code: i.iso2 }));
      data
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(i => {
          let option = document.createElement("option");
          option.setAttribute("value", i.iso2);
          option.textContent = i.name;
          country.appendChild(option);
        });
    })
    .catch(error => {
      console.log(error);
      message.textContent = `Sorry, we could not get country list data, please try again later.`;
    });
};

const handleToggle = () => {
  isToggle = !isToggle;
  document.querySelectorAll(".flip").forEach(value => {
    value.textContent = isToggle
      ? ~~((Number(value.textContent) * 9) / 5 + 32)
      : ~~(((Number(value.textContent) - 32) * 5) / 9);
    value.nextElementSibling.textContent = isToggle ? `°F` : `°C`;
  });
};

country.addEventListener("change", e => {
  e.preventDefault();
  handleProvince(e.target.value);
  selectedCountryCode = e.target.value;
  province.focus();
});

province.addEventListener("change", e => {
  e.preventDefault();
  handleCity(e.target.value);
  city.focus();
});

city.addEventListener("change", e => {
  e.preventDefault();
  handleWeather(e.target.value);
});

flipToggle.addEventListener("click", e => {
  e.preventDefault();
  handleToggle();
});

handleCountry();
country.focus();