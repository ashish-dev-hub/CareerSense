const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const profileRoutes = require('./routes/profileRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

const app = express();

// Security middleware
app.use(helmet());

// CORS config
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use('/api/profiles', profileRoutes);
app.use('/api/analysis', analysisRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CareerSense API is running' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
