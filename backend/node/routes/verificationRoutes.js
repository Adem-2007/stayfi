const express = require('express');
const router = express.Router();
const VerificationController = require('../controllers/verificationController');

router.post('/send-verification', VerificationController.sendVerification);
router.post('/verify-code', VerificationController.verifyCode);

module.exports = router;
