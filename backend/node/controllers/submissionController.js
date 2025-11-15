const Submission = require('../models/Submission');
const PDFGenerator = require('../utils/pdfGenerator');
const EmailService = require('../utils/emailService');
const FileStorage = require('../utils/fileStorage');

class SubmissionController {
  static async submitApplication(req, res) {
    try {
      const { formData } = req.body;

      if (!formData || !formData.email) {
        return res.status(400).json({ error: 'Form data and email are required' });
      }

      // Generate submission ID
      const submissionId = `SUB-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

      // Save design files to disk
      const savedFiles = await FileStorage.saveDesignFiles(formData.designFiles, submissionId);
      
      // Store file metadata instead of base64 data
      const formDataToStore = { ...formData };
      if (savedFiles.length > 0) {
        formDataToStore.designFiles = savedFiles.map(f => ({
          filename: f.filename,
          mimeType: f.mimeType,
          size: f.size
        }));
      }

      // Create submission in MongoDB
      const submission = await Submission.create({
        submissionId,
        userType: formData.userType,
        email: formData.email,
        formData: formDataToStore,
        status: 'pending'
      });

      // Generate PDF
      const pdfPath = await PDFGenerator.generateSubmissionPDF(formData, submissionId);

      // Send email with PDF
      await EmailService.sendSubmissionEmail(formData, submissionId, pdfPath);

      // Clean up PDF file
      PDFGenerator.cleanupPDF(pdfPath);

      res.json({ 
        success: true, 
        message: 'Application submitted successfully',
        submissionId
      });

    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ 
        error: 'Failed to submit application',
        details: error.message 
      });
    }
  }

  static async getSubmissions(req, res) {
    try {
      const { userType } = req.query;
      const filter = userType ? { userType } : {};
      
      const submissions = await Submission.find(filter)
        .sort({ submittedAt: -1 })
        .lean();
      
      res.json({ 
        success: true, 
        submissions 
      });
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ 
        error: 'Failed to fetch submissions',
        details: error.message 
      });
    }
  }

  static async getSubmissionById(req, res) {
    try {
      const { id } = req.params;
      const submission = await Submission.findOne({ submissionId: id }).lean();
      
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      
      res.json({ 
        success: true, 
        submission 
      });
    } catch (error) {
      console.error('Error fetching submission:', error);
      res.status(500).json({ 
        error: 'Failed to fetch submission',
        details: error.message 
      });
    }
  }

  static async deleteSubmission(req, res) {
    try {
      const { id } = req.params;
      const submission = await Submission.findOne({ submissionId: id });
      
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      
      // Delete associated design files
      FileStorage.deleteDesignFiles(id);
      
      // Delete submission from database
      await Submission.deleteOne({ submissionId: id });
      
      res.json({ 
        success: true, 
        message: 'Submission deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting submission:', error);
      res.status(500).json({ 
        error: 'Failed to delete submission',
        details: error.message 
      });
    }
  }
}

module.exports = SubmissionController;
