const SignUpModel = require('./signupdata')
const commentModel = require('./commentModel')
const PostModel = require('./postModel')
const LikeModel = require('./likeModel')
const ShareModel = require('./shareModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../config/config')

const saveSignUpData  = async(req,res,data)=>{
    let existingUser
    let modeldata = new SignUpModel(data)
    existingUser = await SignUpModel.find({email: data.email})
    if(existingUser.length == 0){
        response = await modeldata.save()
        return res.status(200).send({msg:'User saved Successfully'})
    }
    else{
        return res.status(400).send({msg:'User already Existed'})
    }   
}

const loginUser = async(req,res)=>{
    let checkUser = await SignUpModel.find({email: req.body.email})
    if(checkUser.length != 0){
        let password = checkUser[0].password
        let status = bcryptjs.compareSync(req.body.password,password)
        if(status){
            jwt.sign({userToken: checkUser[0]._id},SECRET,{ expiresIn: 1000},(err,token)=>{
                return res.status(200).send({msg:'Login Successful',token: token})
            })
        }
        else{
            return res.status(400).send({msg:'Incorrect Login Credentials'})
        }
    }
}

const particularUserData  = async(req,res)=>{
    try{
        let fetchId = await PostModel.findOne({_id: req.query._id})
        if(fetchId.length!=0){
            return res.status(200).send(fetchId.data);
        }
    }
    catch(error){
        return res.status(200).send({message: 'No Posts exist for this user'})
    }
        
}


const getAllPosts = async(req,res)=>{
    try{
        let post = await PostModel.find();
        return post;
        }
    catch(error){
        return error
    }
}

const checkUserToken = async(req,res)=>{
    jwt.verify(req.headers.token,SECRET,(err,authData)=>{
        if(err){
            return res.status(403).send({'msg':'Invalid Token'})
        }
        return res.status(200).send({'msg':'Valid Token'})
    })
}
const saveUserPost = async( req, res )=>{
    try{
        let signUpUser = await SignUpModel.find({_id:req.headers.tokenValue})
        let post = await PostModel.find({userId:signUpUser[0].email});
        req.body.userId = signUpUser[0].email;
        req.body.name=signUpUser[0].firstName +" "+ signUpUser[0].lastName;
        
    if (post.length != 0){
        await PostModel.findOneAndUpdate({
            userId: req.headers.tokenValue
        },
        {
            $push:{
                posts:req.body.posts
            }
        });

        return {
            status:200,
            msg:'post added'
        }

    }
    else
    {
        let postData = new PostModel(req.body);
        await postData.save();
        return {
            status:200,
            msg:'new user post added'
            }
        }
    
    }catch(err){
        return {
            status:404,
            msg:'something went wrong',
            error:err
        }
    }
}
 
const userComment = async( req , res ) =>{
try{

    let comment = await commentModel.find({userid:req.body.userid});
    if ( comment.length != 0 ){
        const status = await commentModel.findOneAndUpdate({
            postid:req.body.postid,
        },
        {
            $push:{
                comment:req.body.comments
            }
        });
        return {
            'status':200,
            'msg':'multiple comments added'
        }

    }
    else
    {
        let commentData = new commentModel(req.body);
        await commentData.save();
        return {
            'status':200,
            'msg':'new comment added'
            }
        }
    
    }catch(err){
        return {
            'status':404,
            'msg':'something went wrong',
            'error':err
        }
    }
}
const getComments = async(req , res )=>{
    try{
        let data = await Comment.find();
        return data;
    }
    catch( error ){
        console.log(error)
    }
}

const saveLikes = async(req,res)=>{
    let likeData = new LikeModel({
        'userId' : req.headers.tokenValue,
        'postId' : req.body.postId
    })
    await likeData.save()
    return res.status(200).send({msg:'Like Added Successfully'})
}

const deleteLikes = async(req,res)=>{
    await LikeModel.findOneAndDelete({'postId':req.body.postId})
    return res.status(200).send({msg:'Like deleted Successfully'})
}

const saveSharedPost = async(req,res)=>{
    let existingShare = await ShareModel.find({$and: [{'userId':req.headers.userToken}, {'postId':req.body.postId}]})
    if(existingShare.length == 0){
        let shareData = new ShareModel({
            'userId':req.headers.userToken,
            'postId':req.body.postId
        })
        await shareData.save()

        let existingUser = await SignUpModel.findById({'_id':req.headers.tokenValue})
        let postData = new PostModel({
            userName: existingShare.firstName+' '+existingShare.lastName,
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
    getAllPosts,
    checkUserToken,
    saveUserPost,
    userComment,
    getComments,
    saveLikes,
    deleteLikes,
    saveSharedPost
}