const message = document.getElementById(`message`);

const me = async () => {
  try {
    console.log(`1--- Try block starts`);
    let response = await fetch(`https://api.github.com/users/tpkahlon`); // Case 1 (Success)
    // let response = await fetch(`https://api.github.com/users/tpkahlonxxx`); // Case 2 (No user available)
    // let response = await fetch(`httpsx://api.github.com/users/tpkahlon`); // Case 3 (Wrong URL)
    let json = await response.json();
    console.log(`2--- Try block ends, it returned: ${json}.`);
    if (json.message) {
      throw new SyntaxError(`3--- This user does not exist`);
    }
    return json;
  } catch (error) {
    console.log(`4--- Error: ${error}`);
  } finally {
    message.innerHTML = `<img src="https://placekitten.com/205/200">`;
    console.log(`5--- I always run no matter what!`);
  }
};

me().then(data => {
  if (!data) return;
  console.log(`6--- Data:`, data);
  message.innerHTML = `<img src="${data.avatar_url}">`;
});
