const { mongoose } = require('../db/connection')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    userid: String,
    comments : [{
        postId: String,
        commentList: [{
            commentData : String,
            commentdate: {
                type: Date, 
                default: +new Date() + 7*24*16*60*1000
            }
        }]
    }]
})

module.exports = mongoose.model('commentSchema',commentSchema)