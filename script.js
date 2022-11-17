const newArtBtn = document.querySelector('.add-btn');
const saveArtBtn = document.querySelector('.fa-square-check');
const abortArtBtn = document.querySelector('.fa-xmark');
const editBtns = document.getElementsByClassName('.fa-pen-to-square');

const popup = document.querySelector('.new-article-popup');
const container = document.querySelector('.container');
const list = document.querySelector('.list');

let artName = document.querySelector('#art-name');
let startDate = document.querySelector('#start-date');
let startPrice = document.querySelector('#start-price');
let endDate = document.querySelector('#end-date');
let endPrice = document.querySelector('#end-price');

let artNameLi = document.querySelector('.name');
let startDateLi = document.querySelector('.start-date');
let startPriceLi = document.querySelector('.start-price');
let endDateLi = document.querySelector('.actual-date');
let endPriceLi = document.querySelector('.actual-price');

let artID = 0;

const addNewArt = () => {
	actualDate();
	panelsTogler();
};
const createNewArt = (in1, in2, in3, in4, in5) => {
	const newArt = document.createElement('li');
	newArt.setAttribute('id', artID);
	newArt.innerHTML = `<div class="name">${in1.value}</div>
	<div class="article-data">
		<div class="start-values">
			<p>Start</p>
			<p class="start-date article-data-value">${in2.value}</p>
			<p>Cena</p>
			<p class="start-price article-data-value">${in3.value}</p>
		</div>
		<div class="actual-values">
			<p>Aktualizacja</p>
			<p class="actual-date article-data-value">${in4.value}</p>
			<p>Cena</p>
			<p class="start-price article-data-value">${in5.value}</p>
		</div>
		<div class="infla">
			<p>Wartość</p>
			<p class="infla-value article-data-value">15 %</p>
		</div>
		<div class="scale">
			<p>Skala</p>
			<p class="scale-value article-data-value">4 dni</p>
		</div>
	</div>
	<div class="tools">
		<button><i class="fa-solid fa-pen-to-square" onclick=editArt(${artID})></i></button>
		<button><i class="fa-solid fa-trash"></i></button>
	</div>`;
	list.append(newArt);
	artID++;
};
const editArt = id => {
	panelsTogler();
	const artToEdit = document.getElementById(id);
	let artNameToEdit = artToEdit.children[0].textContent;
	let startDateToEdit = artToEdit.children[1].children[0].children[1].textContent;
	let startPriceToEdit = artToEdit.children[1].children[0].children[3].textContent;
	let endDateToEdit = artToEdit.children[1].children[1].children[1].textContent;
	let endPriceToEdit = artToEdit.children[1].children[1].children[3].textContent;
	artName.value = artNameToEdit;
};
const checkDates = () => {
	const date1 = new Date(startDate.value);
	const date2 = new Date(endDate.value);
	date1 <= date2 ? clearError(endDate) : showError(endDate);
};
const checkArtName = () => {
	artName.value !== '' ? clearError(artName) : showError(artName);
};
const checkPrice = price => {
	price.forEach(el => {
		el.value !== '' ? clearError(el) : showError(el);
	});
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
// const dateReverseConverter = oldFormatDate => {
// 	for (let i = 0; i < 2; i++) {
// 		console.log(startDateLi.textContent);
// 		startDateLi.textContent = `${oldFormatDate[i].value.slice(-2)}`;
// 		const startDateLi = oldFormatDate[i].value.slice(-2);
// 		const month = oldFormatDate[i].value.slice(-5, -3);
// 		const year = oldFormatDate[i].value.slice(-10, -6);
// 	}
// };
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
	errorMsg.style.visibility = 'hidden';
};
const checkError = input => {
	let error = 0;
	input.forEach(el => {
		if (el.nextElementSibling.style.visibility === 'visible') {
			error++;
		}
	});
	if (error === 0) {
		createNewArt(artName, startDate, startPrice, endDate, endPrice);
		panelsTogler();
		inputsCleaner();
	}
};

saveArtBtn.addEventListener('click', e => {
	e.preventDefault();
	checkDates();
	checkArtName();
	checkPrice([startPrice, endPrice]);
	checkError([artName, startDate, startPrice, endDate, endPrice]);
	// dateReverseConverter([startDate, endDate]);
});
abortArtBtn.addEventListener('click', e => {
	e.preventDefault();
	panelsTogler();
	inputsCleaner();
});
newArtBtn.addEventListener('click', addNewArt);
