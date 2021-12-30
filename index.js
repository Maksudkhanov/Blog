import express from 'express'
import path from 'path'
import ejs from 'ejs'
import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
