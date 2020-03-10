let num = 0;

function p() {
  let count = ++num; // 1
  console.log(count + ": Started - Sync code started"); // 1

  let p1 = new Promise(function(resolve, reject) {
    let time = Math.random() * 8000 + 1000;
    console.log(count + ": Promise started - Async code started");
    console.log("Time: ", `${Math.floor(time / 1000)} seconds`);
    window.setTimeout(function() {
      resolve(count);
    }, time);
  });

  p1.then(function(val) {
    console.log(val + ": Promise fulfilled - Async code terminated");
  }).catch(function(reason) {
    console.log("Handle rejected promise (" + reason + ") here.");
  });

  console.log(count + ": Promise made - Sync code terminated");
}

p();
p();
p();
