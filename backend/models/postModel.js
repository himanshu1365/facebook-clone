const { mongoose } = require('../db/connection');

const Schema = mongoose.Schema;

const PostModel = new Schema({
    userName: String,
    userId: String,
    postDate: {
        type: Date,
        default: Date.now()
    },
    postData: String,
    commentCounts: Number,
    likeCounts: Number
})

module.exports = mongoose.model("PostModel", PostModel)
