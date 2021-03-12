const express = require('express');

const ProductsController = require('../controllers/products');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/check-file');

const router = express.Router();

router.post('', extractFile, ProductsController.createProduct);

router.put('/:id', extractFile, ProductsController.updateProduct);

router.get('', ProductsController.getProducts);

router.get('/:id', ProductsController.getProduct);

router.get('/nin/:id', ProductsController.getProductsNinCurrentId);

router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;
