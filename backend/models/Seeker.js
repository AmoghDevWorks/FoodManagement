const mongoose = require('mongoose')

const seekerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
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
    recieves:{
        type:Array,
        default:[]
    }
})

const seekerModel = mongoose.model('Seeker',seekerSchema)

module.exports = seekerModel