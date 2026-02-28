const express = require('express');
const router = express.Router();
const { getTeacherAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

// Add a simple basic role check for brevity. 
// A real app might have a dedicated adminMiddleware.
const teacherOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'teacher' || req.user.isAdmin)) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as a teacher' });
    }
};

router.route('/teacher').get(protect, teacherOrAdmin, getTeacherAnalytics);

module.exports = router;
