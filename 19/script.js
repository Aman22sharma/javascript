function Display() {}
function Admin() {}

function Book(name, author, type) {
  this.id = Math.random();
  this.name = name;
  this.author = author;
  this.type = type;
}

Admin.prototype.put = function(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
};

Admin.prototype.get = function(key) {
  return JSON.parse(localStorage.getItem(key));
};

Admin.prototype.validate = function(book) {
  if (book.name.length < 2 || book.author.length < 2 || !book.type) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.add = function(book) {
  function handleDelete() {
    let deleteButtons = document.querySelectorAll("#delete");
    deleteButtons.forEach(function(element) {
      element.addEventListener("click", function(btn) {
        const id = btn.target.parentElement.parentElement.dataset.id;
        const allBooks = admin.get("books");
        allBooks.forEach(function(i, idx, obj) {
          if (i.id === Number(id)) {
            obj.splice(idx, 1);
          }
        });
        admin.put("books", allBooks);
        display.add(admin.get("books"));
        display.cap();
      });
    });
  }
  let html = ``;
  let app = document.getElementById("app");
  book.forEach(function(element) {
    html += `
      <tr data-id=${element.id}>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><button id="delete">Delete</button></td>
      </tr>
    `;
  });
  app.innerHTML = html;
  handleDelete();
};

Display.prototype.cap = function() {
  if (admin.get("books").length >= 5) {
    document.getElementById("cap").classList.add("active");
  } else {
    document.getElementById("cap").classList.remove("active");
  }
};

Display.prototype.clear = function() {
  libraryForm.reset();
};

Display.prototype.show = function(type) {
  alert(type);
};

let admin = new Admin();
let display = new Display();

if (admin.get("books") && admin.get("books").length !== 0) {
  display.add(admin.get("books"));
  display.cap();
}

let libraryForm = document.querySelector("#libraryForm");
libraryForm.addEventListener("submit", function(e) {
  e.preventDefault();
  let bookName = document.getElementById("bookName").value;
  let bookAuthor = document.getElementById("authorName").value;
  let fiction = document.getElementById("fiction");
  let nonfiction = document.getElementById("nonfiction");
  let technology = document.getElementById("technology");
  let bookType;
  fiction.checked && (bookType = fiction.value);
  nonfiction.checked && (bookType = nonfiction.value);
  technology.checked && (bookType = technology.value);
  let cart = admin.get("books") ? admin.get("books") : [];
  let book = new Book(bookName, bookAuthor, bookType);
  if (admin.validate(book)) {
    cart.push(book);
    admin.put("books", cart);
    display.add(admin.get("books"));
    display.clear();
    display.show("Your book has been added successfully.");
    display.cap();
  } else {
    display.show("Sorry, there was a problem. Please check your info again.");
  }
});
