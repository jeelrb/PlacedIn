const router=require('express').Router();
const auth=require('../middleware/auth');
const Post=require('../models/Post');
const User=require('../models/User');
const { check, validationResult } = require('express-validator')

//to show all the posts
router.get('/',auth,(req,res)=>{
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error : '+err));
});

//to add the new post by the user
router.post('/add',[
    auth,
    check('text', 'Text is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
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
    
    const {text,title} = req.body;

    const newPost=new Post({
        userId:req.user.id,
        name:loggedUser.username,
        text:text,
        title:title,
    });
    await newPost.save();
    res.json('Post Added');
});

//To update particular post of the user
router.post('/update/:id',[
    auth,
    check('text', 'Text is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
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
    
    const {text,title} = req.body;

    Post.findById(req.params.id)
    .then(post =>{
        post.text=text;
        post.title=title;

        post.save()
        .then(()=>res.json('Post Updated'));
    });
});

//to delete a post by the user
router.delete('/delete/:id',[
    auth,
],
(req,res)=>{
    Post.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Post Deleted'));
});

module.exports = router;