const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userProfile = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
    education:{
        college: String,
        branch: String,
        Batch: Number,
    }
},{
    timestamps:true
});

const Profile = mongoose.model('Profile',userProfile);
module.exports = Profile