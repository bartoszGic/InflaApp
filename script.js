const newArtBtn = document.querySelector('.add-btn');
const saveArtBtn = document.querySelector('.fa-square-check');
const abortArtBtn = document.querySelector('.fa-xmark');
const editBtns = document.getElementsByClassName('.fa-pen-to-square');

const popup = document.querySelector('.new-article-popup');
const container = document.querySelector('.container');
const list = document.querySelector('.list');

const artName = document.querySelector('#art-name');
const startDate = document.querySelector('#start-date');
const startPrice = document.querySelector('#start-price');
const endDate = document.querySelector('#end-date');
const endPrice = document.querySelector('#end-price');

let validationError = true;
let artID = 0;
let newArtCondition = true;

const newArtCreator = async () => {
	newArtCondition = true;
	const newArt = document.createElement('li');
	newArt.setAttribute('id', artID);
	newArt.setAttribute('active', '');
	newArt.innerHTML = `<div class="name">${artName.value}</div>
	<div class="article-data">
	<div class="start-values">
	<p>Start</p>
	<p class="start-date article-data-value">${startDate.value}</p>
	<p>Cena</p>
	<p class="start-price article-data-value">${startPrice.value}</p>
	</div>
	<div class="actual-values">
	<p>Aktualizacja</p>
	<p class="actual-date article-data-value">${endDate.value}</p>
	<p>Cena</p>
	<p class="start-price article-data-value">${endPrice.value}</p>
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
		<button><i class="fa-solid fa-pen-to-square" onclick=editArtPanel(${artID})></i></button>
		<button><i class="fa-solid fa-trash" onclick=deleteArt(${artID})></i></button>
		</div>`;
	list.append(newArt);
	artID++;
};
const createNewArt = () => {
	const createdArt = document.querySelector('[active]');
	valueCalculator(createdArt);
};
const editArtPanel = id => {
	newArtCondition = false;
	panelsToggler();
	const artToEdit = document.getElementById(id);
	artToEdit.setAttribute('active', '');
	artName.value = artToEdit.children[0].textContent;
	startDate.value = artToEdit.children[1].children[0].children[1].textContent;
	startPrice.value = artToEdit.children[1].children[0].children[3].textContent;
	endDate.value = artToEdit.children[1].children[1].children[1].textContent;
	endPrice.value = artToEdit.children[1].children[1].children[3].textContent;
};
const editArt = () => {
	newArtCondition = true;
	const editingArt = document.querySelector('[active]');
	editingArt.children[0].textContent = artName.value;
	editingArt.children[1].children[0].children[1].textContent = startDate.value;
	editingArt.children[1].children[0].children[3].textContent = startPrice.value;
	editingArt.children[1].children[1].children[1].textContent = endDate.value;
	editingArt.children[1].children[1].children[3].textContent = endPrice.value;
	valueCalculator(editingArt);
};
const valueCalculator = calculateArt => {
	let difference = (((endPrice.value - startPrice.value) / startPrice.value) * 100).toFixed(1);
	const valueText = calculateArt.querySelector('.infla-value');
	valueText.textContent = `${difference} %`;
	if (difference > 0) {
		valueText.style.color = 'var(--inflaColor)';
	} else if (parseFloat(difference) === 0) {
		valueText.style.color = 'var(--neutralColor)';
	} else if (difference < 0) {
		valueText.style.color = 'var(--deflaColor)';
	}
	calculateArt.removeAttribute('active');
};

const deleteArt = id => {
	const artToDelete = document.getElementById(id);
	list.removeChild(artToDelete);
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
const showUpActualDate = () => {
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
const panelsToggler = () => {
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
	input.forEach(el => {
		el.nextElementSibling.style.visibility === 'visible' ? (validationError = true) : (validationError = false);
	});
};

saveArtBtn.addEventListener('click', e => {
	e.preventDefault();
	checkDates();
	checkArtName();
	checkPrice([startPrice, endPrice]);
	checkError([artName, startDate, startPrice, endDate, endPrice]);
	if (validationError === false && newArtCondition === true) {
		newArtCreator();
		createNewArt();
		panelsToggler();
		inputsCleaner();
	} else if (validationError === false && newArtCondition === false) {
		editArt();
		panelsToggler();
		inputsCleaner();
	}
	// newOrEditCondition===false?
	// dateReverseConverter([startDate, endDate]);
});
abortArtBtn.addEventListener('click', () => {
	e.preventDefault();
	panelsToggler();
	inputsCleaner();
});
newArtBtn.addEventListener('click', () => {
	panelsToggler();
	showUpActualDate();
});
