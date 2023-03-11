const User = require('./../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createUser = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) res.status(400).json({ message: 'user name, email and password are required' }) //bad request

    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!email.match(validRegex)) res.status(400).json({ message: 'Invalid email' })

    const duplicate = await User.findOne({ email: email })
    if (duplicate) res.status(409).json({ message: "user already exists" }) // conflict
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        await newUser.save()
            .then(result => {
                res.status(201).json({ message: "New user created succesfully", data: result })
            })
            .catch(err => {
                res.status(500).json({ message: "Server error", Error: err.message })
            })
    }
    catch (err) {
        return res.status(500).json({ message: "Server error", Error: err.message })
    }
}

const authorizeUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'user email and password are required' }) //bad request
        }
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!email.match(validRegex)) {
            return res.status(400).json({ message: 'Invalid email' })
        }

        const foundUser = await User.findOne({ email: email })
        if (!foundUser) {
            return res.status(401).json({ message: "User not registered" }) // unauthorized status
        }

        const match = await bcrypt.compare(password, foundUser.password)
        if (match) {
            const accessToken = jwt.sign(
                { "id": foundUser._id, "email": foundUser.email, "name": foundUser.name, "role": foundUser.role },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '900s' }
            )

            const refreshToken = jwt.sign(
                { "id": foundUser._id, "email": foundUser.email, "name": foundUser.name, "role": foundUser.role },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            foundUser.refresh_token = refreshToken
            try {
                await foundUser.save()
            }
            catch (err) {
                return res.status(500).json({ message: "Could not save token in dtabase, server error", Error: err.message })
            }

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            return res.status(200).header("authenticate", accessToken).json({ message: "successfully logged in", token: accessToken, data: foundUser })
        }
        return res.status(401).json({ message: "Incorrect password" }) // unauthorized status
    }
    catch (err) {
        return res.status(500).json({ message: "Server error", Error: err.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        return res.status(200).json({ message: "All users", data: users })
    }
    catch(err){
        return res.status(500).json({ message: "Server error", Error: err.message })
    }
}

module.exports = {
    createUser,
    authorizeUser,
    getAllUsers
}