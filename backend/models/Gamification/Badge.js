const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  iconUrl: {
    type: String, // URL to badge icon
    default: ''
  },
  criteria: {
    type: Map,
    of: Number, // e.g., { "challenges_completed": 10, "xp_earned": 1000 }
    default: {}
  },
  rarity: {
    type: String,
    enum: ['Common', 'Rare', 'Epic', 'Legendary'],
    default: 'Common'
  }
}, { timestamps: true });

module.exports = mongoose.model('Badge', badgeSchema);
