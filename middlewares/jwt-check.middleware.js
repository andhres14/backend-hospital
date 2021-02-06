const jwt = require('jsonwebtoken');

const checkJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token not found'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SKEY);
        req.auth = { uid };
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Token Invalid'
        });
    }
};

module.exports = { checkJWT };
