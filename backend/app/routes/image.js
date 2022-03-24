const express = require('express')
const router = express.Router()
const Image = require('../models/Image');
const Patient = require('../models/Patient');
const User = require('../models/User');
const authenticateToken = require('../middlewares/auth')
const path = require("path");
const fs = require('fs');
const multer = require('multer')

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

// get all images
router.get('/all', authenticateToken, async(req, res)=>{
    try{
        const user = await User.findOne({email:req.email})

        const query = req.query

        const a = await Patient.aggregate( [
            {
                $match: query,
            },
            {
              $lookup:
                {
                  from: "images",
                  localField: "_id",
                  foreignField: "patient_id",
                //   let: { 
                //       district: "$patient_district",
                //     },
                //   pipeline: [ {
                //     $match: {
                //        $expr: {
                //         $and: [
                //             { $eq: [ true, "$segmented" ] },
                //         ]
                //        }
                //     }
                //  } ],
                  as: "images",
                },
           }
         ] )

        console.log(a)
        return res.status(200).json("a")

    }catch(err){
        console.log(err)
        return res.status(500).json({message: err})
    }
})



module.exports = router ;