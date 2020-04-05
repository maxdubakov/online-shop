const mongodb = require('mongodb');

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
        .find({_id: new mongodb.ObjectId(userId)})
        .next()
        .then(user => {
            return user
        })
        .catch(err => console.log(err))
    }
}

module.exports = User;