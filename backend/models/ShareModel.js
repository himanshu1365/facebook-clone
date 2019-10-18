const { mongoose } = require('../db/connection')

const Schema = mongoose.Schema

const ShareModel = new Schema({
    userId: String,
    sharedAt:{
        type: Date,
        default: Date.now()
    }, 
    postId: String
})


module.exports = mongoose.model('ShareModel',ShareModel)