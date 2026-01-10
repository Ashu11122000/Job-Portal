import pool from "../../config/db.js";

const questionBank = {
  "Frontend Developer": {
    Easy: [
      "What are semantic HTML tags?",
      "Explain CSS Box Model.",
      "What is JavaScript?"
    ],
    Medium: [
      "Explain the virtual DOM and how React uses it.",
      "What is the difference between state and props?",
      "How do you optimize performance in a large React application?"
    ],
    Hard: [
      "Explain React reconciliation in detail.",
      "How would you architect a frontend design system?",
      "Explain hydration in SSR frameworks."
    ]
  }
};

export const getQuestion = async (req, res) => {
  const { role, difficulty, index } = req.body;
  const questions = questionBank[role]?.[difficulty] || [];
  const question = questions[index] || "No question available";

  res.json({ success: true, question });
};
