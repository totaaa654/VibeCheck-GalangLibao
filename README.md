# VibeCheck 411L 🎯

## Introduction
VibeCheck 411L is a simple Node.js and Express-based API with a button-based frontend UI.  
This project allows users to view random fortunes, jokes, and vibe messages, interact with a smash counter, and unlock a secret message. It demonstrates how a frontend communicates with a backend API while practicing a proper GitHub workflow using feature branches and pull requests.

---

## Project Structure
VibeCheck-GalangLibao/
  backend/
    index.js
    package.json
  frontend/
    index.html
    app.js

---

## How to Run the Project

### Run the Backend (API)
Open a terminal and navigate to the backend folder:

cd backend

Install dependencies:

npm install

Start the server:

node index.js

Expected output:

VibeCheck API running at http://localhost:3000

---

### Run the Frontend
Make sure the backend is running.  
Open frontend/index.html in your browser.  
Click the buttons to fetch data from the API.

---

## API Endpoints

GET /api/fortune  
Returns a random fortune

GET /api/joke  
Returns a random joke

GET /api/vibe?mood=happy|tired|stressed  
Returns a vibe message based on mood

POST /api/smash  
Increments the smash counter

GET /api/smashes  
Returns the current smash count

GET /api/secret?code=411L  
Returns a hidden message if the code is correct

---

## Features
- Random fortunes and jokes
- Mood-based vibe checker
- Smash button with counter
- Simple frontend using HTML, CSS, and JavaScript
- Backend API built with Express
- GitHub workflow using feature branches and pull requests

---

## Notes
- Stop the backend server using Ctrl + C
- If port 3000 is already in use, change the port in backend/index.js
- Make sure npm install is run inside the backend folder
