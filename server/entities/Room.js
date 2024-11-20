const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_instance');

const Room = sequelize.define('Room', {
  room_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  user_ids: {
    type: DataTypes.ARRAY(DataTypes.UUID), // Массив UUID
    allowNull: false,
  },
  joined_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'rooms',
  timestamps: true,
});

module.exports = Room;
