const app = document.getElementById("root");
const db = firebase.database();

const sendMessage = newMessage => {
  let newId = db
    .ref()
    .child("rooms")
    .push().key;
  db.ref(`rooms/${newId}`).set(newMessage);
};

const setupMessage = message => {
  if (!message) {
    const messages = document.querySelector(".messages");
    messages.innerHTML = `Looks Empty! Please start a conversation in this room.`;
    return;
  }
  const messages = document.querySelector(".messages");
  let html = ``;
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

const getMessages = () => {
  let roomsRef = db.ref(`/rooms`);
  roomsRef.on("value", data => {
    if (data.val() === null) {
      setupMessage();
      return;
    } else {
      setupMessage(data.val());
    }
  });
};

const handleForm = () => {
  const form = document.createElement("form");
  form.classList.add("form");
  const inputMessage = document.createElement("input");
  inputMessage.classList.add("input");
  inputMessage.setAttribute("placeholder", "Send a Message");
  inputMessage.setAttribute("type", "text");
  form.appendChild(inputMessage);
  const buttonSubmit = document.createElement("button");
  buttonSubmit.classList.add("button");
  buttonSubmit.setAttribute("type", "submit");
  buttonSubmit.textContent = `Send Message`;
  const messages = document.createElement("div");
  messages.classList.add("messages");
  form.appendChild(inputMessage);
  form.appendChild(buttonSubmit);
  app.appendChild(messages);
  app.appendChild(form);
  form.addEventListener("submit", e => {
    e.preventDefault();
    handleSubmit(e, inputMessage);
  });
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

handleForm();
getMessages();
