const Comment = require('./../models/comment')
const Blog = require('./../models/blog')
const User = require('./../models/user')


const getAllComments = async (req, res) => {
    try {
        const blogId = req.baseUrl.split('/')[2]
        const comments = await Comment.find({ blogId: blogId }).sort({ createtAt: -1 })
        if(!comments){
            return res.status(404).json({ message: "No comments on that blog" })
        }
        return res.status(200).json({ message: "All comments on the blog", data: comments })
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", Error: err.message })
    }
}

const createComment = async (req, res) => {
    try {
        const blogId = req.baseUrl.split("/")[2]

        console.log(blogId)
        const { userId, comment } = req.body
        const newComment = new Comment({
            userId: userId,
            blogId: blogId,
            comment: comment
        })

        const blog = await Blog.findById(blogId)
        const user = await User.findById(userId)

        if (!blog) {
            return res.status(404).json({ message: "No blog with such ID" })
        } else if (!user) {
            return res.status(404).json({ message: "No user with such ID" })
        }

        await newComment.save()
        return res.status(201).json({ message: "new comment added on blog", data: newComment })
    }
    catch(err){
        return res.status(500).json({ message: "Something went wrong", Error: err.message }) 
    }
}

module.exports = { getAllComments, createComment }