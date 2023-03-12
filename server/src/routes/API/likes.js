const {likeAndUnlikeBlog, getAllLikes} = require('./../../controllers/likeController')
const {verifyUserJWT} = require('./../../middlewares/verifyJWT')
const express = require('express')
const likesRouter = express.Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Blog:
 *              type:
 *                  object
 *              required:
 *                  -title
 *                  -hook
 *                  -image
 *                  -body
 *                  -author_name
 *                  -author_image
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto generated id for a blog
 *                  title:
 *                      type: string
 *                      description: Blog title
 *                  hook:
 *                      type: string
 *                      description: A few sentences that introduce the blog
 *                  image:
 *                      type: string
 *                      description: Cover photo of the blog
 *                  body:
 *                      type: string
 *                      description: main content of the blog
 *                  likes:
 *                      type: number
 *                      description: number of people who liked the blog
 *                  comments:
 *                      type: number
 *                      description: number of comments on the blog
 *                  author_name:
 *                      type: string
 *                      description: name of blog's author
 *                  author_image:
 *                      type: string
 *                      description: image of blog's author
 *                  like_emails:
 *                      type: array
 *                      description: array of emails of the people who liked the blog
 *              example:
 *                  id: 6405fefacf3041930de557d6
 *                  title: How I became a better programmer
 *                  hook: Things you can do to become a better programmer
 *                  image: https://res.cloudinary.com/doxc03jzw/image/upload/v1677490243/fvdnihb3o2mek2lnnxhe.jpg
 *                  body: Lorem ipsum
 *                  likes: 5
 *                  comments: 6
 *                  author_name: Evelyne Umubyeyi
 *                  author_image: https://res.cloudinary.com/doxc03jzw/image/upload/v1677490243/fvdnihb3o2mek2lnnxhe.jpg
 *                  like_emails: [e.umubyeyi@alustudent.com, miles@gmail.com]
 *        
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              -name
 *              -email
 *              -password
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto generated user id
 *              name:
 *                  type: string
 *                  description: User name
 *              email:
 *                  type: string
 *                  description: The email of the user 
 *              password:
 *                  type: string 
 *                  description: Password set by the user
 *              role:
 *                  type: string 
 *                  description: Role of the user whether admin or normal user
 *              token:
 *                  type: string
 *                  description: Refresh token generated when user logs in to help recreate access tokens
 *          example:
 *              id: 6405fefacf3041930de557d6
 *              name: Evelyne Umubyeyi
 *              email: evelyne@gmail.com
 *              password: $2b$10$2wf.EnA8/taKGcG3O/DxqefTFhRzqSXzWv.gr5kB672xAMb46dP4m
 *              role: user
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDkwMzA5N2EzOTUyNTRiMThhZTcwNyIsImVtYWlsIjoiZXZlbHluZUBnbWFpbC5jb20iLCJuYW1lIjoiRXZlbHluZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODM1MDA5NiwiZXhwIjoxNjc4NDM2NDk2fQ.5SHeTEUFyX77PdU_waqucyP66ccJpIQ50UTkOhHqbnM
 * */

/**
 * @swagger
 * tags:
 *      name: Likes
 *      description: Likes operation UI 
 */

/**
 * @swagger
 * /blogs/{id}/likes:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Like or unlike the blog
 *    tags: [Likes]
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
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: successfully liked or unliked a blog
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      404:
 *        description: Blog not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /blogs/{id}/likes:
 *  get:
 *    summary: All the likes on a blog
 *    tags: [Likes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *    responses:
 *      200:
 *        description: Emails of all users who liked the blog and the total number of likes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                  type: string
 *              example: ["user1@gmail.com", "user2@gmail.com", "user3@gmail.com"]
 *      404:
 *        description: Blog not found
 *      500:
 *        description: Some error happened
 */
likesRouter.get('/', getAllLikes)
likesRouter.patch('/', verifyUserJWT, likeAndUnlikeBlog)


module.exports = likesRouter