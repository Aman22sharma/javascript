import '../styles/index.scss';

const url = 'https://dog.ceo/api/breeds/image/random';
const errorURL = 'https://i.giphy.com/media/EFXGvbDPhLoWs/giphy.webp';
const app = document.querySelector('.app');
const load = document.querySelector('.loading--parent');
const dog = app.querySelector('.dog');
const refresh = document.querySelector('.refresh');
let loading = true;

fetch(url).then(data => {
  return data.json();
}).then(result => {
  if(loading) app.classList.add('d-none');
  result.code != 404 ? dog.setAttribute('src', result.message) : dog.setAttribute('src', errorURL);
}).catch(error => {
  dog.setAttribute('src', errorURL);
}).finally(() => {
  loading = false;
  if(!loading) {
    load.classList.add('d-none');
    load.classList.remove('d-block');
    app.classList.remove('d-none');
  }
});

refresh.addEventListener('click', event => {
  event.preventDefault();
  location.reload(true);
});
