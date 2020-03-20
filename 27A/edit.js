const editButton = document.getElementById("edit");
const backButton = document.getElementById("back");
const deleteButton = document.getElementById("delete");
const displayName = document.getElementById("displayName");
const photo = document.getElementById("photo");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const auth = firebase.auth();
auth.onAuthStateChanged(user => {
  console.log(user);
  photo.value = '';
  displayName.value = '';
  emailField.value = '';
  passwordField.value = '';
  // displayName.innerHTML = user.displayName;
  // photo.setAttribute("src", user.photoURL);
});
const handleDelete = () => {
  const user = auth.currentUser;
  const credential = createCredential(user);
  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      user.delete();
      console.log("User has been deleted");
    })
    .catch(err => console.log(err));
};
const handleEdit = () => {
  const newNameAndPhoto = {
    newDisplayName: displayName.value,
    newPhoto: photo.value
  };
  const user = auth.currentUser;
  changeNameAndPhoto(user, newNameAndPhoto);

  if (email && password) {
    const credential = createCredential(user);
    changePassword(user, credential, password);
    changeEmail(user, credential, email);
  } else if (email) {
    const credential = createCredential(user);
    changeEmail(user, credential, email);
  } else if (password) {
    const credential = createCredential(user);
    changePassword(user, credential, password);
  }
};
const changeNameAndPhoto = (user, newNameAndPhoto) => {
  const { newDisplayName, newPhoto } = newNameAndPhoto;
  if (newDisplayName && newPhoto) {
    user
      .updateProfile({ displayName: newDisplayName, photoURL: newPhoto })
      .then(() =>
        console.log(
          "Success, New profile picture and display name has been updated."
        )
      )
      .catch(err => console.log(err));
  } else if (newDisplayName) {
    user
      .updateProfile({ displayName: newDisplayName })
      .then(() => console.log("Success, Display name has been updated."))
      .catch(err => console.log(err));
  } else if (newPhoto) {
    user
      .updateProfile({ photoURL: newPhoto })
      .then(() => console.log("Success, Profile picture has been updated."))
      .catch(err => console.log(err));
  }
};
const changePassword = (user, credential, password) => {
  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      user.updatePassword(password);
    })
    .catch(err => console.log(err));
};
const changeEmail = (user, credential, email) => {
  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      user.updateEmail(email);
    })
    .catch(err => console.log(err));
};
const createCredential = user => {
  const password = prompt("Confirm Password:");
  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    password
  );
  return credential;
};
editButton.addEventListener("click", e => {
  handleEdit(e);
});
backButton.addEventListener("click", e => {
  window.location.assign("./profile.html");
});
deleteButton.addEventListener("click", e => {
  handleDelete(e);
});
