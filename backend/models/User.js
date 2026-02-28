const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student'
    },
    preferences: {
        learningStyle: {
            type: String,
            enum: ['Visual', 'Text', 'Interactive'],
            default: 'Visual'
        },
        pace: {
            type: String,
            enum: ['Slow', 'Medium', 'Fast'],
            default: 'Medium'
        },
        goal: {
            type: String,
            default: 'Full Stack Mastery'
        }
    },
    skillLevels: {
        type: Map,
        of: new mongoose.Schema({
            level: {
                type: String,
                enum: ['Beginner', 'Intermediate', 'Advanced'],
                default: 'Beginner'
            },
            score: {
                type: Number,
                default: 0
            },
            confidence: {
                type: Number,
                default: 0
            }
        }, { _id: false }),
        default: {}
    },
    currentPath: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LearningPath'
    },
    streak: {
        type: Number,
        default: 0
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
