const mongoose = require('mongoose')

const ExperienceSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    experience:
        {
            company: {
                type: String,
                required: true
            },
            role: {
                type: String,
                required:true,
            },
            programmingTopics: [],
            csFundamentals: [],
            text: String
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

const Experience = mongoose.model('Experience', ExperienceSchema)
module.exports = Experience