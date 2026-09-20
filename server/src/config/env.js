const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../../.env') });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoose: {
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/careersense',
  },
  ai: {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
  }
};
