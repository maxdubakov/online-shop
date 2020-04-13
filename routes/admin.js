const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product',
    [
        body('title', 'Title Is Invalid!')
            .isLength({ min: 3 })
            .isString()
            .trim(),

        body('imageURL', 'imageURL Is Invalid!')
            .isURL(),

        body('price', 'Price Is Invalid!')
            .isFloat(),

        body('description', 'Description Is Invalid!')
            .isLength({ min: 10, max: 300 })
            .isString()
    ]
    , isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',
    [
        body('title', 'Title Is Invalid!')
            .isLength({ min: 3 })
            .isString()
            .trim(),

        body('imageURL', 'imageURL Is Invalid!')
            .isURL(),

        body('price', 'Price Is Invalid!')
            .isFloat(),

        body('description', 'Description Is Invalid!')
            .isLength({ min: 10, max: 300 })
            .isString()
    ]
    , isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;