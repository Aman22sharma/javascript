const allHumans = document.getElementById("allHumans");
const loginForm = document.getElementById("loginForm");
const forgotPassword = document.getElementById("forgotPassword");

const auth = firebase.auth();
auth.useDeviceLanguage();
const database = firebase.database();
const dbRef = database.ref("/humans");

const checkImage = async human => {
  try {
    let req = await fetch(human.val().picture);
    let status = await req.status;
    return status;
  } catch (err) {
    console.log(err);
  }
};

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

auth.onAuthStateChanged(user => {
  if (user) {
    window.location.assign("./profile.html");
  }
});

const handleForgotPassword = () => {
  const email = prompt("Please enter your email address:");
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Please check your email to reset password.");
      console.log("Password Reset Email Sent Successfully!");
    })
    .catch(error => {
      alert(error.message);
      console.error(error);
    });
};

const makeAllHumans = () => {
  let html = ``;
  const handleData = (data, human) => {
    html += `
      <div class="human">
        <div class="human__thumbnail"><img src="${
          data === 404 || !data
            ? `https://api.adorable.io/avatars/285/${getRandomNumber(
                1,
                5000
              )}`
            : human.val().picture
        }" alt="Image of ${human.val().name}"></div>
        <div class="human__name"><span><i class="fa fa-user"></i></span> ${
          human.val().name
        }</div>
        <div class="human__age"><span><i class="fa fa-heart"></i></span> ${
          human.val().age
        }</div>
        <div class="human__phone"><span><i class="fa fa-phone"></i></span> ${
          human.val().phoneNumber
        }</div>
        <div class="human__message"><span><i class="fa fa-comment"></i></span> ${
          human.val().message
        }</div>
      </div>
    `;
    allHumans.innerHTML = html;
  }
  dbRef.orderByKey().on("value", snapshot => {
    if (snapshot.val() == null) {
      allHumans.innerHTML = `Our world has no humans listed right now!`;
    } else {
      snapshot.forEach(human => {
        checkImage(human)
          .then(data => handleData(data, human))
          .catch(err => console.log(err));
      });
    }
  });
};

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const emailField = e.target[0].value;
  const passwordField = e.target[1].value;
  auth
    .signInWithEmailAndPassword(emailField, passwordField)
    .then(() => {
      window.location.assign("./profile.html");
    })
    .catch(error => {
      alert(error.message);
      console.error(error);
    });
});

window.addEventListener("load", () => {
  document.querySelectorAll("input").forEach(i => {
    i.value = "";
  });
  makeAllHumans();
});

forgotPassword.addEventListener("click", e => handleForgotPassword(e));
