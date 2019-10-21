const {mongoose} = require('../db/connection');

const Schema = mongoose.Schema;

const PostModel = new Schema({
    userName : String,
    userId : String,
    postImage:String,
    postedAt : {
        type : Date,
        default : Date.now
    },
    postText: String,
    likeCount:{
        type: Number,
        default: 0
    },
    shareCount:{
        type:Number,
        default: 0
    }
})
module.exports = mongoose.model("Post", PostModel)
