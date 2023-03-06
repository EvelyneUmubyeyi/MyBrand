const Blog = require('./../models/blog')

const createBlog = async (req, res) =>{
    const {title, hook, image, body, author_name, author_image} = req.body
    const blog = new Blog({title:title, hook:hook, image:image, body:body, author_name:author_name, author_image:author_image})
    blog.save()

    .then(result =>{
        return result.status(201).json({
            message:"Blog created successfully",
            data:blog,
        })
    })
    .catch(err=>{
        return res.status(500).json({message:"Something went wrong", Error:err})
    })
}

const getAllBlogs = async (req, res) =>{
}

const getOneBlog = async (req, res) =>{

}

const updateBlog  = async (req, res) =>{

}

const deleteBlog  = async (req, res) =>{

}

module.exports = {
    createBlog,
    getAllBlogs,
    getOneBlog,
    updateBlog,
    deleteBlog
}