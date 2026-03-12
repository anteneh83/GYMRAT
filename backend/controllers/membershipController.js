const MembershipPlan = require('../models/MembershipPlan');

// @desc    Get all membership plans
// @route   GET /api/memberships
// @access  Public
const getMembershipPlans = async (req, res) => {
    try {
        const plans = await MembershipPlan.find({});
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single membership plan
// @route   GET /api/memberships/:id
// @access  Public
const getMembershipPlanById = async (req, res) => {
    try {
        const plan = await MembershipPlan.findById(req.params.id);
        if (plan) {
            res.json(plan);
        } else {
            res.status(404).json({ message: 'Plan not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMembershipPlans,
    getMembershipPlanById
};
