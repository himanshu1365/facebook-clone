const PostModel = require('./postModel')
const SignUpModel = require('./signupdata')
const moment = require('moment')

const postData = async()=>{
    try{
        var object = new Object();
    const post = await PostModel.find();
    object = post;
    console.log(object[0].userId)
    var user = await SignUpModel.find()
    console.log(user.length)
    object[0].name = user[0].FirstName +" "+user[0].LastName;
    console.log(object[0].name);
    console.log(post[0].posts[0].postData+" "+object.length)
    console.log(moment(object[0].posts[0].postDate).format('LLLL'));

    for ( let i = 0 ; i < post.length; i++ ){
        const user = await SignUpModel.find({_id:post[i].userId})
        object[i].name = user[0].FirstName +" "+user[0].LastName;
        // console.log('name '+object[i].name)
        }

        // for ( let i = 0 ; i < object.length; i++ ){
        //     console.log(object[i].name)
        //         for ( let j = 0 ; j < object[i].posts.length; j++ ){
        //             console.log(object[i].posts[j].postDate)
        //             console.log(object[i].posts[j].postData)
        //         }
        //     console.log(object[i].userId);
        //     }
        console.log('object name'+ object[0].name)
        return  object
    }
    catch(err){
        console.log(err);
    }
}
module.exports = {postData}