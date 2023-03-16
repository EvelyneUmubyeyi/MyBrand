const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyUserJWT = async (req,res,next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({message:"Not logged in"})
    }     
    const token = await authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) =>{
            if(err){
                return res.status(403).json({message:"Invalid token"})
            } 
            req.body.email = decoded.email
            req.body.role = decoded.role
            req.body.name = decoded.name
            req.body.id = decoded.id
            return next()
        }
    )
}

const verifyAdminJWT = async (req,res,next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({message:"Not logged in"})
    } 
    console.log(authHeader) // Bearer token
    const token = await authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) =>{
            if(err){
                return res.status(403).json({message:"Invalid token"})
            } 
            req.email = decoded.email
            req.role = decoded.role
            req.name = decoded.name
            req.id = decoded.id
            if(decoded.role !== 'admin'){
                return res.status(401).json({message:"Unauthorized, only for admin"})
            } 
            return next()
        }
    )
}

module.exports = {verifyUserJWT,verifyAdminJWT}