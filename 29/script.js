const app = document.getElementById("root");
const URL = `https://pomber.github.io/covid19/timeseries.json`;
const TOTAL_STAT = `https://corona.lmao.ninja/all`;
let data;

const handleForm = () => {
  const form = document.createElement("buttons");
  const confirmedButton = document.createElement("button");
  const recoveredButton = document.createElement("button");
  const deathsButton = document.createElement("button");
  const nameButton = document.createElement("button");
  form.classList.add("buttons");
  confirmedButton.classList.add("confirmed");
  confirmedButton.textContent = `Confirmed`;
  recoveredButton.classList.add("recovered");
  recoveredButton.textContent = `Recovered`;
  deathsButton.classList.add("deaths");
  deathsButton.textContent = `Deaths`;
  nameButton.classList.add("name");
  nameButton.textContent = `Name`;
  form.appendChild(confirmedButton);
  form.appendChild(recoveredButton);
  form.appendChild(deathsButton);
  form.appendChild(nameButton);
  app.appendChild(form);
  confirmedButton.addEventListener("click", e => {
    e.preventDefault();
    let newData = _.clone(data);
    const sortedCountryList = _.orderBy(
      newData.country,
      i => i.confirmed
    ).reverse();
    document.querySelector("main").remove();
    handleBody(sortedCountryList);
  });
  recoveredButton.addEventListener("click", e => {
    e.preventDefault();
    let newData = _.clone(data);
    const sortedCountryList = _.orderBy(
      newData.country,
      i => i.recovered
    ).reverse();
    document.querySelector("main").remove();
    handleBody(sortedCountryList);
  });
  deathsButton.addEventListener("click", e => {
    e.preventDefault();
    let newData = _.clone(data);
    const sortedCountryList = _.orderBy(
      newData.country,
      i => i.deaths
    ).reverse();
    document.querySelector("main").remove();
    handleBody(sortedCountryList);
  });
  nameButton.addEventListener("click", e => {
    e.preventDefault();
    let newData = _.clone(data);
    const sortedCountryList = _.orderBy(
      newData.country,
      i => i.name
    );
    document.querySelector("main").remove();
    handleBody(sortedCountryList);
  });
};

const handleHead = data => {
  const headArea = document.createElement("header");
  let html = ``;
  for (let key in data) {
    if (key === "updated") {
      continue;
    }
    html += `
      <div class="total">
        <div class=${key.toLowerCase()}>
          <span>${key}:</span>
          <span>${data[key]}</span>
        </div>
      </div>
    `;
  }
  headArea.innerHTML = html;
  app.appendChild(headArea);
};

const handleBody = data => {
  const mainArea = document.createElement("main");
  let html = ``;
  for (let key in data) {
    const latestFigure = data[key];
    html += `
    <div class="country">
      <div class="country__name">
        <span>${latestFigure.name}</span>
      </div>
      <div class="country__date">
        <span>Date:</span>
        <span>${latestFigure.date}</span>
      </div>
      <div class="country__confirmed">
        <span>Confirmed:</span>
        <span>${latestFigure.confirmed}</span>
      </div>
      <div class="country__recovered">
        <span>Recovered:</span>
        <span>${latestFigure.recovered}</span>
      </div>
      <div class="country__deaths">
        <span>Deaths:</span>
        <span>${latestFigure.deaths}</span>
      </div>
    </div>
  `;
  }
  mainArea.innerHTML = html;
  app.appendChild(mainArea);
};

const handleData = data => {
  handleHead(data.total);
  handleBody(data.country);
};

const getData = async () => {
  try {
    const firstRequest = await fetch(URL);
    const firstJson = await firstRequest.json();
    const secondRequest = await fetch(TOTAL_STAT);
    const secondJson = await secondRequest.json();
    let revisedFirstJson = _.map(firstJson, (v, k) =>
      _.merge({}, v[v.length - 1], { name: k })
    );
    const sortedCountryList = _.orderBy(
      revisedFirstJson,
      i => i.deaths
    ).reverse();
    data = {
      country: sortedCountryList,
      total: secondJson
    };
    return {
      country: sortedCountryList,
      total: secondJson
    };
  } catch (err) {
    console.log(err);
  }
};

getData()
  .then(handleData)
  .catch(error => console.log(error));

window.addEventListener("load", () => {
  handleForm();
});
