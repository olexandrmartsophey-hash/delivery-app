const express = require('express');
const router = express.Router();
const Coupon = require('../models/coupon'); 


router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;