const express = require('express');
const Donar = require('../models/donar');
const FoodSeeker = require('../models/foodSeeker');
const Volunteer = require('../models/volunteer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config(); 
// Register Donor

const registerDonar = async (req, res) => {
    const { name, adress, phone, foodType, aadhar, password,email } = req.body;
    if (!name || !adress || !phone || !foodType || !aadhar || !password|| !email) {
        return res.status(400).json({success:"false", message: 'All fields are required' });
    }

    try {
        // Check if donor already exists
        const user= await Donar.findOne({ email });
        if (user) {
            return res.status(400).json({success:"false", message: 'Donar already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const donar = new Donar({ name, adress, phone, foodType, aadhar, password: hashedPassword, email });

        await donar.save();
        res.status(201).json({success:"true", message: 'Donar registered successfully' });
    } catch (error) {
        res.status(500).json({ success:"false",message: 'Server error', error });
    }
};

// Register Food Seeker
const registerFoodSeeker = async (req, res) => {
    const { name, adress, phone, foodType, aadhar, password,email } = req.body;

    if (!name || !adress || !phone || !foodType || !aadhar || !password || !email) {
        return res.status(400).json({ success:"false",message: 'All fields are required' });
    }

    try {
        const user= await Donar.findOne({ email });
        if (user) {
            return res.status(400).json({success:"false", message: 'Seeker already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const foodSeeker = new FoodSeeker({ name, adress, phone, foodType, aadhar, password: hashedPassword ,email});

        await foodSeeker.save();
        res.status(201).json({success:"true", message: 'Food Seeker registered successfully' });
    } catch (error) {
        res.status(500).json({ success:"false",message: 'Server error', error });
    }
};

// Register Hotel

// Register Volunteer
const registerVolunteer = async (req, res) => {
    const { name, vechicleType, phone, aadhar, availableTime, adress, password } = req.body;

    if (!name || !vechicleType || !phone || !aadhar || !availableTime || !adress || !password) {
        return res.status(400).json({success:"false", message: 'All fields are required' });
    }

    try {
        const user= await Donar.findOne({ email });
        if (user) {
            return res.status(400).json({success:"false", message: 'Volunteer already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const volunteer = new Volunteer({ name, vechicleType, phone, aadhar, availableTime, adress, password: hashedPassword });

        await volunteer.save();
        res.status(201).json({ success:"true",message: 'Volunteer registered successfully' });
    } catch (error) {
        res.status(500).json({success:"false", message: 'Server error', error });
    }
};

// Donor Login
const loginDonar = async (req, res) => {
    const {  email,password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success:"false",message: 'All fields are required' });
    }

    try {
        // Check if Donor exists
        const donar = await Donar.findOne({ email });
        if (!donar) {
            return res.status(404).json({success:"false", message: 'Donor not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, donar.password);
        if (!isMatch) {
            return res.status(400).json({success:"false", message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: donar._id, name: donar.name }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({success:"true", message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ success:"false",message: 'Server error', error });
    }
};
const loginFoodSeeker = async (req, res) => {
    const { email, password } = req.body;

    if (!email|| !password) {
        return res.status(400).json({ success:"false",message: 'All fields are required' });
    }

    try {
        // Check if Food Seeker exists
        const foodSeeker = await FoodSeeker.findOne({ email });
        if (!foodSeeker) {
            return res.status(404).json({success:"false", message: 'Food Seeker not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, foodSeeker.password);
        if (!isMatch) {
            return res.status(400).json({success:"false", message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: foodSeeker._id, name: foodSeeker.name }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({success:"true", message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ success:"false",message: 'Server error', error });
    }
};
const loginVolunteer = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success:"false",message: 'All fields are required' });
    }

    try {
        // Check if Volunteer exists
        const volunteer = await Volunteer.findOne({ email});
        if (!volunteer) {
            return res.status(404).json({success:"false", message: 'Volunteer not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, volunteer.password);
        if (!isMatch) {
            return res.status(400).json({success:"false", message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: volunteer._id, name: volunteer.name }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({success:"true", message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ success:"false",message: 'Server error', error });
    }
};
// Export all controllers
module.exports = {
    registerDonar,
    registerFoodSeeker,
    registerVolunteer,
    loginDonar,
    loginFoodSeeker,
    loginVolunteer,

};
