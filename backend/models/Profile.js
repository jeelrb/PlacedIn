const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userProfile = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    skills: {
        type: [ String ],
        required: true
    },
    portfolio: String,
    codeforcesProfile:{
        cfUserName: String,
        cfRating: Number,
        cfMaxRating: Number,
        cfRank: String,
    },
    codechefProfile:{
        ccUserName: String,
        ccRating: Number,
        ccMaxRating: Number,
        ccRank: String,
    },
    github:{
        githubUserName: String,
        githubRepo: [],
    },
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
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            }
        }
    ]
},{
    timestamps:true
});

const Profile = mongoose.model('Profile',userProfile);
module.exports = Profile