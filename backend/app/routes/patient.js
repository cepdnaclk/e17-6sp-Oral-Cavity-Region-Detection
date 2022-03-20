const express = require('express')
const router = express.Router()
const Patient = require('../models/Patient');
const User = require('../models/User');
const authenticateToken = require('../middlewares/auth')

router.post("/add", async(req,res)=>{
    try{
        const useremail = await User.findOne({email: req.body.email});
        const patientname = await Patient.findOne({patient_name: req.body.patient_name, examiner_email: req.body.email});

        if(!useremail){return res.status(401).json({message:"Authentication failed!"});}
        if(patientname){return res.status(401).json({message:`The patient name is already in use. Hint: Try "${req.body.patient_name} #${(Math.floor((Math.random() * 1000) + 1)).toString()}"`});}
        
        
            const newPatient = new Patient({
                examiner_reg_no: req.body.reg_no,
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
        

    }catch(error){
        res.status(500).json(error);
    }
})

// get all patients
router.get('/all', authenticateToken, async(req, res)=>{
    try{
        const patients = await Patient.find({examiner_email: req.email})

        return res.status(200).json({patients: patients})


    }catch(err){
        return res.status(500).json({message: err})
    }
})



module.exports = router ;