const SignUpModel = require('./signupdata')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../config/config')
const commentSchema = require('./commentschema')
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

const savecomments  = async(req,res)=>{
    let response,body,details
  body =req.body
  details = new commentSchema(body)
  console.log(details)
//   const comment = new Comment(req.body);
  try{
  
  details
    
    .then(details => {
      return commentSchema.findById(req.params.userid);
    })
    .then(commentSchema => {
    commentSchema.details.$push(details);
      return commentSchema.save();
    })
   
    .catch(err => {
      console.log(err);
    });
  
    response =await details.save()
    return response
  }
  catch(err)
  {
    response = {error:err}
    return response
  }
    
}

module.exports = {
    saveSignUpData,
    loginUser,
    checkUserToken,
    savecomments
}