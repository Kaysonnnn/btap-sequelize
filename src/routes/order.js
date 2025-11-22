const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/', orderController.createOrder); // Create order
router.get('/user/:user_id', orderController.getOrdersByUser); // Get orders by user
router.get('/food/:food_id', orderController.getOrdersByFood); // Get orders by food


module.exports = router;