const User = require('../models/User');
const Trainer = require('../models/Trainer');
const Payment = require('../models/Payment');
const MembershipPlan = require('../models/MembershipPlan');
const Booking = require('../models/Booking');
const WorkoutProgram = require('../models/WorkoutProgram');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all trainers
// @route   GET /api/admin/trainers
// @access  Private/Admin
const getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find({}).populate('user', 'name email role');
        res.json(trainers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user role or status
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const oldRole = user.role;
            user.role = req.body.role || user.role;

            // Add status if needed (e.g., active, suspended)
            const updatedUser = await user.save();

            // If user was newly promoted to trainer, create a Trainer profile
            if (oldRole !== 'trainer' && updatedUser.role === 'trainer') {
                const existingTrainer = await Trainer.findOne({ user: updatedUser._id });
                if (!existingTrainer) {
                    await Trainer.create({
                        user: updatedUser._id,
                        specialization: ['General Fitness'],
                        experience: 1,
                        bio: 'Newly registered trainer.'
                    });
                }
            }
            // If user was demoted from trainer, optionally remove their profile
            else if (oldRole === 'trainer' && updatedUser.role !== 'trainer') {
                await Trainer.deleteOne({ user: updatedUser._id });
            }

            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await Trainer.deleteOne({ user: user._id });
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new trainer (Admin only)
// @route   POST /api/admin/trainers
// @access  Private/Admin
const registerTrainer = async (req, res) => {
    try {
        const { name, email, password, specialization, experience, bio } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: 'trainer'
        });

        const trainer = await Trainer.create({
            user: user._id,
            specialization: specialization ? specialization.split(',').map(s => s.trim()) : [],
            experience: experience || 0,
            bio: bio || ''
        });

        res.status(201).json({
            message: 'Trainer registered successfully',
            trainer
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
    try {
        const totalMembers = await User.countDocuments({ role: 'trainee' });
        const totalTrainers = await User.countDocuments({ role: 'trainer' });
        const totalBookings = await Booking.countDocuments();
        const totalPrograms = await WorkoutProgram.countDocuments();
        const totalRevenue = await Payment.aggregate([
            { $match: { status: 'Completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const recentPayments = await Payment.find({}).sort({ createdAt: -1 }).limit(5).populate('user', 'name');

        res.json({
            totalMembers,
            totalTrainers,
            totalBookings,
            totalPrograms,
            totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
            recentPayments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getAllTrainers,
    updateUser,
    getStats,
    registerTrainer,
    deleteUser
};
