/**
 * VibeCheck API (CPE 411L)
 *
 * This server:
 * - runs on your computer (localhost)
 * - listens on a port (default: 3000)
 * - responds to browser requests (endpoints) using JSON
 */

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS lets your frontend page call your backend API.
app.use(cors());

// This allows Express to read JSON bodies (used for POST requests).
app.use(express.json());

// Data pools (random picks). You can customize these.
const fortunes = [
  "You will debug it in 5 minutes... after 55 minutes of panic.",
  "Your next commit will be clean and meaningful.",
  "A bug will disappear when you add one console.log().",
  "You passed the vibe check today. 😎",
];

const jokes = [
  "Why did the developer go broke? Because they used up all their cache.",
  "My code has two moods: works or why-is-this-happening.",
  "I told my program a joke... it just threw an exception.",
];

const vibeMap = {
  happy: { emoji: "😄", message: "Keep going - you're shipping greatness!" },
  tired: { emoji: "🥱", message: "Hydrate. Stretch. Then commit." },
  stressed: { emoji: "😵‍💫", message: "Breathe. One bug at a time." },
};

// Smash counter (stored in memory for now)
let smashes = 0;
let lastSmashAt = null;

// simple anti-spam: track last smash per IP (in-memory)
const lastSmashByIp = {};
const SMASH_COOLDOWN_MS = 1000; // 1 smash per second per IP

// GET /api/fortune -> returns one random fortune
app.get("/api/fortune", (req, res) => {
  const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.json({ fortune: pick });
});

// GET /api/joke -> returns one random joke
app.get("/api/joke", (req, res) => {
  const pick = jokes[Math.floor(Math.random() * jokes.length)];
  res.json({ joke: pick });
});

// GET /api/vibe?mood=happy|tired|stressed
app.get("/api/vibe", (req, res) => {
  const mood = (req.query.mood || "").toLowerCase();
  const vibe = vibeMap[mood];

  if (!vibe) {
    return res.json({
      mood: mood || "unknown",
      emoji: "🤔",
      message: "Try mood=happy, tired, or stressed.",
    });
  }

  res.json({ mood, ...vibe });
});

// POST /api/smash -> increases counter and returns the updated value (with cooldown)
app.post("/api/smash", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress;

  const now = Date.now();
  const last = lastSmashByIp[ip] || 0;
  const diff = now - last;

  // cooldown check
  if (diff < SMASH_COOLDOWN_MS) {
    const waitMs = SMASH_COOLDOWN_MS - diff;
    return res.status(429).json({
      smashes,
      message: "Too fast 💨 Wait a bit before smashing again.",
      retryAfterMs: waitMs,
    });
  }

  lastSmashByIp[ip] = now;
  smashes += 1;
  lastSmashAt = new Date().toISOString();

  res.json({
    smashes,
    message: "SMASH registered 💥",
    lastSmashAt,
  });
});

// GET /api/smashes -> returns current counter + last smash time
app.get("/api/smashes", (req, res) => {
  res.json({
    smashes,
    lastSmashAt,
  });
});

// OPTIONAL: POST /api/smash/reset -> resets counter (useful for testing)
app.post("/api/smash/reset", (req, res) => {
  smashes = 0;
  lastSmashAt = null;

  // clear per-IP cooldowns
  for (const key in lastSmashByIp) delete lastSmashByIp[key];

  res.json({
    smashes,
    message: "Smash counter reset ✅",
    lastSmashAt,
  });
});

// GET /api/secret?code=411L -> hidden message if code is correct
app.get("/api/secret", (req, res) => {
  const code = req.query.code;

  if (code === "411L") {
    return res.json({
      message: "🎉 Secret unlocked: +10 luck on your next merge!",
    });
  }

  res.status(403).json({ message: "Nope 😄 Try code=411L" });
});

// Start server
app.listen(PORT, () => {
  console.log(`VibeCheck API running at http://localhost:${PORT}`);
});
