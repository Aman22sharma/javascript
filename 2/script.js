const app = document.getElementById("app");
const main = document.getElementById("main");
const form = document.getElementById("form");
const heading = document.getElementById("heading");
const language = document.getElementById("language");

const getLangs = async () => {
  try {
    let response = await fetch(`./languages.json`);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(`Cannot get languages file:`, error);
  }
};

const getList = async person => {
  try {
    let response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${person.range}&order=${person.filter}&q=happy%20birthday%20${person.age}%20${person.language}%20&safeSearch=strict&type=video&key=AIzaSyDb8Vdp0O6_IJuAB6Pql1oTHqquvjnZmUU`
    );
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(`Cannot get YouTube videos:`, error);
  }
};

const showMessage = (el, msg) => (el.textContent = msg);
const setDOM = (el, str) => (el.innerHTML = str);

const makeOptionElement = (el, value, content) => {
  let option = document.createElement("option");
  option.setAttribute("value", value);
  option.textContent = content;
  el.appendChild(option);
};

const makeDOM = (el, data) => {
  let html = ``;
  data.items.map(v => {
    html += `<iframe src="https://www.youtube.com/embed/${v.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
  setDOM(el, html);
};

form.addEventListener("submit", e => {
  e.preventDefault();
  let person = { age: null, language: null };
  person.language = e.target[0].value;
  person.age = Number(e.target[1].value);
  person.filter = e.target[2].value;
  person.range = Number(e.target[3].value);
  form.reset();
  getList(person)
    .then(data => {
      makeDOM(main, data);
      setDOM(heading, `<h1>${person.language} Happy Birthday Songs</h1>`);
    })
    .catch(error => {
      let html = ``;
      setDOM(heading, `<h1>Sorry, Looks like we could not talk to YouTube. <strong>Worry not, we got a video below for you to keep the party going!</strong></h1><p><code>${error}</code>.</p>`);
      setDOM(main, `<iframe src="https://www.youtube.com/embed/_z-1fTlSDF0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe`);
      console.log(`Cannot get YouTube videos:`, error, error.stack);
    });
});

getLangs()
  .then(d => d.map(i => makeOptionElement(language, i.toLowerCase(), i)))
  .catch(error => {
    showMessage(
      heading,
      `<h1>We tried to download languages but failed, please try again.</h1>`
    );
    console.log(`Cannot get languages file:`, error, error.stack);
  });

setDOM(main, `<p>Landed at a party and everyone looking at you to get the music going on, we got you covered. Enter the age of your buddy and your preferred language, and we will give you tailored list to play and get you out of trouble!</p><ol><li>Select your language.</li><li>Select your age.</li><li>Filter videos by your preference.</li><li>How many videos do you need?</li></ol>`);