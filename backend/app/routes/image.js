const express = require('express')
const router = express.Router()
const Image = require('../models/Image');
const User = require('../models/User');
const authenticateToken = require('../middlewares/auth')

router.post("/add", async(req,res)=>{
    try{
        const useremail = await User.findOne({email: req.body.email});

        if(!useremail){return res.status(401).json({message:"Authentication failed!"});}
        
        const image = await Image.insertMany(req.body.info)
        res.status(200).json({message:"Image successfully added!"});
        

    }catch(error){
        res.status(500).json(error);
    }
})

// get all patients
// router.get('/all', authenticateToken, async(req, res)=>{
//     try{
//         const patients = await Patient.find({examiner_email: req.email})

//         return res.status(200).json({patients: patients})


//     }catch(err){
//         return res.status(500).json({message: err})
//     }
// })



module.exports = router ;