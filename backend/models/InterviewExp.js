const mongoose = require('mongoose')

const ExperienceSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    experience: [
        {
            company: {
                type: String,
                required: true
            },
            role: {
                type: String,
                required:true,
            },
            questions: [],
            text: String
        }
    ]
})

const Experience = mongoose.model('Experience', ExperienceSchema)
module.exports = Experience