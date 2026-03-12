const express = require('express');
const { getTrainers, getTrainerById } = require('../controllers/trainerController');
const router = express.Router();

router.get('/', getTrainers);
router.get('/:id', getTrainerById);

module.exports = router;
