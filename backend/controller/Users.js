const bcryptjs = require('bcryptjs')
const User = require('../models/User')

const saveSignUpData = async (req,res)=>{
    let body,response
    body = req.body
    var hash = bcryptjs.hashSync(body.password, 8)
    body.password = hash
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
//get postdata
const viewPost = async(req,res)=>{
   try{
    const status = await User.viewPost(req,res)
    res.send(status);
   }
   catch(error){}
}
//save post data
const saveUserPost = async(req, res )=>{ 
    try{
        let resp = await User.saveUserPost(req, res);
        res.send(resp);
    }
    catch( erre ){

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
const getComments = async( req, res )=>{
    try{
        let data = await User.getComments(req ,res)
        res.status(200).send(data);
    }
    catch(error ){
        console.log(error)
    }
}
const particularUserData = async(req,res)=>{
    let response
    //console.log("welcome to users.js")
    response = await User.particularUserData(req,res)
    return response
}
const updatePassword = async(req , res )=>{
    try{
        let pass = await User.updatePassword(req , res );
        res.send(pass);
    }
    catch(error){
        console.log(error)
    }
}
const updateUsername = async(req , res )=>{
    try{
        let update = await User.updateUsername(req , res )
        return update
    }
    catch(error){
        console.log(error)
    }
}
const uploadImage = async( req , res )=>{
    try{
        let profileImage = await User.uploadImage(req, res)
        res.send(profileImage)
    }
    catch(error){
        console.log(error)
    }
}

const saveLikes = async(req,res)=>{
    let response = await User.saveLikes(req,res)
    return response
}

const removeLikes = async(req,res)=>{
    let response = await User.removeLikes(req,res)
    return response
}

const saveSharedPost = async(req,res)=>{
    let response = await User.saveSharedPost(req,res)
    return response
}

module.exports = {
    saveSignUpData,
    checkLoginUser,
    checkUserToken,
    saveUserPost,
    userComment,
    getComments,
    updatePassword,
    updateUsername,
    viewPost,
    saveLikes,
    removeLikes,
    particularUserData,
    saveSharedPost
}
