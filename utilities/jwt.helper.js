const jwt = require('jsonwebtoken')

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_SKEY, {
            expiresIn: '12h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error in JWT generate');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = { generateJWT }
