const express = require('express')
const bodyParser = require('body-parser')
const { PORT, HOST } =require('./config')
const mongooseConnection = require('../db').connection;
const router = require('../routers/route')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.options('*', cors())


app.use(router())
app.use(bodyParser.json())

// app.use(cors())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

app.listen(PORT,HOST, err=>{
    if(err) throw err;
    console.log(`Running on http:${HOST}:${PORT}`)
})


  module.exports = {
      app
  }