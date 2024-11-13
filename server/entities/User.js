const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_instance');
const { v4: uuidv4 } = require('uuid');  // Генерация UUID

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,   // Оставляем id как INTEGER
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,      // Добавляем поле user_id типа UUID
    defaultValue: uuidv4(),    // Генерация UUID по умолчанию
    unique: true,              // user_id уникален
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,  // Sequelize будет автоматически добавлять createdAt и updatedAt
});

module.exports = User;
