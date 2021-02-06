const mongoose=require('mongoose');
const { string } = require('yargs');

const Schema=mongoose.Schema;

const userProfile=new Schema({
    username:{type:String,required:true},
    codeforcesProfile:{
        cfUserName: string,
        cfRating: Number,
        cfMaxRating: Number,
        cfRank:string,
    },
    codechefProfile:{
        ccUserName: string,
        ccRating: Number,
        ccMaxRating: Number,
        ccRank:string,
    },
    github:{
        githubUserName: string,
        githubRepo:[],
    },
},{
    timestamps:true
});

const UserProfile= mongoose.model('Profile',userProfile);

module.exports = UserProfile;  