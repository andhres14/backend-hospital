const { response } = require('express');

const Hospital = require('../models/hospital.model')

const getHospitals = async (req, res = response) => {

    const hospitals = await Hospital.find()
        .populate('createdBy', 'name img');

    return res.status(200).json({
        success: true,
        hospitals
    });
}

const createHospital = async (req, res = response) => {

    const uid = req.auth.uid;
    const hospital = new Hospital({
        createdBy: uid,
        ...req.body
    });

    try {
        const hospitalSaved = await hospital.save();

        return res.status(201).json({
            success: false,
            hospitalSaved
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Internal error'
        })
    }


    return res.status(200).json({
        success: true,
        message: 'Hospital created'
    });
}

const updateHospital = async (req, res = response) => {
    return res.status(200).json({
        success: true,
        message: 'Hospital Updated'
    });
}

const deleteHospital = async (req, res = response) => {
    return res.status(200).json({
        success: true,
        message: 'Hospital Deleted'
    });
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
};
