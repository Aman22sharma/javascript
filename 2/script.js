const app = document.getElementById("app");
const main = document.getElementById("main");
const form = document.getElementById("form");
const heading = document.getElementById("heading");
const language = document.getElementById("language");

// Languages: https://gist.githubusercontent.com/piraveen/fafd0d984b2236e809d03a0e306c8a4d/raw/eb8020ec3e50e40d1dbd7005eb6ae68fc24537bf/languages.json

main.innerHTML = `<p>Landed at a party and everyone looking at you to get the music going on, we got you covered. Enter the age of your buddy and your preferred language, and we will give you tailored list to play and get you out of trouble!</p>`;

const getLangs = async () => {
  try {
    let response = await fetch(
      `./languages.json`
    );
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
};

const makeDOM = (el, data) => {
  let html = ``;
  data.items.map(v => {
    html += `<iframe src="https://www.youtube.com/embed/${v.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
  el.innerHTML = html;
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
      console.log(data);
      makeDOM(main, data);
      heading.innerHTML = `<h1>${person.language} Happy Birthday Songs</h1>`;
    })
    .catch(error => {
      console.log(error);
      let html = ``;
      heading.innerHTML = `<h1>Sorry, Looks like we could not talk to YouTube. <strong>Worry not, we got a video below for you to keep the party going!</strong></h1><p><code>${error}</code>.</p>`;
      main.innerHTML = `<iframe src="https://www.youtube.com/embed/_z-1fTlSDF0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe`;
    });
});

getLangs()
.then(d => {
  d.map(i => {
    let option = document.createElement(`option`)
    option.setAttribute(`value`, i.toLowerCase());
    option.textContent = i;
    language.appendChild(option);
  })
});