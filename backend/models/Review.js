const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    trainee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: String,
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
