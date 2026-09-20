const mongoose = require('mongoose');
const UserProfile = require('../models/UserProfile');
const aiService = require('../services/ai/ai.service');
const { inMemoryProfiles, saveProfiles } = require('./profileController');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Trigger AI Gap Analysis
// @route   POST /api/analysis/gap/:id
// @access  Public
const triggerGapAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;
    let profile = null;

    if (inMemoryProfiles.has(id)) {
      profile = inMemoryProfiles.get(id);
    } else if (isDbConnected()) {
      try {
        profile = await UserProfile.findById(id);
      } catch (e) {
        console.warn('Mongo find error, checking fallback', e.message);
      }
    }

    // If still not found, create a placeholder profile from body if provided
    if (!profile) {
      if (req.body && req.body.targetRole) {
        profile = { _id: id, ...req.body };
      } else {
        res.status(404);
        throw new Error('Profile not found');
      }
    }

    // Call abstract AI service
    const analysisResult = await aiService.generateGapAnalysis(profile);

    // Save to profile
    if (inMemoryProfiles.has(id)) {
      profile.intelligence = profile.intelligence || {};
      profile.intelligence.gapAnalysis = analysisResult;
      profile.intelligence.readinessScore = analysisResult.readinessScore;
      inMemoryProfiles.set(id, profile);
      saveProfiles(inMemoryProfiles);
    } else if (profile.save) {
      profile.intelligence.gapAnalysis = analysisResult;
      profile.intelligence.readinessScore = analysisResult.readinessScore;
      await profile.save();
    }

    res.json(analysisResult);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  triggerGapAnalysis
};
