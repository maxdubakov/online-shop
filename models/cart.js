const Sequelize = require('sequelize');

const sequilize = require('../util/database');

const Cart = sequilize.define('cart', {
    id: {
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;