const { validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const getContact = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });

        if (contacts.length > 0) {
            res.json({ count: contacts.length, contacts });
        } else {
            res.json({ message: 'there is no contact data' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
}

const postContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {

        let cekUser = await Contact.findOne({ email, user: req.user.id });
        if (cekUser) {
            return res.status(400).json({ msg: 'User already exists, please change the email' })

        }
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id,

        })
        // res.send(name);
        const contact = await newContact.save();
        res.json(contact)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
}

const putContact = async (req, res) => {
    if (req.params.id.length < 24) return res.status(400).json('id must 12 characters');
    const { id } = req.params;
    const { name, email, phone, type } = req.body;

    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(id);
        if (!contact) return res.status(404).json({ msg: 'User Not Found' });

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json('Not authorized');
        }
        contact = await Contact.findByIdAndUpdate(id, { $set: contactFields }, { new: true })
        res.json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const deleteContact = async (req, res) => {
    if (req.params.id.length < 24) return res.status(400).json('id must 12 characters');

    let id = req.params.id;

    try {
        let contact = await Contact.findById(id);
        if (!contact) return res.status(404).json({ msg: 'User Not Found' });

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json('Not authorized');
        }

        contact = await Contact.findByIdAndRemove(id);
        res.json({ msg: "delete succesfully" })


    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
module.exports = {
    getContact,
    postContact,
    putContact,
    deleteContact,
}