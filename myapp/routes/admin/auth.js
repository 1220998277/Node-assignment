const express = require('express');
const router = express.Router();
const AuthAdminController = require('../../controllers/admin/AuthAdminController');

router.post('/register', AuthAdminController.register);
router.post('/login', AuthAdminController.login);

module.exports = router;
