const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_instance');

const Messages = sequelize.define('Room', {
  room_id: {
    type: DataTypes.UUID,  // Используем UUID для user_id
    allowNull: false,
    references: {
      model: 'rooms',  // Ссылка на таблицу users
      key: 'room_id',  // Ссылаемся на поле user_id
    },
    onDelete: 'CASCADE',  // При удалении пользователя, удаляется и запись в rooms
  },
  sender_id: {
    type: DataTypes.UUID,  // Используем UUID для user_id
    allowNull: false,
    references: {
      model: 'users',  // Ссылка на таблицу users
      key: 'user_id',  // Ссылаемся на поле user_id
    },
    onDelete: 'CASCADE',  // При удалении пользователя, удаляется и запись в rooms
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'rooms',
  timestamps: true,
});

module.exports = Messages;
