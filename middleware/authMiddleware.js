import { User } from '../models/User.js';

export function authMiddleware(req, res, next) {
    User.findById(req.session.userId, (error, user) => {
        if(error || !user) {
            return res.redirect('/')
        }
        next()
    })
}