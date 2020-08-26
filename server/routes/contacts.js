const express = require('express');
const { getContact, postContact, putContact, deleteContact } = require('../controllers/contactController');
const router = express.Router();

// @route   GET api/contact
// @desc    Get All contacts
// @access  Private
router.get('/contact', getContact);

// @route   POT api/contact/:id
// @desc    POST new contact
// @access  Private
router.post('/contact', postContact);


// @route   PUT api/contact
// @desc    Update contact
// @access  Private
router.put('/contact/:id', putContact);


// @route   DELETE api/contact/:id
// @desc    Delete contact
// @access  Private
router.delete('/contact/:id', deleteContact);
module.exports = router;