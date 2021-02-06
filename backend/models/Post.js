const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    name: String,
    avatar: String,
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },
            name: String,
            avatar: String,
        }
    ],
    likes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
},{
    timestamps:true
})

module.exports = Post = mongoose.model('Post', PostSchema)