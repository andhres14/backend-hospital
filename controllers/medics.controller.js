const { response } = require('express');

const Medic = require('../models/medic.model');

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
    const id = req.params.id;
    const loggedId = req.auth.uid;

    try {

        const medic = await Medic.findById(id);
        if (!medic) {
            res.status(404).json({
                success: false,
                message: 'Medic not found'
            });
        }

        const toUpdate = {
            ...req.body,
            createdBy: loggedId
        }

        const medicUpdated = await Medic.findByIdAndUpdate(id, toUpdate, { new: true });

        res.status(200).json({
            success: true,
            medicUpdated
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Internal error'
        })
    }
}

const deleteMedic = async (req, res = response) => {
    const id = req.params.id;
    try {

        const medic = await Medic.findById(id);
        if (!medic) {
            res.status(404).json({
                success: false,
                message: 'Medic not found'
            });
        }

        await Medic.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Medic deleted!'
        });
    } catch (e) {
        return res.status(500).json({
            success: true,
            message: 'Internal error'
        });
    }
}

module.exports = {
    getMedics,
    createMedic,
    updateMedic,
    deleteMedic
};
