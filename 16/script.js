let app = document.getElementById("app");

async function crawler() {
  try {
    let req = await fetch(`https://www.freecodecamp.org/news/`, {
      mode: "cors"
    });
    let text = await req.text();
    return text;
  } catch (error) {
    console.log(error);
  }
}

crawler()
  .then(function(data) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, "text/html");
    handleData(doc);
  })
  .catch(function(error) {
    console.log(error);
  });

function handleData(doc) {
  let cards = {
    allUserImages: []
  };
  let html = ``;
  Array.from(doc.all).forEach(function(item) {
    item.classList.contains("author-profile-image") &&
      cards.allUserImages.push(item);
  });
  _.forEach(cards, function(value, key) {
    if (key === "allUserImages")
      value.map(function(i) {
        return (html += `<div class="developer"><img src=${
          i.attributes[1].value.includes("gravatar.com")
            ? `https://${i.attributes[1].value}`
            : `https://freecodecamp.org${i.attributes[1].value}`
        }></div>`);
      });
  });
  app.innerHTML = html;
}
