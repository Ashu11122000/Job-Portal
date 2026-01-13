export default function salaryInsights(req, res) {
  const data = [
    { role: "Frontend Developer", base: 6, high: 15, growthPct: 32 },
    { role: "Backend Developer", base: 8, high: 22, growthPct: 28 },
    { role: "Full Stack Developer", base: 10, high: 26, growthPct: 35 },
  ];

  res.json({
    success: true,
    data,
  });
}
