const {verifyAdminJWT} = require('./../../middlewares/verifyJWT')
const {getAllQueries, postQuerie} = require('./../../controllers/queryController')
const express = require('express')
const queriesRouter = express.Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Querie:
 *              type:
 *                  object
 *              required:
 *                  -name
 *                  -email
 *                  -message
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto generated id for a query
 *                  email:
 *                      type: string
 *                      description: email of the user submitting the query
 *                  phone_number:
 *                      type: string
 *                      description: phone number of the user submitting the query
 *                  message:
 *                      type: string
 *                      description: query submitted by the user
 *              example:
 *                  name: Umubyeyi Evelyne
 *                  email: e.umubyeyi@alustudent.com
 *                  phone_number: +250788888888
 *                  message: Lorem ipsum        
 */

/**
* @swagger
  * tags:
  *   name: Queries
  *   description: The queries operations API
*/

/**
 * @swagger
 * /queries:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Returns all the queries submitted
 *    tags: [Queries]
 *    responses:
 *      200:
 *        description: all queries on a blog
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Querie'
 *      400:
 *        description: Invalid email
 *      500:
 *        description: Some error happened
 * 
 *  post:
 *    summary: Create a new query
 *    tags: [Queries]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Querie'
 *    responses:
 *      200:
 *        description: successfully added a query
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Querie'
 *      500:
 *        description: Some error happened
 */

queriesRouter.get('/',verifyAdminJWT, getAllQueries)
queriesRouter.post('/', postQuerie)

module.exports = queriesRouter; 