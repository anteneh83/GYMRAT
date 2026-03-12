const express = require('express');
const { getMembershipPlans, getMembershipPlanById } = require('../controllers/membershipController');
const router = express.Router();

router.get('/', getMembershipPlans);
router.get('/:id', getMembershipPlanById);

module.exports = router;
