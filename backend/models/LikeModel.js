const { mongoose } = require('../db/connection')

const Schema = mongoose.Schema

const LikeModel = new Schema({
    userId: String,
    postId: String,
})

module.exports = mongoose.model('LikeModel',LikeModel)