const mongoose = require('mongoose');

const assessmentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Pre-Assessment', 'Module Quiz', 'Remedial'],
        default: 'Module Quiz'
    },
    relatedSkills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkillNode'
    }],
    questions: [{
        text: { type: String, required: true },
        options: [{ text: String, isCorrect: Boolean }],
        difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
        explanation: String, // AI-generated explanation
        points: { type: Number, default: 10 }
    }],
    targetAudience: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    }
}, {
    timestamps: true
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
