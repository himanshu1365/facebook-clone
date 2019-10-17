const { mongoose } = require('../db/connection')

const Schema = mongoose.Schema

const SignUpModel = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    phone_number: {
        type: String
    }
})

module.exports = mongoose.model('SignUpModel',SignUpModel)