const express = require('express')
const { signin, signUp, donateFood } = require('../controllers/donor')
const upload = require('../middlewares/image')

const router = express.Router()

router.post('/signin-donor',signin)
router.post('/signup-donor',signUp)
router.post('/donate-food', upload.single('image'),donateFood)

module.exports = router