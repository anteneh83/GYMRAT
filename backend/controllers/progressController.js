const ProgressTracking = require('../models/ProgressTracking');

// @desc    Record progress
// @route   POST /api/progress
// @access  Private
const recordProgress = async (req, res) => {
    const { weight, bodyFat, bmi, strength, endurance, trainerComments } = req.body;

    try {
        const progress = await ProgressTracking.create({
            trainee: req.user._id,
            weight,
            bodyFat,
            bmi,
            strength,
            endurance,
            trainerComments
        });

        res.status(201).json(progress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user progress history
// @route   GET /api/progress/my-progress
// @access  Private
const getMyProgress = async (req, res) => {
    try {
        const progress = await ProgressTracking.find({ trainee: req.user._id }).sort({ date: -1 });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    recordProgress,
    getMyProgress
};
