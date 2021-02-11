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
    const id = req.params.id;
    const loggedId = req.auth.uid;

    try {

        const hospital = await Hospital.findById(id);
        if (!hospital) {
            res.status(404).json({
                success: false,
                message: 'Hospital not found'
            });
        }

        const toUpdate = {
            ...req.body,
            createdBy: loggedId
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, toUpdate, { new: true });

        res.status(200).json({
            success: true,
            hospitalUpdated
        });
    } catch (e) {
        return res.status(500).json({
            success: true,
            message: 'Internal error'
        });
    }
}

const deleteHospital = async (req, res = response) => {
    const id = req.params.id;
    try {

        const hospital = await Hospital.findById(id);
        if (!hospital) {
            res.status(404).json({
                success: false,
                message: 'Hospital not found'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Hospital deleted!'
        });
    } catch (e) {
        return res.status(500).json({
            success: true,
            message: 'Internal error'
        });
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
};
