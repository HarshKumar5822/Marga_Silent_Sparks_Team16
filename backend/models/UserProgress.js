const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  totalXp: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  completedChallenges: [{
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LearningChallenge'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    score: Number
  }],
  unlockedBadges: [{
    badge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Badge'
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    }
  }],
  level: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
