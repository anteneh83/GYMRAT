const Payment = require('../models/Payment');

// @desc    Create a new payment
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res) => {
    const { amount, paymentMethod, type, transactionId } = req.body;

    try {
        const payment = await Payment.create({
            user: req.user._id,
            amount,
            paymentMethod,
            type,
            transactionId,
            status: 'Completed' // Simulating successful payment
        });

        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user payment history
// @route   GET /api/payments/my-payments
// @access  Private
const getMyPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user._id });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPayment,
    getMyPayments
};
