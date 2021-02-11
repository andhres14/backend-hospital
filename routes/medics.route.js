const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator } = require('../middlewares/validator.middleware');
const { checkJWT } = require('../middlewares/jwt-check.middleware');

const {
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic
} = require('../controllers/medics.controller');


const router = Router();

router.get('/', checkJWT, getMedics);

router.post('/', [
    checkJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('hospital', 'Hospital is required').not().isEmpty(),
    check('hospital', 'Hospital Id must be valid').isMongoId(),
    fieldsValidator,
], createMedic);

router.put('/:id', [
    checkJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('hospital', 'Hospital is required').not().isEmpty(),
    check('hospital', 'Hospital Id must be valid').isMongoId(),
    fieldsValidator
], updateMedic);

router.delete('/:id', checkJWT, deleteMedic);

module.exports = router;
