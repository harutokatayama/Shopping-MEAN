const express = require('express');

const cartController = require('../controllers/cart');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/cart', checkAuth, cartController);

router.post('/cart', checkAuth, cartController);

router.post('/cart-delete-item', checkAuth, cartController);

module.exports = router;
