const User = require('../models/User');
const Trainer = require('../models/Trainer');
const Payment = require('../models/Payment');
const MembershipPlan = require('../models/MembershipPlan');

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
            user.role = req.body.role || user.role;
            // Add status if needed (e.g., active, suspended)
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
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
        const totalRevenue = await Payment.aggregate([
            { $match: { status: 'Completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const recentPayments = await Payment.find({}).sort({ createdAt: -1 }).limit(5).populate('user', 'name');

        res.json({
            totalMembers,
            totalTrainers,
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
    getStats
};
