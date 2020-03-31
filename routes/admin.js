const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product/:productId', adminController.postEditProduct)

router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);


module.exports = router;