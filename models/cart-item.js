const Sequelize = require('sequelize');

const sequilize = require('../util/database');

const CartItem = sequilize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
});

module.exports = CartItem;