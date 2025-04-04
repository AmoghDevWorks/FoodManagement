const mongoose = require('mongoose')

const donorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    aadhar:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    rating:{
        type:Array,
        default:[]
    },
    rank:{
        type:Number,
        default:0
    }
})

const donorModel = mongoose.model("Donor",donorSchema)

module.exports = donorModel