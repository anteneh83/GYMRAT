const Trainer = require('../models/Trainer');

// @desc    Get all trainers (public)
// @route   GET /api/trainers
// @access  Public
const getTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find({}).populate('user', 'name email');
        res.json(trainers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get trainer profile by ID
// @route   GET /api/trainers/:id
// @access  Public
const getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id).populate('user', 'name email');
        if (trainer) {
            res.json(trainer);
        } else {
            res.status(404).json({ message: 'Trainer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTrainers,
    getTrainerById
};
