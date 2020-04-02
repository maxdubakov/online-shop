const Sequelize = require('sequelize');

const sequilize = require('../util/database');

const CartItem = sequilize.define('cartItem', {
    id: {
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    quantity: {
        allowNull: false,
        quantity: Sequelize.INTEGER
    }
});

module.exports = CartItem;