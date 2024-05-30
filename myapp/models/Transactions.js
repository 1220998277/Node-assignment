const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//交易表模型
const Transaction = sequelize.define('Transaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // 指向 Users 模型
            key: 'id' // 指向 Users 模型的 id 字段
        },
        onUpdate: 'CASCADE', // 当用户 ID 更新时，交易记录的 buyer_id 也应相应更新
        onDelete: 'CASCADE' // 当用户被删除时，相关的交易记录也应被删除
    },
    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // 指向 Users 模型
            key: 'id' // 指向 Users 模型的 id 字段
        },
        onUpdate: 'CASCADE', // 当用户 ID 更新时，交易记录的 seller_id 也应相应更新
        onDelete: 'CASCADE' // 当用户被删除时，相关的交易记录也应被删除
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products', // 指向 Products 模型
            key: 'product_id' // 指向 Products 模型的 product_id 字段
        },
        onUpdate: 'CASCADE', // 当商品信息更新时，交易记录的 product_id 也应相应更新
        onDelete: 'CASCADE' // 当商品被删除时，相关的交易记录也应被删除
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2), // 定点类型，最多10位数，小数点后2位
        allowNull: false // 交易金额不允许为空
    },
    status: {
        type: DataTypes.STRING, // 字符串类型，存储交易状态
        allowNull: false, // 不允许为空，确保每个交易都有一个明确的状态
        defaultValue: '待支付' // 默认状态为“待支付”
    },
    created_at: {
        type: DataTypes.DATE, // 日期类型，存储记录的创建时间
        allowNull: false,
        defaultValue: DataTypes.NOW // 默认值为当前时间
    }
},
{
    timestamps: false, // 由于我们手动管理 created_at，因此禁用自动时间戳
    tableName: 'Transactions' // 显式指定表名为 'Transactions'
});

module.exports = Transaction;