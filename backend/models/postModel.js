const {mongoose} = require('../db/connection');

const Schema = mongoose.Schema;

const PostModel = new Schema({
    userid:{
        type: String
    },
    posts:[{
        postdate:{
            type:Date
        },
        postdata:{
            type:String
        }
    }]
})

module.exports = mongoose.model("PostModel", PostModel)
