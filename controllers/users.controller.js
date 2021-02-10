const { response } = require('express');
const bcrypt = require('bcryptjs');

// models
const User = require('../models/users.model');

// utilities
const { generateJWT } = require('../utilities/jwt.helper')

/**
 * Get all Users
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getUsers = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const to = Number(req.query.to) || 15;

    const [ users, totalUsers ] = await Promise.all([
        User
            .find({}, 'name email role google img')
            .skip(from)
            .limit(to),
        User.countDocuments()
    ])

    res.status(200).json({
        success: true,
        users,
        totalUsers
    });
};

/**
 * Create user
 * @param req
 * @param res
 * @returns {Promise<Response<any, Record<string, any>, number>>}
 */
const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const emailRegistered = await User.findOne({ email: email });
        if (emailRegistered) {
            return res.status(400).json({
                success: false,
                message: 'Email registered!'
            });
        }

        const user = new User(req.body);
        // encrypt pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password.toString(), salt);

        await user.save();

        // JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            success: true,
            user,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal error, check logs'
        });
    }
};

/**
 * Update user info
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateUser = async (req, res) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const { password, google, email, ...userToUpdate } = req.body;
        if (userDB.email !== email) {
            const existEmail = await User.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email used"
                })
            }
        }

        userToUpdate.email = email;
        const userUpdated = await User.findByIdAndUpdate(uid, userToUpdate, { new: true });
        res.status(200).json({
            success: true,
            userUpdated
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal error, check logs'
        });
    }
}

/**
 * delete user by uid
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteUser = async (req, res) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const userDeleted = await User.findByIdAndDelete(uid);
        res.status(200).json({
            success: true,
            message: 'User deleted',
            uid
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: 'Internal error, check logs'
        });
    }
}

module.exports = { getUsers, createUser, updateUser, deleteUser };
