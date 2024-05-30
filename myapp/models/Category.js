const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 分类表模型
const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER, // 整数类型，适用于数字标识
        autoIncrement: true, // 自动递增，适用于自动生成的ID
        primaryKey: true // 设为主键，保证每个记录的唯一性
    },
    name: {
        type: DataTypes.STRING, // 字符串类型，存储分类名称
        allowNull: false // 不允许为空，确保每个分类都有名称
    },
    description: {
        type: DataTypes.TEXT // 文本类型，适用于较长的描述信息
    }
}, {
    timestamps: false, // 禁用 Sequelize 的自动时间戳
    tableName: 'Categories' // 明确指定使用的表名为 'Categories'
});

// 导出 Category 模型，使其可以在其他部分的应用中通过 require 引用
module.exports = Category;
