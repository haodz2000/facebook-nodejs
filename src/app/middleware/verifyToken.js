const jwt = require('jsonwebtoken')

const verifyToken = (req,res, next)=>{
    const token = req.headers?.token
    if(token){
        jwt.verify(token,process.env.JWT_SEC,(err,payload)=>{
            if(err){
                res.status(403).json({msg:"Token is not valid"})
            }else{
                req.user = payload
                next()
            }
        })
    }else{
        return res.status(500).json({msg:"You are not authenticated"})
    }
}

module.exports = {
    verifyToken
}