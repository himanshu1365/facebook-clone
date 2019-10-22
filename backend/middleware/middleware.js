const {SECRET} = require('../config/config')
const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){
    const token = req.headers.token
    try{
        const status = jwt.verify(token,SECRET)
        req.headers.tokenValue = status.userToken
       // console.log(" id  : "+req.headers.tokenValue)
        next()
    }
    catch(error){
        return res.status(403).send({'msg':'Invalid Token'})
    }
}
module.exports = {
    authMiddleware
}
