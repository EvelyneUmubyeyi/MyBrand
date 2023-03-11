const blogsRouter = require('./API/blogs')
const queriesRouter = require('./API/queries')
const usersRouter = require('./API/users')

const express = require('express')
const router = express.Router()

router.use('/blogs', blogsRouter)
router.use('/queries', queriesRouter)
router.use('/users', usersRouter)

module.exports = router;
