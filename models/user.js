const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {

    constructor(userename, email) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = getDb();
        return db
        .collections('users')
        .insertOne(this);
    }

    static findById(userId) {
        const db = getDb();

        return db
        .collections('users')
        .findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User;