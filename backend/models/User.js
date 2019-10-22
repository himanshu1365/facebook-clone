const signupdata = require('./signupdata')
const commentModel = require('./commentModel')
const PostModel = require('./postModel')
const LikeModel = require('./likeModel')
const ShareModel = require('./shareModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/config')

const saveSignUpData = async (req, res, data) => {
    let existingUser
    let modeldata = new signupdata(data)
    existingUser = await signupdata.find({ email: data.email })
    if (existingUser.length == 0) {
        response = await modeldata.save()
        return res.status(200).send({ msg: 'User saved Successfully' })
    }
    else {
        return res.status(400).send({ msg: 'User already Existed' })
    }
}

const loginUser = async (req, res) => {
    let checkUser = await signupdata.find({ email: req.body.email })
    if (checkUser.length != 0) {
        let password = checkUser[0].password
        let status = bcryptjs.compareSync(req.body.password, password)
        if (status) {
            jwt.sign({ userToken: checkUser[0]._id }, SECRET, { expiresIn: '24h' }, (err, token) => {
                return res.status(200).send({ msg: 'Login Successful', token: token })
            })
        }
        else {
            return res.status(400).send({ msg: 'Incorrect Login Credentials' })
        }
    }
}

const particularUserData  = async(req,res)=>{
    console.log("user.js")
    try{
        let signUpUser = await signupdata.find({ _id: req.headers.tokenValue })
        console.log("userId is : "+signUpUser[0].email)
        email = signUpUser[0].email
        let userData = await PostModel.find({userId: email}).sort({"postedAt":'desc'})

        console.log("token value is : " +req.headers.tokenValue)
        console.log("details acc to email "+" "+ email + " -"+ userData)
        //let particularPosts = await 
            return res.status(200).send(userData);
        
    }
    catch (error) {
        return res.status(200).send({ message: 'No Posts exist for this user' })
    }
}
//get post of all users
const viewPost = async (req, res) => {
    try {
        let post = await PostModel.find().sort({ "postedAt": 'desc' })
        return post;
    }
    catch (error) {
        return error
    }
}

const checkUserToken = async (req, res) => {
    jwt.verify(req.headers.token, SECRET, (err, authData) => {
        if (err) {
            return res.status(401).send({ 'msg': 'Invalid Token' })
        }
        return res.status(200).send({ 'msg': 'Valid Token' })
    })
}
//save post data
const saveUserPost = async (req, res) => {
    try {
        //get user detail of person who created post

        let signUpUser = await signupdata.find({ _id: req.headers.tokenValue })
        req.body.userId = signUpUser[0].email;
        req.body.userName = signUpUser[0].firstName + " " + signUpUser[0].lastName;
        let savePost = new PostModel(req.body)
        await savePost.save();
        return {
            status: 200,
            msg: 'new user post added'
        }

    } catch (err) {
        return {
            status: 400,
            msg: 'something went wrong',
            error: err
        }
    }
}

const userComment = async( req , res ) =>{
    try{
        let signUpUser = await signupdata.find({_id:req.headers.tokenValue})
        req.body.userName=signUpUser[0].firstName +" "+ signUpUser[0].lastName;
        let commentData = new commentModel(req.body);
        await commentData.save().sort;
            return {
                'status':200,
                'msg':'comments added'
            }
    }
        catch(err){
            return {
                'status':404,
                'msg':'something went wrong',
                'error':err
            }
        }
    }
const getComments = async(req , res )=>{
    try{
        let postID = req.query.postId
        let comment = await commentModel.find({'postId':postID}).sort({"createdAt":'desc'})
        return comment;
    }
    catch(error){
        return error
    }
}
const updatePassword = async(req ,res )=>{
    //console.log("hello")
    try{
        
        let userId = await signupdata.findOne({ _id : req.headers.tokenValue})
       // console.log(req.headers.tokenValue)
        oldPwd = req.body.oldPwd //oldp fetches Password that is input from the user while updating the password
        newPassword = req.body.newPassword//The new password input from the user
        let password = userId.password//hashed password fetched from the database 
       // console.log("old password from database is " +password)
        let status = bcryptjs.compareSync(oldPwd,password) //password = password set at signup.
        //console.log("status of matching old password is : " + status)
        var hash = bcryptjs.hashSync(newPassword, 8)
        newPassword = hash
        //console.log("new password after hashing is " + newPassword)
        
        
        if(status){
           let updation =  await signupdata.findOneAndUpdate({
                _id : req.headers.tokenValue
            },
            
            {
                $set:{
                "password" : newPassword
                }
            }
            );
            //console.log('check'+updation)    
        }
    }
    catch(error){
        console.log(error)
    }
}
const updateUsername = async(req , res )=>{
    try{
        //console.log("welcome to user.updateusername")
        let user = await signupdata.findOne({ _id : req.headers.tokenValue})
        //let email = user.email 
        oldEmail = req.body.existUname//old username input from the user
        newEmail = req.body.newUname//new username that the user wants
        let checkEmailExistence1 = await signupdata.findOne({email:newEmail})
       // console.log("status is :" +checkEmailExistence1)
       if(checkEmailExistence1!=null){
           res.send({
               status:403,
               msg:"Username already exists"
           })
       }
        
        if(checkEmailExistence1 == null){
            let checkEmailExistence = await signupdata.find({email:oldEmail})
            console.log(checkEmailExistence)
            
                await signupdata.findOneAndUpdate({
                    _id : req.headers.tokenValue
                },
                {
                    $set:{
                        "email" : newEmail
                    }
                });
                await PostModel.findOneAndUpdate({
                    userId: oldEmail
                },
                {
                    $set:{
                        "userId" : newEmail
                    }
                });
                
                res.send({
                    status:200,
                    msg:'Email/username Updated'
                })
            
        }
        else{
            return res.send({
                status:409,
                msg:'edit conflict as the username already exists'
            })
        }
    }
        catch(error){
            console.log(error)
        }
        
       
}

const saveLikes = async (req, res) => {
    let likeData = new LikeModel({
        'userId': req.headers.tokenValue,
        'postId': req.body.postId
    })
    await likeData.save()
    return res.status(200).send({ msg: 'Like Added Successfully' })
}

const deleteLikes = async (req, res) => {
    await LikeModel.findOneAndDelete({ 'postId': req.body.postId })
    return res.status(200).send({ msg: 'Like deleted Successfully' })
}

const saveSharedPost = async (req, res) => {
    let existingShare = await ShareModel.find({ $and: [{ 'userId': req.headers.userToken }, { 'postId': req.body.postId }] })
    if (existingShare.length == 0) {
        let shareData = new ShareModel({
            'userId': req.headers.userToken,
            'postId': req.body.postId
        })
        await shareData.save()

        let existingUser = await signupdata.findById({ '_id': req.headers.tokenValue })
        let postData = new PostModel({
            userName: existingShare.firstName + ' ' + existingShare.lastName,
            userId: req.headers.tokenValue,
            likeCounts: 0,
            shareCounts: 0,
            postData: req.body.postData
        })
        postData.save()
        return res.sendStatus(200)
    }
}
module.exports = {
    saveSignUpData,
    loginUser,
    particularUserData,
    viewPost,
    checkUserToken,
    saveUserPost,
    userComment,
    getComments,
    updatePassword,
    updateUsername,
    saveLikes,
    deleteLikes,
    saveSharedPost
}
