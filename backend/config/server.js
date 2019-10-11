const express = require('express')
const bodyParser = require('body-parser')
const { PORT, HOST } =require('./config')
const mongooseConnection = require('../db').connection;

const router = require('../routers/route')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
<<<<<<< HEAD
=======
app.use(bodyParser.json())
>>>>>>> 27ce5ebb9c15ed4a8f1b904bee06734a54c8cbf9

app.use(cors())
app.options('*', cors())

app.use(router())
<<<<<<< HEAD
app.use(bodyParser.json())
=======

>>>>>>> 27ce5ebb9c15ed4a8f1b904bee06734a54c8cbf9


app.listen(PORT,HOST, err=>{
    if(err) throw err;
    console.log(`Running on http:${HOST}:${PORT}`)
})

module.exports = {
    app
}
