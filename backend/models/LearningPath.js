const mongoose = require('mongoose');

const learningPathSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nodes: [{
        skillNode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SkillNode',
            required: true
        },
        status: {
            type: String,
            enum: ['Locked', 'Unlocked', 'In Progress', 'Completed', 'Skipped'],
            default: 'Locked'
        },
        score: { type: Number },
        unlockedAt: Date,
        completedAt: Date
    }],
    currentStepIndex: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Archived'],
        default: 'Active'
    },
    adaptiveLog: [{
        timestamp: { type: Date, default: Date.now },
        action: String, // e.g., "Added Remedial Node", "Skipped Topic"
        reason: String
    }]
}, {
    timestamps: true
});

const LearningPath = mongoose.model('LearningPath', learningPathSchema);

module.exports = LearningPath;
