const status = document.getElementById("status");
const content = document.getElementById("content");
const signOutButton = document.getElementById("signOutButton");

const auth = firebase.auth();

signOutButton.addEventListener("click", e => {
  e.preventDefault();
  auth
    .signOut()
    .then(() => {
      window.location.assign("./");
    })
    .catch(error => {
      alert(error.message);
      console.error(error);
    });
});

auth.onAuthStateChanged(user => {
  if (user) {
    if (user.displayName && user.photoURL) {
      content.innerHTML = `<div class="user"><h1 class="user__name">Welcome ${user.displayName}</h1><div class="user__thumbnail"><img src=${user.photoURL}></div>`;
    } else {
      content.innerHTML = `<div class="user"><h1 class="user__name">Welcome to Humans!</h1><p>Please check your email to verify your account. Do not forget to add your name and profile picture in Edit section.</p>`;
    }
    if (user.emailVerified) {
      status.innerHTML = `<p class="status__text status__text--success">Your account has been verified.</p>`;
    } else {
      status.innerHTML = `<p class="status__text status__text--warning">Your account needs to be verified. Please check your inbox.</p></div>`;
    }
  } else {
    window.location.assign("./index.html");
    console.log("No user is signed in!");
  }
});
