const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

// File-backed persistent fallback store when MongoDB is offline / unwhitelisted
const DATA_FILE = path.join(__dirname, '../../data/profiles.json');

const loadProfiles = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      const data = JSON.parse(content);
      console.log(`[Storage] Loaded ${Object.keys(data).length} profiles from local file cache`);
      return new Map(Object.entries(data));
    }
  } catch (err) {
    console.warn('[Storage] Could not read local profiles.json:', err.message);
  }
  return new Map();
};

const saveProfiles = (map) => {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const data = Object.fromEntries(map);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Storage] Could not save to local profiles.json:', err.message);
  }
};

const inMemoryProfiles = loadProfiles();

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Create new profile
// @route   POST /api/profiles
// @access  Public
const createProfile = async (req, res, next) => {
  try {
    const profileData = { ...req.body };
    if (req.user) {
      profileData.userId = req.user._id;
      profileData.email = req.user.email;
    }

    if (isDbConnected()) {
      const profile = await UserProfile.create(profileData);
      
      // Link back to user if authenticated
      if (req.user) {
        await User.findByIdAndUpdate(req.user._id, { profileId: profile._id });
      }
      
      return res.status(201).json(profile);
    }

    // Fallback persistent local store
    const id = 'mem_' + Date.now();
    const fallbackProfile = {
      _id: id,
      ...req.body,
      intelligence: {
        readinessScore: 0,
        gapAnalysis: null,
        personalizedRoadmap: null,
        recommendedProjects: []
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryProfiles.set(id, fallbackProfile);
    saveProfiles(inMemoryProfiles);
    console.log(`[LocalStorage] Profile saved (${id})`);
    return res.status(201).json(fallbackProfile);
  } catch (error) {
    console.warn('[ProfileController] Mongo error on createProfile, saving to local store:', error.message);
    const id = 'mem_' + Date.now();
    const fallbackProfile = {
      _id: id,
      ...req.body,
      intelligence: {
        readinessScore: 0,
        gapAnalysis: null,
        personalizedRoadmap: null,
        recommendedProjects: []
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryProfiles.set(id, fallbackProfile);
    saveProfiles(inMemoryProfiles);
    return res.status(201).json(fallbackProfile);
  }
};

// @desc    Get profile by ID
// @route   GET /api/profiles/:id
// @access  Public
const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (inMemoryProfiles.has(id)) {
      return res.json(inMemoryProfiles.get(id));
    }

    if (isDbConnected()) {
      const profile = await UserProfile.findById(id);
      if (profile) return res.json(profile);
    }

    res.status(404);
    throw new Error('Profile not found');
  } catch (error) {
    const { id } = req.params;
    if (inMemoryProfiles.has(id)) {
      return res.json(inMemoryProfiles.get(id));
    }
    next(error);
  }
};

// @desc    Update profile
// @route   PUT /api/profiles/:id
// @access  Public
const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (inMemoryProfiles.has(id)) {
      const existing = inMemoryProfiles.get(id);
      const updated = { ...existing, ...req.body, updatedAt: new Date() };
      inMemoryProfiles.set(id, updated);
      saveProfiles(inMemoryProfiles);
      return res.json(updated);
    }

    if (isDbConnected()) {
      const profile = await UserProfile.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      if (profile) return res.json(profile);
    }

    // If not in mongo or mongo down, update in memory
    const updated = { _id: id, ...req.body, updatedAt: new Date() };
    inMemoryProfiles.set(id, updated);
    saveProfiles(inMemoryProfiles);
    return res.json(updated);
  } catch (error) {
    const { id } = req.params;
    const updated = { _id: id, ...req.body, updatedAt: new Date() };
    inMemoryProfiles.set(id, updated);
    saveProfiles(inMemoryProfiles);
    return res.json(updated);
  }
};

// @desc    Get profile by logged in user
// @route   GET /api/profiles/me
// @access  Private
const getProfileByUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (isDbConnected()) {
      const profile = await UserProfile.findOne({ userId: req.user._id });
      if (profile) return res.json(profile);
    }

    // Check memory store for fallback
    const memProfile = Array.from(inMemoryProfiles.values()).find(p => p.email === req.user.email);
    if (memProfile) {
      return res.json(memProfile);
    }

    res.status(404).json({ message: 'Profile not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  getProfileByUser,
  inMemoryProfiles,
  saveProfiles
};
