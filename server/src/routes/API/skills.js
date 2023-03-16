const {createSkill, getAllSkills, getSingleSkill} = require('./../../controllers/skillController')
const {verifyAdminJWT} = require('./../../middlewares/verifyJWT')
const express = require('express')
const skillsRouter = express.Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Skill:
 *              type:
 *                  object
 *              required:
 *                  -category
 *                  -specific_skills
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto generated id for a skill
 *                  category:
 *                      type: string
 *                      description: category of skills
 *                  specific_skills:
 *                      type: array
 *                      description: list of specific skills in that category
 *              example:
 *                  id: 6405fefacf3041930de557d6
 *                  category: Frontend development
 *                  specific_skills: [React Js, Angular Js]
 *        
 */

/**
* @swagger
  * tags:
  *   name: Skills
  *   description: The skills operations API
*/

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Returns the list of all the skills
 *     tags: [Skills]
 *     responses:
 *        200: 
 *          description: The list of all skills
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *        500:
 *          description: server error
 *   post:
 *     security: 
 *        - bearerAuth: []
 *     summary: Create a new skill
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *     responses:
 *       201:
 *         description: The skill was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *       500:
 *         description: Some server error
 */

// /**
//  * @swagger
//  * /skills:
//  *   get:
//  *     summary: Returns the list of all the skills
//  *     tags: [Skills]
//  *     responses:
//  *        200: 
//  *          description: The list of all skills
//  *          content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Skill'
//  *        500:
//  *          description: server error
//  *   post:
//  *     security: 
//  *        - bearerAuth: []
//  *     summary: Create a new skill
//  *     tags: [Blogs]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Blog'
//  *     responses:
//  *       201:
//  *         description: The blog was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Blog'
//  *       500:
//  *         description: Some server error
//  */

/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     summary: Get the skill by id
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The skill id
 *     responses:
 *       200:
 *         description: The skill description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *       404:
 *         description: The skill was not found
 *       500:
 *         description: Some server error
 * 
 */
 
skillsRouter.get('/', getAllSkills)
skillsRouter.get('/:id', getSingleSkill)
skillsRouter.post('/', verifyAdminJWT, createSkill)

module.exports = skillsRouter