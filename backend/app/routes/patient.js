const express = require('express')
const router = express.Router()
const Patient = require('../models/Patient');
const User = require('../models/User');
const authenticateToken = require('../middlewares/auth')

router.post("/add", async(req,res)=>{
    try{
        const useremail = await User.findOne({email: req.body.email});

        if(!useremail){
            res.status(401).json({message:"Authentication failed!"});
        }else{
            const newPatient = new Patient({
                examiner_email: req.body.email,
                patient_name: req.body.patient_name,
                patient_address:req.body.patient_address,
                patient_district:req.body.patient_district,
                patient_contact_no: req.body.patient_contact_no,
                patient_gender: req.body.patient_gender,
                patient_age: req.body.patient_age,
                patient_photo: req.body.patient_photo,
            })
            const patient = await newPatient.save();
            const others = patient._doc;
            others["message"] = "Successfully added";
            res.status(200).json(others);
        }

    }catch(error){
        res.status(500).json(error);
    }
})

// get all requests
router.get('/all', async(req, res)=>{
    try{
        const patients = await Patient.find({examiner_email: req.body.email})
        return res.status(200).json(patients)

    }catch(err){
        return res.status(500).json({message: err})
    }
})



module.exports = router ;