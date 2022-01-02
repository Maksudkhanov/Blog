import {BlogPost} from '../models/BlogPost.js'

export async function homeController(req, res) {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
}