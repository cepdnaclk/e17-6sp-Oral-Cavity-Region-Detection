const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    reg_no:{
        type: String,
        default: ""

    },
    password:{
        type: String,
        required: true,                                        
    },
    profile_pic:{
        type: String,
        required: false,
        default:"",
    },
    role:{
        type: Array,
        required: true,
        default:[3],
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("User",UserSchema)