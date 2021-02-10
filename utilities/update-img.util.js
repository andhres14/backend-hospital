const fs = require('fs');

const Hospital = require('../models/hospital.model');
const Medic = require('../models/medic.model');
const User = require('../models/users.model');

const updateImg = async (type, id, fileName) => {
    switch (type) {
        case 'medics':
            const medic = await Medic.findById(id);
            if (!medic) {
                return false;
            }

            const oldPathMedic = `./uploads/medics/${ medic.img }`;
            deleteImg(oldPathMedic);
            medic.img = fileName;
            await medic.save();
            return true;
            break;
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                return false;
            }

            const oldPathUser = `./uploads/users/${ user.img }`;
            deleteImg(oldPathUser);
            user.img = fileName;
            await user.save();
            break;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }

            const oldPathHospital = `./uploads/hospitals/${ hospital.img }`;
            deleteImg(oldPathHospital);
            hospital.img = fileName;
            await hospital.save();
            break;
        default:
            return false;
            break;
    }
}

const deleteImg = (pathToDelete) => {
    if (fs.existsSync(pathToDelete)) {
        fs.unlinkSync(pathToDelete);
    }
}


module.exports = {
    updateImg
};
