const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_instance');

const Room = sequelize.define('Room', {
  room_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,  // Используем UUID для user_id
    allowNull: false,
    references: {
      model: 'users',  // Ссылка на таблицу users
      key: 'user_id',  // Ссылаемся на поле user_id
    },
    onDelete: 'CASCADE',  // При удалении пользователя, удаляется и запись в rooms
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
