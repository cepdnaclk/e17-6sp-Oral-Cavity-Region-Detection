const router = require('express').Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const bcrypt = require('bcrypt');

let refreshTokens = [];

// sign up
router.post("/signup",async(req,res)=>{
    try{
        const username = await User.findOne({username: req.body.username});
        const useremail = await User.findOne({email: req.body.email});

        if(username){
            res.status(401).json({message:'User name is taken'});
        }else if(useremail){
            res.status(401).json({message:"The email address is already in use"});
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })
            const user = await newUser.save();
            const {password,...others} = user._doc;
            others["message"] = "Successfully signed in";
            res.status(200).json(others);
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
    const refreshToken = req.header('token');
    if(!refreshToken) return res.status(401).json({message:'Authentication failed'})

    refreshTokens = refreshTokens.filter( token => token !== refreshToken)
    res.status(204).json({message:'Successfuly logged out'})
})


// re-new access token 
router.post('/token' , (req, res)=>{
    const refreshToken = req.header('token');

    if(!refreshToken) return res.status(401).json({message:'Authentication failed'})
    if(!refreshTokens.includes(refreshToken)) return res.status(403).json({message:'Authentication failed'})
    

    jwt.verify(refreshToken, process.env.REFRESH_SECRET ,(err , result)=>{
        if(err) return res.status(500).json({message:'Authentication failed'})
        
        const access_token = jwt.sign({sub: result.email} , process.env.ACCESS_SECRET , {expiresIn: process.env.REFRESH_TIME})
        res.status(200).json({"access_token":access_token });
    })

})

module.exports = router;