const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');


router.get('/checkout', shopController.getCheckout);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/orders', shopController.getOrders);

router.post('/cart', shopController.postCart);

router.get('/cart', shopController.getCart);

router.get('/', shopController.getIndex);


module.exports = router;