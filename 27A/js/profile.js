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
    handleCRUD(user);
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

const handleCRUD = user => {
  let selectedId;
  const addButton = document.getElementById("add");
  const updateButton = document.getElementById("update");
  const deleteButton = document.getElementById("delete");
  const addForm = document.getElementById("addForm");
  const updateDropdown = document.getElementById("updateDropdown");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");
  const name = document.getElementById("name");
  const age = document.getElementById("age");
  const updatePhone = document.getElementById("updatePhone");
  const updateMessage = document.getElementById("updateMessage");
  const updateName = document.getElementById("updateName");
  const updateAge = document.getElementById("updateAge");
  const database = firebase.database();
  const dbRef = database.ref("/humans");
  const makeUpdateDropdown = () => {
    const updateDropdown = document.getElementById("updateDropdown");
    updateDropdown.innerHTML = `<option selected disabled>Select a Human</option>`;
    dbRef.orderByKey().on("value", snapshot => {
      snapshot.forEach(i => {
        if (i.val().hasOwnProperty("author")) {
          let option = document.createElement("option");
          option.textContent = `${i.key}: ${i.val().name}`;
          option.setAttribute("value", i.key);
          updateDropdown.appendChild(option);
        }
      });
      updateDropdown.addEventListener("change", e => {
        const id = e.target.value;
        selectedId = id;
        snapshot.forEach(i => {
          if (i.key === selectedId) {
            updateName.value = i.val().name;
            updateAge.value = i.val().age;
            updateMessage.value = i.val().message;
            updatePhone.value = i.val().phoneNumber;
          }
        });
      });
    });
  };
  const handleToggle = () => {
    addForm.classList.add(`hidden`);
    updateForm.classList.add(`hidden`);
    addToggle.addEventListener("click", e => {
      addForm.classList.toggle("hidden");
      updateForm.classList.add("hidden");
    });
    updateToggle.addEventListener("click", e => {
      updateForm.classList.toggle("hidden");
      addForm.classList.add("hidden");
    });
  };
  const handleAddData = (name, age, phone, message) => {
    const autoId = dbRef.push().key;
    dbRef
      .child(autoId)
      .set({
        name: name.value.trim(),
        age: age.value.trim(),
        phoneNumber: phone.value.trim(),
        message: message.value.trim(),
        creationDate: new Date(),
        author: user.email
      })
      .then(() => {
        alert(`Human has been added!`);
        window.location.reload();
      })
      .catch(err => {
        alert(error.message);
      });
  };
  const clearUpdateForm = () => {
    alert('Human has been changed.');
    updateDropdown.selectedIndex = 0;
    updateName.value = '';
    updateAge.value = '';
    updateMessage.value = '';
    updatePhone.value = '';
    makeUpdateDropdown();
  };
  const handleUpdateData = (name, age, phone, message) => {
    const newData = {
      name: name.value.trim(),
      age: age.value.trim(),
      phoneNumber: phone.value.trim(),
      message: message.value.trim(),
      creationDate: new Date(),
      author: user.email
    };
    const updates = {};
    updates[`/humans/${selectedId}`] = newData;
    database.ref().update(updates).then(clearUpdateForm).catch(error => alert(error.message));
  };
  const handleDeleteData = (id) => {
    dbRef.child(id).remove().then(clearUpdateForm).catch(error => alert(error.message));
  };
  addButton.addEventListener("click", e => {
    e.preventDefault();
    addForm.style.display = `block`;
    if (
      phone.value &&
      phone.value.trim() !== "" &&
      message.value &&
      message.value.trim() !== "" &&
      name.value &&
      name.value.trim() !== "" &&
      age.value &&
      age.value.trim() !== ""
    ) {
      handleAddData(name, age, phone, message);
    } else {
      alert("Please add Name, Age, Phone Number and a Message.");
    }
  });
  updateButton.addEventListener("click", e => {
    e.preventDefault();
    if (
      updatePhone.value &&
      updatePhone.value.trim() !== "" &&
      updateMessage.value &&
      updateMessage.value.trim() !== "" &&
      updateName.value &&
      updateName.value.trim() !== "" &&
      updateAge.value &&
      updateAge.value.trim() !== ""
    ) {
      handleUpdateData(updateName, updateAge, updatePhone, updateMessage);
    } else {
      alert("Please select a Human.");
    }
  });
  deleteButton.addEventListener("click", e => {
    e.preventDefault();
    if (
      updatePhone.value &&
      updatePhone.value.trim() !== "" &&
      updateMessage.value &&
      updateMessage.value.trim() !== "" &&
      updateName.value &&
      updateName.value.trim() !== "" &&
      updateAge.value &&
      updateAge.value.trim() !== ""
    ) {
      handleDeleteData(selectedId);
    } else {
      alert("Please select a Human.");
    }
  });
  handleToggle();
  makeUpdateDropdown();
};
