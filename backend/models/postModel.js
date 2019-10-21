const {mongoose} = require('../db/connection');

const Schema = mongoose.Schema;

const PostModel = new Schema({
    name: String,
    userId: String,
    postDate:{
        type: Date,
        default: Date.now()
    },
    postData: String
})

module.exports = mongoose.model("PostModel", PostModel)
