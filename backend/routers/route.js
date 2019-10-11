const express = require('express')
const Users = require('../controller/Users')

module.exports =()=> {
    const router = express.Router();
    
    router.post('/signup',(req,res)=>{
        Users.saveSignUpData(req,res)
    })

    router.post('/login',(req,res)=>{
        Users.checkLoginUser(req,res)
    })

    router.get('/login/loginAuthentication',(req,res)=>{
        let status = Users.checkUserToken(req,res)
    })

    return router
}