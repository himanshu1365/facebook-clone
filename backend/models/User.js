const SignUpModel = require('./signupdata')
const Comment = require('./comment');
const PostModel = require('./post')
const commentModel = require('./commentschema')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../config/config')
// const commentSchema = require('./commentschema')
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


//         const comment = new commentModel(req.body);

//   comment
//     .save()
//     .then(comment => {
//       return commentModel.findById(req.params.postId);
//     })
//     .then(comment => {
//        commentModel.commentschemas.unshift(commentModel);
//       return commentschemas.save();
//     })
//     .then(comment => {
//       res.redirect(`/`);
//     })
//     .catch(err => {
//       console.log(err);
//     });
try{
    let comment = await commentModel.find({userid:req.body.userid});
    //console.log(comment);
    if ( comment.length != 0 ){
        console.log(req.body)
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

module.exports = {
    saveSignUpData,
    loginUser,
    checkUserToken,

    userPost,
    userComment,
    getComments

}