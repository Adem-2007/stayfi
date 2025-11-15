const mongoose = require('mongoose');

const loginVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  code: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

loginVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const LoginVerification = mongoose.model('LoginVerification', loginVerificationSchema);

module.exports = LoginVerification;
