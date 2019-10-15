
const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){
    jwt.verify(req.headers.token,SECRET,(err,authData)=>{
        if(err){
            return res.status(403).send({'msg':'Invalid Token'})
        }
    })
    next()
}

module.exports = {
    authMiddleware
}