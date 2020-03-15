class News {
  countries(url) {
    async function handleGet() {
      try {
        let req = await fetch(url, {
          mode: "cors"
        });
        let text = await req.text();
        return text;
      } catch (error) {
        console.log(error);
      }
    }
    handleGet(url)
      .then(function(data) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, "text/html");
        news.handleCountries(doc);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  breakingNews(code) {
    async function handleGet() {
      try {
        let req = await fetch(
          `https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?country=${code}&apiKey=63f86003bea64ef3bae5fca878aeb719`
        );
        let json = await req.json();
        return json;
      } catch (error) {
        console.log(error);
      }
    }
    handleGet()
      .then(function(data) {
        news.handleBreakingNews(data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleBreakingNews(data) {
    if (!data) return;
    const news = document.getElementById(`news`);
    let html = ``;
    let totalNews = `<p id="total">Total news: ${data.totalResults}</p><div></div>`;
    html += totalNews;
    data.articles.forEach(function(element) {
      html += `<div class="card">
                <a class="card__link" href="${element.url}" target="_blank">
                  <img class="card__thumb" src="${element.urlToImage}" alt="${
        element.title
      }">
                </a>
                <header>${element.title}</header>
                <article><p>Source: ${element.source.name ||
                  "No source available."}</p><p><strong>Date: ${element.publishedAt ||
        "No date available."}</strong></p><p>Tags: ${element.description ||
        "No tags available."}</p></article>
                <footer>${element.content || "No content available."}</footer>
              </div>`;
    });
    news.innerHTML = html;
  }
  handleCountries(doc) {
    let code = [];
    let name = [];
    let arr = [];
    doc.querySelectorAll("kbd").forEach(function(i) {
      code.push({ code: i.textContent.trim() });
    });
    doc.querySelectorAll(".name.f3").forEach(function(i) {
      name.push({ code: i.textContent.trim() });
    });
    code.forEach(function(v, i) {
      let obj = {};
      obj.code = v.code;
      obj.country = name[i].code;
      arr.push(obj);
    });
    news.handleSelect(arr);
  }
  handleSelect(arr) {
    const select = document.getElementById(`outlets`);
    let html = `<option selected disabled>Select your Country</option>`;
    arr.forEach(function(item) {
      html += `<option value="${item.code}">${item.country}</option>`;
    });
    select.innerHTML = html;
    select.addEventListener("change", function(e) {
      news.handleChange(e);
    });
  }
  handleChange(e) {
    news.breakingNews(e.target.value);
  }
}

const news = new News();

news.countries(
  `https://cors-anywhere.herokuapp.com/https://newsapi.org/sources`
);
