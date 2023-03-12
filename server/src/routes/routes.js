const blogsRouter = require('./API/blogs')
const queriesRouter = require('./API/queries')
const usersRouter = require('./API/users')
const likesRouter = require('./API/likes')
const commentsRouter = require('./API/comments')

const express = require('express')
const router = express.Router()

router.use('/blogs', blogsRouter)
router.use('/blogs/:id/likes', likesRouter)
router.use('/queries', queriesRouter)
router.use('/users', usersRouter)
router.use('/blogs/:id/comments', commentsRouter)

module.exports = router;
