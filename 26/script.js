const app = document.getElementById(`app`);

const database = firebase.database();
const rootRef = database.ref("/messages");

document.forms[0].addEventListener("submit", e => {
  e.preventDefault();
  const inputValue = e.target[0].value;
  if (!inputValue || inputValue.trim() === "") return;
  const autoId = rootRef.push().key;
  rootRef
    .child(autoId)
    .set({
      message: inputValue
    })
    .then(() => {
      alert(`Message added!`);
      document.forms[0].reset();
    })
    .catch(error => console.log(error));
});

const handleData = data => {
  let para = document.createElement("p");
  data.forEach(i => {
    para.textContent = i.val();
    app.appendChild(para);
  });
};

rootRef.on("child_added", handleData);
