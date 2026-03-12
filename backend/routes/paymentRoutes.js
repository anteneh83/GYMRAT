const express = require('express');
const { createPayment, getMyPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, createPayment);
router.get('/my-payments', protect, getMyPayments);

module.exports = router;
