import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AtmosphericOrb from '../components/common/AtmosphericOrb';
import { useProfile } from '../context/ProfileContext';
import { 
  Code2, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  X, 
  Check, 
  Layers, 
  Zap, 
  Copy, 
  CheckCheck,
  FolderPlus
} from 'lucide-react';

export default function ProjectGeneratorPage() {
  const { profile, addRoadmapProject } = useProfile();

  const [activeRoleFilter, setActiveRoleFilter] = useState('All');
  const [selectedSpecProject, setSelectedSpecProject] = useState(null);
  const [addedRoadmapId, setAddedRoadmapId] = useState(null);
  const [copiedSpec, setCopiedSpec] = useState(false);

  // Generator input state
  const [customGap, setCustomGap] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const initialProjects = [
    {
      id: 'proj_exp',
      title: 'AI Expense Analyzer & Insights API',
      role: 'Full Stack Developer',
      difficulty: 'Intermediate',
      duration: '10–14 days',
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      problem: 'Students and freelancers struggle to visualize recurring spending patterns and budget leaks.',
      whyUseful: 'Demonstrates full stack CRUD architecture, schema validation, and secure RESTful design.',
      skillsLearned: ['REST API Design', 'Authentication', 'MongoDB Aggregation', 'Cloud Deployment'],
      coreFeatures: [
        'Secure user authentication with JWT & bcrypt',
        'Categorized expense entry and query endpoints',
        'Summary aggregation by month, category, and payment type'
      ],
      advancedFeatures: [
        'Receipt text extraction and automatic category tagging',
        'Exportable monthly audit PDF report'
      ],
      architecture: 'Client (React + Tailwind) <-> REST API (Express Controllers) <-> MongoDB Atlas with Aggregation Pipelines. Secured via JWT HTTP-only tokens.',
      endpoints: [
        'POST /api/auth/register & POST /api/auth/login',
        'GET /api/expenses?month=2026-09&category=all',
        'POST /api/expenses (with payload validation)',
        'GET /api/expenses/summary/monthly (MongoDB Aggregation)'
      ]
    },
    {
      id: 'proj_track',
      title: 'Collaborative Dev Roadmap Tracker',
      role: 'Full Stack Developer',
      difficulty: 'Intermediate',
      duration: '7–10 days',
      stack: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      problem: 'Self-taught developers lack a shared milestone tracker that updates progress across peers.',
      whyUseful: 'Validates state synchronization, relational document referencing, and responsive UI design.',
      skillsLearned: ['State Architecture', 'Document Relationships', 'Responsive Grid Systems'],
      coreFeatures: [
        'Custom roadmap creation with hierarchical phases & topics',
        'Peer progress visibility and public share links',
        'Local persistence fallback for offline use'
      ],
      advancedFeatures: [
        'Real-time milestone notifications',
        'GitHub profile badge integration'
      ],
      architecture: 'Component-driven SPA with optimistic UI updates. Backend validates hierarchical phase-topic array mutability.',
      endpoints: [
        'GET /api/roadmaps/:id',
        'PATCH /api/roadmaps/:id/topics/:topicId/toggle',
        'POST /api/roadmaps/clone'
      ]
    },
    {
      id: 'proj_rag',
      title: 'RAG Academic Paper Research Assistant',
      role: 'AI / ML Engineer',
      difficulty: 'Advanced',
      duration: '12–15 days',
      stack: ['Python', 'FastAPI', 'PyTorch', 'ChromaDB', 'Gemini API'],
      problem: 'Researchers spend hours scanning 40-page papers to locate experimental methodologies.',
      whyUseful: 'Proves document chunking, semantic vector search, and hallucination reduction.',
      skillsLearned: ['Vector Databases', 'Embedding Pipelines', 'FastAPI Serving', 'Prompt Calibration'],
      coreFeatures: [
        'PDF parser with semantic sentence-boundary chunking',
        'Local embedding indexing via sentence-transformers in ChromaDB',
        'Context-injected question-answering with citation page tracking'
      ],
      advancedFeatures: [
        'Hybrid BM25 + Dense vector reranking',
        'Latency benchmarking and token-budget tracker'
      ],
      architecture: 'FastAPI async ingestion pipeline -> ChromaDB vector store -> LLM context injection with exact page citation metadata.',
      endpoints: [
        'POST /api/upload-paper (multipart/form-data)',
        'POST /api/query-corpus { question, top_k }',
        'GET /api/benchmarks/retrieval-latency'
      ]
    },
    {
      id: 'proj_cache',
      title: 'High-Throughput Ticket Booking Engine',
      role: 'Backend Developer',
      difficulty: 'Advanced',
      duration: '10–14 days',
      stack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
      problem: 'Flash-sale ticket releases crash databases with concurrent race conditions and double-bookings.',
      whyUseful: 'Demonstrates distributed locking, transactions, and caching under high concurrency.',
      skillsLearned: ['Distributed Locking', 'Redis Caching', 'ACID Transactions', 'Docker Orchestration'],
      coreFeatures: [
        'Atomic seat reservations with Redis Redlock distributed locks',
        'PostgreSQL serializable transactions with rollback mechanisms',
        'Sliding window rate limiter preventing bot seat exhaustion'
      ],
      advancedFeatures: [
        'Event-driven inventory release queue with BullMQ',
        'Locust load-test benchmark report (1,000 req/sec)'
      ],
      architecture: 'Edge Rate Limiter (Redis) -> Express cluster -> Redis distributed lock layer -> PostgreSQL database with serializable isolation.',
      endpoints: [
        'POST /api/bookings/reserve (with 5-minute TTL lock)',
        'POST /api/bookings/confirm (atomic commit)',
        'GET /api/events/:id/seats (Redis cached view)'
      ]
    }
  ];

  const [projectList, setProjectList] = useState(initialProjects);

  // Filter projects
  const filteredProjects = projectList.filter((p) => {
    if (activeRoleFilter === 'All') return true;
    return p.role.toLowerCase().includes(activeRoleFilter.toLowerCase());
  });

  // Handle Generate Custom Project
  const handleGenerateProject = (e) => {
    e?.preventDefault();
    const topic = customGap.trim() || 'REST API & Cloud Architecture';
    setIsGenerating(true);

    setTimeout(() => {
      const newProj = {
        id: 'proj_gen_' + Date.now(),
        title: `${topic} Production Gateway`,
        role: profile.targetRole || 'Full Stack Developer',
        difficulty: 'Intermediate',
        duration: '8–12 days',
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker'],
        problem: `Engineering teams lack a validated implementation showing reliable error resilience for ${topic}.`,
        whyUseful: `Explicitly demonstrates practical mastery over ${topic}, schema validation, and production deployment.`,
        skillsLearned: [topic, 'REST Architecture', 'System Resilience', 'Production CI/CD'],
        coreFeatures: [
          `Validated ${topic} processing service with input sanitization`,
          'Automated error boundary logging and structured JSON responses',
          'Responsive candidate dashboard tracking service health'
        ],
        advancedFeatures: [
          'Docker containerization with compose file for multi-service launch',
          'Automated unit and integration test suite'
        ],
        architecture: `Micro-service pattern integrating ${topic} with modular Express controller and client monitoring view.`,
        endpoints: [
          'GET /api/service/status',
          'POST /api/process (with schema validation)',
          'GET /api/analytics/metrics'
        ]
      };

      setProjectList((prev) => [newProj, ...prev]);
      setCustomGap('');
      setIsGenerating(false);
      setSelectedSpecProject(newProj);
    }, 700);
  };

  // Handle Add to Roadmap
  const handleAddToRoadmap = (project) => {
    addRoadmapProject(project);
    setAddedRoadmapId(project.id);
    setTimeout(() => setAddedRoadmapId(null), 3000);
  };

  // Handle Copy Specification
  const handleCopySpec = (project) => {
    const text = `PROJECT SPECIFICATION: ${project.title}
Target Role: ${project.role}
Difficulty: ${project.difficulty} (~${project.duration})
Tech Stack: ${project.stack.join(', ')}

PROBLEM:
${project.problem}

WHY THIS BUILDS CANDIDACY:
${project.whyUseful}

CORE FEATURES:
${project.coreFeatures.map((f, i) => `${i + 1}. ${f}`).join('\n')}

ARCHITECTURE:
${project.architecture}

ENDPOINTS:
${project.endpoints.join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  return (
    <div className="relative max-w-5xl mx-auto py-6 space-y-8">
      <AtmosphericOrb variant="peach" size="xl" className="-top-20 -right-20 opacity-30" />
      <AtmosphericOrb variant="sky" size="lg" className="bottom-1/3 -left-20 opacity-25" />

      {/* Header */}
      <div className="text-center">
        <Badge variant="neutral" className="mb-3" icon={Code2}>
          GAP-TARGETED PROJECTS
        </Badge>
        <h1 className="font-serif text-display-lg text-ink mb-2">
          Practical Project Recommendations
        </h1>
        <p className="text-[16px] text-body max-w-xl mx-auto">
          Every project is specifically chosen to eliminate one or more of your identified technical gaps.
        </p>
      </div>

      {/* Interactive Generator Bar */}
      <Card className="p-4 sm:p-6 bg-surface-card border-hairline">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-sans text-[15px] font-semibold text-ink flex items-center gap-2">
              <Zap className="w-4 h-4 text-ink" />
              Generate Gap-Closing Project
            </h3>
            <p className="text-[13px] text-muted">
              Target a specific missing skill or topic from your gap diagnostic:
            </p>
          </div>

          <form onSubmit={handleGenerateProject} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input
              type="text"
              value={customGap}
              onChange={(e) => setCustomGap(e.target.value)}
              placeholder="e.g. Redis Caching, WebSocket, PyTorch..."
              className="bg-canvas text-ink px-3.5 py-2 rounded-lg border border-hairline-strong text-[14px] focus:outline-none focus:border-ink w-full sm:w-64"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={isGenerating}
              className="shadow-sm shrink-0"
              icon={Plus}
            >
              {isGenerating ? 'Synthesizing Spec...' : 'Generate Project'}
            </Button>
          </form>
        </div>
      </Card>

      {/* Role Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
        <div className="flex flex-wrap gap-2">
          {['All', 'Full Stack Developer', 'AI / ML Engineer', 'Backend Developer'].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setActiveRoleFilter(role)}
              className={`px-3.5 py-1.5 rounded-pill text-[13px] font-medium transition-colors ${
                activeRoleFilter === role
                  ? 'bg-ink text-white'
                  : 'bg-surface-strong text-ink hover:bg-hairline'
              }`}
            >
              {role === 'All' ? 'All Roles' : role}
            </button>
          ))}
        </div>
        <span className="text-[13px] text-muted">
          Showing {filteredProjects.length} candidate projects
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((proj) => (
          <Card key={proj.id} className="p-4 sm:p-7 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={proj.difficulty === 'Intermediate' ? 'peach' : 'rose'}>
                    {proj.difficulty}
                  </Badge>
                  <span className="text-[11px] font-medium text-muted uppercase tracking-wider">
                    {proj.role}
                  </span>
                </div>
                <span className="text-[13px] text-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {proj.duration}
                </span>
              </div>

              <h2 className="font-sans text-title-md text-ink">
                {proj.title}
              </h2>

              <p className="text-[14px] text-body leading-relaxed">
                <span className="font-medium text-ink">Problem: </span>
                {proj.problem}
              </p>

              <div className="p-3.5 rounded-xl bg-canvas border border-hairline">
                <span className="text-caption-upper text-muted block mb-1">
                  Why this builds readiness:
                </span>
                <p className="text-[13px] text-body">
                  {proj.whyUseful}
                </p>
              </div>

              {/* Stack Pills */}
              <div>
                <span className="text-caption-upper text-muted block mb-2">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[12px] px-2.5 py-1 rounded-md bg-surface-strong text-ink font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills Developed */}
              <div>
                <span className="text-caption-upper text-muted block mb-2">
                  Skills Developed
                </span>
                <ul className="space-y-1 text-[13px] text-body">
                  {proj.skillsLearned.map((s, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-semantic-success" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-hairline flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-[13px] text-muted">
                {proj.coreFeatures.length} Core Features
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToRoadmap(proj)}
                  className="w-full sm:w-auto"
                  icon={addedRoadmapId === proj.id ? Check : FolderPlus}
                >
                  {addedRoadmapId === proj.id ? 'Added!' : 'Add to Roadmap'}
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  icon={ArrowRight} 
                  iconPosition="right"
                  onClick={() => setSelectedSpecProject(proj)}
                  className="w-full sm:w-auto shadow-sm"
                >
                  View Specification
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Specification Modal Drawer */}
      {selectedSpecProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-canvas border border-hairline rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="mint">Production Blueprint</Badge>
                  <span className="text-[12px] text-muted">• {selectedSpecProject.duration}</span>
                </div>
                <h3 className="font-serif text-[22px] sm:text-[26px] text-ink font-semibold">
                  {selectedSpecProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSpecProject(null)}
                className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-surface-strong transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Architecture Section */}
            <div className="space-y-2">
              <h4 className="text-[12px] uppercase font-semibold tracking-wider text-muted flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-ink" />
                System Architecture
              </h4>
              <p className="text-[14px] text-ink bg-surface-card p-4 rounded-xl border border-hairline font-mono text-[13px] leading-relaxed">
                {selectedSpecProject.architecture}
              </p>
            </div>

            {/* API Endpoints & Routes */}
            <div className="space-y-2">
              <h4 className="text-[12px] uppercase font-semibold tracking-wider text-muted">
                Core API Contract & Endpoints
              </h4>
              <div className="space-y-1.5 font-mono text-[12px]">
                {selectedSpecProject.endpoints.map((ep, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-surface-strong border border-hairline text-ink">
                    {ep}
                  </div>
                ))}
              </div>
            </div>

            {/* Core & Advanced Features */}
            <div className="space-y-3">
              <h4 className="text-[12px] uppercase font-semibold tracking-wider text-muted">
                Step-by-Step Milestones
              </h4>
              <ul className="space-y-2 text-[14px] text-body">
                {selectedSpecProject.coreFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-semantic-success mt-0.5 shrink-0" />
                    <span><strong className="text-ink">Milestone {i + 1}:</strong> {feat}</span>
                  </li>
                ))}
                {selectedSpecProject.advancedFeatures?.map((feat, i) => (
                  <li key={'adv_' + i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#854d0e] mt-0.5 shrink-0" />
                    <span><strong className="text-ink">Stretch Goal:</strong> {feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopySpec(selectedSpecProject)}
                className="w-full sm:w-auto"
              >
                {copiedSpec ? (
                  <>
                    <CheckCheck className="w-4 h-4 text-semantic-success" />
                    <span>Specification Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Full Spec</span>
                  </>
                )}
              </Button>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleAddToRoadmap(selectedSpecProject);
                    setTimeout(() => setSelectedSpecProject(null), 1000);
                  }}
                  className="w-full sm:w-auto shadow-sm"
                  icon={addedRoadmapId === selectedSpecProject.id ? Check : FolderPlus}
                >
                  {addedRoadmapId === selectedSpecProject.id ? 'Added to Roadmap!' : 'Add to My Roadmap'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSpecProject(null)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
