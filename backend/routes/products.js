const router = require('express').Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const { page = 1, limit = 10, category, sort } = req.query;

  let filter = {};
  if (category) {
    filter.category = { $in: category.split(',') };
  }

  let sortOption = {};
  if (sort === 'price_asc') sortOption.price = 1;
  if (sort === 'price_desc') sortOption.price = -1;
  if (sort === 'name') sortOption.name = 1;

  const products = await Product.find(filter)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(products);
});

module.exports = router;