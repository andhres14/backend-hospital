const { response } = require('express');
const bcrypt = require('bcryptjs');

// models
const User = require('../models/users.model');

// utilities
const { generateJWT } = require('../utilities/jwt.helper');
const { googleVerify } = require('../utilities/google-verify.util');

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

const googleSignIn = async (req, res) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);

        // check previously register for user
        const userDB = await User.findOne({ email });
        let user;

        if (!userDB) {
            user = new User({
                name,
                email,
                password: '1234567890',
                image: picture,
                google: true
            });
        } else {
            // check previously register for user
            user = userDB;
            user.google = true;
            user.password = '1234567890';
        }

        await user.save();

        // JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            success: true,
            token
        });
    } catch (e) {
        res.status(401).json({
            success: false,
            message: 'Token not valid'
        });
    }


}


module.exports = {
    doLogin,
    googleSignIn
};
