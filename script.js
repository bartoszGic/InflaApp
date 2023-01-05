const newArtBtn = document.querySelector('.add-btn');
const saveArtBtn = document.querySelector('.fa-square-check');
const abortArtBtn = document.querySelector('.fa-xmark');
const editBtns = document.getElementsByClassName('.fa-pen-to-square');
const sortBtn = document.querySelector('#sort');

const popup = document.querySelector('.new-article-popup');
const container = document.querySelector('.container');
const list = document.querySelector('.list');

const artName = document.querySelector('#art-name');
const startDate = document.querySelector('#start-date');
const startPrice = document.querySelector('#start-price');
const endDate = document.querySelector('#end-date');
const endPrice = document.querySelector('#end-price');

let err;
let artID = 0;
let newArtCondition = true;

const newArtCreator = () => {
	newArtCondition = true;
	const newArt = document.createElement('li');
	newArt.setAttribute('id', artID);
	newArt.setAttribute('active', '');
	newArt.innerHTML = `<div class="name">${artName.value}</div>
	<div class="article-data">
		<div class="dates">
			<p class="start-date article-data-value">Od <span>${startDate.value}</span></p>
			<p class="actual-date article-data-value">Do <span>${endDate.value}</span></p>
		</div>
		<div class="prices">
			<p class="start-price article-data-value"><span>${startPrice.value}</span> zł</p>
			<p class="actual-price article-data-value"><span>${endPrice.value}</span> zł</p>
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
	valuesCalculator(createdArt);
	daysCalculator(createdArt);
};
const editArtPanel = id => {
	newArtCondition = false;
	panelsToggler();
	const artToEdit = document.getElementById(id);
	artToEdit.setAttribute('active', '');
	artName.value = artToEdit.children[0].textContent;
	startDate.value = artToEdit.children[1].children[0].children[0].children[0].textContent;
	startPrice.value = artToEdit.children[1].children[1].children[0].children[0].textContent;
	endDate.value = artToEdit.children[1].children[0].children[1].children[0].textContent;
	endPrice.value = artToEdit.children[1].children[1].children[1].children[0].textContent;
};
const editArt = () => {
	newArtCondition = true;
	const editingArt = document.querySelector('[active]');
	editingArt.children[0].textContent = artName.value;
	editingArt.children[1].children[0].children[0].children[0].textContent = startDate.value;
	editingArt.children[1].children[1].children[0].children[0].textContent = startPrice.value;
	editingArt.children[1].children[0].children[1].children[0].textContent = endDate.value;
	editingArt.children[1].children[1].children[1].children[0].textContent = endPrice.value;
	valuesCalculator(editingArt);
	daysCalculator(editingArt);
};
const valuesCalculator = calculateArt => {
	const difference = (((endPrice.value - startPrice.value) / startPrice.value) * 100).toFixed(1);
	const inflaText = calculateArt.querySelector('.infla-value');
	inflaText.textContent = `${difference} %`;
	if (difference > 0) {
		inflaText.style.color = 'var(--inflaColor)';
	} else if (parseFloat(difference) === 0) {
		inflaText.style.color = 'var(--neutralColor)';
	} else if (difference < 0) {
		inflaText.style.color = 'var(--deflaColor)';
	}
};
const daysCalculator = calculateArt => {
	const scaleText = calculateArt.querySelector('.scale-value');
	const date1 = new Date(startDate.value);
	const date2 = new Date(endDate.value);
	const differenceDays = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
	scaleText.textContent = `${differenceDays} dni`;
	calculateArt.removeAttribute('active');
};

const deleteArt = id => {
	const artToDelete = document.getElementById(id);
	list.removeChild(artToDelete);
};
const checkDates = () => {
	const date1 = new Date(startDate.value);
	const date2 = new Date(endDate.value);
	date1 <= date2 ? clearError([endDate]) : showError(endDate);
};
const checkArtName = () => {
	artName.value !== '' ? clearError([artName]) : showError(artName);
};
const checkPrice = () => {
	[startPrice, endPrice].forEach(el => {
		el.value !== '' ? clearError([el]) : showError(el);
	});
};
const showUpActualDate = () => {
	const now = new Date();
	let day = now.getDate();
	let month = now.getMonth() + 1;
	const year = now.getFullYear();
	if (month < 10) month = '0' + month;
	if (day < 10) day = '0' + day;
	startDate.value = `${year}-${month}-${day}`;
	endDate.value = `${year}-${month}-${day}`;
};

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
	input.forEach(el => {
		el.nextElementSibling.style.visibility = 'hidden';
	});
};
const checkError = input => {
	err = 0;
	input.forEach(el => {
		if (el.nextElementSibling.style.visibility === 'visible') {
			err++;
		}
	});
};
const compareValues = (a, b) => {
	return b - a;
};
const sortFun = () => {
	const option = sortBtn.value;
	const oldElementsOrder = document.querySelectorAll('li');
	const oldValuesOrder = [];
	if (option === '2') {
		oldElementsOrder.forEach(el => {
			const valueNum = parseFloat(el.children[1].children[2].children[1].textContent.slice(0, -2));
			oldValuesOrder.push(valueNum);
		});
		let newValuesOrder = oldValuesOrder.sort(compareValues);
		list.innerHTML = '';
		newValuesOrder.forEach(newValue => {
			oldElementsOrder.forEach(oldElement => {
				if (newValue === parseFloat(oldElement.children[1].children[2].children[1].textContent.slice(0, -2))) {
					list.append(oldElement);
				}
			});
		});
	} else if (option === '1' || option === '0') {
		oldElementsOrder.forEach(el => {
			const valueNum = parseFloat(el.id);
			oldValuesOrder.push(valueNum);
		});
		let newValuesOrder = oldValuesOrder.sort(compareValues).reverse();
		list.innerHTML = '';
		newValuesOrder.forEach(newValue => {
			oldElementsOrder.forEach(oldElement => {
				if (newValue === parseFloat(oldElement.id)) {
					list.append(oldElement);
				}
			});
		});
	}
};
const mainFun = () => {
	checkDates();
	checkArtName();
	checkPrice();
	checkError([artName, startDate, startPrice, endDate, endPrice]);
	if (err === 0 && newArtCondition === true) {
		newArtCreator();
		createNewArt();
		sortFun();
		panelsToggler();
		inputsCleaner();
	} else if (err === 0 && newArtCondition === false) {
		editArt();
		sortFun();
		panelsToggler();
		inputsCleaner();
	}
};
window.addEventListener('keyup', e => {
	if (e.key === 'Enter' && !popup.classList.contains('hide')) {
		mainFun();
	} else if (e.key === 'Enter' && popup.classList.contains('hide')) {
		panelsToggler();
		showUpActualDate();
	}
});
saveArtBtn.addEventListener('click', e => {
	e.preventDefault();
	mainFun();
});
abortArtBtn.addEventListener('click', e => {
	e.preventDefault();
	panelsToggler();
	inputsCleaner();
	clearError([artName, startDate, startPrice, endDate, endPrice]);
});
newArtBtn.addEventListener('click', () => {
	panelsToggler();
	showUpActualDate();
});
sortBtn.addEventListener('click', sortFun);
