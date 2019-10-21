const express = require('express')
const bodyParser = require('body-parser')
const { PORT, HOST,SECRET } =require('./config')
const mongooseConnection = require('../db').connection;
const router = require('../routers/route')
const path = require('path')
const reqPath = path.join(__dirname, '../../Client/assets');
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))


app.use(bodyParser.json())
app.use(cors())
app.options("*",cors())

app.use('/Client/assets',express.static('public'))
app.use(router())
app.listen(PORT,HOST, err=>{
    if(err) throw err;
    console.log(`Running on http:${HOST}:${PORT}`)
})

module.exports = {
    app
}
