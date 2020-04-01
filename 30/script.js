const app = document.getElementById("root");
const db = firebase.database();
const auth = firebase.auth();

// VIEW

// auth.onAuthStateChanged(user => {
//   currentName.textContent = user.displayName || "Hello, Unknown Human!";
//   currentPicture.setAttribute(
//     "src",
//     user.photoURL || "https://placekitten.com/100/100"
//   );
// });

const handleMessageView = message => {
  let html = ``;
  const messages = document.querySelector(".messages");
  if (!message) {
    messages.innerHTML = `Looks Empty! Please start a conversation in this room.`;
    return;
  }
  for (let item in message) {
    const key = item;
    const value = message[item];
    html += `
      <div key=${key} class="message">
        <div class="message__content">${value.message}</div>
        <div class="message__date">${moment(value.createdAt).format(
          "LLLL"
        )}</div>
      </div>
    `;
  }
  messages.innerHTML = html;
};

const handleAppView = () => {
  let roomsRef = db.ref(`/rooms`);
  roomsRef.on("value", data => {
    if (data.val() === null) {
      handleMessageView();
      return;
    } else {
      handleMessageView(data.val());
    }
  });
};

const handleButtonsEvents = () => {
  const loginButton = document.getElementById("button-login");
  const subscribeButton = document.getElementById("button-subscribe");
  const resetButton = document.getElementById("button-reset");
  const editProfileButton = document.getElementById("button-edit-profile");
  const deleteProfileButton = document.getElementById("button-delete-profile");
  loginButton.addEventListener("click", () => {
    vex.dialog.open({
      message:
        "Welcome to AntiChat! Please enter your Email address you registered with us and given password for that account.",
      input: [
        '<input name="loginEmail" type="email" placeholder="Enter Email Address" required />',
        '<input name="loginPassword" type="password" placeholder="Enter Password" required />'
      ].join(""),
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: "Login" }),
        $.extend({}, vex.dialog.buttons.NO, { text: "Cancel" })
      ],
      callback: data => {
        if (!data) {
          // console.log("Cancelled");
        } else {
          console.log(
            "Username",
            data.loginEmail,
            "Password",
            data.loginPassword
          );
          let auth = firebase.auth();
          auth
            .signInWithEmailAndPassword(data.loginEmail, data.loginPassword)
            .then(() => {
              console.log("Signed in");
              // window.location.assign("./profile.html");
            })
            .catch(error => vex.dialog.alert(error.message));
        }
      }
    });
  });
  subscribeButton.addEventListener("click", () => {
    vex.dialog.open({
      message:
        "Would you like to join AntiChat community? We will help you with that. Please enter your desired Email address and  choose password of choice for that account.",
      input: [
        '<input name="subscribeEmail" type="email" placeholder="Enter Email Address" required />',
        '<input name="subscribePassword" type="password" placeholder="Create Password" required />'
      ].join(""),
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: "Subscribe" }),
        $.extend({}, vex.dialog.buttons.NO, { text: "Cancel" })
      ],
      callback: data => {
        if (!data) {
          // console.log("Cancelled");
        } else {
          let auth = firebase.auth();
          auth.useDeviceLanguage();
          const sendVerificationEmail = () => {
            auth.currentUser
              .sendEmailVerification()
              .then(
                vex.dialog.alert(
                  `Thank you for subscribing. Please check your inbox to verify account.`
                )
              )
              .catch(error => vex.dialog.alert(error.message));
          };
          auth
            .createUserWithEmailAndPassword(
              data.subscribeEmail,
              data.subscribePassword
            )
            .then(sendVerificationEmail)
            .catch(error => vex.dialog.alert(error.message));
        }
      }
    });
  });
  resetButton.addEventListener("click", () => {
    vex.dialog.open({
      message:
        "Did you forget your account password? We will help you with that at AntiChat. Please enter your registered Email address and check your inbox to proceed.",
      input: [
        '<input name="resetEmail" type="email" placeholder="Enter Email Address" required />'
      ].join(""),
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: "Reset Password" }),
        $.extend({}, vex.dialog.buttons.NO, { text: "Cancel" })
      ],
      callback: data => {
        if (!data) {
          // console.log("Cancelled");
        } else {
          let auth = firebase.auth();
          auth
            .sendPasswordResetEmail(data.resetEmail)
            .then(
              vex.dialog.alert(
                "Please check your inbox to reset password. Thank you!"
              )
            )
            .catch(error => vex.dialog.alert(error.message));
        }
      }
    });
  });
  editProfileButton.addEventListener("click", () => {
    vex.dialog.open({
      message: "Please edit your account name and profile picture.",
      input: [
        '<input name="editProfileName" type="text" placeholder="Enter Name" required />',
        '<input name="editProfilePicture" type="url" placeholder="Enter Profile Picture URL" required />'
      ].join(""),
      buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: "Edit" }),
        $.extend({}, vex.dialog.buttons.NO, { text: "Cancel" })
      ],
      callback: data => {
        if (!data) {
          // console.log("Cancelled");
        } else {
          const changeNameAndPhoto = (user, newNameAndPhoto) => {
            const { newDisplayName, newPhoto } = newNameAndPhoto;
            if (newDisplayName && newPhoto) {
              user
                .updateProfile({
                  displayName: newDisplayName,
                  photoURL: newPhoto
                })
                .then(
                  vex.dialog.alert(
                    "Display Name and Profile Picture has been made successfully."
                  )
                )
                .catch(error => vex.dialog.alert(error.message));
            } else if (newDisplayName) {
              user
                .updateProfile({ displayName: newDisplayName })
                .then(vex.dialog.alert("Display name has been updated."))
                .catch(error => vex.dialog.alert(error.message));
            } else if (newPhoto) {
              user
                .updateProfile({ photoURL: newPhoto })
                .then(
                  vex.dialog.alert("Profile Picture has been made successfully")
                )
                .catch(error => vex.dialog.alert(error.message));
            }
          };
          const newNameAndPhoto = {
            newDisplayName: data.editProfileName,
            newPhoto: data.editProfilePicture
          };
          const user = auth.currentUser;
          changeNameAndPhoto(user, newNameAndPhoto);
        }
      }
    });
  });
  deleteProfileButton.addEventListener("click", () => {
    // const createCredential = user => {
    //   const password = vex.dialog.open({
    //     message: "Please enter your password to confirm deletion of account.",
    //     input: [
    //       '<input name="confirmPassword" type="password" placeholder="Enter Password" required />',
    //     ].join(""),
    //     buttons: [
    //       $.extend({}, vex.dialog.buttons.YES, { text: "Proceed" }),
    //       $.extend({}, vex.dialog.buttons.NO, { text: "Cancel" })
    //     ],
    //     callback: data => {
    //       console.log(data);
    //     }
    //   });
    //   // const password = vex.dialog.prompt({
    //   //   message: "Please enter your password to confirm deletion of account.",
    //   //   placeholder: "Enter Password",
    //   //   callback: (value) => {
    //   //     console.log(value);
    //   //   }
    //   // });
    //   const email = user.email;
    //   const credential = firebase.auth.EmailAuthProvider.credential(
    //     email,
    //     password.confirmPassword
    //   );
    //   return credential;
    // };
    // const user = auth.currentUser;
    // const credential = createCredential(user);
    // console.log(credential);
    // user
    //   .reauthenticateWithCredential(credential)
    //   .then(() => {
    //     user.delete();
    //     vex.dialog.alert("Your account has been deleted.");
    //     window.location.reload();
    //   })
    //   .catch(error => vex.dialog.alert(error.message));
  });
};

const handleButtonsView = () => {
  handleButtonsEvents();
};

const handleFormView = () => {
  let html = `
    <div class="messages"></div>
    <form id="form" class="form">
      <input type="text" placeholder="Send a Message" id="form__input">
      <button type="submit" id="form__button">Send Message</button>
    </form>
  `;
  app.innerHTML = html;
  document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();
    handleSubmit(e);
  });
};

// CONTROLLER

const sendMessage = newMessage => {
  let newId = db
    .ref()
    .child("rooms")
    .push().key;
  db.ref(`rooms/${newId}`).set(newMessage);
};

const handleSubmit = e => {
  const message = e.target[0].value;
  if (!message || message.trim() === "") {
    alert("Please type a message!");
    return;
  }
  document.querySelector("form").reset();
  const newMessage = {
    message,
    createdAt: new Date().toUTCString()
  };
  sendMessage(newMessage);
};

// INIT

handleButtonsView();
handleFormView();
handleAppView();
