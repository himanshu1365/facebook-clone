const express = require('express')
const bodyParser = require('body-parser')
const { PORT, HOST } =require('./config')
const mongooseConnection = require('../db').connection;
const path = require('path')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.listen(PORT,HOST, err=>{
    if(err) throw err;
    console.log(`Running on http:${HOST}:${PORT}`)
})


app.get('/',function(req,res) {
        let reqPath = path.join(__dirname, '../../Client/views/index.html')
        res.sendFile(reqPath)
  });

  module.exports = {
      app
  }