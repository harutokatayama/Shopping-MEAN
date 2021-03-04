const express = require('express');

const checkoutController = require('../controllers/checkout');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/checkout', checkAuth, checkoutController);

router.get('/checkout/success', checkoutController);

router.get('/checkout/cancel', checkoutController);

module.exports = router;
