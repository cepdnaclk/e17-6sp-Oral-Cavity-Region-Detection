const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,

    },
    reg_no:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true,                                        
    },
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Request",RequestSchema)