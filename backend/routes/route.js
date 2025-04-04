const express = require('express');
const router = express.Router();
const { registerDonar, registerFoodSeeker, registerVolunteer, loginDonar,loginFoodSeeker,loginVolunteer } = require('../controllers/control');

// Registration Routes
router.post('/register/donar', registerDonar);
router.post('/register/foodSeeker', registerFoodSeeker);
router.post('/register/volunteer', registerVolunteer);

// Login Route
router.post('/login/donar', loginDonar);
router.post('/login/foodSeeker', loginFoodSeeker);
router.post('/login/volunteer', loginVolunteer);

module.exports = router;
