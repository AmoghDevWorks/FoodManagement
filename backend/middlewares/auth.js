const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'your_jwt_secret';

// Common authentication function
const authenticateUser = async (req, res, next) => {
    const token = req.header('authorization');

    if (!token) {
        return res.status(401).json({ success: "false", message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY); // Remove "Bearer " if present
        req.user = decoded; // Store user details in request object
        next(); // Move to the next middleware
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: "false", message: "Token has expired. Please log in again." });
        }
        return res.status(400).json({ success: "false", message: "Invalid token." });
    }
};

// Specific middlewares for different roles
const DonAuth = async (req, res, next) => authenticateUser(req, res, next);
const FoodSeekAuth = async (req, res, next) => authenticateUser(req, res, next);
const VolunteerAuth = async (req, res, next) => authenticateUser(req, res, next);

module.exports = { DonAuth, FoodSeekAuth, VolunteerAuth };
