const auth = firebase.auth();

auth.useDeviceLanguage();

const signUpForm = document.getElementById("signUpForm");

const sendVerificationEmail = () => {
  auth.currentUser
    .sendEmailVerification()
    .then(() => {
      window.location.assign("./profile.html");
    })
    .catch(error => {
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
      sendVerificationEmail();
    })
    .catch(error => {
      alert(error.message);
      console.error(error);
    });
});
