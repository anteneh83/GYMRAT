const express = require('express');
const { getUsers, getAllTrainers, updateUser, deleteUser, getStats, registerTrainer } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// All routes protected and restricted to Admin
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.get('/trainers', getAllTrainers);
router.post('/trainers', registerTrainer);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/stats', getStats);

module.exports = router;
