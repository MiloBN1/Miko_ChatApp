const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_instance');

const Role = sequelize.define('Role', {
    role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,  // Генерация UUID по умолчанию
        primaryKey: true,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        unique: true,  // Уникальность роли
        allowNull: false,
    },
}, {
    tableName: 'roles',
    timestamps: true,  // Для того, чтобы сохранялись createdAt и updatedAt
});

module.exports = Role;
