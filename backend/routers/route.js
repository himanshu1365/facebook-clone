const express = require('express')
const Users = require('../controller/Users')
const bodyParser = require('body-parser')
const app = express()
const { authMiddleware } = require('../middleware/middleware')

app.use(bodyParser.urlencoded({
    extended: true
}))

module.exports =()=> {
    const router = express.Router();
    
    router.post('/signup',(req,res)=>{
        Users.saveSignUpData(req,res)
    })
    
    router.post('/login',(req,res)=>{
        Users.checkLoginUser(req,res)
    })
    router.post('/home',(req, res)=>{
        Users.userPost(req,res);
    })
    return router
}