const app = document.getElementById("app");
const search = document.getElementById("search");
const total = document.getElementById("total");
const totalCount = document.getElementById("totalCount");

async function getData() {
  try {
    const req = await fetch("./data.json");
    const json = await req.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

// LSI = Local Storage Item
function getLSI(item) {
  return JSON.parse(localStorage.getItem(item));
}
function setLSI(key, item) {
  return localStorage.setItem(key, JSON.stringify(item));
}

function handleDelete(e, index) {
  e.preventDefault();
  const bucket = getLSI("item") ? getLSI("item") : [];
  bucket.length === 0 && false;
  bucket.splice(index, 1);
  setLSI("item", bucket);
  showData();
}

function showData() {
  let html = ``, bill = 0;
  const bucket = getLSI("item") ? getLSI("item") : [];
  bucket && bucket.length !== 0
    ? (app.classList.add(`d-block`), blankCart.classList.add(`d-none`), total.classList.add(`d-block`))
    : (app.classList.remove(`d-none`), blankCart.classList.remove(`d-none`), total.classList.add(`d-none`), total.classList.remove(`d-block`));
  bucket.forEach(function(element) {
    let price = Number(element.price.substr(1, element.price.length - 1));
    bill += price;
    html += `
      <div class="col col-12 col-sm-6 col-md-4">
        <div class="card overflow-hidden mb-3">
          <div class="d-flex justify-content-center bg-dark">
            <img class="img-fluid" src=${element.image} class="card-img-top" alt="Image of an item" />
          </div>
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">
              ${element.price}
            </p>
            <a href="#" class="btn btn-danger" id="remove" data-id=${element.id}>- Remove</a>
          </div>
        </div>
      </div>`;
  });
  totalCount.textContent = `$${bill.toFixed(2)}`;
  app.querySelector(".row").innerHTML = html;
  const remove = document.querySelectorAll("#remove");
  remove.forEach(function(element, index) {
    element.addEventListener("click", function(e) {
      handleDelete(e, index);
    });
  });
}

function handleData(data) {
  document.forms[0].addEventListener("submit", function(e) {
    e.preventDefault();
    const barCode = e.target[0].value;
    if (isNaN(barCode.trim()) || barCode.trim() === "") {
      alert("Please enter item's bar code or ask nearby cashier for help.");
      return;
    }
    const matchingItems = getLSI("item") ? getLSI("item") : [];
    Array.from(data).forEach(function(currentItem) {
      if (parseInt(currentItem.id) === parseInt(barCode)) {
        matchingItems.push(currentItem);
      }
    });
    setLSI("item", matchingItems);
    showData();
    e.target.reset();
  });
}

search.addEventListener("input", function(e) {
  e.preventDefault();
  const searchNotFound = document.getElementById("searchNotFound");
  const cards = document.querySelectorAll("#app .card");
  cards.length === 0 && false;
  cards.forEach(currentItem => {
    if (
      currentItem
        .querySelector(".card-title")
        .textContent.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    ) {
      currentItem.parentElement.style.display = `block`;
      searchNotFound.classList.add(`d-none`);
    } else {
      currentItem.parentElement.style.display = `none`;
      searchNotFound.classList.remove(`d-none`);
    }
  });
});

getData()
  .then(function(data) {
    handleData(data);
  })
  .catch(function(err) {
    console.log(err);
  });

showData();
