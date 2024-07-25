const { verifyToken } = require('../utilities/jwtUtils');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from Bearer token

    if (!token) return res.sendStatus(401); // No token, unauthorized

    try {
        const user = verifyToken(token); // Verify token
        req.user = user; // Attach user info to request
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        return res.sendStatus(403); // Token is invalid, forbidden
    }
};

module.exports = authenticateToken;
