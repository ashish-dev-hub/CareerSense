const express = require('express');
const { triggerGapAnalysis } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/gap/:id').post(protect, triggerGapAnalysis);

module.exports = router;
