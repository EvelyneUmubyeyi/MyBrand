const mongoose = require('mongoose')
const Schema = mongoose.Schema

const skillSchema = new Schema({
    category:{
        type:String,
        required: true
    },
    specific_skills:{
        type:Array,
        required: true
    }
}, {timestamps:true})

const Skill = new mongoose.model('Skill', skillSchema)

module.exports = Skill