const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  email: String,
  phone: String,
  address: String,
  items: Array,
  totalPrice: Number, 
  couponCode: String, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
