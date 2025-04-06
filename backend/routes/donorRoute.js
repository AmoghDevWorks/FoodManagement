const express = require('express')
const { signin, signUp, donateFood } = require('../controllers/donor')

const router = express.Router()

router.post('/signin-donor',signin)
router.post('/signup-donor',signUp)
router.post('/donate-food',donateFood)

module.exports = router