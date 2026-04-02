const router = require('express').Router();
const Order = require('../models/Order');
const Coupon = require('../models/Coupon'); // Импортируем модель купонов

router.post('/', async (req, res) => {
  const { email, phone, address, items, couponCode } = req.body;

  
  let total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  
  let discount = 0;
  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode });
    if (coupon) {
      discount = coupon.discount;
      total = total - (total * (discount / 100));
    }
  }

  
  const order = new Order({
    email,
    phone,
    address,
    items,
    couponCode: couponCode || null,
    totalPrice: total.toFixed(2)
  });

  await order.save();
  res.json(order);
});

router.get('/', async (req, res) => {
  const { email, phone } = req.query;
  const orders = await Order.find({ email, phone });
  res.json(orders);
});

module.exports = router;
