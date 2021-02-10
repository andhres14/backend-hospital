const { Schema, model } = require('mongoose');

const MedicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

MedicSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Medic', MedicSchema);
