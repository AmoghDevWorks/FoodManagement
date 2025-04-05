const express = require('express')
const { signin, signUp } = require('../controllers/donor')

const router = express.Router()

router.post('/signin-donor',signin)
router.post('/signup-donor',signUp)

module.exports = router