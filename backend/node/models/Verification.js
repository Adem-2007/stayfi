// In-memory storage (in production, use Redis or database)
const verificationCodes = new Map();

class Verification {
  static generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static store(email, code) {
    verificationCodes.set(email, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      attempts: 0
    });
  }

  static get(email) {
    return verificationCodes.get(email);
  }

  static delete(email) {
    verificationCodes.delete(email);
  }

  static incrementAttempts(email) {
    const data = verificationCodes.get(email);
    if (data) {
      data.attempts++;
    }
  }
}

module.exports = Verification;
