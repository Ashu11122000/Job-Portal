const emailTemplates = {
  verificationEmail: (name, verificationLink) => `
    <h2>Welcome ${name}!</h2>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationLink}">Verify Email</a>
  `,

  passwordResetEmail: (name, resetLink) => `
    <h2>Password Reset Request</h2>
    <p>Hi ${name},</p>
    <p>We received a request to reset your password. Click the link below to set a new password:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>This link will expire in 24 hours.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `,

  applicationConfirmationEmail: (candidateName, jobTitle, companyName) => `
    <h2>Application Received</h2>
    <p>Hi ${candidateName},</p>
    <p>Thank you for applying to the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
    <p>We have received your application and will review it shortly. You will be notified of the status via email.</p>
    <p>Best regards,<br>Job Portal Team</p>
  `,

  jobNotificationEmail: (candidateName, jobTitle, companyName, jobDescription) => `
    <h2>New Job Opportunity</h2>
    <p>Hi ${candidateName},</p>
    <p>We found a job that matches your profile:</p>
    <h3>${jobTitle} at ${companyName}</h3>
    <p>${jobDescription}</p>
    <p>Click below to view more details and apply:</p>
    <a href="${process.env.FRONTEND_URL}/jobs">View Job</a>
  `,

  welcomeEmail: (name) => `
    <h2>Welcome to Job Portal!</h2>
    <p>Hi ${name},</p>
    <p>Thank you for registering with us. Explore amazing job opportunities and connect with top companies.</p>
    <p>Happy job hunting!<br>Job Portal Team</p>
  `,

  statusUpdateEmail: (candidateName, jobTitle, status) => `
    <h2>Application Status Update</h2>
    <p>Hi ${candidateName},</p>
    <p>Your application for the <strong>${jobTitle}</strong> position has been <strong>${status}</strong>.</p>
    <p>Thank you for your interest!<br>Job Portal Team</p>
  `,
};

export default emailTemplates;
