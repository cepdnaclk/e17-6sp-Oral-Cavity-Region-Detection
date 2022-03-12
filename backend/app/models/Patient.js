const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    examiner_id:{
        type: String,
        required: true,
    },
    patient_name:{
        type: String,
        required: true,
    },
    patient_address:{
        type: String,
        required: true,

    },
    patient_district:{
        type: String,
        required: true,

    },
    patient_photo:{
        type: String,
        required: false,
        default:"",
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Patient",PatientSchema)