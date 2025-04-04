const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    vechicleType:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    aadhar:{
        type: String,
        required: true
    },
    availableTime:{
        days:{
            type: String,
            required: true
        },
        time:{
            type: String,
            required: true
        },
    },
    adress:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
});
const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;