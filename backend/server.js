const bodyParser = require('body-parser')
const express = require('express')
const connectDB = require('./config/db.js')
const cors = require('cors')
const donorRoutes = require('./routes/donorRoute.js')
const seekerRoutes = require('./routes/seekerRoute.js')
const volunteerRoutes = require('./routes/volunteerRoute.js')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

connectDB()

app.use(donorRoutes)
app.use(seekerRoutes)
app.use(volunteerRoutes)

app.listen(5000,()=>{console.log('connected')})