// authentication middleware
const jwt = require('jsonwebtoken')
require('dotenv').config()


const authenticateToken = (req, res , next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    try{
        decodeRes= jwt.verify(token,process.env.ACCESS_SECRET );
        req.email = decodeRes.sub

        next();
    }catch(error){
        res.status(401).json({message: "Your session is expired"})
    }
}

module.exports = authenticateToken