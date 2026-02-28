const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
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
    default: 'Easy'
  },
  xpReward: {
    type: Number,
    default: 10
  },
  instructions: {
    type: String,
    required: false // Not required for Articles/Quizzes
  },
  initialCode: {
    type: String, // Starter code for the editor
    default: '// Write your code here'
  },
  validationSolution: {
    type: String // Canonical solution or validation script logic
  },
  testCases: [{
    input: mongoose.Schema.Types.Mixed,
    expectedOutput: mongoose.Schema.Types.Mixed,
    isHidden: { type: Boolean, default: false }
  }],
  hints: [{
    type: String
  }],
  // For Quizzes
  quizQuestions: [{
    question: String,
    options: [String],
    correctOption: Number, // Index of correct option
    explanation: String
  }],
  // For Articles
  articleContent: {
    type: String // Markdown or HTML
  },
  // General Resources
  resources: [{
    title: String,
    url: String,
    type: { type: String, enum: ['PDF', 'Video', 'Link'], default: 'Link' }
  }],
  type: {
    type: String,
    enum: ['Algorithm', 'Debugging', 'Refactoring', 'Visual', 'Quiz', 'Article', 'Project'],
    default: 'Algorithm'
  }
}, { timestamps: true });

module.exports = mongoose.model('LearningChallenge', challengeSchema);
