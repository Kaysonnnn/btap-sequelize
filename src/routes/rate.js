const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rateController');


router.post('/', rateController.addOrUpdateRating); // Add or update rating
router.get('/user/:user_id', rateController.getRatingsByUser); // Get ratings by user
router.get('/restaurant/:res_id', rateController.getRatingsByRes); // Get ratings by restaurant


module.exports = router;