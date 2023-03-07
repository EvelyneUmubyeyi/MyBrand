const blogsRouter = require('./API/blogs')
const queriesRouter = require('./API/queries')

const express = require('express')
const router = express.Router()

router.use('/blogs', blogsRouter)
router.use('/queries', queriesRouter)

module.exports = router;
