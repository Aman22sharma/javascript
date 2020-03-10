// Request permissions

Notification.requestPermission().then(function(result) {
  alert(result);
});

new Notification(`Testing`);

// Sample

function foo() {
  if (!("Notification" in window)) {
    alert(`Sorry...`);
  } else if (Notification.permission === "granted") {
    notify();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
        notify();
      }
    });
  }
}

function notify() {
  let notification = new Notification(`Heading`, {
    icon: `https://placekitten.com/100/100`,
    body: `Body...`
  });
  notification.addEventListener("click", function() {
    window.open(`https://google.com`);
  });
  setTimeout(notification.close.bind(notification), 3000);
}

foo();
