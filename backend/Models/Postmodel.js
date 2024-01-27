const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,

    },
    cover: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true,

    },
    bookmark: {
        type: Boolean,
        default:false,
    },
    author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog user',
        },
    
},
    {
        timestamps: true
    }
)
const Postmodel = mongoose.model('Post', postSchema)
module.exports = Postmodel