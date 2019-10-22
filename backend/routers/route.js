const express = require('express')
const Users = require('../controller/Users')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
var multer = require('multer')

//path for folder to save image and rename image
const reqPath = path.join(__dirname, '../../Client/assets');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, reqPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage })

const { authMiddleware } = require('../middleware/middleware')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json("*/*"))


module.exports = () => {

    app.post('/signup', (req, res) => {
        Users.saveSignUpData(req, res)
    })

    app.post('/login',(req,res)=>{
       // console.log("hello")
        Users.checkLoginUser(req,res)
    })

    
   
    
    app.use(authMiddleware)

    
    app.get('/profilePage',(req,res)=>{
       console.log('get ------=')
        Users.particularUserData(req,res)
    })
    app.patch('/profilePage/updatePassword',(req,res)=>{
       
       Users.updatePassword(req,res);

    })
    app.patch('/profilePage/updateUsername',(req,res)=>{
       // console.log(req.body.existUname)
        //console.log(req.body.newUname)
       // console.log(req.headers)
       Users.updateUsername(req,res);

    })
    app.patch('/profilePage/uploadProfilePhoto',upload.single('image'),(req,res)=>{
        console.log(req.file)
        req.body['profileImage'] = '/assets/' + req.file.filename;
        Users.uploadImage(req,res);
    })

    //route to save user posts in backends
    app.post('/post', upload.single('image'), (req, res) => {
        req.body['postImage'] = '/assets/' + req.file.filename;

        Users.saveUserPost(req, res);
    })
    //route to get posts from backend
    app.get('/post', async (req, res) => {
        console.log('get post')
        const response = await Users.viewPost(req, res);
        //return response
    })

    //route to save comments of post
    app.post('/post/comment', (req, res) => {
        Users.userComment(req, res);
    })
    //route to get comments of post
    app.get('/post/comment', (req, res) => {
        Users.getComments(req, res);
    })

    app.post('/post/like', (req, res) => {
        Users.saveLikes(req, res)
    })

    app.delete('/post/like', (req, res) => {
        Users.removeLikes(req, res)
    })

    app.post('/post/sharePost', (req, res) => {
        Users.saveSharedPost(req, res)
    })

    return app
}
