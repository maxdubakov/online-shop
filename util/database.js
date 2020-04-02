const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node-complete', 'root', 'Dubakov88', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;