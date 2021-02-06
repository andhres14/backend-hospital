const { response } = require('express');
const { validationResult } = require('express-validator')


const fieldsValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
            .json({
                success: false,
                errors: errors.mapped()
            });
    }
    next();
};

module.exports = { fieldsValidator }
