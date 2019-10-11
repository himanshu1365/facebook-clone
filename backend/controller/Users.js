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
    let response = await User.userPost(req, res);
    return response;
}
module.exports = {
    saveSignUpData,
    checkLoginUser,
    checkUserToken,
    userPost
}