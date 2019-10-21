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
       // console.log("hello")
        Users.checkLoginUser(req,res)
    })

    
   
    
    router.use(authMiddleware)
    router.get('/profilePage',(req,res)=>{
        Users.particularUserData(req,res)
    })
    router.patch('/profilePage/updatePassword',(req,res)=>{
        console.log(req.body.oldPwd)
        console.log(req.body.newPassword)
       // console.log(req.headers)
       Users.updatePassword(req,res);

    })
    router.patch('/profilePage/updateUsername',(req,res)=>{
        console.log(req.body.existUname)
        console.log(req.body.newUname)
       // console.log(req.headers)
       Users.updateUsername(req,res);

    })



//route to get posts from backend
    router.get('/post',async (req,res)=>{
        const response = await Users.getAllPosts(req,res);
        return response
    })
//route to save user posts in backend
    router.post('/post',(req, res)=>{
        console.log(req.body)
        console.log("hello")
        Users.saveUserPost(req,res);
    })
//route to save comments of post
    router.post('/post/comment',(req,res)=>{
        Users.userComment(req,res);
    })
//route to get comments of post
    router.get('/post/comment',(req,res)=>{
        Users.getComments(req,res);
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
