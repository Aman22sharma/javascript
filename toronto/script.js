const app = () => {
  const box = document.querySelector("#data");
  const menuBox = document.querySelector(`.navbar-nav`);
  const getFeed = async (cat, subcat) => {
    const url = !subcat
      ? `https://cors-anywhere.herokuapp.com/https://www.insidetoronto.com/rss/article?category=${cat}`
      : `https://cors-anywhere.herokuapp.com/https://www.insidetoronto.com/rss/article?category=${cat}&subcategory=${subcat}`;
    try {
      let response = await fetch(url);
      let data = await response.text();
      return data;
    } catch (err) {
      return Promise.reject(new Error(err));
    }
  };
  const getMenu = async () => {
    try {
      let response = await fetch(`./menu.json`);
      let data = await response.json();
      return data;
    } catch (err) {
      return Promise.reject(new Error(err));
    }
  };
  const handleFeed = (cat, subcat) => {
    box.innerHTML = ``;
    getFeed(cat, subcat)
      .then(data => new window.DOMParser().parseFromString(data, "text/xml"))
      .then(data => {
        const items = data.querySelectorAll("item");
        const arr = Array.from(items);
        let html = ``;
        if (arr === undefined || arr.length === 0) {
          html = `No posts found in this section.`;
          box.insertAdjacentHTML("beforeend", html);
          return;
        }
        items.forEach(el => {
          const feed = [...el.children];
          const obj = {};
          feed.forEach(i => (obj[i.localName] = i.textContent));
          let descObj =
            obj.description.match(/<\s*p[^>]*>(.*?)<\s*\/\s*p>/g) ||
            "No description found.";
          let desc = descObj[0].replace(/<\/?[^>]+(>|$)/g, "");
          const thumb = obj.description.match(/<img.*?src="(.*?)"[^\>]+>/g) || [
            '<img src="https://placekitten.com/400/400" alt="No image for this news" />'
          ];
          // SPEECH SYNTHESIS NOt SUPPORTED
          // let voices = [];
          // let synth = window.speechSynthesis;
          // let message = new SpeechSynthesisUtterance();
          // message.text = `${obj.title}`;
          // const addVoices = () => {
          //   voices = synth.getVoices();
          //   message.voice = voices.find(v => v.name === "Karen");
          //   toggle();
          // };
          // const toggle = () => {
          //   synth.speak(message);
          // };
          // synth.addEventListener("voiceschanged", addVoices);
          html += `
          <div class="card mb-3 overflow-hidden">
          <div class="text-center bg-dark">${thumb[0]}</div>
            <div class="card-body">
              <h5 class="card-title">${obj.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">By ${obj.creator ||
            "Santa Claus"} on ${obj.pubDate}</h6>
              <p class="card-text">${desc}</p>
              <div><a href="${
            obj.link
            }" class="btn btn-primary stretched-link" target="_blank">Read</a></div>
            </div>
          </div>`;
        });
        box.insertAdjacentHTML("beforeend", html);
      })
      .catch(error => console.log(error));
  };
  const handleMenu = () => {
    getMenu().then(data => {
      if (data === undefined || data.length === 0) {
        return;
      }
      data
        .sort((a, b) => (a.key > b.key ? 1 : -1))
        .map(i => {
          if (i.children) {
            let mainLi = document.createElement("li");
            let mainDi = document.createElement("li");
            let mainDA = document.createElement("a");
            let mainDM = document.createElement("div");
            let mainDMI = document.createElement("a");
            mainDi.classList.add("nav-item", "dropdown");
            mainDA.classList.add(
              "nav-link",
              "text-capitalize",
              "dropdown-toggle"
            );
            mainDA.setAttribute("href", "#");
            mainDA.setAttribute("data-toggle", "dropdown");
            mainDA.setAttribute("aria-haspopup", "true");
            mainDA.setAttribute("aria-expanded", "false");
            mainDA.textContent = i.title;
            mainDM.classList.add("dropdown-menu");
            mainDM.setAttribute("aria-labelledby", i.key);
            mainLi.appendChild(mainDi);
            mainDi.appendChild(mainDA);
            mainDi.appendChild(mainDM);
            menuBox.appendChild(mainLi);
            mainDMI.classList.add("dropdown-item", "text-capitalize");
            mainDMI.setAttribute("href", "#");
            mainDMI.setAttribute("data-key", i.key);
            mainDMI.textContent = i.title;
            mainDM.appendChild(mainDMI);
            i.children.map((j, index) => {
              let mainDMI = document.createElement("a");
              let mainDD = document.createElement("div");
              mainDD.classList.add("dropdown-divider");
              mainDMI.classList.add("dropdown-item", "text-capitalize");
              mainDMI.setAttribute("href", "#");
              mainDMI.setAttribute("data-key", i.key);
              mainDMI.setAttribute("data-subkey", j.key);
              mainDMI.textContent = j.title;
              mainDMI.addEventListener("click", e => handleSubmit(e));
              if (index === 0) {
                mainDM.appendChild(mainDD);
                mainDM.appendChild(mainDMI);
              } else {
                mainDM.appendChild(mainDMI);
              }
            });
            mainDMI.addEventListener("click", e => handleSubmit(e));
          } else {
            let mainLi = document.createElement("li");
            let mainA = document.createElement("a");
            mainLi.classList.add("nav-item");
            mainA.classList.add("nav-link", "text-capitalize");
            mainA.setAttribute("data-key", i.key);
            mainA.setAttribute("href", "#");
            mainA.textContent = i.title;
            mainLi.appendChild(mainA);
            menuBox.appendChild(mainLi);
            mainA.addEventListener("click", e => handleSubmit(e));
          }
        });
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    box.innerHTML = ``;
    if (e.currentTarget.dataset.subkey) {
      handleFeed(e.currentTarget.dataset.key, e.currentTarget.dataset.subkey);
    } else {
      handleFeed(e.currentTarget.dataset.key);
    }
  };
  window.onload = () => {
    handleMenu();
    box.innerHTML = `<p>Get all the latest happenings from your city!</p><p>&copy; Built with Vanilla JavaScript and RSS Feed from Toronto.com!</p>`;
    handleFeed("news");
  };
};

app();
