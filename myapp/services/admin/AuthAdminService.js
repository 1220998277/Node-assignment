const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const UserAccount = require('../../models/User-Accounts');
const UserProfile = require('../../models/User-Profiles');

const AuthAdminService = {
  createUser: async (params) => {
    const { username, password, email } = params;

    // 检查用户名或邮箱是否已存在
    const userExists = await UserAccount.findOne({
      where: {
        [Sequelize.Op.or]: [{ username }, { email }]
      }
    });

    if (userExists) {
      throw new Error('用户名或邮箱已存在');
    }

    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建用户和用户信息
    const newUser = await UserAccount.create({
      username,
      password: hashedPassword,
      email,
    });

    // 创建用户资料，使用默认的占位符值
    await UserProfile.create({
      user_id: newUser.id,
      name: username,  // 使用用户名作为默认姓名
      email,
      phone: '',  // 默认空电话
    });

    return newUser;
  },

  findUserByUsername: async (username) => {
    return await UserAccount.findOne({ where: { username } });
  }
};

module.exports = AuthAdminService;
