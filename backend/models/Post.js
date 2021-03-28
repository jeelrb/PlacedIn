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
    title:{
        type:String,
        required:true,
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
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

const Post = mongoose.model('Post', PostSchema)
module.exports = Post 