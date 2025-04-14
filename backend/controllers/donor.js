const donorModel = require('../models/donor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const foodModel = require('../models/food')

dotenv.config()

const signin = async(req,res,next)=>{
    const { email,password } = req.body
    let userData;

    donorModel.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.status(400).json({data:'User not found'})
        }
        userData = user
        return bcrypt.compare(password,user.password)
    })
    .then(passwordMatch=>{
        if(!passwordMatch){
            return res.status(400).json({data:'Incorrect Password'})
        }

        const token = jwt.sign(
            { id: userData._id, email: userData.email },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        )

        res.status(200).json({
            message:'Successfully loggedIn',
            token,
            user:{
                id:userData._id,
                email:userData.email,
                name:userData.name,
            }
        })
    })
    .catch((e)=>{
        return res.status(500).json({data:"Internal server error"})
    })
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

            res.status(200).json({
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
const donateFood = (req, res) => {  
    const { name, rate, rating = 2.5, quantity, latitude, longitude, donor } = req.body;
  
    // Validate required fields
    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }
    if (!latitude || !longitude) {
        return res.status(400).json({ message: "Location (latitude & longitude) is required" });
    }
  
    const imagePath = req.file.path;
  
    const newFood = new foodModel({
        name,
        rate,
        rating,
        quantity,
        donor,
        foodImage: imagePath,
        location: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        },
    });
  
    newFood.save()
        .then((savedFood) => {
            res.status(201).json({
            message: "Food donated successfully",
            food: savedFood,
            });
        })
        .catch((err) => {
            console.error("Error saving food:", err);
            res.status(500).json({ message: "Internal Server Error" });
        });
};
  

module.exports = { signin,signUp,donateFood }