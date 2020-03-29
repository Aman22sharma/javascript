const app = () => {
  const getCat = document.querySelector("#getCat");
  const getApp = document.querySelector("#app");
  const handleCatPicture = data => {
    getApp.style.backgroundImage = `url(${data[0].url})`;
  };
  const getCatPicture = () => {
    fetch("https://api.thecatapi.com/v1/images/search?size=full")
      .then(response =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then(data => handleCatPicture(data))
      .catch(err => console.warn("Something went wrong.", err));
  };
  getCat.addEventListener("click", e => {
    e.preventDefault();
    getCatPicture();
  });
  window.onload = function () {
    setInterval(getCatPicture, 5000);
  };
};

app();
