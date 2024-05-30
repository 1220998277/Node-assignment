const jwt = require('jsonwebtoken');

// 验证 JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ message: '访问被拒绝' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ message: '无效的令牌' });
    }
}

// 验证管理员角色
function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ message: '没有权限' });
    }
    next();
}

module.exports = { authenticateToken, authorizeAdmin };
