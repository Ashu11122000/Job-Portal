// Email Service - handles sending emails
let transporter = null;

try {
  const nodemailer = await import("nodemailer");
  transporter = nodemailer.default.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
} catch (error) {
  console.warn("Nodemailer not installed. Email functionality disabled.");
}

export const sendEmail = async (to, subject, html) => {
  if (!transporter) {
    console.log("Email would be sent to:", to, subject);
    return { status: "simulated" };
  }
  
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email service error:", error);
    throw error;
  }
};

export default { sendEmail };
