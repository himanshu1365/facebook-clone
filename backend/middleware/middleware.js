const {SECRET} = require('../config/config')
const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){
    const token = req.headers.token
    try{
        const status = jwt.verify(token,SECRET)
        console.log(status)
        req.headers.tokenValue = status.userToken
        
        next()
    }
    catch(error){
        console.log('qwe')
        return res.status(403).send({'msg':'Invalid Token'})
    }
    
}

module.exports = {
    authMiddleware
}