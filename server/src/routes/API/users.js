const {
    createUser,
    authorizeUser,
    getAllUsers
} = require('./../../controllers/userController')

const handleRefreshToken = require('./../../controllers/refreshTokenController')
const handleLogout = require('./../../controllers/logoutController')
const express = require('express')
const usersRouter = express.Router()

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
 *  name: Users
 *  description: The user creation and authentication API
 * 
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *          description: bad request i.e required fields are not complete or invalid email
 *       409:
 *          description: Conflict i.e user email is already registered
 *       500:
 *         description: Some server error
 *       
 */
usersRouter.post('/', createUser)
/**
 * @swagger
 * /users/auth:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         headers:
 *          Set-Cookie:
 *            schema: 
 *              type: string
 *              example: jwt=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *          description: required fields are not complete or invalid email
 *       401:
 *          description: user not registered
 *       500:
 *         description: Some server error
 */
usersRouter.post('/auth', authorizeUser)

/**
 * @swagger
 * /users/refresh:
 *   get:
 *     security:
 *          - cookieAuth: []
 *     summary: generate a new access token as it lasts a short time
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The access token was successfully updated
 *       401:
 *          description: user not registered
 *       403:
 *          description: user not registered
 *       500:
 *         description: Some server error
 */
usersRouter.get('/refresh', handleRefreshToken)

/**
 * @swagger
 * /users/logout:
 *      get:
 *          security:
 *              - cookieAuth: []
 *          summary: Logging out a user by deleting the jwt cookie used for authentication
 *          tags: [Users]
 *          responses:
 *              204:
 *                  description: Successfully logged out
 *              500:
 *                  description: Some server error
 */
usersRouter.get('/logout', handleLogout)
/**
 * @swagger
 * /users:
 *      get:
 *          tags: [Users]
 *          summary: Getting all the users
 *          responses:
 *              200:
 *                  description: Retrieved all users successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                          $ref: '#/components/schemas/User'   
 *              500:
 *                  description: Some server error
 */
usersRouter.get('/', getAllUsers)

module.exports = usersRouter; 