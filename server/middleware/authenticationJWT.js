const jwt = require('jsonwebtoken');

// Middleware for verifying JWT and extracting user information
function authenticateJWT(req, res, next) {
    // Get the token from the request headers
    // const token = req.headers.authorization;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // If token is valid, save the decoded user information to the request object
        req.user = decoded;
        next();
    });
}

module.exports = authenticateJWT;
