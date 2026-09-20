const express = require('express');
const { createProfile, getProfile, updateProfile, getProfileByUser } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/me').get(protect, getProfileByUser);
router.route('/').post(protect, createProfile);
router.route('/:id').get(protect, getProfile).put(protect, updateProfile);

module.exports = router;
