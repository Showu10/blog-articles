
const express = require('express')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.redirect('/article')
})

app.get('/article', async (req, res) => {
    const articles = await Article.find().sort({ last_updated_at: 'desc' })
    res.render('index', { articles: articles })
})


app.use('/article', articleRouter)

app.listen(5000)