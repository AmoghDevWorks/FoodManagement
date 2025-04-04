const bodyParser = require('body-parser')
const express = require('express')
const connectDB = require('./config/db.js')

const app = express()
app.use(bodyParser)

connectDB()

app.listen(5000,()=>{console.log('connected')})