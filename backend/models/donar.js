const mongoose = require('mongoose');
const express = require('express');
const donarSchema = new mongoose.Schema({
    name: { 
    type: String, 
    required: true 
    },
    adress:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    foodType:{
        type: String,
        required: true
    },
    aadhar:{
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
const Donar = mongoose.model('Donar', donarSchema);
module.exports = Donar;