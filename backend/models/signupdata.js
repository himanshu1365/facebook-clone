const { mongoose } = require('../db/connection')

const Schema = mongoose.Schema

const SignUpModel = new Schema({
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    Email: {
        type: String,
    },
    Password: {
        type: String
    },
    Phone_number: {
        type: String
    }
})

module.exports = mongoose.model('SIgnUpModel',SignUpModel)