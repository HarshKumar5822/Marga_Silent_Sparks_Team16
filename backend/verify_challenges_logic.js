//const axios = require('axios'); // Not needed for DB logic check

async function verifyChallengesLogic() {
    try {
        console.log('Testing GET /api/learning/challenges...');
        // Assuming server is running on port 5000 and we have a valid token or auth is bypassed for test
        // Wait, the route is protected: router.use(authMiddleware.protect);
        // I need a valid token to test this, or I should temporarily bypass auth for this script/test.

        // Let's try to login first to get a token if possible, or just check if the server is up. 
        // Given I don't have user credentials handy, I will check the code again. 
        // "router.use(authMiddleware.protect);" is present.

        // I'll create a script that connects to DB directly and simulates the controller logic 
        // OR acts as a client if I can mock auth.
        // Actually, for verification, I can just run the controller logic directly if I mock req/res.

        const mongoose = require('mongoose');
        const Level = require('./models/Learning/Level');
        const LearningChallenge = require('./models/Learning/Challenge'); // Ensure model is registered

        await mongoose.connect('mongodb://127.0.0.1:27017/codegalaxy');
        console.log('Connected to DB');

        const levels = await Level.find({}).populate('challenges');
        let allChallenges = [];

        levels.forEach(level => {
            if (level.challenges && level.challenges.length > 0) {
                level.challenges.forEach(challenge => {
                    let challengeObj = challenge.toObject();
                    challengeObj.category = level.category;
                    challengeObj.levelId = level._id;
                    challengeObj.levelDifficulty = level.difficulty;
                    allChallenges.push(challengeObj);
                });
            }
        });

        console.log(`Total Challenges Found via Logic: ${allChallenges.length}`);
        if (allChallenges.length > 0) {
            console.log('Sample Challenge:', JSON.stringify(allChallenges[0], null, 2));
        } else {
            console.log('No challenges found. Logic might be wrong or DB empty.');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

verifyChallengesLogic();
