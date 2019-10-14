const {mongoose} = require('../db/connection');

const schema = mongoose.Schema;

const commentModel = new schema({
    post_id : String,
    user_id:String,
    comment_user: String,
    comment_date : Date
})

module.exports = mongoose.model("commentModel", commentModel);