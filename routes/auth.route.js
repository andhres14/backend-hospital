const { Router } = require('express');
const { doLogin, googleSignIn } = require('./../controllers/auth.controller');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/validator.middleware')

const router = Router();

router.post('/', [
    check('email', 'Email is required and valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldsValidator
], doLogin);

router.post('/google', [
    check('token', 'Token is required').not().isEmpty(),
    fieldsValidator
], googleSignIn);

module.exports = router;
