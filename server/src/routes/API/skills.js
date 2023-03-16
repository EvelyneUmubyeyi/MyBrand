const {createSkill, getAllSkills, getSingleSkill} = require('./../../controllers/skillController')
const {verifyAdminJWT} = require('./../../middlewares/verifyJWT')
const express = require('express')
const skillsRouter = express.Router()

skillsRouter.get('/', getAllSkills)
skillsRouter.get('/:id', getSingleSkill)
skillsRouter.post('/', verifyAdminJWT, createSkill)

module.exports = skillsRouter