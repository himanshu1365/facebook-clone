const { mongoose } = require('../db/connection')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    userid: String,
    comments : {
        data: [{
            commentDate: Date,
            commentData : String
        }]
    }
})

module.exports = mongoose.model('commentSchema',commentSchema)