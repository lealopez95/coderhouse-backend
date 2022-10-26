const express = require('express');

const productsRoutes = require('./products/products.routes')
const userRoutes = require('./users/users.routes')
const messagesRoutes = require('./messages/messages.routes')

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/users', userRoutes);
router.use('/messages', messagesRoutes);

module.exports = router;