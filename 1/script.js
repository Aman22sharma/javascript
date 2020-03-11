// Selectors
const URL = `https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone`; // HACK = `https://cors-anywhere.herokuapp.com`;
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

// Declare Async Function
const makeCall = async (url, location) => {
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
    let requestLocation = await fetch(`${URL}/${targetLocation}`);
    let requestLocationJSON = await requestLocation.json();
    select.addEventListener("change", e => handleChange(e.target.value));
    return requestLocationJSON;
  } catch (err) {
    throw new Error(err);
  }
};

// Display Errors
const handleError = error => {
  newHTML(selectBox, `<p>Sorry!</p></p>`);
  newHTML(
    content,
    `<p><code>${error}</code><br><small>${error.stack}</small></p>`
  );
};

// Display Numbers
const handleDisplay = (content, data) => {
  console.log(content, data)
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
  makeCall(URL, e)
    .then(data => handleDisplay(content, data))
    .catch(error => {
      handleError(error);
      console.log(error);
    });
};

// Make Call
makeCall(URL)
  .then(data => handleDisplay(content, data))
  .catch(error => {
    handleError(error);
    console.log(error);
  });
