const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const Image = require('../models/Image');
const Patient = require('../models/Patient');
const User = require('../models/User');
const authenticateToken = require('../middlewares/auth')
const {uploadFile , downloadFile , deleteFile , listFiles} = require('../configurations/storage-config');
const path = require("path");
const fs = require('fs');

router.post("/add", authenticateToken, async(req,res)=>{
    try{
        // const useremail = await User.findOne({email: req.body.email});

        // if(!useremail){return res.status(401).json({message:"Authentication failed!"});}
        
        // const image = await Image.insertMany(req.body.info)
        res.status(200).json({message:"Image successfully added!"});    


    }catch(error){
        res.status(500).json(error);
    }
})

router.post("/update", authenticateToken, async(req,res)=>{
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
                  as: "images",
                },
           }
         ] )

        return res.status(200).json("a")

    }catch(err){
        console.log(err)
        return res.status(500).json({message: err})
    }
})


// get all images
router.get('/get', authenticateToken, async(req, res)=>{
    try{
        const query = req.query

        const minAge = parseInt(query.minAge)
        const maxAge = parseInt(query.maxAge)
        const habits = query.habits

        if(query.segmented==="True") query["segmented"] = true
        else if(query.segmented==="False") query["segmented"] = false
        else delete query.segmented

        console.log(query)
        
        delete query.minAge
        delete query.maxAge
        delete query.habits

        if(habits){
            const data = await Image.aggregate( [
          
                {
                   $lookup: {
                      from: "patients",
                      localField: "patient_id",    // field in the orders collection
                      foreignField: "_id",  // field in the items collection
                      as: "patient"
                   }
                },
                {
                   $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$patient", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { patient: 0 } },
             
              {
                $match: { $and: [ query, { patient_age: { $gte: minAge } },{ patient_age: { $lte: maxAge } }, {patient_habits: { $in: habits }} ] },
            }
             ] )
    
            return res.status(200).json({data: data})
        }else{
            const data = await Image.aggregate( [
          
                {
                   $lookup: {
                      from: "patients",
                      localField: "patient_id",    // field in the orders collection
                      foreignField: "_id",  // field in the items collection
                      as: "patient"
                   }
                },
                {
                   $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$patient", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { patient: 0 } },
             
              {
                $match: { $and: [ query, { patient_age: { $gte: minAge } },{ patient_age: { $lte: maxAge } } ] },
            }
             ] )
    
            return res.status(200).json({data: data})
        }
        

    }catch(err){
        console.log(err)
        return res.status(500).json({message: err})
    }
})

module.exports = router ;