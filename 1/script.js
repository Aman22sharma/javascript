// Selectors
const URL = `https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone`; // HACK = `https://cors-anywhere.herokuapp.com`;
// const URL = `http://worldtimeapi.org/api/timezone`; // HACK = `https://cors-anywhere.herokuapp.com`;
const app = document.getElementById("app");
const select = document.querySelector("select");

// New Nodes
const newEl = el => document.createElement(el);
const addCl = (el, name) => el.classList.add(name);
const append = (el, child) => el.appendChild(child);
const newHTML = (el, content) => (el.innerHTML = content);
const setLSI = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const getLSI = key => JSON.parse(localStorage.getItem(key));

// Setup DOM
let selectBox = newEl(`div`);
let content = newEl(`main`);
append(app, selectBox);
append(app, content);
addCl(selectBox, "select");

// Async functions
const getAllTimezones = async (url, location) => {
  try {
    // Clear select
    newHTML(selectBox, ``);

    // Check Local Storage to avoid extra fetch call for all timezones
    let getTimezones;
    if (getLSI(`allTimezones`)) {
      getTimezones = getLSI(`allTimezones`);
    } else {
      let request = await fetch(url);
      let requestJSON = await request.json();
      setLSI(`allTimezones`, requestJSON);
      getTimezones = getLSI(`allTimezones`);
    }

    // Build select on the fly
    let html = `<option disabled>Select a timezone</option>`;
    let targetLocation = !location
      ? getTimezones[Math.floor(Math.random() * getTimezones.length)]
      : location;
    let select = newEl(`select`);
    for (let i = 0; i < getTimezones.length; i++) {
      if (getTimezones[i] === targetLocation) {
        html += `<option value=${getTimezones[i]} key=${i} selected>${getTimezones[i]}</option>`;
        continue;
      }
      html += `<option value=${getTimezones[i]} key=${i}>${getTimezones[i]}</option>`;
    }
    newHTML(select, html);
    append(selectBox, select);

    // Make a new call based on default location
    let requestLocation = await fetch(`${url}/${targetLocation}`);
    let requestLocationJSON = await requestLocation.json();

    // Check if API returned an error
    if (requestLocationJSON.hasOwnProperty("error")) {
      throw new Error(`This location does not exist in the API.`);
      return;
    }
    select.addEventListener("change", e => handleChange(e.target.value));
    return requestLocationJSON;
  } catch (err) {
    throw new Error(err);
  }
};

// Get Selected Timezone
const getCurrentTimezone = async (url, location) => {
  try {
    let requestLocation = await fetch(`${url}/${location}`);
    let requestLocationJSON = await requestLocation.json();
    // Check if API returned an error
    if (requestLocationJSON.hasOwnProperty("error")) {
      throw new Error(`This location does not exist in the API.`);
      return;
    }
    return requestLocationJSON;
  } catch (err) {
    throw new Error(err);
  }
};

// Display Error
const handleError = error => {
  newHTML(selectBox, `<p>Sorry!</p></p>`);
  newHTML(
    content,
    `<p><code>${error}</code><br><small>${error.stack}</small></p>`
  );
};

// Display Numbers
const handleDisplay = (content, data) => {
  newHTML(
    content,
    `
      <h1>Timezone</h1><p>${data.timezone}</p>
      <h1>Daylight Saving Time starts</h1>
      <p>
        ${
          data.dst_from
            ? moment(data.dst_from).format("LLLL")
            : "Does not exist for this timezone."
        }
      </p>
      <h1>Daylight Saving Time ends</h1>
      <p>
        ${
          data.dst_until
            ? moment(data.dst_until).format("LLLL")
            : "Does not exist for this timezone."
        }
      </p>
    `
  );
};

// Handle change
const handleChange = e => {
  getCurrentTimezone(URL, e)
    .then(data => handleDisplay(content, data))
    .catch(error => handleError(error));
};

// Handle all timezones
getAllTimezones(URL)
  .then(data => handleDisplay(content, data))
  .catch(error => handleError(error));
