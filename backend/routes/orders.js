const router = require('express').Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});


router.get('/', async (req, res) => {
  const { email, phone } = req.query;

  const orders = await Order.find({ email, phone });
  res.json(orders);
});

module.exports = router;