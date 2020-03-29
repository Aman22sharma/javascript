let lastItem;
let firstItem;
let usersData;
let previousData;
const users = document.getElementById("users");
const nav = document.getElementById("nav");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const reset = document.getElementById("reset");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

const APIRequest = async url => {
  const req = await fetch(url);
  return req.json();
};
const setItem = (key, value) =>
  localStorage.setItem(`${key}`, JSON.stringify(value));
const getItem = key => JSON.parse(getItemString(key));
const removeItem = key => localStorage.removeItem(key);
const getItemString = key => localStorage.getItem(`${key}`);

const toggleButton = () => {
  if (Number(getItem("firstItem")) === 0) {
    prev.disabled = "true";
    prev.classList.add("disabled");
    prev.style.pointerEvents = `none`;
  } else {
    prev.disabled = "false";
    prev.classList.remove("disabled");
    prev.style.pointerEvents = `auto`;
  }
};

const makeDOM = list => {
  let content = document.createElement("div");
  let table = document.createElement("table");
  table.classList.add("table");
  list.forEach(u => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<tr><td>Account ID: ${u.id}</td><td><p class="name">${u.login}</p><img src="${u.avatar_url}" alt="Thumbnail of ${u.login} account"></td><td><a href="${u.html_url}" target="_blank" class="btn">View Profile</a></td></tr>`;
    table.appendChild(tr);
  });
  content.appendChild(table);
  users.innerHTML = content.innerHTML;
};

const hasError = list => {
  if (Object.entries(list).length === 0 && list.constructor === Object) {
    users.innerHTML = `<h4>Sorry, there was a data failure.</h4>`;
    nav.style.display = "none";
    return;
  }
};

const createUser = list => {
  hasError(list);
  makeDOM(list);
  toggleButton();
};

const initialSet = (
  initialFirstItem,
  initialLastItem,
  target,
  decrementIndex
) => {
  if (target !== "next" && target !== "prev" && Boolean(getItem("usersData"))) {
    createUser(getItem("usersData"));
    return;
  }
  let url =
    target === "next"
      ? `https://api.github.com/users?since=${initialLastItem}`
      : target === "prev"
      ? `https://api.github.com/users?since=${decrementIndex}`
      : // : false;// ? `https://cors-anywhere.herokuapp.com/https://api.github.com/users?since=${initialLastItem}`
        `https://api.github.com/users?since=${initialLastItem}`;
  APIRequest(url)
    .then(data => {
      if (target !== "next" && target !== "prev") {
        firstItem = initialFirstItem;
        lastItem = Number(data[data.length - 1].id);
      } else {
        if (target === "prev") {
          firstItem = decrementIndex;
        }
        if (target === "next") {
          firstItem = Number(data[0].id);
        }
        lastItem = Number(data[data.length - 1].id);
      }
      setItem("lastItem", lastItem);
      setItem("firstItem", firstItem);
      setItem("usersData", data);
      createUser(getItem("usersData"));
      nav.style.display = "block";
    })
    .catch(err => {
      console.log(err);
      createUser({});
      nav.style.display = "none";
    });
};

next.addEventListener("click", e => {
  e.preventDefault();
  let increment = getItem("count") ? getItem("count") : [];
  increment.push(getItem("firstItem"));
  setItem("count", increment);
  initialSet(
    Number(getItem("firstItem")),
    Number(getItem("lastItem")),
    e.target.id
  );
});

prev.addEventListener("click", e => {
  e.preventDefault();
  let decrement = getItem("count") ? getItem("count") : false;
  let decrementValue = Number(decrement.pop());
  decrement = decrement.length === 0 ? 0 : decrement;
  decrementValue = decrementValue === 0 ? 0 : decrementValue;
  setItem("count", decrement);
  initialSet(
    Number(getItem("firstItem")),
    Number(getItem("lastItem")),
    e.target.id,
    decrementValue
  );
});

reset.addEventListener("click", e => {
  e.preventDefault();
  localStorage.removeItem('count');
  localStorage.removeItem('firstItem');
  localStorage.removeItem('lastItem');
  localStorage.removeItem('usersData');
  location.reload();
  return false;
});

window.addEventListener("DOMContentLoaded", e => {
  e.preventDefault();
  initialSet(0, 0, e.target.id);
});
