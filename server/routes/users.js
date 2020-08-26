const express = require('express');
const { registerUser } = require('../controllers/usersController');
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/users', registerUser);

module.exports = router;