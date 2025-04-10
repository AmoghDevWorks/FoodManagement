const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb');
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

const addToCart = (req, res, next) => {
  const { foodId, quantity, seekerId } = req.body;

  seekerModel.updateOne(
    { _id: new ObjectId(seekerId) },
    { $push: { cart: { foodId, quantity } } }
  )
  .then(result => {
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Item added to cart successfully.' });
    } else {
      res.status(404).json({ message: 'Seeker not found.' });
    }
  })
  .catch(error => {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Something went wrong.', error });
  });
};

const getCart = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const data = await seekerModel.findOne({ _id: userId });

    if (!data) {
      return res.status(404).json({ data: "User not found" });
    }

    const cart = data.cart;
    let cartCompleteData = [];

    //extracting all the data of food from id present in cart
    for (let i = 0; i < cart.length; i++) {
      const foodId = cart[i]["foodId"];
      const foodQuantity = cart[i]["quantity"];

      const foodData = await foodModel.findOne({ _id: foodId });

      if (!foodData) {
        return res.status(404).json({ data: `Unable to find food with id ${foodId}` });
      }

      const cartPatternData = {
        foodData,
        foodQuantity,
      };

      cartCompleteData.push(cartPatternData);
    }

    return res.status(200).json({ data: cartCompleteData });
  } catch (e) {
    console.error("Error in getCart:", e);
    return res.status(500).json({ data: "Internal server error" });
  }
};

const clearCart = async(req,res,next) =>{
  const userId = req.params.id
  
  seekerModel.updateOne(
    { _id:new ObjectId(userId) },
    { $set:{ cart:[] }}
  )
  .then(updatedUser=>{
    return res.status(200).json({data:"Cart cleared successfully"})
  })
  .catch(e=>{
    return res.status(500).json({data:"unable to update the cart",error:e})
  })
}

const getSeekerData = async(req,res,next) =>{
  const seekerEmail = req.params.email

  seekerModel.findOne({email:seekerEmail})
  .then(user=>{

    if(!user){
      return res.status(404).json({data:"Invalid Not found"})
    }

    return res.status(200).json({data:"successfully fetched",userData:user})
  })
  .catch(e=>{
    return res.status(500).json({data:"internal server error"})
  })
}

const placeOrder = async (req, res, next) => {
  const id = req.params.id;

  seekerModel
    .findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ data: "User not found" });
      }

      const cartItems = user.cart;

      if (cartItems.length === 0) {
        return res.status(400).json({ data: "Cart is empty" });
      }

      const orderDetails = [];

      const promises = cartItems.map((item) => {
        return foodModel
          .findById(item.foodId)
          .then((foodData) => {
            if (foodData) {
              orderDetails.push({
                name: foodData.name,
                // data: foodData,
                quantity: item.quantity,
              });
            }
          })
          .catch((err) => {
            console.error("Error fetching food:", err);
          });
      });

      Promise.all(promises)
        .then(() => {
          return seekerModel.updateOne(
            { _id: new ObjectId(id) },
            {
              $push: {
                order: {
                  $each: [
                    {
                      items: orderDetails,
                      time: new Date(),
                    },
                  ],
                  $position: 0,
                },
              },
              $set: {
                cart: [],
              },
            }
          );
        })
        .then(() => {
          return res.status(200).json({ data: "Order placed successfully" });
        })
        .catch((err) => {
          console.error("Error placing order:", err);
          return res.status(500).json({ data: "Internal Server error" });
        });
    })
    .catch((e) => {
      return res.status(500).json({ data: "Internal Server error" });
    });
};


module.exports = { signin,signup,getFood,addToCart,getCart,clearCart,getSeekerData,placeOrder }