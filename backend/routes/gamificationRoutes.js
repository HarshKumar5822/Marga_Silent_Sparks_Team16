const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamificationController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming this exists based on UserProgress needing user.id

router.use(authMiddleware.protect); // Protect all gamification routes

router.get('/progress', gamificationController.getUserProgress);
router.get('/badges', gamificationController.getAllBadges);

module.exports = router;
