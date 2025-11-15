const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

class EmailService {
  static async sendLoginVerificationCode(email, code) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Login Verification Code - StayFi Admin',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9333ea 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .code-box { background: white; border: 3px solid #9333ea; padding: 25px; text-align: center; border-radius: 10px; margin: 25px 0; }
            .code { font-size: 36px; font-weight: bold; color: #9333ea; letter-spacing: 8px; }
            .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Admin Login Verification</h1>
            </div>
            <div class="content">
              <p>Hello Admin,</p>
              <p>You requested to log in to the StayFi Admin Dashboard. Please use the verification code below:</p>
              
              <div class="code-box">
                <div class="code">${code}</div>
              </div>
              
              <div class="warning">
                <strong>⚠️ Security Notice:</strong><br>
                • This code expires in 10 minutes<br>
                • Never share this code with anyone<br>
                • If you didn't request this, please ignore this email
              </div>
              
              <div class="footer">
                <p>© 2024 StayFi. All rights reserved.</p>
                <p>Secure Admin Access System</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    return await transporter.sendMail(mailOptions);
  }

  static async sendVerificationEmail(email, name, code) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify Your Email - StayFi',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .code-box { background: white; border: 2px solid #fbbf24; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
            .code { font-size: 32px; font-weight: bold; color: #1e40af; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verification</h1>
            </div>
            <div class="content">
              <p>Hello ${name || 'there'},</p>
              <p>Thank you for choosing StayFi! To complete your application, please verify your email address using the code below:</p>
              
              <div class="code-box">
                <div class="code">${code}</div>
              </div>
              
              <p><strong>This code will expire in 10 minutes.</strong></p>
              <p>If you didn't request this verification, please ignore this email.</p>
              
              <div class="footer">
                <p>© 2024 StayFi. All rights reserved.</p>
                <p>Innovative Software Solutions</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    return await transporter.sendMail(mailOptions);
  }

  static async sendSubmissionEmail(formData, submissionId, pdfPath) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      cc: formData.email,
      subject: `New Application Submission - ${submissionId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; border-left: 4px solid #2563eb; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Application Received</h1>
            </div>
            <div class="content">
              <p>A new project application has been submitted.</p>
              
              <div class="info-box">
                <strong>Submission ID:</strong> ${submissionId}<br>
                <strong>Applicant:</strong> ${formData.name || formData.companyName}<br>
                <strong>Email:</strong> ${formData.email}<br>
                <strong>Type:</strong> ${formData.userType === 'company' ? 'Company' : 'Individual'}<br>
                <strong>Date:</strong> ${new Date().toLocaleString()}
              </div>
              
              <p>Please find the complete application summary attached as a PDF.</p>
              
              <div class="footer">
                <p>© 2024 StayFi. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `application-${submissionId}.pdf`,
          path: pdfPath
        }
      ]
    };

    return await transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService;
