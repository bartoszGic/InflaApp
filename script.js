import { generateArticleTemplate } from './articleTemplate.js';

document.addEventListener('DOMContentLoaded', () => {
	const newArtBtn = document.querySelector('.add-btn');
	const saveArtBtn = document.querySelector('.fa-square-check');
	const abortArtBtn = document.querySelector('.fa-xmark');
	const sortBtn = document.querySelector('#sort');
	const popup = document.querySelector('.new-article-popup');
	const container = document.querySelector('.container');
	const list = document.querySelector('.list');
	const artName = document.querySelector('#art-name');
	const startDate = document.querySelector('#start-date');
	const startPrice = document.querySelector('#start-price');
	const endDate = document.querySelector('#end-date');
	const endPrice = document.querySelector('#end-price');
	const loader = document.querySelector('.loader')

	let artID = new Date().getTime();
	let newArtCondition = true;
	let err = 0;

	const createElementFromHTML = (htmlString) => {
		const div = document.createElement('div');
		div.innerHTML = DOMPurify.sanitize(htmlString).trim();
		return div.firstChild;
	};

	const clearErrors = (inputs) => {
		inputs.forEach(input => {
			input.nextElementSibling.style.visibility = 'hidden';
		});
	};

	const showError = (input) => {
		input.nextElementSibling.style.visibility = 'visible';
	};

	const checkForErrors = (inputs) => {
		err = inputs.filter(input => input.nextElementSibling.style.visibility === 'visible').length;
	};

	const togglePanels = () => {
		popup.classList.toggle('hide');
		container.classList.toggle('hide');
	};

	const clearInputs = () => {
		[artName, startDate, startPrice, endDate, endPrice].forEach(el => {
			el.value = '';
		});
	};

	const setInitialDate = () => {
		const now = new Date();
		const formattedDate = now.toISOString().split('T')[0];
		startDate.value = formattedDate;
		endDate.value = formattedDate;
	};

	const calculateValues = (art) => {
		const startPriceValue = parseFloat(art.querySelector('.start-price span').textContent);
		const endPriceValue = parseFloat(art.querySelector('.actual-price span').textContent);
		const difference = (((endPriceValue - startPriceValue) / startPriceValue) * 100).toFixed(1);
		const inflaText = art.querySelector('.infla-value');
		inflaText.textContent = `${difference} %`;
		inflaText.style.color = difference > 0 ? 'var(--inflaColor)' :
			difference < 0 ? 'var(--deflaColor)' : 'var(--neutralColor)';
	};

	const calculateDays = (art) => {
		const start = new Date(art.querySelector('.start-date span').textContent);
		const end = new Date(art.querySelector('.actual-date span').textContent);
		const diffDays = ((end - start) / (1000 * 3600 * 24)).toFixed(0);
		const scaleText = art.querySelector('.scale-value');
		scaleText.textContent = `${diffDays} dni`;
		art.removeAttribute('active');
	};

	const getApiUrl = (path = '') => {
		const baseUrl =
			window.location.hostname.includes('localhost') || window.location.hostname === '127.0.0.1'
				? 'http://localhost:5555'
				: 'https://inflapp-backend.vercel.app'
		return `${baseUrl}${path}`;
	};



	const createNewArt = () => {
		const article = {
			id: artID,
			name: artName.value,
			startDate: startDate.value,
			startPrice: startPrice.value,
			endDate: endDate.value,
			endPrice: endPrice.value
		};
		const newArt = createElementFromHTML(generateArticleTemplate(article));
		list.append(newArt);
		calculateValues(newArt);
		calculateDays(newArt);
		saveArticleToServer(article);
	};

	const updateArt = (art) => {
		const id = parseInt(art.id);
		art.querySelector('.name').textContent = artName.value;
		art.querySelector('.start-date span').textContent = startDate.value;
		art.querySelector('.start-price span').textContent = startPrice.value;
		art.querySelector('.actual-date span').textContent = endDate.value;
		art.querySelector('.actual-price span').textContent = endPrice.value;
		calculateValues(art);
		calculateDays(art);
		updateArticleOnServer(id, {
			name: artName.value,
			startDate: startDate.value,
			startPrice: startPrice.value,
			endDate: endDate.value,
			endPrice: endPrice.value
		});
	};

	const handleSort = () => {
		const option = sortBtn.value;
		const items = Array.from(list.children);
		const getValue = (item) => {
			switch (option) {
				case '1': return parseInt(item.id, 10);
				case '2': return parseFloat(item.querySelector('.infla-value').textContent);
				case '3': return parseFloat(item.querySelector('.scale-value').textContent);
				default: return 0;
			}
		};
		items.sort((a, b) => getValue(a) - getValue(b)).forEach(item => list.append(item));
	};

	const fetchArticlesFromServer = async () => {
		loader.style.display = 'block'
		try {
			const response = await fetch(getApiUrl('/'));
			const articles = await response.json();
			articles.forEach(article => {
				const newArt = createElementFromHTML(generateArticleTemplate(article));
				list.append(newArt);
				calculateValues(newArt);
				calculateDays(newArt);
			});
			loader.style.display = 'none'
		} catch (error) {
			console.error('Error fetching articles:', error);
		}
	};

	const saveArticleToServer = async (article) => {
		try {
			await fetch(getApiUrl('/'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(article)
			});
		} catch (error) {
			console.error('Error saving article:', error);
		}
	};

	const deleteArticleFromServer = async (id) => {
		try {
			const response = await fetch(getApiUrl(`/${id}`), {
				method: 'DELETE'
			});
			if (response.ok) {
				console.log('Article deleted from server');
			} else {
				console.error('Failed to delete article from server');
			}
		} catch (error) {
			console.error('Error deleting article:', error);
		}
	};

	const updateArticleOnServer = async (id, updatedArticle) => {
		try {
			const response = await fetch(getApiUrl(`/${id}`), {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updatedArticle)
			});
			if (!response.ok) {
				throw new Error('Failed to update article on server');
			}
			console.log('Article updated on server');
		} catch (error) {
			console.error('Error updating article:', error);
		}
	};

	const mainFunction = () => {
		clearErrors([artName, startDate, startPrice, endDate, endPrice]);
		if (!artName.value) showError(artName);
		if (new Date(startDate.value) > new Date(endDate.value)) showError(endDate);
		if (!startPrice.value) showError(startPrice);
		if (!endPrice.value) showError(endPrice);
		checkForErrors([artName, startDate, startPrice, endDate, endPrice]);
		if (err === 0) {
			if (newArtCondition) {
				createNewArt();
			} else {
				const art = document.querySelector('[active]');
				updateArt(art);
				art.removeAttribute('active');
			}
			togglePanels();
			clearInputs();
		}
	};

	saveArtBtn.addEventListener('click', (e) => {
		e.preventDefault();
		mainFunction();
	});

	abortArtBtn.addEventListener('click', (e) => {
		e.preventDefault();
		togglePanels();
		clearInputs();
		clearErrors([artName, startDate, startPrice, endDate, endPrice]);
	});

	newArtBtn.addEventListener('click', () => {
		togglePanels();
		setInitialDate();
	});

	sortBtn.addEventListener('click', handleSort);

	list.addEventListener('click', (e) => {
		const li = e.target.closest('li');
		if (e.target.classList.contains('fa-pen-to-square')) {
			newArtCondition = false;
			togglePanels();
			setInitialDate();
			li.setAttribute('active', '');
			artName.value = li.querySelector('.name').textContent;
			startDate.value = li.querySelector('.start-date span').textContent;
			startPrice.value = li.querySelector('.start-price span').textContent;
			endDate.value = li.querySelector('.actual-date span').textContent;
			endPrice.value = li.querySelector('.actual-price span').textContent;
		} else if (e.target.classList.contains('fa-trash')) {
			const id = parseInt(li.id);
			li.remove();
			deleteArticleFromServer(id);
		}
	});

	window.addEventListener('keyup', (e) => {
		if (e.key === 'Enter' && !popup.classList.contains('hide')) {
			mainFunction();
		} else if (e.key === 'Enter' && popup.classList.contains('hide')) {
			togglePanels();
			setInitialDate();
		}
	});

	[startPrice, endPrice].forEach(input => {
		input.addEventListener('input', (e) => {
			if (['e', 'E', '+', '-'].includes(e.data)) {
				input.value = '';
			}
		});
	});
	fetchArticlesFromServer();
});
