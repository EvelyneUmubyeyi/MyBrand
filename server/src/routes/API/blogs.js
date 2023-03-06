const {
    createBlog,
    getAllBlogs,
    getOneBlog,
    updateBlog,
    deleteBlog
} = require('./../../controllers/blogController')
const express = require('express')
const blogRouter = express.Router()

blogRouter.get('/', getAllBlogs)
blogRouter.get('/:id', getOneBlog)
blogRouter.post('/',createBlog)
blogRouter.patch('/:id',updateBlog)
blogRouter.delete('/:id',deleteBlog)

module.exports = blogRouter;