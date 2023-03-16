const mongoose = require('mongoose')
const Schema = mongoose.Schema

const querySchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone_number:{
        type:String
    },
    message:{
        type:String,
        required: true
    },
}, {timestamps:true})

const Query = new mongoose.model('Query', querySchema)

module.exports = Query