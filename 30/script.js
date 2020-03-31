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

const handleButtons = () => {
  const header = document.querySelector("header");
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  let html = `
    <button type="button" id="button-modal">Test</button>
  `;
  buttons.innerHTML = html;
  header.appendChild(buttons);
};

const handleButtonsEvents = () => {
  const buttonModal = document.querySelector("header");
  buttonModal.addEventListener("click", e => {});
};

const handleButtonsView = () => {
  handleButtons();
  handleButtonsEvents();
}

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
