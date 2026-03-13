const express = require('express');
const { bookSession, getMyBookings, getTrainerBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, bookSession);
router.get('/my-bookings', protect, getMyBookings);
router.get('/trainer-bookings', protect, authorize('trainer'), getTrainerBookings);
router.put('/:id', protect, authorize('trainer', 'admin'), updateBookingStatus);

module.exports = router;
