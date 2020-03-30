const app = document.getElementById(`app`);

const database = firebase.database();
const rootRef = database.ref("/messages");

const makeCall = async url => {
  try {
    const req = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const status = req.status;
    return status;
  } catch (err) {
    console.log(err);
  }
};

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const inputValue = e.target[0].value;
  makeCall(inputValue)
    .then(status => {
      if (!inputValue && inputValue.trim() === "") {
        let el = document.querySelector(".modal");
        el.querySelector("h4").textContent = `Error!`;
        el.querySelector(
          "p"
        ).textContent = `Please verify all information before proceeding!`;
        let instance = M.Modal.init(el);
        instance.open();
        return;
      }
      if (status === 200) {
        const autoId = rootRef.push().key;
        rootRef
          .child(autoId)
          .set({
            message: inputValue
          })
          .then(() => {
            let el = document.querySelector(".modal");
            el.querySelector("h4").textContent = `Thank You!`;
            el.querySelector(
              "p"
            ).textContent = `Your link has been successfully added!`;
            let instance = M.Modal.init(el);
            instance.open();
            document.getElementById("form").reset();
          })
          .catch(error => console.log(error));
      }
      if (status !== 200) {
        let el = document.querySelector(".modal");
        el.querySelector("h4").textContent = `Error!`;
        el.querySelector(
          "p"
        ).textContent = `Please verify all information before proceeding!`;
        let instance = M.Modal.init(el);
        instance.open();
        return;
      }
    })
    .catch(err => {
      console.log(err);
    });
});

const handleData = data => {
  data.forEach(i => {
    let link = document.createElement("a");
    link.classList.add("collection-item");
    link.textContent = `${i.val()}`;
    link.setAttribute("href", `${i.val()}`);
    link.setAttribute("target", `_blank`);
    app.appendChild(link);
  });
};

rootRef.on("value", snapshot => {
  if (snapshot.val() == null) {
    app.innerHTML = `<a href='#' class='collection-item none'>No links available yet.</a>`;
  } else {
    document.querySelector(".none").style.display = `none`;
  }
});

rootRef.on("child_added", handleData);
rootRef.on("child_changed", handleData);
