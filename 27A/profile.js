const status = document.getElementById("status");
const signOutButton = document.getElementById("signOutButton");

const auth = firebase.auth();

signOutButton.addEventListener("click", e => {
  e.preventDefault();
  auth
    .signOut()
    .then(() => {
      window.location.assign("./");
    })
    .catch(error => console.error(error));
});

auth.onAuthStateChanged(user => {
  if (user) {
    if (user.emailVerified) {
      status.innerHTML = `<h1>Welcome ${user.displayName}</h1><p><img src=${user.photoURL}></p><p>Your email <strong>${user.email}</strong> has been verified.</p>`;
    } else {
      status.innerHTML = `<h1>Welcome ${user.displayName}</><p><img src=${user.photoURL}></p><p>Your email <strong>${user.email}</strong> needs to be verified. Please check your inbox.</p>`;
    }
  } else {
    window.location.assign("./index.html");
    console.log("No user is signed in!");
  }
});
