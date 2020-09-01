const User = require('../models/User');
// ...rest of the initial code omitted for simplicity.
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' })
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        //save data to database
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
}

module.exports = {
    registerUser
}