const express = require('express')
const mongoose = require('mongoose')
const donorModel = require('../models/donor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const signin = async(req,res,next)=>{
    console.log(req.body)
}

const signUp = async(req,res,next)=>{
        const { name,email,password,contact,aadhar,address } = req.body

        donorModel.findOne({email:email})
        .then((existingUser)=>{
            if(existingUser){
                return res.status(400).json({data:"User already exists"})
            }  
            return bcrypt.hash(password,10)     
        })
        .then((hashedPassword)=>{
            if(!hashedPassword){
                return res.status(400).json({data:"Hashing password failed"})
            }

            const newDonor = new donorModel({
                name:name,
                email:email,
                password:hashedPassword,
                location:address,
                aadhar:aadhar,
                contact:contact
            })

            return newDonor.save()
        })
        .then((savedUser)=>{
            if (!savedUser) return;

            const token = jwt.sign(
                { id: savedUser._id, email: savedUser.email },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );

            res.status(201).json({
                message: "Donor registered successfully",
                token,
                user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
                }
            });
        })
        .catch((e)=>{
            console.log(e)
        })
      
}

module.exports = { signin,signUp }