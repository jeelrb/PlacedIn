const express = require('express')
const Profile = require('../models/Profile')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const router = express.Router()

//Create profile route
router.post('/', [ auth, [

    check('skills','Enter your skills').not().isEmpty()

]], async (req, res) => {
    
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

    } = req.body

    const profileFields = {}

    profileFields.userId = req.user.id
    if(company)profileFields.company = company
    if(portfolio)profileFields.portfolio = portfolio
    if(linkedIn)profileFields.linkedIn = linkedIn
    if(instagram)profileFields.instagram = instagram
    if(facebook)profileFields.facebook = facebook
    if(twitter)profileFields.twitter = twitter
    if(skills){
        profileFields.skills = skills.split(',').map((skill) => skill.trim())
    }

    try {
        let profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
    } catch (error){
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

