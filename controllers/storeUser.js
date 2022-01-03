import {User} from '../models/User.js'

export function storeUserController(req, res) {
    User.create(req.body, (error, user) => {
        res.redirect('/')
        })
}