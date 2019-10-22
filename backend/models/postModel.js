const {mongoose} = require('../db/connection');

const Schema = mongoose.Schema;

const postModel = new Schema({
    userName : String,
    userId : String,
    postImage:String,
    postedAt : {
        type : Date,
        default : Date.now
    },
    likeCount:{
        type: Number,
        default: 0
    },
    shareCount:{
        type: Number,
        default: 0
    },
    postText: String
})
module.exports = mongoose.model("Post", postModel)
