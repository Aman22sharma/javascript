'use strict';

let container = document.querySelector('.container');
let cards = document.querySelector('.cards');
let countrySelect = document.querySelector('.countries[name=\'countries\']');
let createNode = node => document.createElement(node);
let appendNode = (parent, node) => parent.appendChild(node);

let createNews = element => {
  let card = createNode('article');
  let cardTitle = createNode('h2');
  let cardContent = createNode('p');
  let cardDetails = createNode('p');
  let cardDate = createNode('span');
  let cardSource = createNode('span');
  let cardThumbnail = createNode('div');
  let cardImg = createNode('img');
  let cardLink = createNode('a');
  let cardImgUrl = element.urlToImage;
  card.classList.add('card');
  cardTitle.classList.add('card__title');
  cardContent.classList.add('card__content');
  cardDetails.classList.add('card__details');
  cardDate.classList.add('card__date');
  cardSource.classList.add('card__source');
  cardThumbnail.classList.add('card__image');
  cardImg.classList.add('card__thumbnail');
  cardLink.classList.add('card__link');
  appendNode(cards, card);
  appendNode(card, cardThumbnail);
  appendNode(cardThumbnail, cardImg);
  appendNode(card, cardLink);
  appendNode(cardLink, cardTitle);
  appendNode(card, cardDetails);
  appendNode(cardDetails, cardDate);
  appendNode(cardDetails, cardSource);
  appendNode(card, cardContent);
  cardImg.src = typeof cardImgUrl !== 'object' ? cardImgUrl : 'https://media3.giphy.com/media/3o7qDQtKMMgDktFXu8/giphy.gif?cid=790b76115c9e3f3f6453626d73e2831b';
  cardImg.alt = element.title;
  cardTitle.textContent = element.title;
  cardContent.textContent = element.description;
  cardDate.textContent = element.publishedAt.slice(0, 10);
  cardSource.textContent = element.source.name;
  cardLink.target = `_blank`;
  cardLink.href = element.url;
  cardTitle.insertAdjacentHTML('afterbegin', '<span class=\'fa fa-external-link-alt\'></span>');
  cardDate.insertAdjacentHTML('afterbegin', '<span class=\'fa fa-clock\'></span>');
  cardSource.insertAdjacentHTML('afterbegin', '<span class=\'fa fa-newspaper\'></span>');
}

let createCountrySelect = () => {
  let data = {
    'first': 'Choose a country',
    'ae': 'United Arab Emirates',
    'ar': 'Argentina',
    'at': 'Austria',
    'au': 'Australia',
    'be': 'Belgium',
    'bg': 'Bulgaria',
    'br': 'Brazil',
    'ca': 'Canada',
    'ch': 'Switzerland',
    'cn': 'China',
    'co': 'Colombia',
    'cu': 'Cuba',
    'cz': 'Czech Republic',
    'de': 'Germany',
    'eg': 'Egypt',
    'fr': 'France',
    'gb': 'United Kingdom',
    'gr': 'Greece',
    'hk': 'Hong Kong',
    'id': 'Indonesia',
    'ie': 'Ireland',
    'il': 'Israel',
    'in': 'India',
    'it': 'Italy',
    'jp': 'Japan',
    'kr': 'Republic of Korea',
    'lt': 'Lithuania',
    'lv': 'Latvia',
    'ma': 'Morocco',
    'mx': 'Mexico',
    'my': 'Malaysia',
    'ng': 'Nigeria',
    'nl': 'Netherlands',
    'no': 'Norway',
    'nz': 'New Zealand',
    'ph': 'Philippines',
    'pl': 'Poland',
    'pt': 'Portugal',
    'ro': 'Romania',
    'rs': 'Serbia',
    'ru': 'Russia',
    'sa': 'Saudi Arabia',
    'se': 'Sweden',
    'sg': 'Singapore',
    'si': 'Slovenia',
    'sk': 'Slovakia',
    'th': 'Thailand',
    'tr': 'Turkey',
    'tw': 'Taiwan',
    'ua': 'Ukraine',
    'us': 'United States',
    've': 'Venezuela',
    'za': 'South Africa'
  }
  Object.keys(data).forEach(key => {
    let countryOption = createNode('option');
    countryOption.setAttribute('value', key);
    countryOption.textContent = data[key];
    appendNode(countrySelect, countryOption);
  });
  countrySelect.querySelector('option').textContent = 'Choose a country';
}

let getNews = (country) => {
  let KEY = '63f86003bea64ef3bae5fca878aeb719';
  let URL = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=100&apiKey=`;
  fetch(`${URL}${KEY}`)
  .then(response => response.json())
  .then(json => {
    let article = json.articles.forEach(element => {
      createNews(element);
    });
  });
}

let selectCountry = event => {
  cards.textContent = '';
  getNews(event.target.value);
}

createCountrySelect();
countrySelect.onchange = selectCountry;