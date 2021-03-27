const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userProfile = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avatar: String,
    skills: {
        type: [ String ],
        required: true
    },
    cfUserName: String,
    ccUserName: String,
    githubUserName: String,
    portfolio: String,
    company: String,
    linkedIn: String,
    instagram: String,
    facebook: String,
    twitter: String,
    education:[
        {
            college: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            branch: {
                type: String,
                required: true
            },
            batch: {
                type: String,
                required: true
            },
        }
    ]
},{
    timestamps:true
});

const Profile = mongoose.model('Profile',userProfile);
module.exports = Profile