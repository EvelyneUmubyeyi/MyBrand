const express = require('express')
const mongoose = require('mongoose')
const router = require('./src/routes/routes')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cookieParser = require('cookie-parser')
const connectDB = require('./src/configs/db.config')
const dotenv = require('dotenv')
const cors = require('cors')


const options = {
    definition: {
        openapi: "3.0.0",
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },

                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'jwt'
                }
            },
        },
        info: {
            title: "Umubyeyi Evelyne portfolio",
            version: "1.0.0",
            description: "API for my portfolio"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ['./src/routes/API/*.js'],
}

const specs = swaggerJsDoc(options)

const app = express()
app.use(cors())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

const port = process.env.PORT
//connect to mongo db
connectDB
    .then((result) => {
        console.log('connected')
        app.listen(port)
    })
    .catch((err) => console.log(err))


app.get('/', (req, res) => {
    return res.status(200).json({status: 200, message: 'Welcome to Umubyeyi Evelyne portolio API'})
})

//parses request body
app.use(express.json())

//middleware for cookies
app.use(cookieParser())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.use(router)

module.exports = app
// export default app;