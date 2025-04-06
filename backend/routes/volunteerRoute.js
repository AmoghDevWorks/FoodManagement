const express = require('express')
const { signIn,signUp } = require('../controllers/volunteer')

const router = express.Router()

router.post('/signup-volunteer',signUp)
router.get('/signin-volunteer',signIn)

module.exports = router