const express = require('express');
const { recordProgress, getMyProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, recordProgress);
router.get('/my-progress', protect, getMyProgress);

module.exports = router;
