const express = require('express');

const productsRoutes = require('./products/products.routes')
const userRoutes = require('./users/users.routes')

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/users', userRoutes);

module.exports = router;