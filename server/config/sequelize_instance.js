const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chatapp', 'postgres', 'miko', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;