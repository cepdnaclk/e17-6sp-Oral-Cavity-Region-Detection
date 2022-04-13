const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    examiner_reg_no:{
        type: String,
        required: true,
    },
    patient_name:{
        type: String,
        required: true,
    },
    patient_habits:{
        type: Array,
        default:[],
    },
    patient_district:{
        type: String,
        required: true,

    },
    patient_contact_no:{
        type: String,
        default:"",
    },
    patient_gender:{
        type: String,
        default:"",  
    },
    patient_age:{
        type: Number,
        default: 0,
    },
    patient_photo:{
        type: String,
        required: false,
        default:"",
    },
    description:{
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