const express = require('express');
const { authUser, loginUser } = require('../controllers/authController');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth');


// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/auth', auth, authUser);

// @route   POST api/auth
// @desc    Post user & get token
// @access  Public
router.post('/auth',
    [
        body('email', 'please include valid email').isEmail(),
        body('password', 'please add password')
    ]
    , loginUser);

module.exports = router;