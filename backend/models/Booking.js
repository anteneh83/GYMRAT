const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    trainee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
