const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//点赞表模型
const Like = sequelize.define('Like', {
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
        onUpdate: 'CASCADE', // 当帖子 ID 更新时，点赞记录的 post_id 也应相应更新
        onDelete: 'CASCADE' // 当帖子被删除时，相关的点赞记录也应被删除
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'UserAccounts', // 指向 UserAccounts 模型
            key: 'id' // 指向 UserAccounts 模型的 id 字段
        },
        onUpdate: 'CASCADE', // 当用户 ID 更新时，点赞记录的 user_id 也应相应更新
        onDelete: 'CASCADE' // 当用户账户被删除时，其点赞记录也应被删除
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

module.exports = Like;