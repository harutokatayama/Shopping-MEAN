const express = require('express');

const cartController = require('../controllers/cart');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/cart', checkAuth, cartController.getCart);

router.post('/cart', checkAuth, cartController.postCart);

router.post('/cart-delete-item', checkAuth, cartController.postCartDeleteProduct);

module.exports = router;
