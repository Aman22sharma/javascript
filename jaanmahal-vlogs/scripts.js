'use strict';

let key = 'AIzaSyD5JQeXs-wkxUINtZMgUwmQvvhZqv4zu0Q';
let jmVlogsId = 'UUS2BV5DWHxW86xykeiO9emw';
let mVlogsId = 'UUVQeCeKArXApyD-RtYv2Wmw';
let playlistId = jmVlogsId;
let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=50`;

let featuredVideoSection = document.querySelector('.section');
let mainSection = document.querySelector('.main');

function buttonClick() {
	let links = document.querySelectorAll('.link');
	links.forEach(link => {
		link.addEventListener('click', event => {
			link.parentNode.querySelector('.active').classList.remove('active');
			event.currentTarget.classList.add('active');
			playlistId = event.currentTarget.classList.contains('link-m') ? mVlogsId : jmVlogsId;
			url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=50`;
			featuredVideoSection.textContent = '';
			mainSection.textContent = '';
			getVideos(url);
		});
	});
}

function getVideos(url) {
	fetch(url)
	.then(response => response.json())
	.then(data => {
		let id = data.items[0].snippet.resourceId.videoId;
		getFeaturedVideo(id);
		getAllVideos(data);
	});
}

function getFeaturedVideo(id) {
	featuredVideoSection.innerHTML = `<iframe class="section__banner" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

function createVideo(videoId, articleThumbnail, articleTitle, container) {
	let article = document.createElement('article');
	let image = document.createElement('img');
	let content = document.createElement('div');
	let heading = document.createElement('h2');
	let summary = document.createElement('p');
	let headingContent = document.createTextNode(articleTitle);
	article.classList.add('article');
	article.setAttribute('data-key', videoId);
	image.classList.add('article__thumbnail');
	image.setAttribute('alt', 'Thumbnail of the video');
	image.setAttribute('src', articleThumbnail);
	content.classList.add('article__content');
	heading.classList.add('article__title');
	heading.appendChild(headingContent);
	content.appendChild(heading);
	article.appendChild(image);
	article.appendChild(content);
	mainSection.appendChild(article);
}

function getAllVideos(data) {
	data.items.forEach(item => {
		let videoId = item.snippet.resourceId.videoId;
		let articleThumbnail = item.snippet.thumbnails.maxres === undefined ? item.snippet.thumbnails.medium.url : item.snippet.thumbnails.maxres.url;
		let articleTitle = item.snippet.title.toLowerCase();
		let articleSummary = item.snippet.description.substring(0, 100);
		createVideo(videoId, articleThumbnail, articleTitle);
	});

	let articles = document.querySelectorAll('.article');
	articles.forEach(article => {
		article.addEventListener('click', event => {
			getFeaturedVideo(event.currentTarget.getAttribute('data-key'));
			window.scrollTo(0, 0);
		});
	});
}

getVideos(url);
buttonClick();