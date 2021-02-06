const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('./../controllers/users.controller');

const { fieldsValidator } = require('../middlewares/validator.middleware');
const { checkJWT } = require('../middlewares/jwt-check.middleware');


const router = Router();

router.get('/', checkJWT, getUsers);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required and valid').isEmail(),
    fieldsValidator,
], createUser);

router.put('/:id', [
    checkJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required and valid').isEmail(),
    fieldsValidator
], updateUser);

router.delete('/:id', checkJWT, deleteUser);

module.exports = router;
