const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/admin/UserController');
const path = require('path');
const multer = require('multer');

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

router.put('/:userId', UserController.updateUser);
router.post('/uploadAvatar', upload.single('avatar'), UserController.uploadAvatar);

module.exports = router;
