const { mongoose } = require('../db/connection')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    userId: String,
    postId: String,
    commentText : String,
    createdAt :{
        type : Date,
        default :Date.now()
    } ,
    userName : String
})


module.exports = mongoose.model('commentSchema',commentSchema)