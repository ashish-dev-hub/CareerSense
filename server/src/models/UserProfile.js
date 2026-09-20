const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Frontend", "Backend", "Programming", "AI/ML", "Database", "DevOps", "Other"],
    required: true
  },
  proficiency: { 
    type: String, 
    enum: ["Beginner", "Intermediate", "Advanced"], 
    required: true 
  },
  evidence: { type: String, default: "" }
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  stack: { type: String } // String for MVP compatibility with frontend context (e.g. "React, Tailwind")
});

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: "" },
  targetRole: { type: String, required: true },
  experienceLevel: { 
    type: String, 
    enum: ["Beginner", "Intermediate", "Advanced"], 
    default: "Beginner" 
  },
  weeklyHours: { type: Number, default: 10 },
  skills: [skillSchema],
  projects: [projectSchema],
  interests: [String],
  // Cached AI generated data
  intelligence: {
    gapAnalysis: { type: mongoose.Schema.Types.Mixed },
    roadmap: { type: mongoose.Schema.Types.Mixed },
    recommendedProjects: { type: mongoose.Schema.Types.Mixed }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
