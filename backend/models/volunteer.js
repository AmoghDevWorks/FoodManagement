const mongoose = require('mongoose')

const volunteerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    aadhar:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    rank:{
        type:Number,
        default:0
    }
})

const volunteerModel = mongoose.model('Volunteer',volunteerSchema)

module.exports = volunteerModel