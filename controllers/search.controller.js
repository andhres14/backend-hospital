const { response } = require('express');

const Hospital = require('../models/hospital.model');
const Medic = require('../models/medic.model');
const User = require('../models/users.model');

const getAllBySearch = async (req, res = response) => {
    const { q } = req.params;
    const regexp = new RegExp(q, 'i');

    const [ users, medics, hospitals ] = await Promise.all([
        User.find({ name: regexp }),
        Medic.find({ name: regexp }),
        Hospital.find({ name: regexp })
    ]);

    res.status(200).json({
        users,
        medics,
        hospitals
    });
}

const getCollectionDocument = async (req, res = response) => {
    const { q, coll } = req.params;
    const regexp = new RegExp(q, 'i');
    let results = [];
    switch (coll) {
        case 'medics':
            results = await Medic.find({ name: regexp })
                .populate('createdBy', 'name img')
                .populate('hospital', 'name img');
            break;
        case 'hospitals':
            results = await Hospital.find({ name: regexp })
                .populate('createdBy', 'name img');
            break;
        case 'users':
            results = await User.find({ name: regexp });
            break;
        default:
            res.status(400).json({
                success: false,
                message: 'Collection not valid, only [users, medics, hospitals]'
            })
            break;
    }

    res.status(200).json({
        success: true,
        results
    });
}

module.exports = { getAllBySearch, getCollectionDocument };
