const express = require('express');
const router = express.Router();
const { getChallenges, getChallenge, createChallenge, runCode } = require('../controllers/challengeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getChallenges).post(protect, admin, createChallenge);
router.route('/:id').get(getChallenge);
router.route('/run').post(protect, runCode);

module.exports = router;
