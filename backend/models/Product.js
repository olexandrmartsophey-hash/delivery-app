const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  shopId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Product', ProductSchema);