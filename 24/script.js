async function user() {
  try {
    const req = await fetch(`https://randomuser.me/api/`);
    const json = await req.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

function ite(data) {
  let counter = 0;
  return {
    next: function() {
      if (counter < data.length) {
        return {
          value: data[counter++],
          done: false
        };
      } else {
        return {
          done: true
        };
      }
    }
  };
}

function handleData() {
  user()
    .then(data => {
      const items = ite(data.results);
      const user = items.next().value;
      document.getElementById(
        "user"
      ).innerHTML = `<div><img src="${user.picture.large}"><p>Name: ${user.name.title}. ${user.name.first} ${user.name.last}</p><p>Email: ${user.email}</p><p>DOB: ${user.dob.date}</p><p>Cell: ${user.cell}</p><p>Address: ${user.location.city}, ${user.location.state}, ${user.location.country}</p><p>UUID: ${user.login.uuid}</p></div>`;
    })
    .catch(err => console.log(err));
}

document.getElementById(`next`).addEventListener("click", handleData);

window.addEventListener("load", handleData);
