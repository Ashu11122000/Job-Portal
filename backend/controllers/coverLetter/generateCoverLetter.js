import { generateLetter, calculateATS } from "../../utils/coverLetterEngine.js";

export default function generateCoverLetter(req, res) {
  const { form, tone, template } = req.body;

  const content = generateLetter({ form, tone, template });
  const atsScore = calculateATS(form);

  res.json({
    success: true,
    content,
    atsScore,
  });
}
