const dotenv =require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const connectDB = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = connectDB