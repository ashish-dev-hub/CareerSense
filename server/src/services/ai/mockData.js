const ROLE_BENCHMARKS = {
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
          { id: 't8', name: 'Input validation and security headers (Helmet)', done: false },
          { id: 't9', name: 'Cloud hosting configuration (Render / Vercel)', done: false },
        ]
      }
    ],
    recommendedProjects: [
      {
        title: 'AI Expense Tracker & Budget API',
        difficulty: 'Intermediate',
        duration: '10 days',
        stack: ['React', 'Node.js', 'Express', 'MongoDB'],
        problem: 'Freelancers lack automated expense categorization and spending threshold alerts.',
        whyUseful: 'Demonstrates secure REST API endpoints, JWT auth, and MongoDB aggregation pipelines.',
        skillsLearned: ['REST API Design', 'MongoDB Aggregation', 'JWT Authentication', 'Express Architecture']
      }
    ]
  },
  'AI / ML Engineer': {
    requiredSkills: [
      { name: 'Python', category: 'Programming', minProficiency: 'Advanced' },
      { name: 'PyTorch or TensorFlow', category: 'AI/ML', minProficiency: 'Intermediate' },
      { name: 'Vector Databases', category: 'Database', minProficiency: 'Intermediate' },
      { name: 'NumPy & Pandas', category: 'AI/ML', minProficiency: 'Advanced' },
      { name: 'FastAPI', category: 'Backend', minProficiency: 'Intermediate' },
      { name: 'Model Evaluation Metrics', category: 'AI/ML', minProficiency: 'Intermediate' },
      { name: 'RAG Architecture', category: 'AI/ML', minProficiency: 'Intermediate' },
      { name: 'Docker', category: 'DevOps', minProficiency: 'Beginner' },
    ],
    nextAction: {
      phaseTitle: 'Phase 1: PyTorch Tensors & Custom Neural Network Training Loops',
      description: 'Strengthen core deep learning fundamentals before deploying LLM inference pipelines.',
      estimatedHours: 16,
    },
    defaultRoadmap: [
      {
        phaseNumber: 1,
        title: 'PyTorch Foundations & Gradient Optimization',
        durationDays: 6,
        topics: [
          { id: 'm1', name: 'Tensor operations, broadcasting, and GPU acceleration', done: true },
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

module.exports = ROLE_BENCHMARKS;
