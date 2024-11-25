const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_instance');

const Room = sequelize.define('Room', {
  room_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  joined_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  type: {
    type: DataTypes.ENUM('personal', 'group'), // Тип комнаты (личный или групповой)
    allowNull: false,
    defaultValue: 'personal', // По умолчанию тип 'personal'
  },
}, {
  tableName: 'rooms', // Имя таблицы
  timestamps: true,
});

module.exports = Room;