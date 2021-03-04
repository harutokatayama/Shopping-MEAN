const Product = require('../models/product');

exports.createProduct = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const product= new Product({
    title: req.body.title,
    price: req.body.price,
    imagePath: url + '/images/' + req.file.filename,
    description: req.body.description,
    quantity: req.body.quantity,
    weight: req.body.weight,
    category: req.body.category,
    country: req.body.country,
    height: req.body.height,
    width: req.body.width
  });
  product
    .save()
    .then(createdProduct => {
      res.status(201).json({
        message: 'Product added successfully',
        product: {
          ...createdProduct,
          id: createdProduct._id
        }
      });
    })
    .catch(error => {
      escape.status(500).json({
        message: 'Creating a product failed!'
      })
    });
}

exports.updateProduct = (req, res, next) => {
  const imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const product = new Product({
    _id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    imagePath: imagePath,
    description: req.body.description,
    quantity: req.body.quantity,
    weight: req.body.weight,
    category: req.body.category,
    country: req.body.country,
    height: req.body.height,
    width: req.body.weight
  });
  console.log(product);
  Product.updateOne({ _id: req.params.id, creator: req.userData.userId }, product)
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(201).json({
          message: 'Update successful!'
        });
      } else {
        res.status(401).json({
          message: 'Not Authorized!'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "couldn't update product!"
      });
    });
}

exports.getProducts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const productQuery = Product.find();
  if (pageSize && currentPage) {
    productQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  productQuery
    .then(documents => {
      fetchedProducts = documents;
      return Product.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Products fetched successfully!',
        products: fetchedProducts,
        maxProducts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching product failed!'
      });
    });
}

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({
          message: 'Product not found!'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching product failed!'
      });
    });
}

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: 'Deletion successful!'
      });
    } else {
      res.status(401).json({
        message: 'Not Authorized!'
      })
    }
  });
}