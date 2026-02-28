const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generateSkillProfile = async (assessmentResults) => {
    // Input: User's answers from pre-assessment
    // Output: Skill level classification (Beginner/Intermediate/Advanced)
    const prompt = `
    Analyze the following assessment results and strictly classify the student's skill level.
    Results: ${JSON.stringify(assessmentResults)}
    
    Output JSON format:
    {
        "skillMap": {
            "React": {"level": "Intermediate", "confidence": 80},
            "Node.js": {"level": "Beginner", "confidence": 60}
        },
        "recommendedPace": "Medium"
    }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Simple extraction of JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
        console.error("Gemini Error:", error);
        return null;
    }
};

const generateLearningPath = async (userProfile, goal) => {
    const prompt = `
    Create a personalized learning path for a student with this profile:
    ${JSON.stringify(userProfile)}
    Goal: ${goal}
    
    Generate a sequence of 5-10 modules.
    Output JSON format:
    {
        "nodes": [
            {"title": "Intro to React", "category": "Frontend", "difficulty": "Beginner", "estimatedTime": 20},
            {"title": "Hooks Deep Dive", "category": "Frontend", "difficulty": "Intermediate", "estimatedTime": 45}
        ]
    }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
        console.error("Gemini Path Gen Error:", error);
        return null;
    }
};

const getRemedialSuggestion = async (failedConcept) => {
    const prompt = `
    The student failed a quiz on: "${failedConcept}".
    Suggest a remedial topic or simpler explanation.
    Output JSON format:
    {
        "remedialTopic": "Basics of state",
        "explanation": "State is like a component's memory..."
    }
    `;
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        // ... parsing logic
        const text = response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateSkillProfile,
    generateLearningPath,
    getRemedialSuggestion
};
