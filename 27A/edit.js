const editButton = document.getElementById("edit");
const backButton = document.getElementById("back");
const deleteButton = document.getElementById("delete");
const displayName = document.getElementById("displayName");
const photo = document.getElementById("photo");

const auth = firebase.auth();
auth.onAuthStateChanged(user => {
  photo.value = user.photoURL;
  displayName.value = user.displayName;
});

const handleDelete = () => {
  const user = auth.currentUser;
  const credential = createCredential(user);
  user
    .reauthenticateWithCredential(credential)
    .then(() => {
      user.delete();
      alert("Your account has been deleted");
      window.location.assign("./");
    })
    .catch(error => {
      alert(error.message);
      console.log(error);
    });
};

const handleEdit = () => {
  const newNameAndPhoto = {
    newDisplayName: displayName.value,
    newPhoto: photo.value
  };
  const user = auth.currentUser;
  changeNameAndPhoto(user, newNameAndPhoto);
};

const changeNameAndPhoto = (user, newNameAndPhoto) => {
  const { newDisplayName, newPhoto } = newNameAndPhoto;
  if (newDisplayName && newPhoto) {
    user
      .updateProfile({ displayName: newDisplayName, photoURL: newPhoto })
      .then(() => {
        alert("Display Name and Profile Picture has been made successfully.");
        window.location.assign("./profile.html");
      })
      .catch(error => {
        alert(error.message);
        console.log(error);
      });
  } else if (newDisplayName) {
    user
      .updateProfile({ displayName: newDisplayName })
      .then(() => {
        alert("Display name has been updated.");
        window.location.assign("./profile.html");
      })
      .catch(error => {
        alert(error.message);
        console.log(error);
      });
  } else if (newPhoto) {
    user
      .updateProfile({ photoURL: newPhoto })
      .then(() => {
        alert("Profile Picture has been made successfully.");
        window.location.assign("./profile.html");
      })
      .catch(error => {
        alert(error.message);
        console.log(error);
      });
  }
};

const createCredential = () => {
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
