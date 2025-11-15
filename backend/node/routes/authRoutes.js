const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/request-login', AuthController.requestLogin);
router.post('/verify-login', AuthController.verifyLogin);
router.post('/verify-token', AuthController.verifyToken);
router.post('/logout', AuthController.logout);
router.post('/refresh-session', AuthController.refreshSession);

module.exports = router;
