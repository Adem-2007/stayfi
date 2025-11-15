const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Public Routes (no authentication required)
app.use('/api/auth', authRoutes);
app.use('/api', verificationRoutes);

// Submission routes - split public and protected
const SubmissionController = require('./controllers/submissionController');

// Public: Allow anyone to submit applications
app.post('/api/submit-application', SubmissionController.submitApplication);

// Protected: Only authenticated admins can view submissions
app.get('/api/submissions', authMiddleware, SubmissionController.getSubmissions);
app.get('/api/submissions/:id', authMiddleware, SubmissionController.getSubmissionById);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`\n✓ Server is running on http://localhost:${PORT}`);
  console.log('\n📧 Public routes:');
  console.log('  POST /api/auth/request-login');
  console.log('  POST /api/auth/verify-login');
  console.log('  POST /api/auth/verify-token');
  console.log('  POST /api/auth/logout');
  console.log('  POST /api/send-verification');
  console.log('  POST /api/verify-code');
  console.log('  POST /api/submit-application');
  console.log('  GET  /api/health');
  console.log('\n🔒 Protected routes (require authentication):');
  console.log('  GET  /api/submissions');
  console.log('  GET  /api/submissions/:id');
  console.log('  POST /api/auth/refresh-session');
});
