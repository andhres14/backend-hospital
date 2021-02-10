const { response } = require('express');

const Medic = require('../models/medic.model')

const getMedics = async (req, res = response) => {
    try {
        const medics = await Medic.find()
            .populate('createdBy', 'name img')
            .populate('hospital', 'name img');
        return res.status(200).json({
            success: true,
            medics
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Internal error'
        })
    }
}

const createMedic = async (req, res = response) => {
    const uid = req.auth.uid;
    const medic = new Medic({
        createdBy: uid,
        ...req.body
    });

    try {
        const medicCreated = await medic.save();

        return res.status(201).json({
            success: false,
            medicCreated
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Internal error'
        })
    }
}

const updateMedic = async (req, res = response) => {
    return res.status(200).json({
        success: true,
        message: 'Medic Updated'
    });
}

const deleteMedic = async (req, res = response) => {
    return res.status(200).json({
        success: true,
        message: 'Medic Deleted'
    });
}

module.exports = {
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic
};
