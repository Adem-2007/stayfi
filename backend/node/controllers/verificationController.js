const Verification = require('../models/Verification');
const EmailService = require('../utils/emailService');

class VerificationController {
  static async sendVerification(req, res) {
    try {
      const { email, name } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const code = Verification.generateCode();
      Verification.store(email, code);

      await EmailService.sendVerificationEmail(email, name, code);

      res.json({ 
        success: true, 
        message: 'Verification code sent successfully' 
      });

    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        error: 'Failed to send verification email',
        details: error.message 
      });
    }
  }

  static verifyCode(req, res) {
    try {
      const { email, code } = req.body;

      if (!email || !code) {
        return res.status(400).json({ error: 'Email and code are required' });
      }

      const storedData = Verification.get(email);

      if (!storedData) {
        return res.status(400).json({ error: 'No verification code found for this email' });
      }

      // Check expiration
      if (Date.now() > storedData.expiresAt) {
        Verification.delete(email);
        return res.status(400).json({ error: 'Verification code has expired' });
      }

      // Check attempts
      if (storedData.attempts >= 5) {
        Verification.delete(email);
        return res.status(400).json({ error: 'Too many failed attempts. Please request a new code.' });
      }

      // Verify code
      if (storedData.code === code) {
        Verification.delete(email);
        return res.json({ 
          success: true, 
          message: 'Email verified successfully' 
        });
      } else {
        Verification.incrementAttempts(email);
        return res.status(400).json({ 
          error: 'Invalid verification code',
          attemptsLeft: 5 - storedData.attempts
        });
      }

    } catch (error) {
      console.error('Error verifying code:', error);
      res.status(500).json({ 
        error: 'Failed to verify code',
        details: error.message 
      });
    }
  }
}

module.exports = VerificationController;
