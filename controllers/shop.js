const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');

const ITEMS_PER_PAGE = 2;

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getIndex = (req, res, next) => {
    const page = req.query.page;
    let totalItems;

    Product.find()
        .countDocuments()
        .then(numProducts => {
            totalItems = numProducts;
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(2);
        }).then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                currentPage: page,
                totalProducts: totalItems,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPreviousPage: page > 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            });
        })
        .catch(err => {
            console.log(err);
        });

}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            return req.user.cart.items;
        })
        .then(productsInCart => {
            req.user.cart.items = productsInCart.filter(p => {
                return p.productId != null;
            });

            return req.user.save();
        })
        .then(user => {
            const products = req.user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err))
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    req.user.
        removeFromCart(productId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    Order
        .find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err))
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = req.user.cart.items.map(item => {
                return { product: { ...item.productId._doc }, quantity: item.quantity }
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user._id
                },
                products: products
            });

            return order.save();
        }).then(result => req.user.clearCart())
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => next(err))
};

exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;

    Order.findById(orderId)
        .then(order => {

            if (!order) {
                return next(new Error('No order is found'));
            }

            if (order.user.userId.toString() !== req.user._id.toString()) {
                return next(new Error('You are unauthorized'));
            }
            const invoiceName = 'invoice-' + orderId + '.pdf';
            const invoicePath = path.join('data', 'invoices', invoiceName);
            // fs.readFile(invoicePath, (err, data) => {
            //     if (err) {
            //         return next(err);
            //     }
            //     res.setHeader('Content-Type', 'application/pdf');
            //     res.send(data);
            // });

            // const file = fs.createReadStream(invoicePath);
            // res.setHeader('Content-Type', 'application/pdf');
            // file.pipe(res);

            const pdfDoc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);

            pdfDoc.fontSize(28).text('Invoice', {
                underline: true
            });
            pdfDoc.text('--------------------');

            let totalPrice = 0;
            order.products.forEach(prod => {
                totalPrice += prod.product.price * prod.quantity;
                pdfDoc.fontSize(16).text(prod.product.title + '  --------- ' + prod.quantity + ' x  $' + prod.product.price);
            })
            pdfDoc.text('--------------------');
            pdfDoc.fontSize(22).text('Total Price:  $' + totalPrice);

            pdfDoc.end();

        })
        .catch(err => next(new Error('No order is found')))

};