const { QdrantClient } = require("@qdrant/js-client-rest");
const dotenv = require('dotenv');
dotenv.config();

const client = new QdrantClient({
    url: process.env.QDRANT_URL || 'http://localhost:6333',
    apiKey: process.env.QDRANT_API_KEY
});

const COLLECTION_NAME = 'learning_content';

const initializeCollection = async () => {
    try {
        const result = await client.getCollections();
        const exists = result.collections.some(c => c.name === COLLECTION_NAME);

        if (!exists) {
            await client.createCollection(COLLECTION_NAME, {
                vectors: {
                    size: 768, // Dimensions for Gemini/OpenAI embeddings
                    distance: 'Cosine',
                },
            });
            console.log(`Collection ${COLLECTION_NAME} created.`);
        }
    } catch (err) {
        console.error("Qdrant Init Error:", err.message);
    }
};

const searchSimilarContent = async (embedding, limit = 5) => {
    try {
        const searchResult = await client.search(COLLECTION_NAME, {
            vector: embedding,
            limit: limit,
        });
        return searchResult;
    } catch (err) {
        console.error("Qdrant Search Error:", err);
        return [];
    }
};

const upsertContent = async (id, vector, payload) => {
    try {
        await client.upsert(COLLECTION_NAME, {
            wait: true,
            points: [
                {
                    id,
                    vector,
                    payload
                }
            ]
        });
    } catch (err) {
        console.error("Qdrant Upsert Error:", err);
    }
};

module.exports = {
    client,
    initializeCollection,
    searchSimilarContent,
    upsertContent
};
