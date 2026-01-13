export default async function generateRoadmap(req, res) {
  const { currentRole, targetRole } = req.body;

  const roadmap = [
    {
      phase: "Phase 1 — Foundation (0–3 months)",
      items: [
        "Strengthen core programming fundamentals",
        "Master HTML, CSS, JavaScript",
        "Solve basic DSA problems",
      ],
    },
    {
      phase: "Phase 2 — Stack & Projects (3–6 months)",
      items: [
        `Deep dive into ${targetRole} tech stack`,
        "Build 2–3 portfolio-ready projects",
        "Learn Git, CI/CD & deployment",
      ],
    },
    {
      phase: "Phase 3 — Job Ready (6–12 months)",
      items: [
        "System design fundamentals",
        "Mock interviews & resume optimization",
        "Apply to relevant openings",
      ],
    },
  ];

  res.json({
    success: true,
    data: {
      currentRole,
      targetRole,
      roadmap,
    },
  });
}
