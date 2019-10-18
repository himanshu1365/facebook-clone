const { mongoose } = require('../db/connection')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    userId: String,
    postId: String,
    commentData: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('commentSchema',commentSchema)