const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const LoginVerification = require('../models/LoginVerification');
const Session = require('../models/Session');
const EmailService = require('../utils/emailService');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const SESSION_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

class AuthController {
  static async requestLogin(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ 
          success: false,
          error: 'Email is required' 
        });
      }

      // Check if email is the admin email
      if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return res.status(401).json({ 
          success: false,
          error: 'Unauthorized email address' 
        });
      }

      // Generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store verification code (expires in 10 minutes)
      await LoginVerification.create({
        email: email.toLowerCase(),
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      });

      // Send email with verification code
      await EmailService.sendLoginVerificationCode(email, code);

      res.json({
        success: true,
        message: 'Verification code sent to your email'
      });

    } catch (error) {
      console.error('Request login error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to send verification code',
        details: error.message 
      });
    }
  }

  static async verifyLogin(req, res) {
    try {
      const { email, code } = req.body;

      if (!email || !code) {
        return res.status(400).json({ 
          success: false,
          error: 'Email and verification code are required' 
        });
      }

      // Find valid verification code
      const verification = await LoginVerification.findOne({
        email: email.toLowerCase(),
        code,
        verified: false,
        expiresAt: { $gt: new Date() }
      });

      if (!verification) {
        return res.status(401).json({ 
          success: false,
          error: 'Invalid or expired verification code' 
        });
      }

      // Mark as verified
      verification.verified = true;
      await verification.save();

      // Find or create admin
      let admin = await Admin.findOne({ email: email.toLowerCase() });
      if (!admin) {
        admin = await Admin.create({
          email: email.toLowerCase(),
          password: Math.random().toString(36).substring(2) // Random password (not used)
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { adminId: admin._id, email: admin.email, role: admin.role },
        JWT_SECRET,
        { expiresIn: '10m' }
      );

      // Create session
      await Session.create({
        adminId: admin._id,
        token,
        expiresAt: new Date(Date.now() + SESSION_DURATION)
      });

      res.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          email: admin.email,
          role: admin.role
        }
      });

    } catch (error) {
      console.error('Verify login error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Login verification failed',
        details: error.message 
      });
    }
  }

  static async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ 
          success: false,
          error: 'No token provided' 
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
          error: 'Session expired or invalid' 
        });
      }

      res.json({
        success: true,
        admin: {
          email: decoded.email,
          role: decoded.role
        }
      });

    } catch (error) {
      res.status(401).json({ 
        success: false,
        error: 'Invalid or expired token' 
      });
    }
  }

  static async logout(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (token) {
        // Delete session
        await Session.deleteOne({ token });
      }

      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: 'Logout failed' 
      });
    }
  }

  static async refreshSession(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ 
          success: false,
          error: 'No token provided' 
        });
      }

      // Verify JWT
      const decoded = jwt.verify(token, JWT_SECRET);

      // Find and update session
      const session = await Session.findOne({ token });

      if (!session) {
        return res.status(401).json({ 
          success: false,
          error: 'Session not found' 
        });
      }

      // Extend session
      session.expiresAt = new Date(Date.now() + SESSION_DURATION);
      await session.save();

      res.json({
        success: true,
        message: 'Session refreshed'
      });

    } catch (error) {
      res.status(401).json({ 
        success: false,
        error: 'Failed to refresh session' 
      });
    }
  }
}

module.exports = AuthController;
