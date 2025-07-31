# 🧠 QUIZWEB  
*Unleash Knowledge. Ignite Engagement. Elevate Learning Instantly.*

![Last Commit](https://img.shields.io/badge/last%20commit-today-brightgreen)  
![JavaScript](https://img.shields.io/badge/javascript-68.4%25-yellow)  
![Languages](https://img.shields.io/badge/languages-3-blue)

Built with the tools and technologies:  
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)  
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)  
![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black)  
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)  
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)  
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)

---

## 🧾 Overview

**QuizWeb** is a modern and responsive math worksheet web app built with **React + Vite**, designed to replicate and elevate the experience of a traditional paper worksheet, specifically modeled after:

📄 **Math Worksheet Reference**  
[https://www.mathinenglish.com/worksheetsimages/grade4/big/Rounding10MultipleP4(2).gif](https://www.mathinenglish.com/worksheetsimages/grade4/big/Rounding10MultipleP4(2).gif)

---

## ✅ Features & Implementation Breakdown

| Requirement | Implementation |
|------------|----------------|
| 1. Use the full worksheet content | Faithfully reproduced 12 rounding-to-10 questions and copyright |
| 2. Responsive design | Responsive layout using Flexbox, CSS Grid, media queries |
| 3. Creative layout | Modern card design, spacing, and transitions |
| 4. Reset button | Clears all answers and resets inputs |
| 5. Submit button with scoring | Calculates and shows total correct answers (0–12) |
| 6. Display the score | Score visible with clear feedback |
| 7. Require name before scoring | Name is required before score is calculated |
| 8. Deploy the app | ✅ Hosted via Netlify |
| Bonus: CSS animations | Subtle animations on buttons, score feedback, transitions |
| Bonus: Maintainable code | Modular React components, ESLint, clean structure |
| Bonus: Backend + leaderboard | Firebase used to store and display highscores live |

---

## 💻 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React (v18+)** | Component-based UI development |
| **Vite** | Fast builds, live refresh during dev |
| **Firebase** | Real-time database, score logging, anonymous auth |
| **CSS Modules / Custom CSS** | Styling and layout |
| **ESLint** | Code quality and linting |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
git clone https://github.com/HaziqHudzairy/QuizWeb
cd QuizWeb
npm install
```

### Run Locally

```bash
npm run dev
```

---

## 🌐 Live Demo

> 🔗 [Live App](https://your-netlify-or-vercel-link.com)

---

## 🔐 Firebase Usage

This project uses **Firebase** for:

- 🔄 Real-time storage of high scores
- 🔐 Anonymous authentication
- 💾 Optional question storage for scalability

The Firebase config **does not include sensitive admin credentials** and is safe to expose on the client.

To run locally, update the Firebase config in `src/js/firebaseConfig.js` if needed:

```js
const firebaseConfig = {
  apiKey: "AIzaSyBdhySqKrvfNqFD3u7YHP3aMT8W150K9SY",
  authDomain: "uizweb-73f3a.firebaseapp.com",
  ...
};
```

---

## 🏆 Leaderboard System

- Highlights current user in the table
- Auto-scrolls if more than 10 entries
- Top 3 users receive 🥇 🥈 🥉 badges
- Firebase syncs data in real-time

---

## 📜 License

This project is for educational/demo purposes.  
Original worksheet content © [mathinenglish.com](https://www.mathinenglish.com)

---

Created by **Muhammad Haziq Hudzairy**  
🔗 GitHub: [HaziqHudzairy](https://github.com/HaziqHudzairy)

---
