const auth = firebase.auth();

const signOutButton = document.getElementById("signOutButton");
const statusText = document.getElementById("status");

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
    if(user.emailVerified) {
      statusText.innerHTML = `Your email <strong>${user.email}</strong> has been verified.`;
    } else {
      statusText.innerHTML = `Your email <strong>${user.email}</strong> needs to be verified. Please check your inbox.`;
    }
  } else {
    console.log("No user is signed in!");
  }
});
