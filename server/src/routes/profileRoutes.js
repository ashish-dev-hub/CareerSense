const express = require('express');
const { createProfile, getProfile, updateProfile } = require('../controllers/profileController');

const router = express.Router();

router.route('/').post(createProfile);
router.route('/:id').get(getProfile).put(updateProfile);

module.exports = router;
