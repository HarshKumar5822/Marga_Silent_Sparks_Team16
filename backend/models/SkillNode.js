const mongoose = require('mongoose');

const skillNodeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    description: {
        type: String
    },
    prerequisites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkillNode'
    }],
    contentEmbeddings: {
        type: [Number], // Vector embedding from Qdrant/Gemini
        default: []
    },
    metadata: {
        estimatedTimeMinutes: Number,
        contentType: { type: String, enum: ['Video', 'Text', 'Quiz', 'Interactive'], default: 'Text' }
    }
}, {
    timestamps: true
});

const SkillNode = mongoose.model('SkillNode', skillNodeSchema);

module.exports = SkillNode;
