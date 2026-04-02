const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  name: String,
  rating: Number
});

module.exports = mongoose.model('Shop', ShopSchema);