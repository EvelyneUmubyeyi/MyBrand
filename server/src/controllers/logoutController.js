const User = require('./../models/user')

const handleLogout = async (req,res) =>{
    try {
        console.log('getting started')
        const cookies = req.cookies
        console.log(cookies)
        if (!cookies?.jwt){
            return res.sendStatus(204)
        }
        const refreshToken = cookies.jwt

        const foundUser = await User.findOne({ refresh_token: refreshToken })
        if (!foundUser){
            res.clearCookie('jwt',{httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
            return res.sendStatus(204)
        } 

        //Delete refresh token from the database
        foundUser.refresh_token = ''
            try {
                await foundUser.save()
                console.log('after save')
            }
            catch (err) {
                return res.status(500).json({ message: "Could not delete token in database, server error", Error: err.message })
            }

        res.clearCookie('jwt',{httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        console.log('before last line')
        return res.sendStatus(204)
    }
    catch (err) {
        return res.status(500).json({ message: "Server error", Error: err.message })
    }
}

module.exports = handleLogout