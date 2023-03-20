const Query = require('./../models/query')

const getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 })
        return res.status(200).json({ status: 'success', message: "All queries", data: queries })
    }
    catch(err){
        return res.status(500).json({status: 'error', message:"server error", Error: err.message})
    }
}

const postQuerie = async (req, res) => {
    try{
        const {name, email, phone_number, message} = req.body

        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!email.match(validRegex)){
            return res.status(400).json({ status: 400, message: 'Invalid email' })
        } 

        const newQuery = new Query({name: name, email:email, phone_number: phone_number, message: message})
        await newQuery.save()
        return res.status(201).json({ status: 201, message: "Created a querie", data: newQuery })
    }    
    catch(err){
        return res.status(500).json({status: 500, message:"server error", Error: err.message})
    }
}

module.exports = { getAllQueries, postQuerie }