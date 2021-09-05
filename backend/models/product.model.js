const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: {type: Object},
  customizable: {type: Boolean}
});

module.exports = mongoose.model('Product', productSchema);