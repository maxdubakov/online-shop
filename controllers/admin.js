const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageURL, price, description);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('admin/edit-product', {
            pageTitle: product.title,
            path: '/admin/products',
            product: product
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const id = req.params.productId;
    Product.findById(id, product => {
        product.title = title;
        product.imaURL = imageURL;
        product.price = price;
        product.description = description;
        res.render('/admin/products', {
            pageTitle: product.title,
            path: '/admin/products',
            product: product
        });
    });
};