const Product = require('../models/product');

exports.getCart = (req, res, next) => {
    req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
          return user.cart.items;
      })
      .then(result => {
        res.status(201).json({
            message: 'Get cart successfully!',
            result: result
        });
      })
      .catch(err => {
        res.status(500).json({
            message: 'Failed to get cart!'
        });
      })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
      .then(product => {
          return req.user.addToCart(product);
      })
      .then(result => {
        res.status(201).json({
            message: 'Item is added to your cart!',
            result: result
        });
      })
      .catch(err => {
        res.status(500).json({
            message: 'Failed to add item to your cart!'
        });
      });
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
      .removeFromCart(prodId)
      .then(resutl => {
        res.status(201).json({
            message: 'Item was removed from your cart!',
            result: result
        });
      })
      .catch(err => {
        res.status(500).json({
            message: 'Failed to remove item from your cart!'
        });
      });
}
