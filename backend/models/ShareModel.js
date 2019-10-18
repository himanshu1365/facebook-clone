const { mongoose } = require('../db/connection')

const Schema = mongoose.Schema

const ShareModel = new Schema({
    userid: String,
    shares:String,
    sharedAt:{
        type : Date,
        default :Date.now()
    }
})

module.exports = mongoose.model('ShareModel',ShareModel)