const API = import.meta.env.VITE_API_URL;

export async function generateRoadmap(payload) {
  const res = await fetch(`${API}/api/roadmap/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getSkills(role) {
  const res = await fetch(
    `${API}/api/roadmap/skills?role=${encodeURIComponent(role)}`
  );
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${API}/api/roadmap/projects`);
  return res.json();
}

export async function getSalary() {
  const res = await fetch(`${API}/api/roadmap/salary`);
  return res.json();
}
