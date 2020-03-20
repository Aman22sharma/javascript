const auth = firebase.auth();
const loginForm = document.getElementById("loginForm");

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
