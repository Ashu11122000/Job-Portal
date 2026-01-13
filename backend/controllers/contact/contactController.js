import { sendEmail } from "../../services/emailService.js";
import ApiResponse from "../../utils/apiResponse.js"; // ✅ MUST include .js

export const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return ApiResponse.error(res, "Required fields missing", 400);
  }

  await sendEmail({
    to: "support@jobportal.com",
    subject: subject || "New Contact Form Submission",
    html: `
      <h2>New Contact Request</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b><br/>${message}</p>
    `,
  });

  return ApiResponse.success(res, "Message sent successfully");
};
