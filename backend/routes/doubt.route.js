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
router.get('/my', auth, async (req, res) => {

    const post = await Post.find({userId: req.user.id}).populate('profileId', ['avatar']).populate('userId',['name'])

    if(!post) {
        res.json({msg: 'You have not added any post!!'});
    } else {
        res.json(post)
    }

})

//Post by id
router.get('/:id', auth, async (req, res) => {

    const post = await Post.findOne({ userId: req.user.id, _id: req.params.id })
    if(post) {
        res.json(post)
    } else {
        res.json({msg: 'Post does not exist'})
    }

})

//to add the new post by the user
router.post('/add',[
    auth,
    check('text', 'Text is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
],
async (req,res) => {
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
router.put('/my/:id',[
    auth,
    [
        check('text', 'Text is required').not().isEmpty(),
        check('title', 'Title is required').not().isEmpty(),
    ]
],
async (req,res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    let loggedUser = await User.findOne({_id:req.user.id });
    if(!loggedUser) {
        return res.status(400).json({ error: 'Please try loging in again' })
    }
    
    const { text, title } = req.body;

    const updatePost = Post.find({ _id: req.params.id, userId: req.user.id });
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
router.delete('/my/:id', auth, async (req, res) => {

    const deletepost = await Post.find({ _id: req.params.id, userId: req.user.id })

    if(deletepost) {

        await Post.findByIdAndDelete(req.params.id)
 
   }else{

        res.json({msg: 'You are not Authoried to Delete this Post'});

    }

    

    res.json({msg: 'Post Deleted'})

    
});


router.put('/comment/:id', auth, async (req, res) => {


    const user = await User.findById(req.user.id)
    const post = await Post.findOne({ userId: req.user.id, _id: req.params.id })

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

router.get('/comment/:id', auth, async (req, res) => {

    const post = await Post.findOne({ userId: req.user.id, _id: req.params.id })
    res.json(post.comments)

})

module.exports = router;