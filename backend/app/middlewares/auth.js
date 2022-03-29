// authentication middleware
const jwt = require('jsonwebtoken')
const User = require('../models/User');
require('dotenv').config()


const authenticateToken = async(req, res , next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const email = req.headers.email;
    
    try{
        decodeRes= jwt.verify(token,process.env.ACCESS_SECRET );

        const user = await User.findOne({email: decodeRes.sub});
        
        if(!user || user.email !== email || JSON.stringify(user.role) !== JSON.stringify(decodeRes.role)){
            return  res.status(401).json({message: "Unauthorized access"})
        }

        req.email = decodeRes.sub
        req.role = decodeRes.role

        next();
    }catch(error){
        res.status(401).json({message: "Your session is expired"})
    }
}

module.exports = authenticateToken