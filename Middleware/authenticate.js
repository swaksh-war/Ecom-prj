const User = require('../Models/user');

const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'abcdefghijklmnopqrstuvwxyz';

module.exports = function(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = { userId: decoded.userId };
            next();
        });
    } else {
        res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
};