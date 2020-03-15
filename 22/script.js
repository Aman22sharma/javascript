const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const form = document.getElementById("form");
const success = document.getElementById("success");
const failed = document.getElementById("failed");
success.style.display = "none";
failed.style.display = "none";

class Field {
  constructor(inputElement, expression) {
    this.inputElement = inputElement;
    this.isValid = false;
    this.expression = expression;
  }
  blurField() {
    this.inputElement.addEventListener("blur", () => {
      let regex = this.expression;
      let string = this.inputElement.value;
      regex.test(string)
        ? (this.inputElement.nextElementSibling.classList.remove("has-error"),
          (this.isValid = true))
        : (this.inputElement.nextElementSibling.classList.add("has-error"),
          (this.isValid = false));
    });
  }
}

class Form {
  constructor(formElement) {
    this.formElement = formElement;
  }
  send() {
    this.formElement.addEventListener("submit", e => {
      e.preventDefault();
      usernameField.isValid && phoneField.isValid && emailField.isValid
        ? ((success.style.display = "block"), (failed.style.display = "none"))
        : ((success.style.display = "none"), (failed.style.display = "block"));
    });
  }
}

const usernameField = new Field(username, /^[a-zA-Z][0-9a-zA-Z]{1,10}$/);
const phoneField = new Field(phone, /^[0-9]{10}$/);
const emailField = new Field(
  email,
  /^([_\-\.a-zA-Z0-9]+)@([_\-\.a-zA-Z0-9]+)\.([a-zA-Z]){2,7}$/
);
const myForm = new Form(form);
usernameField.blurField();
phoneField.blurField();
emailField.blurField();
myForm.send();
