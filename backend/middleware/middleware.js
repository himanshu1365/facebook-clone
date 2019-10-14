const {SECRET} = require('../config/config')
const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){
    console.log('middleware working')
    const token = req.headers.token
    try{
        const status = jwt.verify(token,SECRET)
    }
    catch(error){
        return res.status(403).send({'msg':'Invalid Token'})
    }
    next()
}

module.exports = {
    authMiddleware
}