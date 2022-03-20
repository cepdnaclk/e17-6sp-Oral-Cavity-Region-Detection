const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    examiner_reg_no:{
        type: String,
        required: true,
    },
    patient_id:{
        type: String,
        required: true,
    },
    segmented:{
        type: Boolean,
        default: false,

    },
    original:{
        type: String,
        default: ""                                    
    },
    mask:{
        type: Array,
        default:[],
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Image",ImageSchema)