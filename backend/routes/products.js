const express = require('express');

const ProductsController = require('../controllers/products');

const checkAuth = require('../middleware/check-auth');
const extraFile = require('../middleware/check-file');

const router = express.Router();

router.post('', checkAuth, extraFile, ProductsController.createProduct);

router.put('/:id', checkAuth, extraFile, ProductsController.updateProduct);

router.get('', ProductsController.getProducts);

router.get('/:id', ProductsController.getProduct);

router.delete('/:id', checkAuth, ProductsController.deleteProduct);

module.exports = router;
