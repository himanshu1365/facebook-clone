const PostModel = require('./postModel')
const SignUpModel = require('./signupdata')
const moment = require('moment')

const postData = async()=>{
    try{
        let post = await PostModel.find();
        // let post = await PostModel.find({},{"posts":1,"_id":0});
        // console.log(JSON.stringify(post))
        // console.log(post[0]['posts'][0]['postDate'])
        // var testdate = ( moment((post[0]['posts'][0]['postDate'])).format('llll'))
        // console.log('test',testdate)

        // setTimeout(function(){
        //     post[0]['posts'][0]['postDate'] = testdate;
        //     console.log("inside timeout",post[0]['posts'][0]['postDate']) 
        // }, 3000);

        
        
        // for ( let i = 0 ; i < post.length; i++ ){
        //     for ( let j = 0 ; j < post[i].posts.length; j++ ){
        //         var date = moment(post[i].posts[j].postDate).format('llll');
        //         console.log("adsadad",date);
                // post[i]['posts'][j]['postDate'] = 'test'
                //post[i].posts[j].postDate = date;
                // console.log("tredsasd",post[i].posts[j].postDate)
        //     }
        // }
        // console.log(JSON.stringify(post[0].posts))
        return  post
    }
    catch(err){
        console.log(err);
    }
}
module.exports = {postData}