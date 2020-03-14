const app = document.querySelector("#app");
const container = document.querySelector(".container");
let loading = `Save your idea! Poke me!`;

function setLSI(key, element) {
  return localStorage.setItem(key, JSON.stringify(element));
}

function getLSI(element) {
  return JSON.parse(localStorage.getItem(element));
}

function cleanLSI(element) {
  return localStorage.removeItem(element);
}

function handleClick() {
  let label = `Save your idea!`;
  let input = `<input type="text" placeholder="${label}" id="input" value="${
    getLSI("notes") ? getLSI("notes") : label
  }">`;
  container.innerHTML = input;
  container.querySelector("input").addEventListener("blur", function(element) {
    if (element.target.value.trim() === "") {
      cleanLSI("notes");
      alert(`Please type what you are thinking!`);
      return;
    }
    setLSI("notes", element.target.value);
    container.innerHTML = `${getLSI("notes")}`;
  });
}

container.addEventListener("click", function(e) {
  e.preventDefault();
  if (e.target.type !== "text") {
    handleClick();
  }
});

container.innerHTML = getLSI("notes") ? getLSI("notes") : loading;
