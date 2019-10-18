const express = require('express')
const Users = require('../controller/Users')
const bodyParser = require('body-parser')
const app = express()
const { authMiddleware } = require('../middleware/middleware')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

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

    router.get('/home/getComment',(req,res)=>{
        Users.getComments(req,res);
    })

    router.use(authMiddleware)

    router.get('/home/getPosts',async (req,res)=>{
        const response = await Users.getAllPosts(req,res);
        return response
    })

    router.post('/post',(req, res)=>{
        Users.saveUserPost(req,res);
    })

    router.post('/home/comment',(req,res)=>{
        console.log('hello')
        Users.userComment(req,res);
    })

   

    router.post('/post/like',(req,res)=>{
        Users.saveLikes(req,res)
    })

    router.delete('/post/like',(req,res)=>{
        Users.deleteLikes(req,res)
    })

    router.post('/post/sharePost',(req,res)=>{
        Users.saveSharedPost(req,res)
    })

    return router
}
