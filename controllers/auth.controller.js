const { response } = require('express');
const bcrypt = require('bcryptjs');

// models
const User = require('../models/users.model');

// utilities
const { generateJWT } = require('../utilities/jwt.helper')

/**
 * User Login
 * @param req
 * @param res
 * @returns {Promise<Response<any, Record<string, any>, number>>}
 */
const doLogin = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                success: false,
                message: 'Account not found!'
            })
        }

        // Check pass
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            res.status(400).json({
                success: false,
                message: 'Email or password incorrect!'
            });
        }

        // JWT
        const token = await generateJWT(userDB.id);

        res.status(200).json({
            success: true,
            token
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            success: false,
            message: 'Internal error, check logs'
        });
    }
}

module.exports = {
    doLogin
};
