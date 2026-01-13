export const templates = {
  Tech: "focusing on problem-solving, scalability, and technical expertise",
  HR: "highlighting communication, collaboration, and people skills",
  MBA: "emphasizing leadership, strategy, and business impact",
  Remote: "showcasing ownership, async collaboration, and reliability",
};

export function generateLetter({ form, tone, template }) {
  const toneLine =
    tone === "Formal"
      ? "I am writing to formally express my interest"
      : tone === "Startup"
      ? "I’m excited to apply and contribute"
      : "I’d love to explore this opportunity";

  return `
Dear Hiring Manager at ${form.company || "your organization"},

My name is ${form.name || "a motivated professional"}, and ${toneLine} in the ${
    form.role || "open"
  } position.

With ${form.experience || "relevant"} experience and expertise in ${
    form.skills || "core skills"
  }, I bring value by ${templates[template]}.

I admire your organization’s vision and believe my skills, adaptability, and
growth mindset would allow me to contribute meaningfully to your team.

Thank you for your time and consideration.

Sincerely,
${form.name || "Your Name"}
`.trim();
}

export function calculateATS({ role, skills, experience }) {
  let score = 0;
  if (role) score += 30;
  if (skills && skills.split(",").length >= 3) score += 40;
  if (experience) score += 30;
  return score;
}
