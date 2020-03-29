import { config } from './config.js';

'use strict';

// Primitive Declarations
let url = config.url;
let key = config.apiKey;
let container = document.querySelector('.container');

// Function Declarations
let createNode = node => document.createElement(node);
let appendNode = (parent, node) => parent.appendChild(node);

let createCollection = element => {
  let card = createNode('section');
  let cardTitle = createNode('h2');
  let cardInfo = createNode('p');
  let cardImg = createNode('img');
  let cardLink = createNode('a');
  appendNode(container, card);
  appendNode(card, cardImg);
  appendNode(card, cardTitle);
  appendNode(card, cardInfo);
  appendNode(card, cardLink);
  cardImg.src = element.collection.image_url;
  cardTitle.textContent = element.collection.title;
  cardInfo.textContent = element.collection.description;
  cardLink.target = `_blank`;
  cardLink.textContent = `View`;
  cardLink.href = element.collection.share_url;
}

let getCollection = () => {
  fetch(url, {
    headers: {
      'user-key': key
    }
  })
  .then(response => response.json())
  .then(json => {
    return json.collections.forEach(element => {
      createCollection(element);
    });
  });
}

// Function Callbacks
getCollection();