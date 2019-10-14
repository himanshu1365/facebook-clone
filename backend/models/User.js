const SignUpModel = require('./signupdata')
const Comment = require('./comment');
const PostModel = require('./post')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
//  const userData = require('./')
const {SECRET} = require('../config/config')

const saveSignUpData  = async(req,res,data)=>{
    let existingUser
    let modeldata = new SignUpModel(data)
    existingUser = await SignUpModel.find({Email: data.Email})
    if(existingUser.length == 0){
        response = await modeldata.save()
        return res.status(200).send({msg:'User saved Successfully'})
    }
    else{
        return res.status(400).send({msg:'User already Existed'})
    }
    
}

const loginUser = async(req,res)=>{
    let checkUser = await SignUpModel.find({Email: req.body.Email})
    if(checkUser.length != 0){
        let password = checkUser[0].Password
        let status = bcryptjs.compareSync(req.body.Password,password)
        if(status){
            jwt.sign({userToken: checkUser[0]._id},SECRET, (err,token)=>{
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
        debugger
        // console.log(req.query._id)
        let fetchId = await PostModel.findOne({_id: req.query._id})
        console.log(fetchId)
            if(fetchId.length!=0){
            return res.status(200).send(fetchId.data);
    }
    
        }catch(error){
            return res.status(200).send({message: 'No Posts exist for this user'})
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
const userPost = async( req, res )=>{
    try{
    let post = await PostModel.find({userid:req.body.userid});
    console.log(post);

    if ( post.length != 0 ){

        await PostModel.findOneAndUpdate({
            userid:req.body.userid,
        },
        {
            $push:{
                posts:req.body.posts
            }
        });

        return {
            'status':200,
            'msg':'post added'
        }

    }
    else
    {
        let postData = new PostModel(req.body);
        await postData.save();
        return {
            'status':200,
            'msg':'post added'
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
 
const userComment = async( req , res ) =>{

    try{
        let comment = new Comment(req.body);
        await comment.save();
        return {
            status:200,
            statusText:'OK',
            msg :'comments saved successfully'
        }
    }catch(err){
        console.log(err)
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
module.exports = {
    saveSignUpData,
    loginUser,
    checkUserToken,
    particularUserData,
    userPost,
    userComment,
    getComments
}