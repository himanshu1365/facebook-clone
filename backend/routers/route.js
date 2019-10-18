const express = require('express')
const Users = require('../controller/Users')
const bodyParser = require('body-parser')
const app = express()
const { authMiddleware } = require('../middleware/middleware')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())


module.exports = () =>{
    app.post('/signup',(req,res)=>{
        Users.saveSignUpData(req,res)
    })
    
    app.post('/login',(req,res)=>{
        Users.checkLoginUser(req,res)
    })

    app.get('/home/profilePage',(req,res)=>{
        Users.particularUserData(req,res)
    })

    app.use(authMiddleware)
    //route to get posts from backend
    app.get('/post',async (req,res)=>{
        const response = await Users.getAllPosts(req,res);
        return response
    })
    //route to save user posts in backend
    app.post('/post',(req, res)=>{
        Users.saveUserPost(req,res);
    })
    //route to save comments of post
    app.post('/post/comment',(req,res)=>{
        Users.userComment(req,res);
    })
    //route to get comments of post
    app.get('/post/comment',(req,res)=>{
        Users.getComments(req,res);
    })

    app.post('/post/like',(req,res)=>{
        Users.saveLikes(req,res)
    })

    app.delete('/post/like',(req,res)=>{
        Users.deleteLikes(req,res)
    })

    app.post('/post/sharePost',(req,res)=>{
        Users.saveSharedPost(req,res)
    })

    return app
}
