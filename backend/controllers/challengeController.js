const Challenge = require('../models/Challenge');
const { runCode: executeCodeLocal } = require('../utils/executeCode');

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Public
const getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find({});
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single challenge
// @route   GET /api/challenges/:id
// @access  Public
const getChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (challenge) {
            res.json(challenge);
        } else {
            res.status(404).json({ message: 'Challenge not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a challenge
// @route   POST /api/challenges
// @access  Private/Admin
const createChallenge = async (req, res) => {
    const { title, description, difficulty, testCases, template } = req.body;

    try {
        const challenge = new Challenge({
            title,
            description,
            difficulty,
            testCases,
            template
        });

        const createdChallenge = await challenge.save();
        res.status(201).json(createdChallenge);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Run code (Local backend execution)
// @route   POST /api/challenges/run
// @access  Private
const runCode = async (req, res) => {
    const { code, language, expectedInput } = req.body;

    if (!code || !language) {
        return res.status(400).json({ message: 'Code and language are required' });
    }

    try {
        const result = await executeCodeLocal(language, code, expectedInput);

        res.json({
            output: result.output,
            passed: result.success,
            time: result.time,
            memory: 0, // Memory tracking skipped for simple exec
            status: {
                id: result.success ? 3 : 11, // 3: Accepted, 11: Runtime Error
                description: result.success ? 'Accepted' : 'Runtime Error'
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Execution Error', error: err.message });
    }
};

module.exports = { getChallenges, getChallenge, createChallenge, runCode };
