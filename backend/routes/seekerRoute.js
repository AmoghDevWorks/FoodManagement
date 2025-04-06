const express = require('express')
const { signin,signup } = require('../controllers/seeker')
const router = express.Router()

router.post('/signup-seeker',signup)
router.post('/signin-seeker',signin)

module.exports = router
