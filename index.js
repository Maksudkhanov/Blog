import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import {newPostController} from './controllers/newPost.js'
import { homeController } from './controllers/home.js'
import { getPostController } from './controllers/getPost.js'
import { storePostController } from './controllers/storePost.js'
import { validateMiddleWare } from './middleware/validationMiddleware.js'
import {newUserController} from './controllers/newUser.js'
import {storeUserController} from './controllers/storeUser.js'

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)


app.post('/posts/store', storePostController)
app.post('/users/register', storeUserController)

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/auth/register', newUserController)
app.get('/posts/new', newPostController)




app.listen(3000, () => {
    console.log('App listening on port 3000')
})
