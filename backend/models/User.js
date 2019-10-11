const SignUpModel = require('./signupdata')
const PostModel = require('./post')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
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

        return res.status(200).send("user post added");

    }
    else
    {
        let postData = new PostModel(req.body);
        await postData.save();
        return res.status(200).send("user post saved");
        }
    
    }catch(err){
        return res.status(404).send(err + "could not find");
    }
}
module.exports = {
    saveSignUpData,
    loginUser,
    checkUserToken,
    userPost
}