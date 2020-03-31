const fs = require('fs');
const path = require('path');

const Product = require('../models/product');

const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'products.json');


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
    Product.fetchAll(products => {
        Product.findById(id, product => {
            let done = false;
            for (let i = 0; i < products.length && !done; i++) {
                if (products[i].id === product.id) {
                    products[i].title = title;
                    products[i].imageURL = imageURL;
                    products[i].price = price;
                    products[i].description = description;
                    done = true;
                }
            }
            fs.writeFile(p, JSON.stringify(products), err => {
                res.render('admin/products', {
                    prods: products,
                    pageTitle: 'Admin Products',
                    path: '/admin/products'
                });
            });
        });
    });
};