const skillsMap = {
  "Frontend Developer": [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Accessibility",
  ],
  "Backend Developer": [
    "Node.js",
    "REST APIs",
    "Databases",
    "Authentication",
  ],
  "Full Stack Developer": [
    "React",
    "Node.js",
    "SQL & NoSQL",
    "System Design",
  ],
};

export default function skillsByRole(req, res) {
  const { role } = req.query;

  res.json({
    success: true,
    role,
    skills: skillsMap[role] || skillsMap["Full Stack Developer"],
  });
}
