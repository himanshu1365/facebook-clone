const { mongoose } = require('../db/connection');

const Schema = mongoose.Schema;

const PostModel = new Schema({
    userName : String,
    userId : String,
    postedAt : {
        type : Date,
        default : Date.now
    },
    postText : String,
    commentCounts : {
        type : Number,
        default : 0
    },
    likeCounts : {
        type : Number,
        default : 0
    }
})
module.exports = mongoose.model("PostModel", PostModel)
