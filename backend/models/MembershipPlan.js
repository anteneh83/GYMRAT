const mongoose = require('mongoose');

const membershipPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String, // e.g., '1 month', '1 year'
        required: true
    },
    features: [String]
}, {
    timestamps: true
});

const MembershipPlan = mongoose.model('MembershipPlan', membershipPlanSchema);

module.exports = MembershipPlan;
