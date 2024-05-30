const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// 导入模型
const Product = require('./Product');
const Category = require('./Category');
const User = require('./User-Profiles');
const UserAccount = require('./User-Accounts');

// 设置模型之间的关系
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });

// 如果需要，设置其他模型之间的关系
// 例如：User.hasMany(Product, { foreignKey: 'seller_id' });

// 同步数据库
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = {
  sequelize,
  Product,
  Category,
  User,
  UserAccount,
};
