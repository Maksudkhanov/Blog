import {BlogPost} from '../models/BlogPost.js'

export async function homeController(req, res) {
    const blogposts = await BlogPost.find({}).populate('userid')
    res.render('index', {
        blogposts
    })
}