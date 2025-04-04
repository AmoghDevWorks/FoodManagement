const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const router = require('./routes/route');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use('/api', router);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server started on port ${PORT}`);
});
