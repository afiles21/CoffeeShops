const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt')



module.exports = {

    register: (req, res) => {
        User.create(req.body)
            .then( newUser => {
                res.json(newUser);
                // create the userToken to be sent to the client
                const userToken = jwt.sign({
                id: newUser._id
                }, jwtConfig.secret)
                // create a cookie and attach userToken and send it to client
                res.cookie("usertoken", userToken, { httpOnly: true })
                .json(newUser)
            })
            .catch( err => res.status(400).json(err))
    },

    login: async(req, res) => {
        // await database retrieve request and store response in user variable
        const user = await User.findOne({ email: req.body.email })
        // check if user exists in database 
        if(user === null) {
            return res.status(400).json({msg: "Invalid Credentials"})
        }
        // await bcrypt password comparison and save boolean result to validPassword
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        // if password is invalid result in error
        if(!validPassword) {
            return res.status(400).json({msg: "Invalid Credentials"})
        }
        // create the userToken to be sent to the client
        const userToken = jwt.sign({
            id: user._id
        }, jwtConfig.secret)
        // create a cookie and attach userToken and send it to client
        res.cookie("usertoken", userToken, { httpOnly: true })
            .json(user)

    },

    logout: (req, res) => {
        res.clearCookie('usertoken')
        res.json({msg: 'Logged out'})
    },

    findAll: (req, res) => {
        User.find()
            .then( allUsers => res.json(allUsers))
            .catch( err => res.status(400).json(err))
    }

}