const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeasurementSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    x: Number,     // geolocationCoordinatesInstance.latitude
    y: Number,     // geolocationCoordinatesInstance.longitude
    speed: Number,  // geolocationCoordinatesInstance.speed
    isFirst: Boolean,
    xHatOriginal: [[Number]],
    xHat: [[Number]],
    xHatNew: [[Number]],
    date: Date,
    accurracy: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Measurement', MeasurementSchema);