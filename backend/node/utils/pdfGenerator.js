const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFGenerator {
  static async generateSubmissionPDF(formData, submissionId) {
    const doc = new PDFDocument({ margin: 50 });
    const pdfPath = path.join(__dirname, '..', 'temp', `${submissionId}.pdf`);
    
    // Ensure temp directory exists
    const tempDir = path.join(__dirname, '..', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // PDF Header
    doc.fontSize(24).fillColor('#1e40af').text('Project Application Summary', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).fillColor('#6b7280').text(`Submission ID: ${submissionId}`, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(2);

    // Section 1: Applicant Information
    doc.fontSize(16).fillColor('#111827').text('1. Applicant Information');
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor('#374151');
    doc.text(`Name: ${formData.name || formData.companyName || 'N/A'}`);
    doc.text(`Email: ${formData.email || 'N/A'}`);
    doc.text(`Phone: ${formData.phone || 'N/A'}`);
    doc.text(`Country: ${formData.country || 'N/A'}`);
    
    if (formData.userType === 'company') {
      doc.text(`Industry: ${formData.industry || 'N/A'}`);
      doc.text(`Employee Count: ${formData.employeeCount || 'N/A'}`);
    }
    
    if (formData.websiteUrl) {
      doc.text(`Website: ${formData.websiteUrl}`);
    }
    doc.moveDown(1.5);

    // Section 2: Project Overview
    doc.fontSize(16).fillColor('#111827').text('2. Project Overview');
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor('#374151');
    
    if (formData.principalGoal) {
      doc.fontSize(12).fillColor('#1f2937').text('Principal Goal:', { continued: false });
      doc.fontSize(11).fillColor('#374151').text(formData.principalGoal, { align: 'left' });
      doc.moveDown(0.5);
    }
    
    if (formData.currentProblem) {
      doc.fontSize(12).fillColor('#1f2937').text('Current Challenge:', { continued: false });
      doc.fontSize(11).fillColor('#374151').text(formData.currentProblem, { align: 'left' });
      doc.moveDown(0.5);
    }
    
    if (formData.targetAudience) {
      doc.fontSize(12).fillColor('#1f2937').text('Target Audience:', { continued: false });
      doc.fontSize(11).fillColor('#374151').text(formData.targetAudience, { align: 'left' });
      doc.moveDown(0.5);
    }
    doc.moveDown(1);

    // Section 3: Technical Specifications
    doc.fontSize(16).fillColor('#111827').text('3. Technical Specifications');
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor('#374151');
    
    if (formData.platforms && formData.platforms.length > 0) {
      doc.text(`Platforms: ${formData.platforms.join(', ')}`);
    }
    
    if (formData.frontendTech && formData.frontendTech.length > 0) {
      doc.text(`Frontend: ${formData.frontendTech.join(', ')}`);
    }
    
    if (formData.backendTech && formData.backendTech.length > 0) {
      doc.text(`Backend: ${formData.backendTech.join(', ')}`);
    }
    
    if (formData.database && formData.database.length > 0) {
      doc.text(`Database: ${formData.database.join(', ')}`);
    }
    
    if (formData.hosting) {
      doc.text(`Hosting: ${formData.hosting}`);
    }
    
    doc.text(`AI Features: ${formData.implementAI ? 'Yes' : 'No'}`);
    doc.text(`AI Automation: ${formData.aiAutomation ? 'Yes' : 'No'}`);
    doc.moveDown(1.5);

    // Section 4: Security & Payment
    doc.fontSize(16).fillColor('#111827').text('4. Security & Payment');
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor('#374151');
    doc.text(`Security Level: ${formData.securityLevel || 'Standard'}`);
    doc.text(`reCAPTCHA: ${formData.recaptcha ? 'Enabled' : 'Disabled'}`);
    
    if (formData.paymentMethods && formData.paymentMethods.length > 0) {
      doc.text(`Payment Methods: ${formData.paymentMethods.join(', ')}`);
    }
    doc.moveDown(1.5);

    // Section 5: Design Information
    if (formData.designFiles && formData.designFiles.length > 0) {
      doc.fontSize(16).fillColor('#111827').text('5. Design Files');
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor('#374151');
      doc.text(`Number of design files attached: ${formData.designFiles.length}`);
      doc.text('(See attached image files in email)');
      doc.moveDown(1);
    }
    
    // Design Description
    if (formData.designDescription) {
      if (!formData.designFiles || formData.designFiles.length === 0) {
        doc.fontSize(16).fillColor('#111827').text('5. Design Description');
      } else {
        doc.fontSize(12).fillColor('#1f2937').text('Design Description:', { continued: false });
      }
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor('#374151').text(formData.designDescription, { align: 'left' });
      doc.moveDown(1);
    }
    
    // Design URL
    if (formData.designUrl) {
      doc.fontSize(12).fillColor('#1f2937').text('Design File URL:', { continued: false });
      doc.fontSize(11).fillColor('#2563eb').text(formData.designUrl, { link: formData.designUrl });
      doc.moveDown(1);
    }
    
    // Footer
    doc.moveDown(2);
    doc.fontSize(10).fillColor('#9ca3af').text('This is an automated summary generated by StayFi Application System', { align: 'center' });

    doc.end();

    // Wait for PDF to be written
    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    return pdfPath;
  }

  static cleanupPDF(pdfPath) {
    setTimeout(() => {
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    }, 5000);
  }
}

module.exports = PDFGenerator;
