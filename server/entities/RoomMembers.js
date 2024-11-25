const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_instance');
const Room = require('./Room');

const RoomMembers = sequelize.define('RoomMember', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    room_id: {
        type: DataTypes.UUID,
        references: { model: 'rooms', key: 'room_id' },
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        references: { model: 'users', key: 'user_id' },
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'member'), // Список ролей
        allowNull: false,
        defaultValue: 'member', // По умолчанию "member"
    },
    chat_name: {  // Уникальное имя чата для каждого пользователя
        type: DataTypes.STRING,
        allowNull: false,
    },
    joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, { tableName: 'room_members', timestamps: false });

RoomMembers.belongsTo(Room, { foreignKey: 'room_id' });

module.exports = RoomMembers;
