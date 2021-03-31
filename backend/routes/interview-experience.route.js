const router=require('express').Router();
const auth=require('../middleware/auth');
const Interviewexp = require('../models/InterviewExp');
const User=require('../models/User');
const Profile = require('../models/Profile')
const { check, validationResult } = require('express-validator');

//to show all the interview experiences
router.get('/', auth, async (req, res)=>{

    const interviewExp = await Interviewexp.find().populate('userId',['name', 'avatar'])
    if(!interviewExp){
        res.json({msg: 'Currently No Experiences are available'});
    }
    else{
        res.json(interviewExp);
    }
});

//to show all experiences written by current user
router.get('/my', auth, async (req,res) => {

    const myInterviewExp = await Interviewexp.find({ userId: req.user.id }).populate('userId',['name','avatar'])
    
    if(!myInterviewExp) {
        res.json({msg: 'You have not added any interview experience!!'});
    }
    else{
        res.json(myInterviewExp);
    }
});

router.get('/:id', auth, async (req, res) => {

    const post = await Interviewexp.findOne({ _id: req.params.id })
    if(post) {
        res.json(post)
    } else {
        res.json({msg: 'Post does not exist'})
    }

})

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
    });
    
    await newInterviewExp.save();
    res.json('Interview Experience Added');
});

//to update particular experience of the user
router.put('/my/:id',[
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
    
    const { company, role, programmingTopics, csFundamentals, text } = req.body;

    const updateExp=Interviewexp.find({_id:req.params.id,userId:req.user.id});
    if(updateExp)
    {
        Interviewexp.findById(req.params.id)
        .then(interviewExp =>{
            interviewExp.experience.company=company;
            interviewExp.experience.role=role;
            interviewExp.experience.programmingTopics=programmingTopics;
            interviewExp.experience.csFundamentals=csFundamentals;
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

router.put('/comment/:id', auth, async (req, res) => {


    const user = await User.findById(req.user.id)
    const post = await Interviewexp.findOne({ _id: req.params.id })

    const newComment = {
        text: req.body.text,
        name: user.name,
        userId: req.user.id
    }

    if(!post.comments)post.comments = []

    post.comments.unshift(newComment)

    await post.save()

    res.json(post)
})

router.put('/like/:id', auth, async ( req, res ) => {
    
    const post = await Interviewexp.findOne({ _id: req.params.id })
  
    if(post.likes.filter(like => like.userId.toString()===req.user.id).length>=1) {

        const removeIndex = post.likes.map((like) => like.userId.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        await post.save()

        res.json(post)

    } else {
        post.likes.unshift({ userId: req.user.id })

        await post.save()

        res.json(post)
    }

})


module.exports = router;