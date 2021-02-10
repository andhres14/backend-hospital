const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator } = require('../middlewares/validator.middleware');
const { checkJWT } = require('../middlewares/jwt-check.middleware');

const {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitals.controller');


const router = Router();

router.get('/', checkJWT, getHospitals);

router.post('/', [
    checkJWT,
    check('name', 'Hospital name is required').not().isEmpty(),
    fieldsValidator,
], createHospital);

router.put('/:id', [
    checkJWT,
    check('name', 'Hospital name is required'),
    fieldsValidator
], updateHospital);

router.delete('/:id', checkJWT, deleteHospital);

module.exports = router;
