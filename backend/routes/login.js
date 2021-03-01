const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config') 
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')

const router = express.Router()


router.post('/', [

    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()

] , async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }  

    const { username, password } = req.body

    try {
        let user = await User.findOne({ username })
        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        try {
            const token = await jwt.sign(payload, config.get('jwtSecret'))
            res.json({ token })
        } catch (error) {
            res.status(500).send('Server Error')
        }

    } catch (error) {
        console.log(error.message())
        res.status(500).send('Server Error')
    }

})

module.exports = router