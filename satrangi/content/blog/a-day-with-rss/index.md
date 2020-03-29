---
title: A Day with RSS
date: 2020-02-27 12:30
description: A Day with RSS explains how I built a simple application using vanilla JavaScript based on a RSS feed.
---

## If you have been coding with vanilla JavaScript for a while, I'm certain that you came across idea of Fetch API, JSON consumption and built small applications on top of it. Try "RSS feed" as a milestone for your next JavaScript challenge and learn to build a simple application leveraging this awesome resource at your disposal

Earlier this morning, I received a newsletter from [Quincy](https://www.freecodecamp.org/news/author/quincylarson/) and was excited to read the story about [Zhia Chong](https://www.freecodecamp.org/news/why-your-resume-is-being-rejected/) where he mentioned about a [web crawler](https://www.freecodecamp.org/news/how-i-built-a-web-crawler-to-automate-my-job-search-f825fb5af718/) he built based on RSS feeds. That was my inspiration right there, I wanted to experiment with it using my basic knowledge in JavaScript.

I immediately googled if there are websites that offer RSS feeds in Toronto. Luckily, I was amazed that [Inside Toronto](https://toronto.com) offers this service for developers.

### Source

- [Demo](https://sleepy-agnesi-6db678.netlify.com/)
- [Source code](https://github.com/tpkahlon/javascript-projects/tree/master/toronto)

### Preparation

Before we kickstart this simple project, we will keep few things in mind.

- We are going to leverage vanilla JavaScript for this entire project. Let us try our best to polish our skills on `ES6` concepts. This application is best way to practice them.
- We will try to make sense of `try`, `catch`, `fetch`, `async`, `await`, `Promise` concepts along the way. If you have not mastered them yet or still feel less confident about them, do not worry. We will tackle them as best as we can.
- See [RSS feed](https://www.toronto.com/news-static/7345759-inside-toronto-rss/) for our project and visualize a tree structure in your mind. We will need to create a JSON file off from this page which is going to generate our application's menu. We will not hard-code them in our HTML file. Let's see how far we can go with making our simple application dynamic in nature from vanilla JavaScript standpoint.
- As you inspect [RSS feed](https://www.toronto.com/news-static/7345759-inside-toronto-rss/), you will notice that their content, especially article descriptions have `<img>` and `<p>` tag stringified together. It is best time for us to try some regular expression exercise as well.
- We will spend quite some time on DOM manipulation. Frameworks like `React`, `Vue` gives an extra edge to avoid dealing with DOM directly and save time on large scale development. For our simple application, dealing with DOM directly will allow us to solidify our learning on DOM manipulation concepts.
- We will use [CORS Anywhere](https://cors-anywhere.herokuapp.com/) script since we need to make calls using `Fetch` API. It will take care of any cross-origin issues.
- Lastly, we will use `Bootstrap` for layout and styles.

### Developing a JSON file

You can view my [JSON](https://github.com/tpkahlon/javascript-projects/blob/master/toronto/menu.json) for the application here. Let us discuss the structure and idea behind this.

There is one parent array that holds multiple objects that we can loop through. Each `Object` has a `title`, `key` and `children` key. `title` key holds the title of the menu, `key` holds the keyword for the `API` call for `category` parameter and `children` holds subcategories. Each `children` key has a value of an `Array` that holds multiple `Objects`. Each `Object` in `children` array has `title` and `key` where `title` is used to contain string for the article and `key` is used to contain value for the `API` call for `subcategory` parameter.

### Prototype

In our simple application, we ar going to have a menu that list categories as main menu items and subcategories as dropdown menu items in `Navbar`. We will keep a static main menu link to `Home` page with `href` attribute of `/`. Clicking on any main menu link will trigger a call to fetch RSS feed based on categories parameter only. If we clicked on any dropdown item, we will make another version of fetch call to RSS feed that will have both category and subcategory parameters passed along.

Each menu item has a `data-key` and `data-subkey` properties attached to it. They will hold the value of category and subcategory for the item that is needed for `API` calls.

Our final output is going to be generated in `#data` element in `HTML` via `JS`.

- For `HTML` file, we will use standard layout. Add `jQuery.js`, `popper.js`, `Bootstrap.js` only for inbuilt `Navbar`'s collapse functionality for mobile devices.
- We are not going to write any application specific `CSS` in this project.

### Vanilla JavaScript

#### Initialization

We initialize our application by containing our code in `app` function and calling it later.

```js
const app = () => {
  // ...project work...
}

app();
```

### Displaying a Static message

Our first task is to display a random message in our `app` component in `HTML`.

We will select the `#data` div from the `HTML` using its `id` attribute via `querySelector` method.

We will use `window.onload` event handler to inject a message via `innerHTML` method.

```js
const box = document.querySelector("#data");

window.onload = () => {
  box.innerHTML = `<p>Some message...</p>`;
};
```

See reference links: [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector), [window.onload](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload), [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML).

### Load the Menu data

Time for us to see how our menu data looks in our application. We can use `fetch` concepts to make a call to our local file and see it in our `console`.

Following is the sample to make the necessary Fetch call to get the JSON. We declare it in a separate function value for clarity.

```js
const getMenu = async () => {
  try {
    let response = await fetch(`./menu.json`);
    let data = await response.json();
    return data;
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};
```

Now, we will make another function value `handleMenu` to handle the called JSON file. Inside that, we will make a call to `getMenu` and then outputs the result to `console`.

```js
const handleMenu = () => {
  getMenu().then(data => console.log(data));
};
```

Once declared, we can trigger `handleMenu` when our `window` loads.

```js
window.onload = () => {
  handleMenu();
};
```

#### Repeat the Magic

We are essentially going to repeat the same process we discussed above.

- We will make a similar `getCat` function value that will trigger fetch call based on the arguments we pass it. This call will bring us the `RSS feed` from the desired site.
- We will handle this response in another function value `handleData`. Here, we are going to read and understand how [Chris Coyier](https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/) parsed the RSS feed into a `NodeList`. Once parsed, we will take out the necessary pieces from each news article and add it into equivalent `HTML` nodes.
- Same approach will follow for creating menu items when we make successful call to `RSS` feed.

#### Get RSS data and Build a Card

We will create a `getCat` function value that is responsible for making a call to get `RSS` feed data. Interesting thing to note is that we call `blob.text()` on the received response instead of `blob.json()`.

```js
const getCat = async () => {
  try {
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.insidetoronto.com/rss/article?category=news`);
    let data = await response.text();
    return data;
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};
```

Time to create a function value `handleData` to manage the handling of `getCat`.

```js
const handleData = () => {
  box.innerHTML = ``;
  getCat()
    .then(data => new window.DOMParser().parseFromString(data, "text/xml"))
    .then(data => {
      const items = data.querySelectorAll("item");
      let html = ``;
      items.forEach(el => {
        const test = [...el.children];
        const obj = {};
        test.forEach(i => (obj[i.localName] = i.textContent));
        let descObj =
          obj.description.match(/<\s*p[^>]*>(.*?)<\s*\/\s*p>/g) ||
          "No description found.";
        let desc = descObj[0].replace(/<\/?[^>]+(>|$)/g, "");
        const thumb = obj.description.match(/<img.*?src="(.*?)"[^\>]+>/g) || [
          '<img src="https://placekitten.com/400/400" alt="No image for this news" />'
        ];
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
          }" class="stretched-link btn btn-primary" target="_blank">Read</a></div>
          </div>
        </div>`;
      });
      box.insertAdjacentHTML("beforeend", html);
    })
    .catch(error => console.log(error));
};
```

This code looks complicated so let us view it one step at a time.

- In the first line, we empty the `#data` component in `HTML` in order to remove unwanted text.
- Further lines, we use Chris Coyier's approach to parse the RSS feed and developer `NodeList` out of it.
- We traverse through `NodeList` and take out necessary components for our article design.
- Some articles have `<img>` and `<p>` tags squished together. We use regular expression tricks to get their values out and display them in necessary locations.
- For layout, we use `Bootstrap Card` component for each RSS feed item.
- For some cases that do not have an image, we show a random picture by short circuit method.
- We will use `[...]` spread operator to convert `NodeList` into an `Array` and `forEach` to traverse through each object.
- At the last, we append the `html` variable to the `#data` component.

#### Get Menu data and Build a Menu

Following the similar approach, we handle the logic inside `handleMenu` function value.

```js
getMenu()
.then(data => {
  if (data === undefined || data.length === 0) {
    return;
  }
  let parentItem;
  let dropdownItem;
  data
    .sort((a, b) => (a.key > b.key ? 1 : -1))
    .map(i => {
      // DD
      if (i.children) {
        // Build DOM nodes...
        mainDA.textContent = i.title;
        mainDM.setAttribute("aria-labelledby", i.key);
        mainDMI.setAttribute("data-key", i.key);
        mainDMI.textContent = i.title;
        // Append DOM nodes
        i.children.map((j, index) => {
          // Build DOM nodes...
          mainDMI.setAttribute("data-key", i.key);
          mainDMI.setAttribute("data-subkey", j.key);
          mainDMI.textContent = j.title;
          mainDMI.addEventListener("click", e => handleSubmit(e));
          if (index === 0) {
            // For Dropdown separator
          } else {
            // ...
          }
        });
        mainDMI.addEventListener("click", e => handleSubmit(e));
      } else {
        // ...
        mainA.setAttribute("data-key", i.key);
        mainA.textContent = i.title;
        // ...
        mainA.addEventListener("click", e => handleSubmit(e));
      }
    });
  });
```

- In first line, we check whether menu data received is empty or not.
- We proceed to sort the data and generate necessary DOM elements. We use a different approach this time to build Node elements. Feel free to use whichever approach you prefer.
- You can follow along with `Navbar` component on `Bootstrap` site to see how the actual markup looks like.
- After sorting, we proceed with mapping through menu items. If main menu item has children, we create `DOM` for each `dropdown` using another `map` function. For each first item of dropdown, we add a dropdown `separator`. Make sure to add `data-key` and `data-subkey` attributes which will be used on each menu item click.
- Lastly, Add an event handler to each created `NodeList` item. When appended, they will work as expected.

#### Close to Finish Line

We are going to trace each `data-key` and `data-subkey` on a menu item click. We will declare a function value `handleSubmit` for it.

```js
const handleSubmit = e => {
    e.preventDefault();
    box.innerHTML = ``;
    if (e.currentTarget.dataset.subkey) {
      handleData(e.currentTarget.dataset.key, e.currentTarget.dataset.subkey);
    } else {
      handleData(e.currentTarget.dataset.key);
    }
  };
  window.onload = () => {
    handleMenu(); // Loads menu
    handleData("news"); // Loads random category on page load
  };
};
```

- On each click, we will first empty the `#data` component in HTML.
- We will pass two parameters to `handleData` and further up the chain if a menu item has `dataset` of `subkey`. Otherwise, we pass single parameter of `key`.
- Lastly, on page load, we will call `handleMenu()` and `handleData("random category...") to load random data on initial page load.

I hope it clears up the code available in the repository. Feel free to tweak it and try to understand how things are interconnected. Congratulations as well on making it this far. You are all set to make more lightweight applications focused on RSS feeds. Good luck on your journey to learn coding...