const app = document.getElementById(`app`);

const database = firebase.database();
const rootRef = database.ref("/messages");

document.forms[0].addEventListener("submit", e => {
  e.preventDefault();
  const inputValue = e.target[0].value;
  if (!inputValue || inputValue.trim() === "") {
    alert(`Please enter a message to send!`);
    return;
  }
  const autoId = rootRef.push().key;
  rootRef
    .child(autoId)
    .set({
      message: inputValue
      // likes: 0
    })
    .then(() => {
      alert(`Message added!`);
      document.forms[0].reset();
    })
    .catch(error => console.log(error));
});

const handleData = data => {
  data.forEach(i => {
    console.log(i);
    let card = document.createElement("div");
    let like = document.createElement("button");
    let para = document.createElement("p");
    para.textContent = `${i.val()}`;
    // para.textContent = `${i.val()}, Likes: ${likes}`;
    like.textContent = "Like";
    card.appendChild(para);
    card.appendChild(like);
    app.appendChild(card);
  });
};

const handleLike = () => {

}

rootRef.on("child_added", handleData);
