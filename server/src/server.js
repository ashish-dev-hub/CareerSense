const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const PORT = env.port;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${env.env} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Do not exit in hackathon mode, keep server alive if possible
});
