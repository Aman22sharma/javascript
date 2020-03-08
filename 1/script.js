const URL = `https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone`;
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
    let response = await fetch(`https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone/${zone}`);
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const makeDOM = (el, d) => {
  el.innerHTML = `
    <h1>Timezone</h1><p>${d.timezone}</p>
    <h1>Daylight Saving Time starts</h1><p>${d.dst_from ? moment(d.dst_from).format('LLLL') : 'Does not exist for this timezone.'}</p>
    <h1>Daylight Saving Time ends</h1><p>${d.dst_until ? moment(d.dst_until).format('LLLL') : 'Does not exist for this timezone.'}</p>`;
};

const handleTimezone = (url, content) => {
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
    let selectBox = document.createElement(`div`);
    selectBox.classList.add('select');
    let select = document.createElement(`select`);
    let content = document.createElement(`main`);
    for (let i = 0; i < data.length; i++) {
      if (i === 144) {
        html += `<option value=${data[i]} key=${i} selected>${data[i]}</option>`;
        handleTimezone(data[i], content);
        continue;
      }
      html += `<option value=${data[i]} key=${i}>${data[i]}</option>`;
    }
    select.innerHTML = html;
    selectBox.appendChild(select);
    app.appendChild(selectBox);
    app.appendChild(content);
    select.addEventListener("change", e => {
      handleTimezone(e.target.value, content);
    });
  })
  .catch(error => {
    let html = ``;
    console.log(error);
    app.innerHTML = `<p>Sorry, there was a data failure.</p><p><code>${error}</code>.</p>`;
  });
