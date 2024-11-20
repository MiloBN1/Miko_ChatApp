const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_instance');

const Room = sequelize.define('Room', {
  room_id: {
    type: DataTypes.UUID, // Используем UUID для room_id
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // Генерация UUID по умолчанию
  },
  user_ids: {
    type: DataTypes.ARRAY(DataTypes.UUID), // Массив UUID для хранения участников
    allowNull: false,
  },
  joined_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'rooms', // Имя таблицы
  timestamps: true,
});

module.exports = Room;
