const bcryptjs = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const saveSignUpData = async (req,res)=>{
    let body,response
    body = req.body
    var hash = bcryptjs.hashSync(body.Password, 8)
    body.Password = hash
    response = await User.saveSignUpData(req,res,body)
    return response
}

const checkLoginUser = async(req,res)=>{
    let response
    response = await User.loginUser(req,res)
    return response
}

const checkUserToken = async(req,res)=>{
    const status = User.checkUserToken(req,res)
    return status
}
const userPost = async(req, res )=>{
    try
    {
    let resp = await User.userPost(req, res);
     res.send(resp);
    }catch( erre ){
        console.log(erre)
    }
}
const userComment = async(req,res)=>{
    try{
        let comm = await User.userComment( req , res );
        res.send(comm);
    }catch( error ){
        console.log(error)
    }
}
const particularUserData  = async(req,res)=>{
    try{
        let postData = await User.particularUserData(req,res);
        res.send(postData);
    }catch(error){
        console.log(error)
    }

}
const getComments = async( req, res )=>{
    try{
        let data = await User.getComments(req , res );
        // console.log(data)
       res.send(data);
    }
    catch(error ){
        console.log(error)
    }
}
module.exports = {
    saveSignUpData,
    checkLoginUser,
    checkUserToken,
    particularUserData,
    userPost,
    userComment,
    getComments
}