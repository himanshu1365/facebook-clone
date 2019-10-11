const app = require('../config/server')
const express = require('express')
const path = require('path')
const {Router} = require('express')
const cors = require('cors')

var whitelist = ['http://localhost:5500', 'http://localhost:9000']
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

module.exports =()=> {
    const router = Router();

    router.post('/signup',cors(),function(req,res){
        console.log(req.body)
    })
    
    return router
}