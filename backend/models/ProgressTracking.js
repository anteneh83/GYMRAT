const mongoose = require('mongoose');

const progressTrackingSchema = new mongoose.Schema({
    trainee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    weight: Number,
    bodyFat: Number,
    bmi: Number,
    strength: String,
    endurance: String,
    trainerComments: String,
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const ProgressTracking = mongoose.model('ProgressTracking', progressTrackingSchema);

module.exports = ProgressTracking;
