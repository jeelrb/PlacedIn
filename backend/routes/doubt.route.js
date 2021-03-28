const router=require('express').Router();
const auth=require('../middleware/auth');
const Post=require('../models/Post');
const User=require('../models/User');
const Profile = require('../models/Profile')
const { check, validationResult } = require('express-validator');

//to show all the posts
router.get('/', auth, async (req, res) => {

    try{
        const posts = await Post.find().populate('profileId',['avatar']).populate('userId',['name'])
        if(!posts){
            res.json({msg: 'No posts!!'});
        }
        res.json(posts)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }

});

//to show the users post
router.get('/me', auth, async (req, res) => {

    Post.find({userId:req.user.id})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error : '+err));

})

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

    let profile = await Profile.findOne({userId: req.user.id})

    const {text,title} = req.body;

    const newPost = new Post({
        userId:req.user.id,
        profileId: profile._id,
        text:text,
        title:title,
    });
    await newPost.save();
    res.json('Post Added');
});

//To update particular post of the user
router.post('/my/:id',[
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

    const updatePost=Post.find({_id:req.params.id,userId:req.user.id});
    if(updatePost)
    {
        Post.findById(req.params.id)
        .then(post =>{
            post.text=text;
            post.title=title;

            post.save()
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
    const deletePost=Post.find({_id:req.body.id,userId:req.user.id});
    if(deletePost)
    {
        Post.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Post Deleted'));
    }
    else{
        res.json('You are not Authoried to Delete this Post:)');
    }
});

module.exports = router;