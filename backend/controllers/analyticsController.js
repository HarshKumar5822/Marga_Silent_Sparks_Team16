const User = require('../models/User');
const Challenge = require('../models/Challenge');

// @desc    Get aggregate analytics for teacher dashboard
// @route   GET /api/analytics/teacher
// @access  Private/Admin(Teacher)
const getTeacherAnalytics = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const allStudents = await User.find({ role: 'student' }).select('skillLevels preferences createdAt');

        // Aggregate Skills
        const skillAggregates = {
            logic: { total: 0, count: 0 },
            syntax: { total: 0, count: 0 },
            algorithms: { total: 0, count: 0 },
            debugging: { total: 0, count: 0 }
        };

        allStudents.forEach(student => {
            if (student.skillLevels) {
                for (const [skill, data] of student.skillLevels.entries()) {
                    if (skillAggregates[skill.toLowerCase()]) {
                        skillAggregates[skill.toLowerCase()].total += data.score || 0;
                        skillAggregates[skill.toLowerCase()].count++;
                    }
                }
            }
        });

        const averageSkills = Object.keys(skillAggregates).map(skill => {
            const avg = skillAggregates[skill].count > 0
                ? Math.round(skillAggregates[skill].total / skillAggregates[skill].count)
                : 0;
            return { subject: skill.charAt(0).toUpperCase() + skill.slice(1), A: avg, fullMark: 100 };
        });

        // Growth over time (mocked for recent months based on created at if possible, otherwise static for demo)
        const currentMonthCounts = await User.countDocuments({
            role: 'student',
            createdAt: { $gte: new Date(new Date().setDate(1)) }
        });

        const analytics = {
            totalStudents,
            newStudentsThisMonth: currentMonthCounts,
            activeChallenges: await Challenge.countDocuments(),
            averageSkills,
            recentActivity: [
                { name: 'Jan', students: totalStudents > 10 ? totalStudents - 10 : 5 },
                { name: 'Feb', students: totalStudents > 5 ? totalStudents - 2 : 12 },
                { name: 'Mar', students: totalStudents },
            ],
            topAreasOfStruggle: [
                { concept: "Pointers (C++)", failRate: "68%" },
                { concept: "Recursion", failRate: "54%" },
                { concept: "Async/Await", failRate: "42%" }
            ]
        };

        res.json(analytics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error aggregating analytics' });
    }
};

module.exports = { getTeacherAnalytics };
