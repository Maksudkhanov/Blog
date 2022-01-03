import {User} from '../models/User.js'

export function storeUserController(req, res) {
    User.create(req.body, (error, user) => {
        if(error) {
            return res.redirect('/auth/register')
        } 
        res.redirect('/')
        })
}