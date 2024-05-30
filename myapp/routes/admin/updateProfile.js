var express = require('express');
var router = express.Router();
const { UserAccount, UserProfile } = require('../../models/associateModels'); // 确保路径正确
const path = require('path');
const multer = require('multer');
const { Sequelize } = require('sequelize');

// 更新用户信息
router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { username, email, phone } = req.body;

    console.log(`Received request to update user: ${userId}`);
    console.log(req.body);

    try {
        // 检查用户是否存在
        const user = await UserAccount.findByPk(userId);
        console.log(`User found: ${user !== null}`);

        if (!user) {
            return res.status(404).send({ message: '用户不存在' });
        }

        // 检查用户名或邮箱是否已存在
        const userExists = await UserAccount.findOne({
            where: {
                [Sequelize.Op.or]: [{ username }, { email }],
                id: { [Sequelize.Op.ne]: userId } // 排除当前用户
            }
        });

        if (userExists) {
            return res.status(409).send({ message: '用户名或邮箱已存在' });
        }

        // 更新用户账号信息
        await UserAccount.update({ username, email }, {
            where: { id: userId }
        });

        // 更新用户详细信息
        await UserProfile.update({ name: username, email, phone }, {
            where: { user_id: userId }
        });

        // 返回成功响应
        res.status(200).send({ message: '用户信息更新成功' });
    } catch (error) {
        res.status(500).send({ message: '服务器错误', error: error.message });
    }
});

// 头像路由
// 配置 multer，用于存储上传的文件
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 存储文件的目录
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 使用时间戳命名文件
    }
});

const upload = multer({ storage: storage });

router.post('/uploadAvatar', upload.single('avatar'), async (req, res) => {
    // 这里需要某种方式获得当前用户的ID，例如通过身份验证中间件
    const userId = req.body.userId; // 修改为从请求体中获取用户ID
    const avatarPath = req.file.path;

    try {
        // 更新数据库中的用户头像路径
        await UserProfile.update({ avatar: avatarPath }, {
            where: { user_id: userId }
        });

        res.status(200).json({ message: '头像上传成功', avatar: avatarPath });
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error: error.message });
    }
});

module.exports = router;
