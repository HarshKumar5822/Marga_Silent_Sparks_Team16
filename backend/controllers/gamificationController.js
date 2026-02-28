const Badge = require('../models/Gamification/Badge');
const UserProgress = require('../models/UserProgress');

const User = require('../models/User');

// Get user's progress including badges and XP
exports.getUserProgress = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming auth middleware sets req.user

        // Find User Progress
        let progress = await UserProgress.findOne({ user: userId })
            .populate('unlockedBadges.badge')
            .populate('completedChallenges.challenge');

        if (!progress) {
            // Create initial progress if not exists
            progress = await UserProgress.create({ user: userId });
        }

        // Find User for Skill Levels
        const user = await User.findById(userId).select('skillLevels streak name');

        // Find all Badges to compare earned vs unearned for the frontend
        const allBadges = await Badge.find({});

        const mappedBadges = allBadges.map(b => {
            const isEarned = progress.unlockedBadges.some(ub => ub.badge && ub.badge._id.toString() === b._id.toString());
            return {
                id: b._id,
                name: b.name,
                description: b.description,
                icon: b.iconUrl || 'award', // fallback icon
                isEarned
            };
        });

        const dashboardData = {
            id: user._id,
            name: user.name,
            totalXP: progress.totalXp,
            level: progress.level,
            currentXP: progress.totalXp % 100, // Assuming 100 XP per level for display
            xpToNextLevel: 100,
            streak: user.streak || progress.currentStreak || 0,
            completedChallenges: progress.completedChallenges || [],
            badges: mappedBadges,
            skillLevels: user.skillLevels ? Object.fromEntries(user.skillLevels) : {}
        };

        res.json(dashboardData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all available badges
exports.getAllBadges = async (req, res) => {
    try {
        const badges = await Badge.find({});
        res.json(badges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Internal helper to award XP and check for badges
exports.awardXp = async (userId, amount) => {
    let progress = await UserProgress.findOne({ user: userId });
    if (!progress) {
        progress = await UserProgress.create({ user: userId });
    }

    progress.totalXp += amount;

    // Simple level up logic: Level = sqrt(XP) * constant or similar. 
    // For now: Level = floor(totalXp / 100) + 1
    const newLevel = Math.floor(progress.totalXp / 100) + 1;
    if (newLevel > progress.level) {
        progress.level = newLevel;
        // Could add notification logic here
    }

    await progress.save();
    return progress;
};
