const express = require('express')
const mongoose = require('mongoose')
const router = require('./src/routes/routes')
const app = express()

//connect to mongo db
const dbURI = 'mongodb+srv://evelyne:evelyne@cluster0.pfroeg1.mongodb.net/MyBrand?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
    console.log('connected')
    app.listen(3000)
})
.catch((err)=>console.log(err))
 

// app.set('view engine', 'ejs');

// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res)=>{
    res.send('API endpoints')
})

//parses request body
app.use(express.json())

app.use(router)

// export default app;