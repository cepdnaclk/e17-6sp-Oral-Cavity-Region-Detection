const router = require('express').Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const Admin = require('../models/Admin');
const Request = require('../models/Request');
const bcrypt = require('bcrypt');

let refreshTokens = [];

// user sign up
// add to request list
router.post("/signup",async(req,res)=>{
    try{
        const admin = await Admin.findOne({email: req.body.admin});
        const user = await Request.findOne({reg_no: req.body.reg_no});
        const userregno = await User.findOne({reg_no: req.body.reg_no});
        const email = await User.findOne({email: req.body.email});
        
        if(userregno){return res.status(401).json({message:'The Reg No is already registered'});}

        if(email){return res.status(401).json({message:'The Reg No is already registered'});}

        if(!admin){return res.status(401).json({message:"Admin doesn't exist"});}
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        if(user){
            const update = Request.findOne({reg_no: req.body.reg_no},{
                $set : {
                    admin: req.body.admin,
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword
                }
            });
            return res.status(200).json({message:"The Request sent successfully"});
        }else{
            const newUser = new Request({
                admin: req.body.admin,
                reg_no: req.body.reg_no,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })
            const user = await newUser.save();
            const {password,...others} = user._doc;
            others["message"] = "Successfully signed in";
            return res.status(200).json(others);
        }

    }catch(error){
        res.status(500).json(error);
    }
})

// sign in
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).json({message:"Wrong credentials!"})
        const validate = await bcrypt.compare(req.body.password,user.password)
        if(!validate) return res.status(400).json({message:"Wrong credentials!"})

        const access_token = jwt.sign({ sub: user.email }, process.env.ACCESS_SECRET, { expiresIn: process.env.REFRESH_TIME })
        const refresh_token = jwt.sign({ sub: user.email }, process.env.REFRESH_SECRET) 
        refreshTokens.push(refresh_token);

        // send the user data and refresh, access tokens
        const {password,...others} = user._doc;
        others["access_token"] = access_token;
        others["refresh_token"] = refresh_token;
        others["message"] = "Successfuly logged in";
        res.status(200).json(others)
        
    }catch(error){
        res.status(500).json(error)
    }
})


// log out
router.post('/logout' , (req, res) =>{
    const refreshToken = req.header('refresh_token');
    if(!refreshToken) return res.status(401).json({message:'Authentication failed'})

    refreshTokens = refreshTokens.filter( token => token !== refreshToken)
    res.status(204).json({message:'Successfuly logged out'})
})


// re-new access token 
router.post('/token' , (req, res)=>{
    const refreshToken = req.header('refresh_token');

    if(!refreshToken) return res.status(401).json({message:'Authentication failed'})
    if(!refreshTokens.includes(refreshToken)) return res.status(403).json({message:'Authentication failed'})
    

    jwt.verify(refreshToken, process.env.REFRESH_SECRET ,(err , result)=>{
        if(err) return res.status(500).json({message:'Authentication failed'})
        
        const access_token = jwt.sign({sub: result.email} , process.env.ACCESS_SECRET , {expiresIn: process.env.REFRESH_TIME})
        res.status(200).json({"access_token":access_token });
    })

})

module.exports = router;