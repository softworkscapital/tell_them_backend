const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const secret = process.env.JWT_SECRET; // Access the JWT secret
    if (!secret) {
        throw new Error('JWT secret is not defined');
    }
    return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET; // Access the JWT secret
    if (!secret) {
        throw new Error('JWT secret is not defined');
    }
    return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };
