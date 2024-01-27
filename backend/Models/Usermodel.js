const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
    },
    bio: {
        type: String,
    },
    linkdin: {
        type: String,
    },
    git: {
        type: String,
    },
    insta: {
        type: String,
    },
    yt: {
        type: String,
    },

},
    {
        timestamps: true
    }
)
const User = mongoose.model('Blog user', userSchema)
module.exports = User;