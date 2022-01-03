import {User} from '../models/User.js'

export function storeUserController(req, res) {
    console.log('goooo');
    User.create(req.body, (error, user) => {
        res.redirect('/')
        })
}