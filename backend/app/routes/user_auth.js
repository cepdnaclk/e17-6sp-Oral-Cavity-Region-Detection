const router = require('express').Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

let refreshTokens = [];

// user sign up
// update the admins request list
router.put("/signup",async(req,res)=>{
    try{
        const userregno = await User.findOne({reg_no: req.body.reg_no});
        const useremail = await User.findOne({email: req.body.email});

        if(userregno){
            res.status(401).json({message:'The register number is already registered'});
        }else if(useremail){
            res.status(401).json({message:"The email address is already in use"});
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                reg_no: req.body.reg_no,
                password: hashedPassword
            }

            try{
                const admin = await Admin.findOne({email: req.body.admin});
                try{
                    const exists = await Admin.findOne({requests: {$elemMatch: {reg_no:req.body.reg_no}}})

                    if(exists){
                        const updated = await Admin.updateOne({ email: req.body.admin, requests: { $elemMatch: { reg_no: req.body.reg_no } }},{
                            $set: {
                              "requests.$" : newUser
                            }
                          }
                        )

                    }else{
                        const added = await Admin.updateOne({ email: req.body.admin },{
                            $push: {
                              requests: {
                                 $each: [newUser]
                              }
                            }
                          }
                        )
                    }
                    
                    res.status(200).json({message: "Request sent successfully"});
                    
                }catch(error){
                    res.status(500).json(error);
                }
            }catch(error){
                res.status(404).json({message :"Admin not found"})
            }

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