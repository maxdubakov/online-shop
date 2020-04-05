const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;


class Product {

    constructor(title, price, description, imageURL, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageURL = imageURL;
        if (id) {
            this._id = new mongodb.ObjectId(id);
        } else id = null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOperation;
        if (this._id) {
            dbOperation = db.collection('products').updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOperation = db.collection('products').insertOne(this);
        }
        return dbOperation
            .then(result => {

            })
            .catch(err => console.log(err));

    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err))
    }


    static findById(productId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: new mongodb.ObjectId(productId) })
            .next()
            .then(product => {
                return product;
            })
            .catch(err => console.log(err))
    }

    static deleteById(productId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(productId) })
            .then(result => {
                console.log('Deleted the product!');
            }).catch(err => console.log(err))
    }
}

module.exports = Product;