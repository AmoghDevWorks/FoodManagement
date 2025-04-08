const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const seekerModel = require('../models/Seeker')
const dotenv = require('dotenv')
const foodModel = require('../models/food')

dotenv.config()

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    let fetchedData;
  
    seekerModel.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ data: "Invalid Credentials" });
        }
        fetchedData = user;
        return bcrypt.compare(password, user.password);
      })
      .then(passwordChecked => {
        if (!passwordChecked) {
          return res.status(401).json({ data: "Invalid password" });
        }
  
        const token = jwt.sign(
          { id: fetchedData._id, email: fetchedData.email },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
  
        return res.status(200).json({
          data: "Seeker logged In successfully",
          token,
          user: {
            id: fetchedData._id,
            name: fetchedData.name,
            email: fetchedData.email
          }
        });
      })
      .catch(e => {
        console.error("Signin error:", e);
        return res.status(500).json({ data: "Internal Server Error" });
      });
  };
  

const signup = async(req,res,next)=>{
    const { name,email,address,aadhar,contact,password } = req.body

    seekerModel.findOne({email:email})
    .then((user)=>{
        if(user){
            return res.status(400).json({data:"User already exist"})
        }

        return bcrypt.hash(password,10)
    })
    .then(hashedPassword=>{
        const data = new seekerModel({
            name:name,
            email:email,
            password:hashedPassword,
            aadhar:aadhar,
            contact:contact,
            location:address
        })

        return data.save()
    })
    .then(savedUser=>{
        if(!savedUser){
            return res.status(400).json({data:"Unable to save the user data"})
        }

        const token = jwt.sign(
            {id:savedUser._id,email:savedUser.email},
            process.env.JWT_KEY,
            { expiresIn:"1h" }
        )

        return res.status(200).json({
            data:"signUp successfull",
            token,
            user:{
                id:savedUser._id,
                name:savedUser.name,
                email:savedUser.email
            }
        })
    })
    .catch(e=>{
        console.log(e)
        return res.status(500).json({data:"Internal server error"})
    })
}

const getFood = async(req,res,next) =>{
  foodModel.find()
  .then(data=>{
    res.status(200).json({data:'Getting all food',food:data})

  })
  .catch(e=>{
    res.status(500).json({data:"internal server error"})
  })
}

module.exports = { signin,signup,getFood }