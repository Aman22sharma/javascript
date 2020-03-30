const app = document.getElementById(`app`);
const explicit = document.getElementById(`explicit`);

const database = firebase.database();
const rootRef = database.ref("/messages");

const getHostname = url => {
  // use URL constructor and return hostname
  return new URL(url).hostname;
};

const makeCall = async url => {
  try {
    const req = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const status = req.status;
    return status;
  } catch (err) {
    console.log(err);
  }
};

const fetchCall = async url => {
  try {
    const req = await fetch(`${url}`);
    const json = req.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const inputValue = e.target[0].value;
  makeCall(inputValue)
    .then(status => {
      rootRef.on("value", snapshot => {
        if (snapshot.val() == null) {
          app.innerHTML = `<a href='#' class='collection-item none'>No links available yet.</a>`;
        } else {
          let isRepeated = _.map(snapshot.val(), (value, key) => {
            if (_.includes(value, inputValue)) {
              let el = document.querySelector(".modal");
              el.querySelector("h4").textContent = `Sorry!`;
              el.querySelector(
                "p"
              ).textContent = `Interesting, Someone already posted this link!`;
              let instance = M.Modal.init(el);
              instance.open();
              return key;
            } else {
              return;
            }
          }).filter(el => el != null);
          if (isRepeated.length === 0) {
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
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
});

const handleData = data => {
  fetchCall("./data.json")
    .then(sites => {
      rootRef.on("value", snapshot => {
        if (snapshot.val() == null) {
          app.innerHTML = `<a href='#' class='collection-item none'>No links available yet.</a>`;
        } else {
          data.forEach(i => {
            const check = _.filter(sites, (value, key) => {
              return getHostname(i.val()).includes(value.parent_domain);
            });
            if (check.length === 0) {
              let link = document.createElement("a");
              link.classList.add("collection-item");
              link.textContent = `${i.val()}`;
              link.setAttribute("href", `${i.val()}`);
              link.setAttribute("target", `_blank`);
              app.appendChild(link);
            } else {
              let link = document.createElement("a");
              link.classList.add("collection-item");
              link.textContent = `${i.val()}`;
              link.setAttribute("href", `${i.val()}`);
              link.setAttribute("target", `_blank`);
              explicit.appendChild(link);
              // return;
            }
          });
        }
      });
    })
    .catch(err => console.log(err));
};

rootRef.on("child_added", handleData);
rootRef.on("child_changed", handleData);

document.addEventListener('DOMContentLoaded', function() {
  let elem = document.querySelectorAll('.collapsible');
  let instances = M.Collapsible.init(elem);
});