const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const blogSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    hook:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    likes:{
        type:Number,
        default:0,
    },
    comments:{
        type:Number,
        default:0,
    },
    author_name:{
        type:String,
        required:true,
    },
    author_image:{
        type:String,
        required:true,
    },
    like_emails:{
        type : Array , 
        default: []
    }

}, {timestamps:true})

const Blog = new mongoose.model('Blog', blogSchema)

module.exports = Blog
