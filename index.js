import express from 'express'
import path from 'path'
import ejs from 'ejs'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import {BlogPost} from './models/BlogPost.js'

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const app = express()
const validateMiddleWare = (req, res, next) => {
    if( req.files === null || req.body.title === null || req.body.title === null) {
        return res.redirect('/posts/new')
    }
    next()
}

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)




app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})

app.get('/posts/new',(req,res)=>{
    res.render('create')
})

app.post('/posts/store', (req, res)=> {
    let image = req.files.image;
    image.mv(path.resolve('public/img', image.name), 
    async(err)=> {
        await BlogPost.create({...req.body,
            image: '/img/'+image.name}) 
        res.redirect('/')
    })
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
