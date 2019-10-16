const SignUpModel = require('./signupdata')
const commentModel = require('./commentModel')
const PostModel = require('./postModel')
const LikeModel = require('./LikeModel')
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
        const response = await PostModel.find()
        return response
    }
    catch(error){

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
        req.body.userId = req.headers.tokenValue;
        let post = await PostModel.find({userId:req.body.userId});


    if ( post.length != 0 ){

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
            userid:req.body.userid,
        },
        {
            $push:{
                comments:req.body.comments
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
    let getUser = await LikeModel.find({userId:req.headers.tokenValue})
    if(getUser.length != 0){
        let getExistingLike= await LikeModel.find({like:{$elemMatch:{postId:req.body.postId}}})
        if(getExistingLike.length == 0){
            const status = await LikeModel.findOneAndUpdate(
                {userId: req.headers.tokenValue},
                {  $push:{like: req.body} }
            )
        }
        else{
            await LikeModel.update({userId:req.headers.tokenValue},{$pull: { like: {postId: req.body.postId}}})
        }  
    }
    else{
        let likedata = {
            'userId':req.headers.tokenValue,
            'like': {'postId':req.body.postId}
        }
        let like = new LikeModel(likedata)
        await like.save()
    }
    return res.status(200).send({msg:'Like Added Successfully'})
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
    saveLikes
}