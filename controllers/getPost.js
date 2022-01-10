import {BlogPost} from '../models/BlogPost.js'

export async function getPostController(req, res) {
    const blogpost = await BlogPost.findById(req.params.id).populate('userid')
    res.render('post',{
    blogpost
    })
}