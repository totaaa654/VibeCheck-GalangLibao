// This file controls the buttons.
// Each button calls the backend API and prints the result on screen.

const out = document.getElementById("out");

// If your backend runs locally, keep this.
const API_BASE = "http://localhost:3000";

function show(obj) {
  out.textContent = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
}

async function getJSON(url) {
  const res = await fetch(url);
  return res.json();
}

document.getElementById("btnFortune").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/fortune`);
  show(data);
});

document.getElementById("btnJoke").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/joke`);
  show(data);
});

document.querySelectorAll(".btnMood").forEach(btn => {
  btn.addEventListener("click", async () => {
    const mood = btn.dataset.mood;
    const data = await getJSON(`${API_BASE}/api/vibe?mood=${mood}`);
    show(data);
  });
});

document.getElementById("btnSmash").addEventListener("click", async () => {
  const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });
  const data = await res.json();
  show({ message: "SMASH registered 💥", ...data });
});

document.getElementById("btnSecret").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/secret?code=411L`);
  show(data);
});