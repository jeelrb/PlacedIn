const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config') 
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')

const router = express.Router()

router.post('/', [

    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Enter password within given constraints').isLength({ min: 8 })

] , async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }   

    const { username, name, email, password } = req.body

    try {
        let user = await User.findOne({ username })
        if(user) {
            return res.status(400).json({ error: 'User already exists with this username' })
        }

        user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({ error: 'Email already exists '})
        }

        user = new User({
            name,
            username,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        
        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        try {
            const token = await jwt.sign(payload, config.get('jwtSecret'))
            res.json({token})
        } catch (error) {
            res.status(500).send('Server Error')
        }
        

    } catch (error) {
        console.log(error.message())
        res.status(500).send('Server Error')
    }

})

module.exports = router