const generateArticleTemplate = (article) => {
    return `
        <li id="${article.id}" active>
            <div class="name">${article.name}</div>
            <div class="article-data">
                <div class="dates">
                    <p class="start-date article-data-value">Od <span>${article.startDate}</span></p>
                    <p class="actual-date article-data-value">Do <span>${article.endDate}</span></p>
                </div>
                <div class="prices">
                    <p class="start-price article-data-value"><span>${article.startPrice}</span> zł</p>
                    <p class="actual-price article-data-value"><span>${article.endPrice}</span> zł</p>
                </div>
                <div class="infla">
                    <p>Wartość</p>
                    <p class="infla-value article-data-value">0 %</p>
                </div>
                <div class="scale">
                    <p>Skala</p>
                    <p class="scale-value article-data-value">0 dni</p>
                </div>
            </div>
            <div class="tools">
                <button><i class="fa-solid fa-pen-to-square"></i></button>
                <button><i class="fa-solid fa-trash"></i></button>
            </div>
        </li>
    `;
};

export { generateArticleTemplate };