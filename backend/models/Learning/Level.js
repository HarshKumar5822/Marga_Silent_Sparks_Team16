const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  levelNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String, // e.g., 'JavaScript', 'Python', 'React'
    required: true,
    default: 'JavaScript'
  },
  difficulty: {
    type: String, // 'Beginner', 'Intermediate', 'Advanced'
    required: true,
    default: 'Beginner'
  },
  requiredXp: {
    type: Number,
    required: true // XP needed to define "completion" or unlocking next level logic
  },
  challenges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningChallenge'
  }],
  unlockCriteria: {
    type: String // Description of what unlocks this level, if applicable
  }
}, { timestamps: true });

module.exports = mongoose.model('Level', levelSchema);
