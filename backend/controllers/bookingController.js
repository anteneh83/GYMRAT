const Booking = require('../models/Booking');
const Notification = require('../models/Notification');

// @desc    Book a session
// @route   POST /api/bookings
// @access  Private
const bookSession = async (req, res) => {
    const { trainer, date, timeSlot } = req.body;

    try {
        const booking = await Booking.create({
            trainee: req.user._id,
            trainer,
            date,
            timeSlot
        });

        // Generate a Notification for the user making the booking
        await Notification.create({
            user: req.user._id,
            message: `Your booking for ${new Date(date).toLocaleDateString()} at ${timeSlot} is pending confirmation.`,
            type: 'booking'
        });

        // Generate a Notification for the requested trainer
        await Notification.create({
            user: trainer,
            message: `New booking request received for ${new Date(date).toLocaleDateString()} at ${timeSlot}. Check your dashboard to approve.`,
            type: 'booking'
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ trainee: req.user._id }).populate('trainer', 'name email');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get trainer bookings
// @route   GET /api/bookings/trainer-bookings
// @access  Private (Trainer)
const getTrainerBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ trainer: req.user._id }).populate('trainee', 'name email');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status (Trainer/Admin)
// @route   PUT /api/bookings/:id
// @access  Private
const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (booking) {
            booking.status = req.body.status || booking.status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookSession,
    getMyBookings,
    getTrainerBookings,
    updateBookingStatus
};
