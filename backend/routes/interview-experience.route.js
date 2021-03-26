const router=require('express').Router();
const auth=require('../middleware/auth');
const Interviewexp=require('../models/InterviewExp');
const User=require('../models/User');
const { check, validationResult } = require('express-validator');

//to show all the interview experiences
router.get('/',auth,async (req,res)=>{
    const interviewExp=await Interviewexp.find();
    if(!interviewExp)
    {
        res.json('Currently No Experiences are available');
    }
    else{
        res.json(interviewExp);
    }
});

//to show all experiences written by current user
router.get('/my',auth,async (req,res)=>{
    const myInterviewExp=await Interviewexp.find({userId:req.user.id});
    if(!myInterviewExp)
    {
        res.json('You have not added any experiences:(');
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

    let loggedUser = await User.findOne({ _id: req.user.id });
    if(!loggedUser) {
        return res.status(400).json({ error: 'Please try loging in again' })
    }

    const {company,role,programmingTopics,csFundamentals,text} = req.body;

    const newInterviewExp = new Interviewexp({
        userId: req.user.id,
        experience: {
            company,
            role,
            programmingTopics,
            csFundamentals,
            text
        },
    });
    
    await newInterviewExp.save();
    res.json('Interview Experience Added');
});

//to update particular experience of the user
router.post('/my/:id',[
    auth,
    check('company', 'Company is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(),
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
router.delete('/my/:id',[
    auth,
],
(req,res)=>{
    const deletePost=Interviewexp.find({_id:req.body.id,userId:req.user.id});
    if(deletePost)
    {
        Interviewexp.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Post Deleted'));
    }
    else{
        res.json('You are not Authoried to Delete this Post:)');
    }
});
module.exports = router;