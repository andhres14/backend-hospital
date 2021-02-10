const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator } = require('../middlewares/validator.middleware');
const { checkJWT } = require('../middlewares/jwt-check.middleware');

const router = Router();
const { getAllBySearch, getCollectionDocument } = require('../controllers/search.controller');

router.get('/:q', checkJWT, getAllBySearch);
router.get('/collection/:coll/:q', checkJWT, getCollectionDocument);

module.exports = router;
