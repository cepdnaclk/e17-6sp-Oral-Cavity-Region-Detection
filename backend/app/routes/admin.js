const router = require('express').Router();
const Admin = require('../models/Admin');
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



module.exports = router;
