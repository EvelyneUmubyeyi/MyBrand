const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    likes:{
        type:Number,
        default: 0,
    },
    link:{
        type:String,
        required: true
    },
    like_emails:{
        type: Array,
        default:[]
    }
}, {timestamps:true})

const Project = new mongoose.model('Project', projectSchema)

module.exports = Project