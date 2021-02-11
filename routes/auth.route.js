const { Router } = require('express');
const { check } = require('express-validator');

const { checkJWT } = require('../middlewares/jwt-check.middleware');
const { fieldsValidator } = require('../middlewares/validator.middleware');

const { doLogin, googleSignIn, refreshToken } = require('./../controllers/auth.controller');

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

router.get('/refresh', [
    checkJWT
], refreshToken);

module.exports = router;
