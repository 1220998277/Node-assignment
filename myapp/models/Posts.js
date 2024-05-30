const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//帖子模型
const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'UserAccounts', // 指向 UserAccounts 模型
            key: 'id' // 指向 UserAccounts 模型的 id 字段
        },
        onUpdate: 'CASCADE', // 更新策略为级联更新
        onDelete: 'CASCADE' // 删除策略为级联删除
    },
    content: {
        type: DataTypes.TEXT, // 使用 TEXT 类型以支持较长的帖子内容
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

module.exports = Post;