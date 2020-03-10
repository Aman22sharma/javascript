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
let provinceBasket;
let selectedCountryCode;
let selectedProvinceCode;

const getWeather = async keyword => {
  try {
    let response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://pro.openweathermap.org/data/2.5/climate/month?q=${keyword}&appid=b1b15e88fa797225412429c1c50c122a1&units=metric`
    );
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(`Cannot talk to Open Weather API:`, error);
  } finally {
    console.log(`This block runs at the end of getWeather function.`);
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
    console.log(`Cannot talk to DR5HN Profile on GitHub:`, error);
  } finally {
    console.log(`This block runs at the end of getCountryList function.`);
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
    console.log(`Cannot talk to DR5HN Profile on GitHub:`, error);
  } finally {
    console.log(`This block runs at the end of getProvinceList function.`);
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
    console.log(`Cannot talk to DR5HN Profile on GitHub:`, error);
  } finally {
    console.log(`This block runs at the end of getCityList function`);
  }
};

const showMessage = (el, msg) => (el.textContent = msg);
const clearMessage = el => (el.textContent = ``);
const clearElement = el => (el.innerHTML = ``);
const hideElement = el => (el.style.display = `none`);

const makePlaceholderOption = (msg, country) => {
  let option = document.createElement("option");
  option.setAttribute(`selected`, true);
  option.setAttribute(`disabled`, true);
  option.textContent = `Select a ${msg}`;
  country.appendChild(option);
};

const makeOptionElement = (el, value, content) => {
  let option = document.createElement("option");
  option.setAttribute("value", value);
  option.textContent = content;
  el.appendChild(option);
};

const makeDOM = (el, data, e) => {
  let html = ``;
  let container = document.createElement(`div`);
  container.classList.add("container");
  let heading = document.createElement(`h1`);
  showMessage(heading, e);
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
      if (data.cod === "404") {
        clearMessage(main);
        showMessage(
          main,
          `We talked to our good old friend "OpenWeather API" and your selected location "${e}" does not exist in their database.`
        );
        console.log(
          `We talked to OpenWeather API and your selected location "${e}" does not exist in their database.`
        );
        return;
      }
      clearMessage(main);
      makeDOM(main, data, e);
      flipToggle.style.display = `inline`;
      console.log(`Weather for location "${e}" has been successfully served.`);
    })
    .catch(error => {
      showMessage(
        main,
        `We talked to our good old friend "OpenWeather API" and seems like they are away at the moment, try again in a few minutes.`
      );
      console.log(error);
    });
};

const handleCity = e => {
  clearElement(city);
  hideElement(city);
  hideElement(flipToggle);
  makePlaceholderOption("City", city);
  getCityList()
    .then(data => {
      if (
        data.filter(
          i => i.state_code === e && i.country_code === selectedCountryCode
        ).length === 0
      ) {
        console.log(
          `Run this block if there are no cities available for ${e} province.`
        );
        let singleProvince = provinceBasket.filter(
          i => i.state === e && i.code === selectedCountryCode
        );
        handleWeather(singleProvince[0].name);
        return;
      }
      showMessage(
        main,
        `Good job! You choose ${e}. Let us select your city in ${e}, press "Go" and we will get you weather information for next month!`
      );
      let cityList = data.filter(
        i => i.state_code === e && i.country_code === selectedCountryCode
      );
      cityList
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(i => makeOptionElement(city, i.name, i.name));
      city.style.display = `inline`;
    })
    .catch(error => {
      showMessage(
        main,
        `We tried to download all cities from our good old friend "DR5HN" on GitHub and seems like they are away at the moment, try again in a few minutes.`
      );
      console.log(
        `Cannot talk to DR5HN Profile on GitHub [after calling getCityList Async function]:`,
        error,
        error.stack
      );
    });
};

const handleProvince = e => {
  clearElement(province);
  hideElement(city);
  hideElement(province);
  hideElement(flipToggle);
  getProvinceList()
    .then(data => {
      provinceBasket = data.map(i => ({
        name: i.name,
        code: i.country_code,
        state: i.state_code
      }));
      if (data.filter(i => i.country_code === e).length === 0) {
        console.log(
          `Run this block if country with code ${e} has no provinces.`
        );
        let singleCountry = countryBasket.filter(i => i.code === e);
        handleWeather(singleCountry[0].name);
        country.focus();
        return;
      }
      showMessage(
        main,
        `Good job! You choose ${e}. Let us select your province in ${e}, press "Go" and we will get you weather information for next month!`
      );
      makePlaceholderOption("Province", province);
      data
        .filter(i => i.country_code === e)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(i => makeOptionElement(province, i.state_code, i.name));
      province.style.display = `inline`;
    })
    .catch(error => {
      showMessage(
        main,
        `We tried to download all provinces from our good old friend "DR5HN" on GitHub and seems like they are away at the moment, try again in a few minutes.`
      );
      console.log(
        `Cannot talk to DR5HN Profile on GitHub [after calling getProvinceList Async function]:`,
        error,
        error.stack
      );
    });
};

const handleCountry = () => {
  hideElement(city);
  hideElement(province);
  hideElement(flipToggle);
  showMessage(
    main,
    `You can find how's the weather in your city for next one month? Get the ball rolling by selecting your country!`
  );
  makePlaceholderOption("Country", country);

  getCountryList()
    .then(data => {
      countryBasket = data.map(i => ({ name: i.name, code: i.iso2 }));
      data
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(i => makeOptionElement(country, i.iso2, i.name));
    })
    .catch(error => {
      showMessage(
        main,
        `We tried to download all countries from our good old friend "DR5HN" on GitHub and seems like they are away at the moment, try again in a few minutes.`
      );
      console.log(
        `Cannot talk to DR5HN Profile on GitHub [after calling getCountryList Async function]:`,
        error,
        error.stack
      );
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
  console.log(
    `We ran converter for you so you can read units in your standards.`
  );
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
