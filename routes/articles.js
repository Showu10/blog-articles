const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/create', (req, res) => {
    res.render('articles/create', { article: new Article() })
})

router.get('/:id/update', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/update', { article: article })
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticle('create'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    let article = req.article
    article.last_updated_at = Date.now()
    next()
}, saveArticle('update'))

function saveArticle(path) {
    return async (req, res) => {
        let article = req.article
        article.article = req.body.article
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/article/${article.id}`)
        } catch(e) {
            console.log(e)
            res.render(`views/articles/%{path}`, { article: article })
        }
    }
}

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router