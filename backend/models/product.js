const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  imagePath: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: String, required: true },
  weight: { type: String, required: true },
  category: { type: String, required: true },
  country: { type: String, required: true },
  height: { type: String, required: true },
  width: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
