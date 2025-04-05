const bodyParser = require('body-parser')
const express = require('express')
const connectDB = require('./config/db.js')
const cors = require('cors')
const donorRoutes = require('./routes/donorRoute.js')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

connectDB()

app.use(donorRoutes)

app.listen(5000,()=>{console.log('connected')})