const Review = require('../models/Review');
const Trainer = require('../models/Trainer');

// @desc    Add a review for a trainer
// @route   POST /api/reviews
// @access  Private
const addReview = async (req, res) => {
    const { trainer, rating, comment } = req.body;

    try {
        const review = await Review.create({
            trainee: req.user._id,
            trainer,
            rating,
            comment
        });

        // Update trainer rating (simple average)
        const reviews = await Review.find({ trainer });
        const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await Trainer.findOneAndUpdate({ user: trainer }, { rating: avgRating });

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get reviews for a trainer
// @route   GET /api/reviews/trainer/:id
// @access  Public
const getTrainerReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ trainer: req.params.id }).populate('trainee', 'name');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addReview,
    getTrainerReviews
};
