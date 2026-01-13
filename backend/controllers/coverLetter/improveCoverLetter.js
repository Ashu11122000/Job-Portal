export default function improveCoverLetter(req, res) {
  const { content } = req.body;

  const improved = content
    .replace("I bring value by", "I consistently deliver measurable impact by")
    .replace(
      "Thank you for your time and consideration.",
      "Thank you for reviewing my application."
    );

  res.json({
    success: true,
    improved,
  });
}
