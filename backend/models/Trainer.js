const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: [String],
    experience: Number,
    bio: String,
    rating: {
        type: Number,
        default: 0
    },
    schedule: {
        availableDays: [String],
        availableHours: {
            start: String,
            end: String
        },
        maxTraineesPerSession: {
            type: Number,
            default: 5
        }
    }
}, {
    timestamps: true
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
