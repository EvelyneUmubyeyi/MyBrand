const {likeAndUnlike} = require('./../../controllers/projectController')
const {verifyUserJWT} = require('./../../middlewares/verifyJWT')
const express = require('express')
const projectLikesRouter = express.Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Project:
 *              type:
 *                  object
 *              required:
 *                  -title
 *                  -image
 *                  -link
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto generated id for a project
 *                  title:
 *                      type: string
 *                      description: project title
 *                  image:
 *                      type: string
 *                      description: cover image of the project
 *                  likes:
 *                      type: number
 *                      description: number of likes on a project
 *                  link:
 *                      type: string
 *                      description: link to the deployed project or repository
 *                  like_emails:
 *                      type: array
 *                      description: list of all the people that liked the project
 *              example:
 *                  title: Reddit clone
 *                  image: https://res.cloudinary.com/doxc03jzw/image/upload/v1677490243/fvdnihb3o2mek2lnnxhe.jpg
 *                  likes: 2
 *                  link: https://github.com/
 *                  like_emails: [e.umubyeyi@alustudent.com, ngamije@alustudent.com]
 *        
 */

/**
* @swagger
  * tags:
  *   name: Projects
  *   description: The projects operations API
*/

/**
 * @swagger
 * /projects/{id}/likes:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Like or unlike the project
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The project id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              id: 6405fefacf3041930de557d6
 *    responses:
 *      200:
 *        description: successfully liked or unliked a project
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      404:
 *        description: Project not found
 *      500:
 *        description: Some error happened
 */

projectLikesRouter.patch('/', verifyUserJWT, likeAndUnlike)

module.exports = projectLikesRouter