const express = require('express');
const { triggerGapAnalysis } = require('../controllers/analysisController');

const router = express.Router();

router.route('/gap/:id').post(triggerGapAnalysis);

module.exports = router;
