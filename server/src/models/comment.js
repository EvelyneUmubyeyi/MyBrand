const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    userId:{
        type:String,
        required: true
    },
    blogId:{
        type:String,
        required: true
    },
    comment:{
        type:String,
        required: true
    }
}, {timestamps:true})

const Comment = new mongoose.model('Comment', commentSchema)

module.exports = Comment