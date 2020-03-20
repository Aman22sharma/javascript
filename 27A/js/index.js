const loginForm = document.getElementById("loginForm");
const forgotPassword = document.getElementById("forgotPassword");

const auth = firebase.auth();
auth.useDeviceLanguage();

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
});

forgotPassword.addEventListener("click", e => handleForgotPassword(e));
