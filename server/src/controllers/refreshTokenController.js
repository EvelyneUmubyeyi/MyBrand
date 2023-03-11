const User = require('./../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies
        if (!cookies?.jwt){
            return res.status(401).json({ message: 'cookie named jwt not sent' })
        }
        console.log(cookies.jwt)
        const refreshToken = cookies.jwt

        const foundUser = await User.findOne({ refresh_token: refreshToken })
        console.log(foundUser)
        if (!foundUser){
            return res.status(403).json({ message: "No user with such token" }) // forbidden
        } 

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err,decoded) =>{
                if(err || decoded.email !== foundUser.email ||decoded.role !== foundUser.role ||
                    decoded.name !== foundUser.name ||decoded.id !== foundUser._id.toString()){
                    return res.status(403).json({message:"Invalid token"})
                } 
                const accessToken = jwt.sign(
                    { "id": foundUser._id, "email": foundUser.email, "name": foundUser.name, "role": foundUser.role },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '900s' }
                )

                return res.status(200).header("authenticate", accessToken).json({ message: "successfully updated access token", token: accessToken })
            }
        )
    }
    catch (err) {
        return res.status(500).json({ message: "Server error", Error: err.message })
    }
}

module.exports = handleRefreshToken