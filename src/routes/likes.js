const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likesController');


router.post('/', likesController.like); // Like restaurant
router.delete('/', likesController.unlike); // Unlike restaurant
router.get('/user/:user_id', likesController.getLikesByUser); // Get likes by user
router.get('/restaurant/:res_id', likesController.getLikesByRes); // Get likes by restaurant


module.exports = router;