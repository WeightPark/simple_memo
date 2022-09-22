const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
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
