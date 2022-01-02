import {BlogPost} from '../models/BlogPost.js'

export async function storePostController(req, res) {
    let image = req.files.image;
    image.mv(path.resolve('public/img', image.name), 
    async(err)=> {
        await BlogPost.create({...req.body,
            image: '/img/'+image.name}) 
        res.redirect('/')
    })
}