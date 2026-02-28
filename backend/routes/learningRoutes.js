const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

router.get('/challenges', learningController.getAllChallenges);
router.get('/levels', learningController.getLevels);
router.get('/levels/:id', learningController.getLevelDetails);
router.get('/challenges/:id', learningController.getChallenge);
router.post('/submit', learningController.submitChallenge);

module.exports = router;
