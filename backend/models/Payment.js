const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'ETB'
    },
    paymentMethod: {
        type: String,
        enum: ['Mobile Payment', 'Card Payment', 'Bank Transfer'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    type: {
        type: String,
        enum: ['Membership', 'Trainer Session'],
        required: true
    },
    transactionId: String
}, {
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
