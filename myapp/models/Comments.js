const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//评论表模型
const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Posts', // 指向 Posts 模型
            key: 'id' // 指向 Posts 模型的 id 字段
        },
        onUpdate: 'CASCADE', // 当帖子 ID 更新时，评论的 post_id 也应相应更新
        onDelete: 'CASCADE' // 当帖子被删除时，相关的评论也应被删除
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'UserAccounts', // 指向 UserAccounts 模型
            key: 'id' // 指向 UserAccounts 模型的 id 字段
        },
        onUpdate: 'CASCADE', // 当用户 ID 更新时，评论的 user_id 也应相应更新
        onDelete: 'CASCADE' // 当用户账户被删除时，其评论也应被删除
    },
    content: {
        type: DataTypes.TEXT, // 使用 TEXT 类型以支持较长的评论内容
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE, // 存储日期和时间
        allowNull: false,
        defaultValue: DataTypes.NOW // 默认值为当前时间
    }
},
{
    timestamps: false // 由于我们手动管理 created_at，因此禁用自动时间戳
});

module.exports = Comment;