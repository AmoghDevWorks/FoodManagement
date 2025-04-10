const express = require('express')
const { signin,signup,getFood,addToCart,getCart,clearCart, getSeekerData } = require('../controllers/seeker')
const router = express.Router()

router.post('/signup-seeker',signup)
router.post('/signin-seeker',signin)
router.get('/get-food',getFood)
router.post('/add-to-cart',addToCart)
router.get('/get-cart/:id',getCart)
router.patch('/clear-cart/:id',clearCart)
router.get('/get-seeker-data/:email',getSeekerData)

module.exports = router
