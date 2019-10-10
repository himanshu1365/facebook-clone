const express = require('express')
const bodyParser = require('body-parser')
const { PORT, HOST } =require('./config')


const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.listen(PORT,HOST, err=>{
    if(err) throw err;
    console.log(`Running on http:${HOST}:${PORT}`)
})