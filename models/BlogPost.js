import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String
});