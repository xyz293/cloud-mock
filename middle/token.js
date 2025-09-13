const jwt = require('jsonwebtoken');
const config = require('../config/default');
module.exports = {
    createToken: (user) => {
        return jwt.sign(user, config.secret, {
            expiresIn: config.expires
        })
    },
    authMiddleware: (req, res, next) => {
    // token 可以放在请求头 Authorization: Bearer <token>
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: '未提供 token' });
    }

    const token = authHeader.split(' ')[1]; // Bearer token
    if (!token) {
        return res.status(401).json({ message: '无效 token 格式' });
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded; // 挂载用户信息到 req
        next(); // 继续处理请求
    } catch (err) {
        return res.status(401).json({ message: 'Token 校验失败', error: err.message });
    }
}
}