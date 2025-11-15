const express = require('express');
const router = express.Router();
const SubmissionController = require('../controllers/submissionController');

router.post('/submit-application', SubmissionController.submitApplication);
router.get('/submissions', SubmissionController.getSubmissions);
router.get('/submissions/:id', SubmissionController.getSubmissionById);

module.exports = router;
