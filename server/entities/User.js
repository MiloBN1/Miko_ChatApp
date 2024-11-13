const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_instance');
const Role = require('./Role'); // Импортируем модель роли

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Добавляем внешний ключ для роли
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'roles', // Имя таблицы ролей
      key: 'value',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'users',
  timestamps: true,
});

// Устанавливаем ассоциацию "один ко многим" между пользователями и ролями
User.belongsTo(Role, {
  foreignKey: 'role',  // Ensure the foreign key is 'role'
  targetKey: 'role_id', // Assuming the primary key of Role is 'role_id'
  as: 'userRole'  // Add an alias to avoid naming collision
});

module.exports = User;
