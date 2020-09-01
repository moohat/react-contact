const express = require('express');
const { registerUser } = require('../controllers/usersController');
// ...rest of the initial code omitted for simplicity.
const { body} = require('express-validator');
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/users',
    [
        body('name', 'please add name min 3 character').isLength({ min: 3 }).not(),
        body('email', 'please add email min 6 character').isLength({ min: 6 }).isEmail(),
        body('password', 'please add password min 5 character').isLength({ min: 5 })
    ]
    , registerUser);

module.exports = router;