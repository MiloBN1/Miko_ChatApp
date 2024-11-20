const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_instance');

const Messages = sequelize.define('Message', {
  room_id: {
    type: DataTypes.UUID,  // Используем UUID для room_id
    allowNull: false,
    references: {
      model: 'rooms',  // Ссылка на таблицу rooms
      key: 'room_id',  // Ссылаемся на поле room_id
    },
    onDelete: 'CASCADE',  // При удалении комнаты, удаляется и сообщение
  },
  sender_id: {
    type: DataTypes.UUID,  // Используем UUID для user_id
    allowNull: false,
    references: {
      model: 'users',  // Ссылка на таблицу users
      key: 'user_id',  // Ссылаемся на поле user_id
    },
    onDelete: 'CASCADE',  // При удалении пользователя, удаляется и сообщение
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
  tableName: 'messages', // Изменил имя таблицы на messages
  timestamps: true,
});

module.exports = Messages;
