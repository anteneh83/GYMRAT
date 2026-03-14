const express = require('express');
const { getMyNotifications, markAsRead, clearAllNotifications } = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, getMyNotifications);
router.put('/:id/read', protect, markAsRead);
router.delete('/clear', protect, clearAllNotifications);

module.exports = router;
