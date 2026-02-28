const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    type: {
        type: String,
        default: 'Algorithm'
    },
    xpReward: {
        type: Number,
        default: 100
    },
    instructions: {
        type: String,
        default: ''
    },
    testCases: [{
        input: String,
        expectedOutput: String,
        isHidden: { type: Boolean, default: false }
    }],
    template: {
        type: String, // Starter code
        default: ''
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
