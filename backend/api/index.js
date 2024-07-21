const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5555;
// const port = 5555;
let articles = [];

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json(articles);
});

app.post('/', (req, res) => {
    const article = req.body;
    articles.push(article);
    res.status(201).send('Article added');
});

app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    articles = articles.filter(article => article.id !== id);
    res.send('Article deleted');
});

app.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedArticle = req.body;
    articles = articles.map(article => {
        if (article.id === id) {
            return {
                ...article,
                ...updatedArticle
            };
        }
        return article;
    });
    res.send('Article updated');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


module.exports = app;