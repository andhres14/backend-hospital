const { Router } = require('express');
const { doLogin } = require('./../controllers/auth.controller');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/validator.middleware')

const router = Router();

router.post('/', [
    check('email', 'Email is required and valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldsValidator
], doLogin);

module.exports = router;
