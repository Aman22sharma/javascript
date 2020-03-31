const app = document.getElementById("root");
const db = firebase.database();

// VIEW

const handleMessageView = message => {
  let html = ``;
  const messages = document.querySelector(".messages");
  if (!message) {
    messages.innerHTML = `Looks Empty! Please start a conversation in this room.`;
    return;
  }
  for (let item in message) {
    const key = item;
    const value = message[item];
    html += `
      <div key=${key} class="message">
        <div class="message__content">${value.message}</div>
        <div class="message__date">${moment(value.createdAt).format(
          "LLLL"
        )}</div>
      </div>
    `;
  }
  messages.innerHTML = html;
};

const handleAppView = () => {
  let roomsRef = db.ref(`/rooms`);
  roomsRef.on("value", data => {
    if (data.val() === null) {
      handleMessageView();
      return;
    } else {
      handleMessageView(data.val());
    }
  });
};

const handleButtonsEvents = () => {
  const loginButton = document.getElementById("button-login");
  const subscribeButton = document.getElementById("button-subscribe");
  const resetButton = document.getElementById("button-reset");
  loginButton.addEventListener("click", () => {
    vex.dialog.open({
      message:
        "Welcome to AntiChat! Please enter your Email address you registered with us and given password for that account.",
      input: [
        '<input name="loginEmail" type="email" placeholder="Enter Email Address" required />',
        '<input name="loginPassword" type="password" placeholder="Enter Password" required />'
      ].join(""),
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: "Login" }),
        $.extend({}, vex.dialog.buttons.NO, { text: "Cancel" })
      ],
      callback: data => {
        if (!data) {
          console.log("Cancelled");
        } else {
          console.log(
            "Username",
            data.loginEmail,
            "Password",
            data.loginPassword
          );
        }
      }
    });
  });
  subscribeButton.addEventListener("click", () => {
    vex.dialog.open({
      message:
        "Would you like to join AntiChat community? We will help you with signing up at AntiChat.Please enter your desired Email address and  choose password of choice for that account.",
      input: [
        '<input name="subscribeEmail" type="email" placeholder="Enter Email Address" required />',
        '<input name="subscribePassword" type="password" placeholder="Create Password" required />'
      ].join(""),
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: "Subscribe" }),
        $.extend({}, vex.dialog.buttons.NO, { text: "Cancel" })
      ],
      callback: data => {
        if (!data) {
          console.log("Cancelled");
        } else {
          console.log(
            "Username",
            data.subscribeEmail,
            "Password",
            data.subscribePassword
          );
        }
      }
    });
  });
  resetButton.addEventListener("click", () => {
    vex.dialog.open({
      message:
        "Did you forget your account password? We will help you with that at AntiChat. Please enter your registered Email address and check your inbox to proceed.",
      input: [
        '<input name="resetEmail" type="email" placeholder="Enter Email Address" required />',
      ].join(""),
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: "Reset Password" }),
        $.extend({}, vex.dialog.buttons.NO, { text: "Cancel" })
      ],
      callback: data => {
        if (!data) {
          console.log("Cancelled");
        } else {
          console.log(
            "Username",
            data.resetEmail
          );
        }
      }
    });
  });
};

const handleButtonsView = () => {
  handleButtonsEvents();
};

const handleFormView = () => {
  let html = `
    <div class="messages"></div>
    <form id="form" class="form">
      <input type="text" placeholder="Send a Message" id="form__input">
      <button type="submit" id="form__button">Send Message</button>
    </form>
  `;
  app.innerHTML = html;
  document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();
    handleSubmit(e);
  });
};

// CONTROLLER

const sendMessage = newMessage => {
  let newId = db
    .ref()
    .child("rooms")
    .push().key;
  db.ref(`rooms/${newId}`).set(newMessage);
};

const handleSubmit = e => {
  const message = e.target[0].value;
  if (!message || message.trim() === "") {
    alert("Please type a message!");
    return;
  }
  document.querySelector("form").reset();
  const newMessage = {
    message,
    createdAt: new Date().toUTCString()
  };
  sendMessage(newMessage);
};

// INIT

handleButtonsView();
handleFormView();
handleAppView();
