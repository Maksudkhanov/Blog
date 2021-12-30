import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    }
});

export const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
