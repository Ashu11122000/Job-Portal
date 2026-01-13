import { calculateATS } from "../../utils/coverLetterEngine.js";

export default function calculateATSController(req, res) {
  const score = calculateATS(req.body);
  res.json({ success: true, score });
}
