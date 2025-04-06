const express = require('express')
const { signIn,signUp } = require('../controllers/volunteer')

const router = express.Router()

router.post('/signup-volunteer',signUp)
router.post('/signin-volunteer',signIn)

module.exports = router