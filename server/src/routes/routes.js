const blogsRouter = require('./API/blogs')
const express = require('express')
const router = express.Router()

router.use('/blogs', blogsRouter)

module.exports = router;
