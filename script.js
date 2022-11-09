const newArtBtn = document.querySelector('.add-btn');
const saveArtBtn = document.querySelector('.fa-square-check');
const abortArtBtn = document.querySelector('.fa-xmark');

const popup = document.querySelector('.new-article-popup');
const container = document.querySelector('.container');

let artName = document.querySelector('#art-name');
let startDate = document.querySelector('#start-date');
let startPrice = document.querySelector('#start-price');
let endDate = document.querySelector('#end-date');
let endPrice = document.querySelector('#end-price');

const addNewArt = () => {
	actualDate();
	panelsTogler();
};

const checkDates = () => {
	const date1 = new Date(startDate.value);
	const date2 = new Date(endDate.value);
	date1 <= date2 ? clearError(endDate) : showError(endDate);
};
const actualDate = () => {
	let now = new Date();
	let day = now.getDate();
	let month = now.getMonth() + 1;
	let year = now.getFullYear();
	if (month < 10) month = '0' + month;
	if (day < 10) day = '0' + day;
	startDate.value = `${year}-${month}-${day}`;
	endDate.value = `${year}-${month}-${day}`;
};
const panelsTogler = () => {
	if (popup.classList.contains('hide')) {
		container.classList.add('hide');
		popup.classList.remove('hide');
	} else {
		container.classList.remove('hide');
		popup.classList.add('hide');
	}
};
const inputsCleaner = () => {
	[artName, startDate, startPrice, endDate, endPrice].forEach(el => {
		el.value = '';
	});
};
const showError = input => {
	errorMsg = input.nextElementSibling;
	errorMsg.style.visibility = 'visible';
};
const clearError = input => {
	errorMsg = input.nextElementSibling;
	if (errorMsg.style.visibility === 'visible') {
		errorMsg.style.visibility = 'hide';
	}
};
saveArtBtn.addEventListener('click', e => {
	e.preventDefault();
	checkDates();
});
abortArtBtn.addEventListener('click', e => {
	e.preventDefault();
	panelsTogler();
	inputsCleaner();
});
newArtBtn.addEventListener('click', addNewArt);
