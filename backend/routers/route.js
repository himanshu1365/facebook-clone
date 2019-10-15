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

    router.get('/home/profilePage',(req,res)=>{
        Users.particularUserData(req,res)
    })
    



    router.use(authMiddleware)

    router.get('/home/getPosts',async (req,res)=>{
        const response = await Users.getAllPosts(req,res);
        return response
    })

    router.post('/post',(req, res)=>{
        console.log(req.body)
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