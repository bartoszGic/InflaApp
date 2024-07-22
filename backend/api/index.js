const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5555;
let articles = [];

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    console.log('GET /');
    res.json(articles);
});

app.post('/', (req, res) => {
    console.log('POST /', req.body);
    const article = req.body;
    articles.push(article);
    res.status(201).send('Article added');
});

app.delete('/:id', (req, res) => {
    console.log(`DELETE /${req.params.id}`);
    const id = parseInt(req.params.id);
    articles = articles.filter(article => article.id !== id);
    res.send('Article deleted');
});

app.put('/:id', (req, res) => {
    console.log(`PUT /${req.params.id}`, req.body);
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
