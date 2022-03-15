const router = require('express').Router();
const Admin = require('../models/Admin');
const User = require('../models/User');
const Request = require('../models/Request');
const authenticateToken = require('../middlewares/auth')

// get all requests
router.get('/requests', authenticateToken, async(req, res)=>{
    try{
        
        const admin = await Admin.findOne({email: req.email});
    
        if(!admin){return res.status(401).json({message:'Authentication failed'})}

        const requests = await Request.find({admin: req.email})
        
        for (req in requests) {
            delete requests[req].password
        }

        return res.status(200).json(requests)


    }catch(err){
        return res.status(500).json({message: err})
    }
})


// delete requests
router.delete("/requests/:id",authenticateToken,async(req,res)=>{
    try{
        const request = await Request.findById(req.params.id)
        console.log(req.params.id)
        if(request){
            try{
                await Request.findByIdAndDelete(req.params.id)
                res.status(200).json({message: "Request has been deleted"});
                
            }catch(error){
                return res.status(500).json({message:"Request deletion failed"});
            }
            
        }else{
            return res.status(404).json({message:"Request not found"})
        } 
    }catch(error){
        return res.status(500).json({message: error})
    } 
})

// accept requests
router.post("/accept/:id", authenticateToken,async(req,res)=>{
    try{
        const request = await Request.findById(req.params.id)

        if(request){

            const regno = await User.findOne({reg_no: request.reg_no})
            if(regno){return res.status(401).json({message:'Reg No already in use'})}

            const user = await User.findOne({email: request.email})
            if(user){return res.status(401).json({message:'Email address already in use'})}

            const newUser = new User({
                username: request.username,
                email: request.email,
                password: request.password,
                admin: request.admin,
                reg_no: request.reg_no
            })

            console.log(newUser)
            try{
                const adduser = await newUser.save();
                const {password,...others} = adduser._doc;
                await Request.findByIdAndDelete(req.params.id)
                
                others["message"] = "User registration successful!";
                return res.status(200).json(others);
            }catch (error) {
                return res.status(500).json({message:"User registration failed"});
            }
            
        }else{
            return res.status(404).json({message:"Request not found"})
        } 
    }catch(error){
        return res.status(500).json({message: error})
    } 
})


module.exports = router;
