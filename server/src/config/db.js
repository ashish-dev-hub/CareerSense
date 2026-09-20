const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoose.url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Do not exit process in hackathon mode, we will have an in-memory fallback later
    console.log('MongoDB connection failed. App will rely on fallback data if implemented.');
  }
};

module.exports = connectDB;
