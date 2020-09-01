const express = require('express');
const { getContact, postContact, putContact, deleteContact } = require('../controllers/contactController');
const router = express.Router();
const { body, check } = require('express-validator');
const auth = require('../middleware/auth');


// @route   GET api/contacts
// @desc    Get All contacts
// @access  Private
router.get('/contacts', auth, getContact);

// @route   POT api/contact
// @desc    POST new contact
// @access  Private
router.post('/contact',[auth, [check('name', 'Name is required').not().isEmpty()]], postContact);


// @route   PUT api/contact/:id
// @desc    Update contact
// @access  Private
router.put('/contact/:id', auth, putContact);


// @route   DELETE api/contact/:id
// @desc    Delete contact
// @access  Private
router.delete('/contact/:id', auth, deleteContact);
module.exports = router;