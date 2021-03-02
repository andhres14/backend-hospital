const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require('../utilities/update-img.util');

const fileUpload = async (req, res = response) => {

    const { type, id } = req.params;
    const validTypes = [ 'medics', 'users', 'hospitals' ];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            success: true,
            message: 'Type not valid'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No files were uploaded.'
        });
    }

    const file = req.files.image;
    const shortName = file.name.split('.');
    const fileExt = shortName[shortName.length - 1];
    const validExtension = [ 'png', 'jpg', 'jpeg', 'gif' ];
    if (!validExtension.includes(fileExt)) {
        return res.status(400).json({
            success: true,
            message: 'Extension not valid'
        });
    }

    // generate filename
    const fileName = `${ uuidv4() }.${ fileExt }`;

    // path to save image
    const path = `./uploads/${ type }/${ fileName }`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error to move file'
            });
        }

        updateImg(type, id, fileName);

        res.status(200).json({
            success: true,
            message: 'File uploaded!',
            fileName
        });
    });
}

const getFileUpload = (req, res) => {

    const type = req.params.type;
    const image = req.params.image;

    const pathImg = path.join(__dirname, `../uploads/${ type }/${ image }`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = { fileUpload, getFileUpload };
