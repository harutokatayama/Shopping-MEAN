const express = require('express');

const checkAuth = require('../middleware/check-auth');

const ordersController = require('../controllers/orders');

const router = express.Router();

router.get('/orders', checkAuth, ordersController);

router.get('/orders/:orderId', checkAuth, ordersController);

module.exports = router;
