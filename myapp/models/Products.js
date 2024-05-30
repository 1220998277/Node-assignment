const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 商品表模型
const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER, // 整数类型，适用于数字标识
        autoIncrement: true, // 自动递增，适用于自动生成的ID
        primaryKey: true // 设为主键，保证每个记录的唯一性
    },
    seller_id: {
        type: DataTypes.INTEGER, // 整数类型，存储关联用户的ID
        allowNull: false, // 不允许为空，确保每个商品都有卖家
        references: {
            model: 'Users', // 关联到 Users 表
            key: 'id' // 指定关联到 Users 表的 id 字段
        },
        onUpdate: 'CASCADE', // 当关联的用户ID更新时，本字段也同步更新
        onDelete: 'SET NULL' // 当关联的用户记录被删除时，本字段设置为 NULL
    },
    category_id: {
        type: DataTypes.INTEGER, // 整数类型，存储关联分类的ID
        references: {
            model: 'Categories', // 关联到 Categories 表
            key: 'category_id' // 指定关联到 Categories 表的 category_id 字段
        },
        onUpdate: 'CASCADE', // 当关联的分类ID更新时，本字段也同步更新
        onDelete: 'SET NULL' // 当关联的分类记录被删除时，本字段设置为 NULL
    },
    name: {
        type: DataTypes.STRING, // 字符串类型，存储商品名称
        allowNull: false // 不允许为空，确保每个商品都有名称
    },
    description: {
        type: DataTypes.TEXT, // 文本类型，适用于较长的描述信息
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // 定点类型，最多10位数，小数点后2位，适用于价格信息
        allowNull: false // 不允许为空，确保每个商品都有价格标示
    },
    status: {
        type: DataTypes.STRING, // 字符串类型，存储商品状态
        allowNull: false, // 不允许为空，确保每个商品都有明确状态
        defaultValue: '在售' // 默认状态为“在售”
    },
    created_at: {
        type: DataTypes.DATE, // 日期类型，存储记录的创建时间
        allowNull: false, // 不允许为空，确保记录创建时有时间戳
        defaultValue: DataTypes.NOW // 默认值为当前时间
    }
}, {
    timestamps: false, // 禁用 Sequelize 的自动时间戳
    tableName: 'Products' // 明确指定使用的表名为 'Products'
});

// 导出 Product 模型，使其可以在其他部分的应用中通过 require 引用
module.exports = Product;
