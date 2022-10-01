const jwt = require('jsonwebtoken');
const secret_key = require('../env/secret_key');

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, secret_key.secretKey);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {   // 유효 기간 초과
            return res.status(419).json({
                code: 419,
                message: 'Expired Token'
            });
        }
        return res.status(401).json({
            code: 401,
            message: 'Invalid Token'
        });
    }
};
