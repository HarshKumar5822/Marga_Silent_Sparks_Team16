const mongoose = require('mongoose');
require('dotenv').config();

const Level = require('./models/Learning/Level');
const Challenge = require('./models/Learning/Challenge');

const checkIntegrity = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const categories = [
            'Python', 'JavaScript', 'HTML/CSS', 'React', 'Node.js', 'Git', 'Docker',
            'C', 'PHP', 'Operating Systems', 'Computer Networks', 'DSA',
            'TypeScript', 'Go', 'Rust', 'Swift', 'Kotlin', 'Ruby', 'Lua', 'R', 'System Design',
            'C#', 'Data Science'
        ];

        for (const cat of categories) {
            const levels = await Level.find({ category: cat }).populate('challenges');
            console.log(`\n--- ${cat} ---`);
            console.log(`Found ${levels.length} levels.`);

            if (levels.length > 0) {
                const first = levels[0];
                const last = levels[levels.length - 1];
                console.log(`First Level: ${first.title} (${first.difficulty})`);
                console.log(`Last Level: ${last.title} (${last.difficulty})`);

                // Check last level for quiz
                if (last.challenges.length > 0) {
                    const ch = last.challenges[0];
                    console.log(`Last Challenge Type: ${ch.type}`);
                    if (ch.type === 'Quiz') {
                        console.log(`Quiz Questions: ${ch.quizQuestions?.length}`);
                    }
                }
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        mongoose.connection.close();
    }
};

checkIntegrity();
