const mongoose = require('mongoose');
const foodSeekerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    adress:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
});
const FoodSeeker=mongoose.model('FoodSeeker',foodSeekerSchema);
module.exports=FoodSeeker;