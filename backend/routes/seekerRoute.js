const express = require('express')
const { signin,signup,getFood } = require('../controllers/seeker')
const router = express.Router()

router.post('/signup-seeker',signup)
router.post('/signin-seeker',signin)
router.get('/get-food',getFood)

module.exports = router
