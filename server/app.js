const express = require('express')
const mongoose = require('mongoose')
const router = require('./src/routes/routes')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cookieParser = require('cookie-parser')

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

                cookieAuth:{
                    type: 'apiKey',
                    in: 'cookie',
                    name:'jwt'
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

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

//connect to mongo db
const dbURI = 'mongodb+srv://evelyne:evelyne@cluster0.pfroeg1.mongodb.net/MyBrand?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected')
        app.listen(3000)
    })
    .catch((err) => console.log(err))


app.get('/', (req, res) => {
    res.send('API endpoints')
})

//parses request body
app.use(express.json())

//middleware for cookies
app.use(cookieParser())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    next()
})

app.use(router)

// export default app;