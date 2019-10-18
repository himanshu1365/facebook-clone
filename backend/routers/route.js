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
    


    router.use(authMiddleware)
    

    router.get('/home/getPosts',async (req,res)=>{
        const response = await Users.getAllPosts(req,res);
        return response
    })

    router.post('/post',(req, res)=>{
        console.log(req.body)
        console.log("hello")
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