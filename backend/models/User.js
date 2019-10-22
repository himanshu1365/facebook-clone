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
    //console.log("user.js")
    try{
        let signUpUser = await signupdata.find({ _id: req.headers.tokenValue })
        let obj = new Object();
        obj.name = signUpUser[0].firstName +' '+signUpUser[0].lastName
        obj.uploadImage = signUpUser[0].profileImage
        email = signUpUser[0].email
        //console.log(obj);
        let userPost = await PostModel.find({userId: email}).sort({"postedAt":'desc'})

            return res.status(200).send( {userPost, obj} );
        
    }
    catch (error) {
        return res.status(200).send({ message: 'No Posts exist for this user' })
    }
}
const uploadImage = async(req,res)=>{
    try{
        //let userDetails = await signupdata.find({_id: req.headers.tokenValue })
        //console.log(userDetails)
        await signupdata.findOneAndUpdate({
            _id : req.headers.tokenValue
        },
        {
            $set:{
                "profileImage" : req.body.profileImage
            }
        })
        return {
            status: 200,
            msg: 'Profile picture uploaded'
        }
    }
    catch(error){
        return res.status(200).send({ message: 'No image uploaded for this user' })
    }
}
//get post of all users
const viewPost = async (req, res) => {
    try {
        console.log('post get')
        let user = await signupdata.find({_id:req.headers.tokenValue})
        let obj = new Object()
        obj.name = user[0].firstName+' '+user[0].lastName
        obj.image = user[0].profileImage;
        console.log(user)
        let post = await PostModel.find().sort({ "postedAt": 'desc' })
        console.log(post)
        return ({post,obj});
    }
    catch (error) {
        console.log(error)
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
        oldPwd = req.body.oldPwd //oldp fetches Password that is input from the user while updating the password
        newPassword = req.body.newPassword//The new password input from the user
        let password = userId.password//hashed password fetched from the database 
        let status = bcryptjs.compareSync(oldPwd,password) //password = password set at signup.
        var hash = bcryptjs.hashSync(newPassword, 8)
        newPassword = hash
        
        
        
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
            //console.log(checkEmailExistence)
            
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
    const existingLike = await LikeModel.findOne({"postId":req.body.postId,"userId":req.headers.tokenValue})
    if(existingLike  === null){
        let likeData = new LikeModel({
            'userId': req.headers.tokenValue,
            'postId': req.body.postId
        })
        await likeData.save()
        const likeStatus = await PostModel.findByIdAndUpdate(req.body.postId,{$inc:{'likeCount':1}},{new: true}).select({'likeCount':1})
        return res.status(200).send({count:likeStatus.likeCount})
    }
}

const removeLikes = async (req, res) => {
    let post = JSON.parse(Object.keys(req.body)[0])
    const existingLike = await LikeModel.findOne({"postId":post.postId,"userId":req.headers.tokenValue})
    if(existingLike != null){
        await LikeModel.findOneAndDelete({ 'postId': post.postId })
        const like = await PostModel.findById(post.postId).select({'likeCount':1})
        let num = like.likeCount-1
        const likeStatus = await PostModel.findByIdAndUpdate(post.postId,{'likeCount':num},{new: true}).select({'likeCount':1})
        return res.status(200).send({count:likeStatus.likeCount})
    }
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
            userName: existingUser.firstName + ' ' + existingUser.lastName,
            userId: req.headers.tokenValue,
            likeCounts: 0,
            shareCounts: 0,
            postText: req.body.postData
        })
        postData.save()
        return res.status(200)
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
    removeLikes,
    saveSharedPost
}
