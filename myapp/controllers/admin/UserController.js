const UserService = require('../../services/admin/UserService');

const UserController = {
    updateUser: async (req, res) => {
        const userId = req.params.userId;
        const { username, email, phone } = req.body;

        console.log(`Received request to update user: ${userId}`);
        console.log(req.body);

        try {
            const result = await UserService.updateUser(userId, { username, email, phone });
            res.status(200).send(result);
        } catch (error) {
            if (error.message === '用户不存在') {
                return res.status(404).send({ message: error.message });
            }
            if (error.message === '用户名或邮箱已存在') {
                return res.status(409).send({ message: error.message });
            }
            res.status(500).send({ message: '服务器错误', error: error.message });
        }
    },

    uploadAvatar: async (req, res) => {
        const userId = req.body.userId; // 修改为从请求体中获取用户ID
        const avatarPath = req.file.path;

        try {
            const result = await UserService.uploadAvatar(userId, avatarPath);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: '服务器错误', error: error.message });
        }
    }
};

module.exports = UserController;
