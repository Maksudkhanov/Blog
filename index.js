import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import expressSession from 'express-session'
import {newPostController} from './controllers/newPost.js'
import { homeController } from './controllers/home.js'
import { getPostController } from './controllers/getPost.js'
import { storePostController } from './controllers/storePost.js'
import { validateMiddleWare } from './middleware/validationMiddleware.js'
import {newUserController} from './controllers/newUser.js'
import {storeUserController} from './controllers/storeUser.js'
import {loginController} from './controllers/login.js'
import {loginUserController} from './controllers/loginUser.js'
import { authMiddleware } from './middleware/authMiddleware.js'
import { redirectIfAuthenticatedMiddleware } from './middleware/redirectIfAuthenticatedMiddleware.js'
import { logoutController } from './controllers/logout.js'

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const app = express()



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)
app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;
app.use("*", (req, res, next) => {
loggedIn = req.session.userId;
next()
});


app.post('/posts/store', authMiddleware, storePostController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', logoutController)

app.use((req, res) => { res.render('notfound')})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
