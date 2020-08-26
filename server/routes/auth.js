const express = require('express');
const { authUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/auth', authUser);

// @route   POST api/auth
// @desc    Post user & get token
// @access  Public
router.post('/auth', loginUser);

module.exports = router;