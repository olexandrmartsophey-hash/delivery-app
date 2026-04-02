const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true } 
});

module.exports = mongoose.model('Coupon', couponSchema);