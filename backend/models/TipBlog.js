const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: String,
    tags: [String],
    image: String
}, {
    timestamps: true
});

const TipBlog = mongoose.model('TipBlog', blogSchema);

module.exports = TipBlog;
