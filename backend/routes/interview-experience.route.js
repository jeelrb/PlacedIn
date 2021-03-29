const router=require('express').Router();
const auth=require('../middleware/auth');
const Interviewexp = require('../models/InterviewExp');
const User=require('../models/User');
const Profile = require('../models/Profile')
const { check, validationResult } = require('express-validator');

//to show all the interview experiences
router.get('/', auth, async (req, res)=>{
    const interviewExp = await Interviewexp.find().populate('profileId', ['avatar']).populate('userId',['name'])
    if(!interviewExp){
        res.json({msg: 'Currently No Experiences are available'});
    }
    else{
        res.json(interviewExp);
    }
});

//to show all experiences written by current user
router.get('/my', auth, async (req,res) => {

    const myInterviewExp = await Interviewexp.find({ userId: req.user.id }).populate('profileId', ['avatar']).populate('userId',['name'])
    
    if(!myInterviewExp) {
        res.json({msg: 'You have not added any interview experience!!'});
    }
    else{
        res.json(myInterviewExp);
    }
});

//to add new interview experiences
router.post('/add',[
    auth,
    [
        check('company', 'Company is required').not().isEmpty(),
        check('role', 'Role is required').not().isEmpty(),
    ]
],
async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    let loggedUser = await User.findOne({ _id: req.user.id }).select('-password')
    if(!loggedUser) {
        return res.status(400).json({ error: 'Please try loging in again' })
    }

    let profile = await Profile.findOne({userId: req.user.id})

    const { company, role, programmingTopics, csFundamentals, text } = req.body;

    const newInterviewExp = new Interviewexp({
        userId: req.user.id,
        experience: {
            company,
            role,
            programmingTopics,
            csFundamentals,
            text
        },
        profileId: profile._id
    });
    
    await newInterviewExp.save();
    res.json('Interview Experience Added');
});

//to update particular experience of the user
router.post('/my/:id',[
    auth, 
    [
        check('company', 'Company is required').not().isEmpty(),
        check('role', 'Role is required').not().isEmpty(),
    ]
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    let loggedUser = await User.findOne({_id:req.user.id });
    if(!loggedUser) {
        return res.status(400).json({ error: 'Please try loging in again' })
    }
    
    const {company,role,questions,text} = req.body;

    const updateExp=Interviewexp.find({_id:req.params.id,userId:req.user.id});
    if(updateExp)
    {
        Interviewexp.findById(req.params.id)
        .then(interviewExp =>{
            interviewExp.experience.company=company;
            interviewExp.experience.role=role;
            interviewExp.experience.questions=questions;
            interviewExp.experience.text=text;

            interviewExp.save()
            .then(()=>res.json('Post Updated'));
        });
    }
    else{
        res.staus(400).json('You are not authoried to update this post.');
    }
});

//to delete a post by the user
router.delete('/my/:id', auth, async (req, res) => {

    const deletePost = await Interviewexp.findOne({ _id: req.params.id, userId: req.user.id });

    if(deletePost)
    {
        await Interviewexp.findByIdAndDelete(req.params.id)
    }
    else{
        res.json({msg: 'You are not Authoried to Delete this Post'});
    }
});



module.exports = router;