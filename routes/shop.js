const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');


router.get('/checkout', shopController.getCheckout);
router.get('/products', shopController.getProducts);
router.get('/orders', shopController.getOrders)
router.get('/cart', shopController.getCart);
router.get('/', shopController.getIndex);


module.exports = router;