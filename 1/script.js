const URL = `http://worldtimeapi.org/api/timezone`;
const app = document.getElementById("app");
const select = document.querySelector("select");

const getList = async url => {
  try {
    let response = await fetch(url);
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const getTimezone = async zone => {
  try {
    let response = await fetch(`http://worldtimeapi.org/api/timezone/${zone}`);
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const makeDOM = (el, d) => {
  el.innerHTML = `
    <table>
    <thead>
    <th>Time</th>
    <th>Day of week</th>
    <th>Day of year</th>
    <th>Week number</th>
    <th>Daylight Saving starts from</th>
    <th>Daylight Saving end on</th>
    </thead>
    <tbody>
    <td>${d.datetime}</td>
    <td>${moment(d.datetime).format("dddd")}</td>
    <td>${d.day_of_year}</td>
    <td>${d.week_number}</td>
    <td>${d.dst_from}</td>
    <td>${d.dst_until}</td>
    </tbody>
    </table>`;
};

const handleTimezone = url => {
  getTimezone(url)
    .then(d => {
      console.log(d);
      makeDOM(content, d);
    })
    .catch(error => {
      console.log(error);
    });
};

getList(URL)
  .then(data => {
    let html = `<option disabled>Select a timezone</option>`;
    let select = document.createElement(`select`);
    let content = document.createElement(`main`);
    for (let i = 0; i <= data.length; i++) {
      if (i === 144) {
        html += `<option value=${data[i]} key=${i} selected>${data[i]}</option>`;
        handleTimezone(data[i]);
        continue;
      }
      html += `<option value=${data[i]} key=${i}>${data[i]}</option>`;
    }
    select.innerHTML = html;
    app.appendChild(select);
    app.appendChild(content);
    select.addEventListener("change", e => {
      handleTimezone(e.target.value);
    });
  })
  .catch(error => {
    let html = ``;
    console.log(error);
    app.innerHTML = `<p>Sorry, there was a data failure.</p><p><code>${error}</code>.</p>`;
  });
