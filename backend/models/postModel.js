const {mongoose} = require('../db/connection');

const Schema = mongoose.Schema;

const PostModel = new Schema({
    name:{
        type:String
    },
    userId:{
        type: String
    },
    posts:[{
        postDate:{
            type:Date,
            default:Date.now()
        },
        postData:{
            type:String
        }
    }]
})

module.exports = mongoose.model("PostModel", PostModel)
