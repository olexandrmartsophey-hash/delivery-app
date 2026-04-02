const router = require('express').Router();
const Shop = require('../models/Shop');

router.get('/', async (req, res) => {
  const { min = 0, max = 5 } = req.query;

  const shops = await Shop.find({
    rating: { $gte: min, $lte: max }
  });

  res.json(shops);
});

module.exports = router;