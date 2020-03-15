const fetchBtn = document.getElementById("fetch");
const populateBtn = document.getElementById("populate");

fetchBtn.addEventListener("click", function(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  // xhr.open("GET", "https://api.github.com/users/tpkahlon", true);
  xhr.open("POST", "http://dummy.restapiexample.com/api/v1/create", true);
  xhr.getResponseHeader("Content-Type", "application/json");
  xhr.onprogress = function() {
    console.log("processing...");
  };
  xhr.onreadystatechange = function() {
    console.log(xhr.readyState); //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
  };
  xhr.onload = function() {
    if (this.status === 200) {
      console.log(this.responseText);
    } else {
      console.error("forget it");
    }
  };
  let params = `{"name":"test","salary":"123","age":"23"}`;
  xhr.send(params);
});

populateBtn.addEventListener("click", function(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://dummy.restapiexample.com/api/v1/employees", true);
  // xhr.open("POST", "http://dummy.restapiexample.com/api/v1/create", true);
  xhr.getResponseHeader("Content-Type", "application/json");
  // xhr.onprogress = function() {
  //   console.log("processing...");
  // };
  // xhr.onreadystatechange = function() {
  //   console.log(xhr.readyState); //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
  // };
  xhr.onload = function() {
    if (this.status === 200) {
      let html = ``;
      let obj = JSON.parse(this.responseText);
      const list = document.getElementById("list");
      obj.data.forEach(function(element) {
        html += `<li>Name: ${element.employee_name}, Salary: ${element.employee_salary}</li>`;
      });
      list.innerHTML = html;
    } else {
      console.error("forget it");
    }
  };
  // let params = `{"name":"test","salary":"123","age":"23"}`;
  xhr.send();
  // xhr.send(params);
});
