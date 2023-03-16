const {createComment, getAllComments} = require('./../../controllers/commentController')
const {verifyUserJWT} = require('./../../middlewares/verifyJWT')
const express = require('express')
const commentsRouter = express.Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Comment:
 *              type:
 *                  object
 *              required:
 *                  -blogId
 *                  -userId
 *                  -comment
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto generated id for a blog
 *                  blogId:
 *                      type: string
 *                      description: id of the blog to add command to
 *                  userId:
 *                      type: string
 *                      description: id of the commenting user
 *                  comment:
 *                      type: string
 *                      description: comment content
 *              example:
 *                  id: 6405fefacf3041930de557d6
 *                  blogId: 6405fefacf3041930de557d7
 *                  userId: 6405fefacf3041930de557d8
 *                  comment: Lorem ipsum        
 */

/**
* @swagger
  * tags:
  *   name: Comments
  *   description: The comments operations API
*/

/**
 * @swagger
 * /blogs/{id}/comments:
 *  get:
 *    summary: Returns all the comments on a blog
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *    responses:
 *      200:
 *        description: all comments on a blog
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      500:
 *        description: Some error happened
 * 
 *  post:
 *    security: 
 *        - bearerAuth: []
 *    summary: Create a new comment
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example: 
 *              userId: 6405fefacf3041930de557d6
 *              comment: Lorem ipsum
 *    responses:
 *      200:
 *        description: successfully commented on a blog
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      500:
 *        description: Some error happened
 */

commentsRouter.post('/', verifyUserJWT, createComment)
commentsRouter.get('/', getAllComments)

module.exports = commentsRouter