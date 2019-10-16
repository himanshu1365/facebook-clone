const express = require('express')
const Users = require('../controller/Users')
const postData= require('../models/arrange-post')
const bodyParser = require('body-parser')
const app = express()
const { authMiddleware } = require('../middleware/middleware')

app.use(bodyParser.urlencoded({
    extended: true
}))


module.exports =()=> {
    const router = express.Router();
    
    // router.get('/postdata',(req,res)=>{
    //     postData.postData();
    // })

    router.post('/signup',(req,res)=>{
        Users.saveSignUpData(req,res)
    })
    
    router.post('/login',(req,res)=>{
        Users.checkLoginUser(req,res)
    })

    router.get('/home/profilePage',(req,res)=>{
        Users.particularUserData(req,res)
    })

    router.use(authMiddleware)

    router.get('/home/getPosts',async (req,res)=>{
        const response = await Users.getAllPosts(req,res);
        //console.log("router : "+response)
        return response
    })

    router.post('/post',(req, res)=>{
        Users.saveUserPost(req,res);
    })

    router.post('/home/comment',(req,res)=>{
        Users.userComment(req,res);
    })

    router.get('/home/getComment',(req,res)=>{
        Users.getComments(req,res);
    })

    return router
}
