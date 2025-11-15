const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Authentication required' 
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if session exists and is valid
    const session = await Session.findOne({
      token,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return res.status(401).json({ 
        success: false,
        error: 'Session expired or invalid',
        sessionExpired: true
      });
    }

    req.admin = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ 
      success: false,
      error: 'Invalid or expired token',
      sessionExpired: true
    });
  }
};

module.exports = authMiddleware;
