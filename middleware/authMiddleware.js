const jwt = require('jsonwebtoken');  // Import the jwt library

// Protect middleware to check JWT token in headers or cookies
const protect = (req, res, next) => {
  // Get the token from the Authorization header or cookies
  let token = req.header('Authorization') || req.cookies.token;

  // If no token is provided, send an unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Remove the "Bearer" prefix from token if present
  token = token.replace('Bearer ', '');

  try {
    // Verify the token using the JWT secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user info to the request object for use in other routes
    req.user = decoded.user;

    // Move to the next middleware/route handler
    next();
  } catch (err) {
    // If the token is invalid or expired, send an unauthorized error
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { protect };
