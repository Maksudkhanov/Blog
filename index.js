import express from 'express'
import path from 'path'
import ejs from 'ejs'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {BlogPost} from './models/BlogPost.js'

await mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})

app.get('/posts/new',(req,res)=>{
    res.render('create')
})

app.post('/posts/store', async (req, res)=> {
    console.log(req.body);
    await BlogPost.create(req.body) 
    res.redirect('/')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/post/:id',async (req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{
    blogpost
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
