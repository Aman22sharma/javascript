const signUpForm = document.getElementById("signUpForm");

const auth = firebase.auth();
auth.useDeviceLanguage();
let state = 0;

auth.onAuthStateChanged(user => {
  if (user && state === 0) {
    window.location.assign("./profile.html");
  }
});

const sendVerificationEmail = () => {
  auth.currentUser
    .sendEmailVerification()
    .then(() => {
      window.location.assign("./profile.html");
    })
    .catch(error => {
      alert(error.message);
      console.log(error);
    });
};

signUpForm.addEventListener("submit", e => {
  e.preventDefault();
  const emailField = e.target[0].value;
  const passwordField = e.target[1].value;
  auth
    .createUserWithEmailAndPassword(emailField, passwordField)
    .then(() => {
      state = 1;
      sendVerificationEmail();
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
});
