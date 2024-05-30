const { UserAccount, UserProfile } = require('../../models/associateModels');
const { Sequelize } = require('sequelize');

const UserService = {
    updateUser: async (userId, { username, email, phone }) => {
        // 检查用户是否存在
        const user = await UserAccount.findByPk(userId);
        if (!user) {
            throw new Error('用户不存在');
        }

        // 检查用户名或邮箱是否已存在
        const userExists = await UserAccount.findOne({
            where: {
                [Sequelize.Op.or]: [{ username }, { email }],
                id: { [Sequelize.Op.ne]: userId } // 排除当前用户
            }
        });

        if (userExists) {
            throw new Error('用户名或邮箱已存在');
        }

        // 更新用户账号信息
        await UserAccount.update({ username, email }, {
            where: { id: userId }
        });

        // 更新用户详细信息
        await UserProfile.update({ name: username, email, phone }, {
            where: { user_id: userId }
        });

        return { message: '用户信息更新成功' };
    },

    uploadAvatar: async (userId, avatarPath) => {
        // 更新数据库中的用户头像路径
        await UserProfile.update({ avatar: avatarPath }, {
            where: { user_id: userId }
        });

        return { message: '头像上传成功', avatar: avatarPath };
    }
};

module.exports = UserService;
