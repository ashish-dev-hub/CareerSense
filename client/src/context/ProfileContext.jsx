import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const ProfileContext = createContext(null);

// Benchmark skill requirements for target roles
export const ROLE_BENCHMARKS = {
  'Full Stack Developer': {
    requiredSkills: [
      { name: 'HTML & CSS', category: 'Frontend', minProficiency: 'Intermediate' },
      { name: 'JavaScript (ES6+)', category: 'Frontend', minProficiency: 'Advanced' },
      { name: 'React', category: 'Frontend', minProficiency: 'Intermediate' },
      { name: 'Node.js', category: 'Backend', minProficiency: 'Intermediate' },
      { name: 'Express', category: 'Backend', minProficiency: 'Intermediate' },
      { name: 'REST API Design', category: 'Backend', minProficiency: 'Intermediate' },
      { name: 'MongoDB', category: 'Database', minProficiency: 'Intermediate' },
      { name: 'Git & GitHub', category: 'DevOps', minProficiency: 'Intermediate' },
      { name: 'Authentication (JWT)', category: 'Backend', minProficiency: 'Beginner' },
    ],
    nextAction: {
      phaseTitle: 'Phase 1: Asynchronous JavaScript & Express API Architecture',
      description: 'Closing your backend server gap is the fastest path to Full Stack readiness. Focus on Promises, Express routing controllers, and REST conventions.',
      estimatedHours: 14,
    },
    defaultRoadmap: [
      {
        phaseNumber: 1,
        title: 'Asynchronous JavaScript & Express Routing',
        durationDays: 5,
        topics: [
          { id: 't1', name: 'Event Loop, Promises & async/await execution', done: true },
          { id: 't2', name: 'Express middleware, routing, and controller pattern', done: false },
          { id: 't3', name: 'HTTP status codes, CORS & robust error handling', done: false },
        ]
      },
      {
        phaseNumber: 2,
        title: 'MongoDB & Mongoose Document Modeling',
        durationDays: 7,
        topics: [
          { id: 't4', name: 'Schema modeling, data types, and validation', done: false },
          { id: 't5', name: 'CRUD endpoints with query filtering & pagination', done: false },
          { id: 't6', name: 'Relational references and aggregation basics', done: false },
        ]
      },
      {
        phaseNumber: 3,
        title: 'Authentication & Production Deployment',
        durationDays: 8,
        topics: [
          { id: 't7', name: 'JWT issuance, verification & protected routes', done: false },
          { id: 't8', name: 'Password hashing with bcrypt & security headers', done: false },
          { id: 't9', name: 'Deploying client to Vercel and backend to Render', done: false },
        ]
      }
    ],
    recommendedProjects: [
      {
        title: 'AI Expense Tracker & Budget API',
        difficulty: 'Intermediate',
        duration: '10 days',
        stack: ['React', 'Node.js', 'Express', 'MongoDB'],
        problem: 'Freelancers struggle to organize categorized monthly expenses and track budget leaks.',
        whyUseful: 'Validates complete client-server CRUD architecture and secure REST endpoints.',
        skillsLearned: ['REST API Design', 'Database Schemas', 'JWT Auth', 'Vercel/Render Deployment']
      },
      {
        title: 'Real-Time Developer Portfolio Hub',
        difficulty: 'Intermediate',
        duration: '7 days',
        stack: ['React', 'Tailwind', 'Node.js', 'Express'],
        problem: 'Students need a single verified URL showcasing dynamic GitHub metrics and projects.',
        whyUseful: 'Demonstrates API consumption, state synchronization, and clean design tokens.',
        skillsLearned: ['Component Modularity', 'API Integration', 'Responsive Design']
      }
    ]
  },
  'AI / ML Engineer': {
    requiredSkills: [
      { name: 'Python', category: 'Programming', minProficiency: 'Advanced' },
      { name: 'NumPy & Pandas', category: 'AI/ML', minProficiency: 'Advanced' },
      { name: 'Scikit-learn', category: 'AI/ML', minProficiency: 'Intermediate' },
      { name: 'PyTorch', category: 'AI/ML', minProficiency: 'Intermediate' },
      { name: 'Vector DBs (Chroma/Pinecone)', category: 'Database', minProficiency: 'Intermediate' },
      { name: 'LLM APIs & Prompt Engineering', category: 'AI/ML', minProficiency: 'Intermediate' },
      { name: 'Data Preprocessing & Cleaning', category: 'AI/ML', minProficiency: 'Intermediate' },
      { name: 'Model Evaluation Metrics', category: 'AI/ML', minProficiency: 'Intermediate' }
    ],
    nextAction: {
      phaseTitle: 'Phase 1: PyTorch Tensors & Custom Neural Network Pipelines',
      description: 'Strengthen core deep learning fundamentals before deploying agentic or RAG architectures into production.',
      estimatedHours: 16,
    },
    defaultRoadmap: [
      {
        phaseNumber: 1,
        title: 'PyTorch Foundations & Tensor Operations',
        durationDays: 6,
        topics: [
          { id: 'm1', name: 'Tensors, Autograd, and GPU acceleration basics', done: true },
          { id: 'm2', name: 'Building custom nn.Module architectures', done: false },
          { id: 'm3', name: 'Loss functions, optimizers, and training loops', done: false },
        ]
      },
      {
        phaseNumber: 2,
        title: 'RAG Architecture & Vector Retrieval',
        durationDays: 8,
        topics: [
          { id: 'm4', name: 'Chunking strategies & sentence-transformers embeddings', done: false },
          { id: 'm5', name: 'Vector indexing with ChromaDB / Pinecone', done: false },
          { id: 'm6', name: 'Context injection, retrieval reranking, and evaluation', done: false },
        ]
      },
      {
        phaseNumber: 3,
        title: 'Model Evaluation & LLM Serving',
        durationDays: 7,
        topics: [
          { id: 'm7', name: 'Precision, Recall, F1, and Perplexity metrics', done: false },
          { id: 'm8', name: 'FastAPI model serving and latency benchmarking', done: false },
        ]
      }
    ],
    recommendedProjects: [
      {
        title: 'RAG Academic Paper Research Assistant',
        difficulty: 'Advanced',
        duration: '12 days',
        stack: ['Python', 'FastAPI', 'PyTorch', 'ChromaDB', 'Gemini API'],
        problem: 'Researchers spend hours scanning 40-page papers to locate experimental methodologies.',
        whyUseful: 'Proves document chunking, semantic vector search, and hallucination reduction.',
        skillsLearned: ['Vector Databases', 'Embedding Pipelines', 'FastAPI Serving']
      }
    ]
  },
  'Backend Developer': {
    requiredSkills: [
      { name: 'Node.js or Python', category: 'Programming', minProficiency: 'Advanced' },
      { name: 'Express or FastAPI', category: 'Backend', minProficiency: 'Advanced' },
      { name: 'PostgreSQL / SQL', category: 'Database', minProficiency: 'Intermediate' },
      { name: 'MongoDB', category: 'Database', minProficiency: 'Intermediate' },
      { name: 'Redis Caching', category: 'Database', minProficiency: 'Intermediate' },
      { name: 'Docker', category: 'DevOps', minProficiency: 'Beginner' },
      { name: 'REST & GraphQL Architecture', category: 'Backend', minProficiency: 'Intermediate' },
      { name: 'System Design & Rate Limiting', category: 'Backend', minProficiency: 'Beginner' }
    ],
    nextAction: {
      phaseTitle: 'Phase 1: High-Performance Caching with Redis & Rate Limiting',
      description: 'Elevate beyond basic CRUD into production scalability, caching layers, and throughput optimization.',
      estimatedHours: 12,
    },
    defaultRoadmap: [
      {
        phaseNumber: 1,
        title: 'Redis Caching & Concurrency Control',
        durationDays: 5,
        topics: [
          { id: 'b1', name: 'Cache-aside pattern and TTL invalidation strategies', done: true },
          { id: 'b2', name: 'Sliding window rate limiting with Redis', done: false },
        ]
      },
      {
        phaseNumber: 2,
        title: 'Relational Database Indexing & Optimizations',
        durationDays: 7,
        topics: [
          { id: 'b3', name: 'B-Tree indexes, composite keys, and EXPLAIN query plans', done: false },
          { id: 'b4', name: 'Database transactions & ACID isolation levels', done: false },
        ]
      }
    ],
    recommendedProjects: [
      {
        title: 'High-Throughput Ticket Booking Engine',
        difficulty: 'Advanced',
        duration: '14 days',
        stack: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
        problem: 'Flash-sale ticket releases crash databases with concurrent race conditions.',
        whyUseful: 'Demonstrates distributed locking, transactions, and caching under load.',
        skillsLearned: ['Distributed Locking', 'Redis', 'ACID Transactions', 'Docker']
      }
    ]
  }
};

// Aliases
ROLE_BENCHMARKS['Backend Engineer'] = ROLE_BENCHMARKS['Backend Developer'];

const normalizeSkill = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const isSkillMatch = (userSkillName, reqSkillName) => {
  const uNorm = normalizeSkill(userSkillName);
  const rNorm = normalizeSkill(reqSkillName);
  if (!uNorm || !rNorm) return false;

  if (uNorm === rNorm) return true;
  if (uNorm.includes(rNorm) || rNorm.includes(uNorm)) return true;

  if ((uNorm.includes('javascript') || uNorm === 'js') && rNorm.includes('javascript')) return true;
  if (uNorm.includes('react') && rNorm.includes('react')) return true;
  if (uNorm.includes('node') && rNorm.includes('node')) return true;
  if (uNorm.includes('mongo') && rNorm.includes('mongo')) return true;
  if (uNorm.includes('python') && rNorm.includes('python')) return true;
  if (uNorm.includes('git') && rNorm.includes('git')) return true;
  if ((uNorm.includes('html') || uNorm.includes('css')) && (rNorm.includes('html') || rNorm.includes('css'))) return true;

  return false;
};

// Pure calculation engine to guarantee instant, reliable gap diagnosis anytime
export function calculateGapAnalysis(profileData) {
  const roleKey = profileData.targetRole || 'Full Stack Developer';
  const benchmark = ROLE_BENCHMARKS[roleKey] || ROLE_BENCHMARKS['Full Stack Developer'];

  const strengths = [];
  const gaps = [];
  const userSkills = profileData.skills || [];

  benchmark.requiredSkills.forEach((req) => {
    const matched = userSkills.find((s) => isSkillMatch(s.name, req.name));

    if (matched) {
      strengths.push({
        name: matched.name,
        category: matched.category || req.category,
        proficiency: matched.proficiency || 'Intermediate',
        evidence: matched.evidence || `Meets ${req.minProficiency} requirement for ${roleKey}`,
        note: `Meets ${req.minProficiency} requirement for ${roleKey}`
      });
    } else {
      gaps.push({
        name: req.name,
        category: req.category,
        priority: req.minProficiency === 'Advanced' ? 'High' : 'Medium',
        rationale: `Core requirement for ${roleKey} role readiness`
      });
    }
  });

  const totalReqs = benchmark.requiredSkills.length || 1;
  const matchedCount = strengths.length;
  const rawReadiness = Math.round((matchedCount / totalReqs) * 100);
  const readinessScore = Math.max(30, Math.min(95, rawReadiness));

  return {
    readinessScore,
    strengths,
    gaps,
    nextAction: benchmark.nextAction,
    recommendedProjects: benchmark.recommendedProjects || []
  };
}

const DEFAULT_PROFILE = {
  name: 'Alex Chen',
  targetRole: 'Full Stack Developer',
  experienceLevel: 'Beginner',
  weeklyHours: 12,
  skills: [
    { id: 's1', name: 'HTML', category: 'Frontend', proficiency: 'Advanced', evidence: 'Built 3 semantic responsive sites' },
    { id: 's2', name: 'CSS', category: 'Frontend', proficiency: 'Advanced', evidence: 'Flexbox, Grid, Tailwind CSS design system' },
    { id: 's3', name: 'JavaScript', category: 'Frontend', proficiency: 'Intermediate', evidence: 'DOM manipulation, ES6+ methods, Fetch API' },
    { id: 's4', name: 'React', category: 'Frontend', proficiency: 'Intermediate', evidence: 'Components, hooks, custom states, router' },
    { id: 's5', name: 'Python', category: 'Programming', proficiency: 'Intermediate', evidence: 'Data structures, algorithm practice' },
    { id: 's6', name: 'Git & GitHub', category: 'DevOps', proficiency: 'Beginner', evidence: 'Basic commits, branch management, pull requests' },
  ],
  projects: [
    {
      id: 'p1',
      title: 'Responsive Developer Portfolio',
      stack: 'React, Tailwind CSS',
      description: 'Personal portfolio with dark/light themes and responsive mobile-first navigation.'
    },
    {
      id: 'p2',
      title: 'Interactive Task & Habit Tracker',
      stack: 'React, LocalStorage',
      description: 'Component-based productivity app with categorization, filters, and local persistence.'
    }
  ],
  interests: [
    'Full Stack Web Architecture',
    'RESTful API Design',
    'AI Integration & Agents',
    'Clean UI/UX Design'
  ]
};

export function ProfileProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  
  // Load initial profile from localStorage if saved
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('cs_profile_data');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return DEFAULT_PROFILE;
  });

  const [profileId, setProfileId] = useState(() => localStorage.getItem('cs_profile_id'));
  
  // ALWAYS initialize with real calculated intelligence so it is never 0%
  const [derivedIntelligence, setDerivedIntelligence] = useState(() => calculateGapAnalysis(profile));
  const [isLoading, setIsLoading] = useState(false);

  const [roadmapPhases, setRoadmapPhases] = useState(() => {
    const roleKey = profile.targetRole || 'Full Stack Developer';
    const benchmark = ROLE_BENCHMARKS[roleKey] || ROLE_BENCHMARKS['Full Stack Developer'];
    return benchmark.defaultRoadmap;
  });

  // Keep derivedIntelligence in sync whenever profile skills or role changes
  useEffect(() => {
    const analysis = calculateGapAnalysis(profile);
    setDerivedIntelligence(analysis);

    const roleKey = profile.targetRole || 'Full Stack Developer';
    const benchmark = ROLE_BENCHMARKS[roleKey] || ROLE_BENCHMARKS['Full Stack Developer'];
    setRoadmapPhases(benchmark.defaultRoadmap);

    try {
      localStorage.setItem('cs_profile_data', JSON.stringify(profile));
    } catch (_) {}
  }, [profile.targetRole, profile.skills.length]);

  // Load from backend on mount if profileId exists
  useEffect(() => {
    let mounted = true;

    const withTimeout = (promise, ms = 4000) => {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), ms)
      );
      return Promise.race([promise, timeout]);
    };

    const loadData = async () => {
      if (!profileId) return;
      try {
        setIsLoading(true);
        const dbProfile = await withTimeout(api.getProfile(profileId), 4000);
        if (mounted && dbProfile) {
          setProfile(dbProfile);
          if (dbProfile.intelligence?.gapAnalysis) {
            setDerivedIntelligence(dbProfile.intelligence.gapAnalysis);
          } else {
            setDerivedIntelligence(calculateGapAnalysis(dbProfile));
          }
        }
      } catch (e) {
        console.warn('Backend sync skipped, running in local intelligence mode.', e.message);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadData();
    return () => { mounted = false; };
  }, [profileId]);

  // Sync profile when user logs in
  useEffect(() => {
    if (!isAuthenticated) return;

    let mounted = true;
    const fetchUserAuthProfile = async () => {
      try {
        setIsLoading(true);
        const dbProfile = await api.getMyProfile();
        if (mounted && dbProfile) {
          setProfile(dbProfile);
          setProfileId(dbProfile._id);
          localStorage.setItem('cs_profile_id', dbProfile._id);
          if (dbProfile.intelligence?.gapAnalysis) {
            setDerivedIntelligence(dbProfile.intelligence.gapAnalysis);
          } else {
            setDerivedIntelligence(calculateGapAnalysis(dbProfile));
          }
        }
      } catch (e) {
        // 404 means user hasn't created a profile yet, that's fine.
        console.log('No existing profile found for user:', e.message);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchUserAuthProfile();
    return () => { mounted = false; };
  }, [isAuthenticated, user?.email]); // Re-run if user email changes

  const saveProfileToDb = async () => {
    setIsLoading(true);
    // Instant local calculation guarantees the user gets immediate feedback
    const localAnalysis = calculateGapAnalysis(profile);
    setDerivedIntelligence(localAnalysis);

    try {
      localStorage.setItem('cs_profile_data', JSON.stringify(profile));
      if (profileId) {
        await api.updateProfile(profileId, profile);
        const gapData = await api.triggerGapAnalysis(profileId);
        if (gapData && gapData.readinessScore) {
          setDerivedIntelligence(gapData);
        }
      } else {
        const newProfile = await api.createProfile(profile);
        if (newProfile && newProfile._id) {
          setProfileId(newProfile._id);
          localStorage.setItem('cs_profile_id', newProfile._id);
          const gapData = await api.triggerGapAnalysis(newProfile._id);
          if (gapData && gapData.readinessScore) {
            setDerivedIntelligence(gapData);
          }
        }
      }
    } catch(e) {
      console.warn('Backend persistence unavailable, using instant local intelligence engine:', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (updates) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      const analysis = calculateGapAnalysis(next);
      setDerivedIntelligence(analysis);
      return next;
    });
  };

  const addSkill = (newSkill) => {
    if (!newSkill.name.trim()) return;
    setProfile((prev) => {
      const nextSkills = [...prev.skills, { ...newSkill, id: 's_' + Date.now() }];
      const next = { ...prev, skills: nextSkills };
      setDerivedIntelligence(calculateGapAnalysis(next));
      return next;
    });
  };

  const removeSkill = (skillId) => {
    setProfile((prev) => {
      const nextSkills = prev.skills.filter((s) => s.id !== skillId && s.name !== skillId);
      const next = { ...prev, skills: nextSkills };
      setDerivedIntelligence(calculateGapAnalysis(next));
      return next;
    });
  };

  const addProject = (newProject) => {
    if (!newProject.title.trim()) return;
    setProfile((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...newProject, id: 'p_' + Date.now() }]
    }));
  };

  const removeProject = (projectId) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projectId)
    }));
  };

  const toggleInterest = (interestName) => {
    setProfile((prev) => {
      const exists = prev.interests.includes(interestName);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interestName)
          : [...prev.interests, interestName]
      };
    });
  };

  const toggleRoadmapTopic = (phaseIdx, topicId) => {
    setRoadmapPhases((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (copy[phaseIdx] && copy[phaseIdx].topics) {
        const topic = copy[phaseIdx].topics.find((t) => t.id === topicId);
        if (topic) topic.done = !topic.done;
      }
      return copy;
    });
  };

  const addRoadmapProject = (project) => {
    addProject({
      title: project.title,
      stack: Array.isArray(project.stack) ? project.stack.join(', ') : project.stack,
      description: project.problem || project.whyUseful
    });

    setRoadmapPhases((prev) => [
      ...prev,
      {
        phaseNumber: prev.length + 1,
        title: `Project: ${project.title}`,
        durationDays: parseInt(project.duration) || 7,
        topics: (project.coreFeatures || [
          'Architecture setup & schema design',
          'Core API endpoints & components',
          'Testing & production deployment'
        ]).map((feat, i) => ({
          id: `proj_${Date.now()}_${i}`,
          name: feat,
          done: false
        }))
      }
    ]);
  };

  const resetToDefault = () => {
    setProfile(DEFAULT_PROFILE);
    const roleKey = DEFAULT_PROFILE.targetRole;
    const benchmark = ROLE_BENCHMARKS[roleKey] || ROLE_BENCHMARKS['Full Stack Developer'];
    setRoadmapPhases(benchmark.defaultRoadmap);
    setDerivedIntelligence(calculateGapAnalysis(DEFAULT_PROFILE));
    localStorage.removeItem('cs_profile_id');
    localStorage.removeItem('cs_profile_data');
    setProfileId(null);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        addSkill,
        removeSkill,
        addProject,
        removeProject,
        toggleInterest,
        roadmapPhases,
        toggleRoadmapTopic,
        addRoadmapProject,
        derivedIntelligence,
        resetToDefault,
        saveProfileToDb,
        isLoading,
        availableRoles: ['Full Stack Developer', 'AI / ML Engineer', 'Backend Developer']
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
