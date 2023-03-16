const blogsRouter = require('./API/blogs')
const usersRouter = require('./API/users')
const likesRouter = require('./API/likes')
const commentsRouter = require('./API/comments')
const queriesRouter = require('./API/queries')
const skillsRouter = require('./API/skills')
const projectsRouter = require('./API/projects')
const projectLikesRouter = require('./API/projectLikes')

const express = require('express')
const router = express.Router()

router.use('/blogs', blogsRouter)
router.use('/blogs/:id/likes', likesRouter)
router.use('/queries', queriesRouter)
router.use('/users', usersRouter)
router.use('/blogs/:id/comments', commentsRouter)
router.use('/queries', queriesRouter)
router.use('/skills', skillsRouter)
router.use('/projects/:id/likes', projectLikesRouter)
router.use('/projects', projectsRouter)


module.exports = router;
