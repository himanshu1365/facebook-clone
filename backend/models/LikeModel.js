const { mongoose } = require('../db/connection')

const Schema = mongoose.Schema

const LikeModel = new Schema({
    userid: {
        type: String,
    },
    posts:[{
        postID: {
            type: Date,
        },
        postdata:{
            type: String
        }
    }]
})

module.exports = mongoose.model('LikeModel',LikeModel)