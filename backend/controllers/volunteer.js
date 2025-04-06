const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const volunteerModel = require('../models/volunteer')

dotenv.config()

const signUp = (req,res,next) =>{
    const {name,email,password,aadhar,contact} = req.body

    volunteerModel.findOne({email:email})
    .then(user=>{
        if(user){
            return res.status(400).json({data:"User is already exist"})
        }

        return bcrypt.hash(password,10)
    })
    .then(hashedPassword=>{
        const newUser = new volunteerModel({
            name:name,
            email:email,
            password:hashedPassword,
            aadhar:aadhar,
            contact:contact
        })

        return newUser.save()
    })
    .then(savedUser=>{
        if(!savedUser){
            return res.status(400).json({data:"Unable to save the user details"})
        }

        const token = jwt.sign(
            {id:savedUser._id,email:savedUser.email},
            process.env.JWT_KEY,
            { expiresIn:"1h" }
        )

        return res.status(200).json({
            data:"Volunteer SignedUp successfully",
            token,
            user:{
                id:savedUser._id,
                name:savedUser.name,
                email:savedUser.email
            }
        })
    })
    .catch(e=>{
        return res.status(500).json({data:e})
    })
}

const signIn = (req,res,next) =>{
    const { email,password } = req.body
    let fetchedData;

    volunteerModel.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.status(400).json({data:"User Not found, Invalid credentials"})
        }

        fetchedData = user
        // console.log(user)
        return bcrypt.compare(password,user.password)
    })
    .then(passwordMatch=>{
        if(!passwordMatch){
            return res.status(400).json({data:"Invalid password"})
        }

        const token = jwt.sign(
            {id:fetchedData._id,email:fetchedData.email},
            process.env.JWT_KEY,
            { expiresIn:"1h" }
        )

        return res.status(200).json({
            data:"volunteer loggedIn",
            token,
            user:{
                id:fetchedData._id,
                name:fetchedData.name,
                email:fetchedData.email
            }
        })
    })
    .catch(e=>{
        return res.status(500).json({data:e})
    })
}

module.exports = { signUp,signIn }