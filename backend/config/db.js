const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async() =>{
    mongoose.connect(process.env.MONGO_URI)
    .then((res)=>{
        console.log('DB connected successfully')
    })
    .catch(()=>{
        console.log("DB is not connecting")
    })
}

module.exports = connectDB