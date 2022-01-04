import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    }
});

UserSchema.plugin(mongooseUniqueValidator)

UserSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

export const User = mongoose.model('User', UserSchema)

