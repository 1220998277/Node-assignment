const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 用户账号密码表
const UserAccount = sequelize.define('UserAccount', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user' // 默认值为普通用户
    }
}, {
    timestamps: true
});

module.exports = UserAccount;
