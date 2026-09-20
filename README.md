# CareerSense 🚀

### Know What to Learn. Know What to Build. Know When You're Ready.

CareerSense is an AI-powered career intelligence platform for college students and early-career developers. It helps users assess their skills, identify career gaps, build a personalized roadmap, generate relevant projects, improve their resume, and practice interviews.

---

## 🌟 Problem

Students have access to hundreds of courses, roadmaps, coding platforms, resume tools, and interview resources, but these resources are often disconnected.

The common problem is:

> **"I know what technologies exist, but I don't know what I should learn next."**

CareerSense connects a student's current skills with their target career and converts skill gaps into actionable next steps.

---

## 💡 Solution

CareerSense analyzes:

- Current skills
- Target role
- Skill-assessment performance
- Resume
- Interview performance

and creates a connected career journey:

```text
Skill Assessment
       ↓
AI Gap Analysis
       ↓
Personalized Roadmap
       ↓
AI Project Generator
       ↓
Resume Analyzer
       ↓
AI Interview Mode
       ↓
Readiness Check
```

---

## ✨ Core Features

### 🧠 Skill Assessment
Evaluate technical knowledge and identify strengths and weaknesses.

### 🎯 AI Gap Analysis
Compare current capabilities with the skills expected for the selected target role.

### 🗺️ Personalized Roadmap
Generate a structured learning path based on individual skill gaps and priorities.

### 🏗️ AI Project Generator
Recommend projects specifically designed to strengthen missing skills.

### 📄 Resume Analyzer
Analyze a resume and suggest improvements, missing skills, projects, and achievements.

### 🎤 AI Interview Mode
Generate role-specific questions and provide AI-powered feedback on answers.

### 🔄 Career Feedback Loop
Connect skill gaps, learning goals, projects, resume improvements, and interview preparation into one workflow.

---

## 🎯 Target Users

- College students
- Freshers
- Early-career developers
- Internship seekers
- Placement candidates
- Developers transitioning into new technical roles

---

## 🧩 Example User Journey

A student wants to become an **AI/ML Engineer**.

### Current Skills
- Python
- Basic Machine Learning
- HTML/CSS
- Basic SQL

### CareerSense identifies gaps
- Statistics
- Deep Learning
- PyTorch/TensorFlow
- MLOps

### CareerSense then generates

**Learning Roadmap**

```text
Statistics → Machine Learning → Deep Learning → MLOps
```

**Projects:** Projects specifically targeting the missing skills.

**Resume Improvements:** Areas that should be strengthened or highlighted.

**Interview Preparation:** Questions relevant to the target role and projects.

---

## 🔥 What Makes CareerSense Different?

CareerSense is not just a resume analyzer, roadmap generator, or interview chatbot.

Its key idea is the connected:

```text
Skill Gap
    ↓
What should I learn?
    ↓
What should I build?
    ↓
Does my resume demonstrate it?
    ↓
Can I explain it in an interview?
    ↓
Am I ready?
```

### Core Differentiator

> **CareerSense turns career preparation into one connected feedback loop instead of a collection of disconnected tools.**

---

## 🏗️ System Architecture

```text
                    ┌──────────────────┐
                    │   CareerSense    │
                    │   React Client   │
                    └────────┬─────────┘
                             │
                         REST APIs
                             │
                    ┌────────▼─────────┐
                    │ Node.js + Express│
                    │     Backend      │
                    └──────┬─────┬──────┘
                           │     │
                    ┌──────▼─┐ ┌─▼────────┐
                    │ Gemini │ │ MongoDB  │
                    │   AI   │ │  Atlas   │
                    └────────┘ └──────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- React.js
- Tailwind CSS
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB
- MongoDB Atlas

### AI
- Google Gemini API

### Development Tools
- Git
- GitHub
- VS Code
- Postman

### Deployment
- Vercel
- Render backend hosting

---

## 📁 Project Structure

```text
CareerSense/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

> The exact structure may change as development progresses.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd CareerSense
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create `.env` inside `server/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

### 5. Start the backend

```bash
cd server
npm run dev
```

### 6. Start the frontend

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables & Security

Never commit secrets to GitHub.

Add this to `.gitignore`:

```gitignore
.env
node_modules/
dist/
```

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB connection |
| `GEMINI_API_KEY` | Gemini API authentication |
| `CLIENT_URL` | Frontend URL |

**Never expose Gemini API keys or MongoDB credentials in source code or public repositories.**

---

## 🤖 AI Workflow

Gemini acts as the intelligence layer:

```text
User Profile + Target Role
            ↓
         Backend
            ↓
       Gemini API
            ↓
    Structured AI Analysis
            ↓
┌───────────┼────────────┐
↓           ↓            ↓
Gaps     Roadmap      Projects
            ↓
      Resume + Interview
```

AI capabilities include:

- Skill-gap analysis
- Roadmap generation
- Project generation
- Resume feedback
- Interview question generation
- Interview answer evaluation

---

## 🚀 Future Scope

- 🔎 Real-time job-market skill intelligence
- 💼 Internship and job matching
- 🐙 GitHub portfolio analysis
- 🔗 LinkedIn profile analysis
- 📈 Skill-progress and readiness tracking
- 🎓 College placement dashboard
- 🤖 Continuous AI career mentor

---

## 🏆 Hackathon Vision

CareerSense connects:

```text
Learning
   ↓
Skills 
   ↓
Projects
   ↓
Resume
   ↓
Interviews
   ↓
Career Readiness
```

> **Build a world where students don't have to guess what to learn next.**

---

## 📌 Project Status

🚧 **Hackathon Project — Under Active Development**

Current focus:

- Core CareerSense workflow
- Gemini AI integration
- Skill-gap analysis
- Personalized roadmaps
- Project recommendations
- Resume analysis
- AI interview mode
- Full-stack integration

---

## 👥 Team

**CareerSense — HackDevengers 2.0**

Built with ❤️ for students navigating the path from learning to employability.

---

## 📄 License

This project is currently developed as a hackathon project. Add an appropriate open-source license if the project is later released publicly.
