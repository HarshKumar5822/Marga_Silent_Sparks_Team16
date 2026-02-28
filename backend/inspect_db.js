const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/codegalaxy';

async function inspectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        const challengesCount = await db.collection('challenges').countDocuments();
        console.log(`Documents in "challenges": ${challengesCount}`);

        const learningchallengesCount = await db.collection('learningchallenges').countDocuments();
        console.log(`Documents in "learningchallenges": ${learningchallengesCount}`);

        const levelsCount = await db.collection('levels').countDocuments();
        console.log(`Documents in "levels": ${levelsCount}`);

        if (challengesCount > 0) {
            console.log('--- SAMPLE FROM "challenges" ---');
            const sample = await db.collection('challenges').find().limit(1).toArray();
            console.log(JSON.stringify(sample[0], null, 2));
        }

        if (learningchallengesCount > 0) {
            console.log('--- SAMPLE FROM "learningchallenges" ---');
            const sample = await db.collection('learningchallenges').find().limit(1).toArray();
            console.log(JSON.stringify(sample[0], null, 2));
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

inspectDB();
