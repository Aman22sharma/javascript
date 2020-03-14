const app = document.getElementById("app");
const blankCart = document.getElementById("blankCart");
const search = document.querySelector("#search");

async function getData() {
  try {
    const req = await fetch("./data.json");
    const json = await req.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

function handleDelete(e, index) {
  e.preventDefault();
  const bucket = localStorage.getItem("item")
    ? JSON.parse(localStorage.getItem("item"))
    : [];
  bucket.length === 0 && false;
  bucket.splice(index, 1);
  localStorage.setItem("item", JSON.stringify(bucket));
  showData();
}

function showData() {
  const bucket = localStorage.getItem("item")
    ? JSON.parse(localStorage.getItem("item"))
    : [];
  bucket && bucket.length !== 0
    ? (app.classList.add(`d-block`), blankCart.classList.add(`d-none`))
    : (app.classList.remove(`d-none`), blankCart.classList.remove(`d-none`));
  let html = ``;
  bucket.forEach(function(ele) {
    html += `
      <div class="col col-12 col-sm-6 col-md-4">
        <div class="card overflow-hidden mb-3">
          <div class="d-flex justify-content-center bg-dark">
            <img class="img-fluid" src=${ele.image} class="card-img-top" alt="Image of an item" />
          </div>
          <div class="card-body">
            <h5 class="card-title">${ele.name}</h5>
            <p class="card-text">
              ${ele.price}
            </p>
            <a href="#" class="btn btn-danger" id="remove" data-id=${ele.id}>- Remove</a>
          </div>
        </div>
      </div>`;
  });
  document.getElementById("app").querySelector(".row").innerHTML = html;
  document.querySelectorAll("#remove").forEach(function(ele, index) {
    ele.addEventListener("click", function(e) {
      handleDelete(e, index);
    });
  });
}

function handleData(data) {
  const cart = localStorage.getItem("item")
    ? JSON.parse(localStorage.getItem("item"))
    : [];
  document.forms[0].addEventListener("submit", function(e) {
    e.preventDefault();
    const barCode = e.target[0].value;
    if (isNaN(barCode.trim()) || barCode.trim() === "") {
      return;
    }
    const purchasedItem = data.forEach(function(currentItem) {
      currentItem.id === parseInt(barCode) ? cart.push(currentItem) : false;
    });
    localStorage.setItem("item", JSON.stringify(cart));
    showData();
    e.target.reset();
  });
}

getData()
  .then(function(data) {
    handleData(data);
  })
  .catch(function(err) {
    console.log(err);
  });

showData();

search.addEventListener("change", function(e) {
  e.preventDefault();
  const bucket = document.querySelectorAll(`#app .card`);
  bucket.length === 0 && false;
  bucket.forEach(currentItem => {
    if (
      currentItem
        .querySelector(".card-title")
        .textContent.toLowerCase()
        .includes(e.target.value.trim().toLowerCase())
    ) {
      currentItem.parentElement.style.display = `block`;
      blankCart.classList.add(`d-none`);
      blankCart.classList.remove(`d-block`);
    } else {
      currentItem.parentElement.style.display = `none`;
      blankCart.classList.remove(`d-none`);
      blankCart.classList.add(`d-block`);
    }
  });
});
