const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token from header x-auth-token bebas ini buat nanti diketik di frontend sebagai header
    const token = req.header('x-auth-token');

    // Check if not token 
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // decoded password
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}