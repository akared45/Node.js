require('dotenv').config();

if (!process.env.MONGODB_URL) {
    throw new Error('Missing required environment variable: MONGODB_URL');
}

module.exports = {
    mongodb: {
        url: process.env.MONGODB_URL,
    }
};
