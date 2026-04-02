const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.use('/shops', require('./routes/shops'));
app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));

app.listen(5000, () => console.log('Server running on 5000'));
