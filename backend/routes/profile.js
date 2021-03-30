const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const User = require('../models/User')
const Profile = require('../models/Profile')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './client/public/images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

//Create / Update profile route
router.post('/', [ auth, upload.single('avatar'), [

    check('skills','Enter your skills').not().isEmpty()

] ], async (req, res) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({ error: errors.array() })
    }

    const {
        skills,
        portfolio,
        company,
        linkedIn,
        instagram,
        facebook,
        twitter,
        cfUserName, 
        ccUserName,
        githubUserName
    } = req.body

    let avatar
    if(req.file) {
        avatar = req.file.filename
    }else if(req.body.avatar){
        avatar = req.body.avatar
    }

    const profileFields = {}

    profileFields.userId = req.user.id
    if(avatar)profileFields.avatar = avatar
    if(company)profileFields.company = company
    if(portfolio)profileFields.portfolio = portfolio
    if(linkedIn)profileFields.linkedIn = linkedIn
    if(instagram)profileFields.instagram = instagram
    if(facebook)profileFields.facebook = facebook
    if(twitter)profileFields.twitter = twitter
    if(cfUserName)profileFields.cfUserName = cfUserName
    if(ccUserName)profileFields.ccUserName = ccUserName
    if(githubUserName)profileFields.githubUserName = githubUserName
    if(skills){
        profileFields.skills = skills.split(',').map((skill) => skill.trim())
    }
    try {

        let profile = await Profile.findOne({ userId: req.user.id })
        if(profile){
            await Profile.findByIdAndDelete(profile._id)
        }

        let user = await User.findById(req.user.id)
        user.avatar = avatar
        await user.save()

        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)

    } catch (error){
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

//Get profile of currently login user
router.get('/me', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ userId: req.user.id }).populate('userId', ['name', 'username', 'email', 'avatar'])
        if(!profile) {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.json(profile)

    } catch (error){
        console.log(error.message)
        res.status(500).send('Server Error')
    }

})

//Get profile of user by id
router.get('/:id', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ userId: req.params.id }).populate('userId', ['name', 'username', 'email', 'avatar'])
        if(!profile) {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.json(profile)

    } catch (error){
        console.log(error.message)
        res.status(500).send('Server Error')
    }

})

//Get profile of all user
router.get('/', auth, async (req, res) => {

    try {

        const profiles = await Profile.find().populate('userId', [ 'name', 'email', 'username', 'avatar' ])
        res.json(profiles)

    } catch (error){
        console.log(error.message)
        res.status(500).send('Server Error')
    }

})

//Delete profile of the logged in user
router.delete('/', auth, async (req, res) => {

    try {

        await Profile.findOneAndDelete({ userId: req.user.id })
        await User.findOneAndDelete({ _id: req.user.id })
        res.json({ msg: 'User Deleted' })

    } catch ( error ) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }

})

//Add Codeforces Profile route
router.put('/codeforcesProfile', [ auth, [
    
    check('cfUserName', 'Enter codeforces handle').not().isEmpty()

]], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }

    const { cfUserName, cfRating, cfMaxRating, cfRank, cfMaxRank, cfProfile } = req.body

    try {

        const profile = await Profile.findOne({ userId: req.user.id })
        profile.codeforcesProfile = {
            cfUserName, cfRating, cfMaxRating, cfRank, cfMaxRank, cfProfile
        }
        await profile.save()
        res.json(profile)

    } catch (error){
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

//Delete codeforces profile
router.delete('/codeforcesProfile', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ userId: req.user.id })
        profile.codeforcesProfile = {}
        await profile.save()
        res.json(profile)

    } catch ( error ) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
    
})

//Add Codechef Profile route
router.put('/codechefProfile', [ auth, [
    
    check('ccUserName', 'Enter codechef handle').not().isEmpty()

]], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }

    const { ccUserName, ccRating, ccMaxRating, ccStars, ccProfile } = req.body

    try {      
        const profile = await Profile.findOne({ userId: req.user.id })
        console.log(profile)
        profile.codechefProfile = {
            ccUserName, ccRating, ccMaxRating, ccStars, ccProfile
        }
        await profile.save()
        res.json(profile)
    } catch (error){
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

//Delete codechef profile
router.delete('/codechefProfile', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ userId: req.user.id })
        profile.codechefProfile = {}
        await profile.save()
        res.json(profile)
    } catch ( error ) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
    
})

//Add Github Profile route
router.put('/githubProfile', [ auth, [
    
    check('githubUserName', 'Enter github handle').not().isEmpty()

]], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }

    const { githubUserName, githubRepos } = req.body

    try {
        
        const profile = await Profile.findOne({ userId: req.user.id })
        profile.github.githubUserName = githubUserName
        profile.github.githubRepos = githubRepos
        await profile.save()
        res.json(profile)

    } catch (error){
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

//Delete github profile
router.delete('/githubProfile', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ userId: req.user.id })
        profile.github = {}
        await profile.save()
        res.json(profile)
    } catch ( error ) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
    
})

//Add education route
router.put('/education', [ auth, [

    check('college', 'Enter college name').not().isEmpty(),
    check('branch', 'Enter the branch of study').not().isEmpty(),
    check('batch', 'Enter the batch').not().isEmpty(),
    check('degree', 'Enter the degree').not().isEmpty()

]], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }

    const { college, branch, degree, batch } = req.body

    try {

        const profile = await Profile.findOne({ userId: req.user.id })
        const newEdu = {
            college,
            branch,
            degree,
            batch,
        }

        if(!profile.education)profile.education = []
        profile.education.unshift(newEdu)
        await profile.save()
        res.json(profile)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

//Delete education
router.delete('/education/:edu_id', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ userId: req.user.id })
        const removeIndex = profile.education.map(edu => edu._id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }

})

module.exports = router