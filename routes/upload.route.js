const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { check } = require('express-validator');

const { fieldsValidator } = require('../middlewares/validator.middleware');
const { checkJWT } = require('../middlewares/jwt-check.middleware');

const { fileUpload, getFileUpload } = require('../controllers/uploads.controller');

const router = Router();

router.use(expressFileUpload());


router.put('/:type/:id', checkJWT, fileUpload);
router.get('/:type/:image', checkJWT, getFileUpload);

module.exports = router;
