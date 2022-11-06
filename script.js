let newArtBtn;
let popup;
let container;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};
const prepareDOMElements = () => {
	newArtBtn = document.querySelector('.add-btn');
	saveArtBtn = document.querySelector('.fa-square-check');
	abortArtBtn = document.querySelector('.fa-xmark');

	popup = document.querySelector('.new-article-popup');
	container = document.querySelector('.container');
};
const prepareDOMEvents = () => {
	newArtBtn.addEventListener('click', addNewArt);
};

document.addEventListener('DOMContentLoaded', main);

const addNewArt = () => {
	panelsTogler();
};
const panelsTogler = () => {};
