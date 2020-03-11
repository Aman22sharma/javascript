// const message = document.getElementById(`message`);

// const me = async () => {
//   try {
//     console.log(`1--- Try block starts`);
//     let response = await fetch(`https://api.github.com/users/tpkahlon`); // Case 1 (Success)
//     // let response = await fetch(`https://api.github.com/users/tpkahlonxxx`); // Case 2 (No user available)
//     // let response = await fetch(`httpsx://api.github.com/users/tpkahlon`); // Case 3 (Wrong URL)
//     let json = await response.json();
//     console.log(`2--- Try block ends, it returned: ${json}.`);
//     if (json.message) {
//       throw new SyntaxError(`3--- This user does not exist`);
//     }
//     return json;
//   } catch (error) {
//     console.log(`4--- Error: ${error}`);
//   } finally {
//     message.innerHTML = `<img src="https://placekitten.com/205/200">`;
//     console.log(`5--- I always run no matter what!`);
//   }
// };

// me().then(data => {
//   if (!data) return;
//   console.log(`6--- Data:`, data);
//   message.innerHTML = `<img src="${data.avatar_url}">`;
// });

// Promise sample

// (function() {
//   let promise = new Promise(function(req, res) {
//     Math.random() * 10 > 5 ? req('Pass') : res('Fail');
//   });
//   promise
//   .then(function(msg) {
//     console.log(`Party!`)
//   }, function(err) {
//     console.log('Sad!')
//   })
// })();

// Promise chain

// (function() {
//   let promise = new Promise(function(req, res) {
//     Math.random() * 10 > 5 ? req('Pass') : res('Fail');
//   });
//   promise
//   .then(function(msg) {
//     console.log(msg)
//     return true;
//   }, function(err) {
//     console.log(err)
//     return false;
//   })
//   .then(function(val) {
//     console.log(val)
//   }, function(err) {
//     console.log(err)
//   });
// })();

// Fetch with multiple then calls

// (function() {
//   async function makeCall(url) {
//     console.log(2)
//     const req = await fetch(url);
//     const json = await req.json();
//     console.log(4)
//     return req;
//   }
//   console.log(1)
//   makeCall(`https://api.github.com/users/tpkahlon`)
//   .then(data => data.repos_url)
//   .then(repoList=> makeCall(repoList))
//   .then(data=> console.log(data))
//   .catch(error => console.log(error));
//   console.log(3)
// })();

// Fetch with multiple await calls

(function() {
  async function makeCall(url) {
    try {
      const req = await fetch(url);
      const reqJson = await req.json();
      const repoList = await fetch(reqJson.repos_url)
      const repoListJson = await repoList.json();
      return repoListJson;
    } catch(err) {
      throw new Error(err);
    }
  }
  makeCall(`https://api.github.com/users/tpkahlon`)
  .then(data=> console.log(data))
  .catch(error => console.log(error));
})();