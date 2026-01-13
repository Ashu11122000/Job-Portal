export default function projectsByRole(req, res) {
  const projects = [
    {
      id: 1,
      title: "Job Portal Platform",
      tags: ["React", "Node", "MySQL"],
      difficulty: "Intermediate",
      duration: "4–6 weeks",
      output: "Portfolio Ready",
    },
    {
      id: 2,
      title: "Realtime Dashboard",
      tags: ["WebSocket", "Charts", "React"],
      difficulty: "Advanced",
      duration: "6–8 weeks",
      output: "Enterprise-level UI",
    },
    {
      id: 3,
      title: "Cloud Cost Analyzer",
      tags: ["AWS", "Python"],
      difficulty: "Beginner",
      duration: "3–4 weeks",
      output: "ML-powered insights",
    },
  ];

  res.json({
    success: true,
    projects,
  });
}
