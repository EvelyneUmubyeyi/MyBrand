const {
    createBlog,
    getAllBlogs,
    getOneBlog,
    updateBlog,
    deleteBlog
} = require('./../../controllers/blogController')
const {verifyAdminJWT} = require('./../../middlewares/verifyJWT')
const express = require('express')
const blogRouter = express.Router()

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
  * tags:
  *   name: Blogs
  *   description: The blogs operations API
*/

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Returns the list of all the blogs
 *     tags: [Blogs]
 *     responses:
 *        200: 
 *          description: The list of all blogs
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *        500:
 *          description: server error
 *   post:
 *     security: 
 *        - bearerAuth: []
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: The blog was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: The blog was not found
 *   patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the blog by the id
 *    tags: [Blogs]
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
 *            $ref: '#/components/schemas/Blog'
 *    responses:
 *      200:
 *        description: The blog was updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Remove the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog was deleted
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *       404:
 *         description: The blog was not found
 *       500:
 *        description: Some error happened
 */
blogRouter.get('/', getAllBlogs)
blogRouter.get('/:id', getOneBlog)
blogRouter.post('/',verifyAdminJWT, createBlog)
blogRouter.patch('/:id',verifyAdminJWT,updateBlog)
blogRouter.delete('/:id',verifyAdminJWT,deleteBlog)

module.exports = blogRouter;