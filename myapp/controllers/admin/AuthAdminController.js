var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const AuthAdminService = require('../../services/admin/AuthAdminService');
const bcrypt = require('bcryptjs');

const AuthAdminController = {
  register: async (req, res) => {
    const { username, password, email } = req.body;

    try {
      // 输入验证
      if (!username || !password || !email) {
        return res.status(400).send({ message: '所有字段都是必填的' });
      }

      // 创建用户
      const newUser = await AuthAdminService.createUser({ username, password, email });

      // 返回成功响应
      res.status(201).send({ message: '用户注册成功', userId: newUser.id });
    } catch (error) {
      if (error.message === '用户名或邮箱已存在') {
        return res.status(409).send({ message: error.message });
      }
      res.status(500).send({ message: '服务器错误', error: error.message });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res.status(400).send({ message: '用户名和密码都是必填的' });
      }

      const user = await AuthAdminService.findUserByUsername(username);

      if (!user) {
        return res.status(401).send({ message: '用户名或密码错误' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send({ message: '用户名或密码错误' });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(200).send({ message: '登录成功', token, role: user.role });
    } catch (error) {
      res.status(500).send({ message: '服务器错误', error: error.message });
    }
  }
};

module.exports = AuthAdminController;
