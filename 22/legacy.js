const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const form = document.getElementById("form");
const success = document.getElementById("success");
const failed = document.getElementById("failed");
let validUsername;
let validEmail;
let validPhone;
success.style.display = "none";
failed.style.display = "none";

username.addEventListener("blur", () => {
  let regex = /^[a-zA-Z][0-9a-zA-Z]{1,10}$/;
  let string = username.value;
  regex.test(string)
    ? (username.nextElementSibling.classList.remove("has-error"),
      (validUsername = true))
    : (username.nextElementSibling.classList.add("has-error"),
      (validUsername = false));
});

email.addEventListener("blur", () => {
  let regex = /^([_\-\.a-zA-Z0-9]+)@([_\-\.a-zA-Z0-9]+)\.([a-zA-Z]){2,7}$/;
  let string = email.value;
  regex.test(string)
    ? (email.nextElementSibling.classList.remove("has-error"),
      (validEmail = true))
    : (email.nextElementSibling.classList.add("has-error"),
      (validEmail = false));
});

phone.addEventListener("blur", () => {
  let regex = /^[0-9]{10}$/;
  let string = phone.value;
  regex.test(string)
    ? (phone.nextElementSibling.classList.remove("has-error"),
      (validPhone = true))
    : (phone.nextElementSibling.classList.add("has-error"),
      (validPhone = false));
});

form.addEventListener("submit", e => {
  e.preventDefault();
  validUsername && validEmail && validPhone
    ? ((success.style.display = "block"), (failed.style.display = "none"))
    : ((success.style.display = "none"), (failed.style.display = "block"));
});
