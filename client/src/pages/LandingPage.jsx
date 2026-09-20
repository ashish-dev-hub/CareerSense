import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import AtmosphericOrb from '../components/common/AtmosphericOrb';
import { useProfile } from '../context/ProfileContext';
import { 
  Compass, 
  Target, 
  Map, 
  Code2, 
  FileText, 
  Mic, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  Layers,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { updateProfile } = useProfile();

  // Interactive role preview selector for live teaser
  const [activePreviewRole, setActivePreviewRole] = useState('fullstack');

  const handleAnalyzeRealProfile = (roleTitle) => {
    updateProfile({ targetRole: roleTitle });
    navigate('/setup');
  };

  const rolePreviews = {
    fullstack: {
      title: 'Full Stack Developer',
      readiness: '58%',
      readinessNote: 'Frontend ready • Backend runtime and DB modeling needed',
      strengths: ['HTML5 & Responsive CSS', 'JavaScript (ES6+)', 'React Components & Hooks'],
      gaps: [
        { name: 'Node.js & Express Architecture', priority: 'High' },
        { name: 'MongoDB Schema Design', priority: 'High' },
        { name: 'RESTful API & Error Handling', priority: 'Medium' }
      ],
      recommendedProject: 'AI Expense Tracker & Budget API',
      firstPhase: 'Phase 1: Asynchronous JS & Node Runtime (~5 days)',
    },
    aiml: {
      title: 'AI / ML Engineer',
      readiness: '42%',
      readinessNote: 'Python foundation solid • Model evaluation & vector pipelines needed',
      strengths: ['Python Programming', 'NumPy & Pandas Analysis', 'Basic Math / Linear Algebra'],
      gaps: [
        { name: 'PyTorch / Model Training Flow', priority: 'High' },
        { name: 'Vector DBs & RAG Architecture', priority: 'High' },
        { name: 'Model Evaluation & Latency Metrics', priority: 'Medium' }
      ],
      recommendedProject: 'RAG Knowledge Assistant over Academic Papers',
      firstPhase: 'Phase 1: PyTorch Tensors & Neural Nets (~7 days)',
    },
    backend: {
      title: 'Backend Engineer',
      readiness: '65%',
      readinessNote: 'API foundations good • Distributed systems & caching needed',
      strengths: ['Node.js & Express', 'SQL / Relational Basics', 'Git Version Control'],
      gaps: [
        { name: 'Redis Caching & Rate Limiting', priority: 'High' },
        { name: 'Database Indexing & Query Plans', priority: 'High' },
        { name: 'Microservices Communication (gRPC/MQ)', priority: 'Medium' }
      ],
      recommendedProject: 'High-Concurrency Ticket Booking Engine',
      firstPhase: 'Phase 1: Redis Caching & Queue Worker Architecture (~6 days)',
    }
  };

  const currentPreview = rolePreviews[activePreviewRole];

  const workflowSteps = [
    {
      number: '01',
      title: 'Input Current Proficiencies',
      description: 'Enter your technical stack across Frontend, Backend, AI/ML, and DevOps with your real proficiency level and project evidence.',
      badge: 'Assessment',
      orb: 'mint',
    },
    {
      number: '02',
      title: 'AI Gap Diagnostic',
      description: 'CareerSense compares your skills directly against real industry job standards for your target role, calculating your readiness and highest-priority gaps.',
      badge: 'Intelligence',
      orb: 'peach',
    },
    {
      number: '03',
      title: 'Execution & Interview Readiness',
      description: 'Receive a personalized phased roadmap, gap-targeted project briefs, and interactive mock interview scenarios that take you to job-ready status.',
      badge: 'Readiness',
      orb: 'lavender',
    },
  ];

  const capabilities = [
    {
      title: 'Skill Assessment & Inventory',
      description: 'Categorize your proficiencies across languages, frameworks, and databases with verified evidence—not arbitrary guessing.',
      badge: 'Module 01',
      icon: Target,
      path: '/setup',
    },
    {
      title: 'AI Gap Analysis',
      description: 'Benchmark your current profile against strict industry role requirements to highlight strengths and high-priority missing skills.',
      badge: 'Module 02',
      icon: Compass,
      path: '/analysis',
    },
    {
      title: 'Personalized Roadmap',
      description: 'Chronological, phased milestones with precise time estimates, dependencies, and interactive topic checklists.',
      badge: 'Module 03',
      icon: Map,
      path: '/roadmap',
    },
    {
      title: 'Gap-Closing Projects',
      description: 'Curated real-world project briefs engineered specifically to eliminate your identified technical deficiencies.',
      badge: 'Module 04',
      icon: Code2,
      path: '/projects',
    },
    {
      title: 'Resume & Portfolio Critique',
      description: 'Actionable bullet-point rewrites with measurable impact metrics and role relevance—without fake ATS guarantees.',
      badge: 'Module 05',
      icon: FileText,
      path: '/resume',
    },
    {
      title: 'AI Mock Interview Mode',
      description: 'Interactive technical and situational questioning with structured critique on what was correct, missing, and ideal answers.',
      badge: 'Module 06',
      icon: Mic,
      path: '/interview',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Ambient Atmospheric Orbs (Purely decorative as specified in Design.md) */}
      <AtmosphericOrb variant="lavender" size="xl" className="-top-32 -left-32 opacity-40" />
      <AtmosphericOrb variant="peach" size="lg" className="top-40 -right-24 opacity-35" />
      <AtmosphericOrb variant="mint" size="xl" className="top-[700px] left-1/4 opacity-30" />
      <AtmosphericOrb variant="sky" size="lg" className="top-[1400px] -right-20 opacity-25" />
      <AtmosphericOrb variant="rose" size="xl" className="top-[2200px] -left-20 opacity-30" />

      {/* ─────────────────────────────────────────────────────────────
          1. HERO BAND (Waldenburg/EB Garamond Light 300, 64px display)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Badge variant="neutral" className="mb-6 px-4 py-1.5 shadow-sm">
            THE PERSONAL AI CAREER MENTOR
          </Badge>

          <h1 className="font-serif text-[32px] sm:text-[48px] md:text-display-mega text-ink mb-6 tracking-tight leading-[1.08]">
            Stop learning randomly.
            <br />
            Turn skill gaps into career readiness.
          </h1>

          <p className="text-[16px] sm:text-[19px] text-body max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            CareerSense analyzes where your skills stand today against industry benchmarks for your target role, then builds your personalized roadmap, projects, and interview preparation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <Link to="/setup" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto shadow-sm">
                Start Free Assessment
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Demo Workspace
              </Button>
            </Link>
          </div>

          {/* Quick Credibility Markers */}
          <div className="mt-12 pt-8 border-t border-hairline flex flex-wrap items-center justify-center gap-6 text-[14px] text-muted">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink" /> Role-benchmarked gap analysis
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink" /> Phased milestone roadmaps
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ink" /> Verified project recommendations
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. LIVE INTERACTIVE TEASER: "THE GAP DIAGNOSTIC IN ACTION"
      ───────────────────────────────────────────────────────────── */}
      <section className="py-8 mb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <span className="text-caption-upper text-muted block mb-1">
              LIVE PREVIEW
            </span>
            <h2 className="font-serif text-display-md text-ink">
              See How CareerSense Diagnoses Your Gaps
            </h2>
            <p className="text-[15px] text-body mt-1">
              Select a target role to preview how our career mentor transforms raw skill data into actionable growth:
            </p>
          </div>

          {/* Target Role Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 px-2">
            {[
              { id: 'fullstack', label: 'Full Stack Developer' },
              { id: 'aiml', label: 'AI / ML Engineer' },
              { id: 'backend', label: 'Backend Engineer' }
            ].map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setActivePreviewRole(role.id)}
                className={`px-3.5 py-2 sm:px-4 sm:py-2 rounded-pill text-[13px] sm:text-[14px] font-medium transition-all ${
                  activePreviewRole === role.id
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-surface-card border border-hairline text-ink hover:bg-surface-strong'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          {/* Interactive Preview Card Stack */}
          <Card className="p-4 sm:p-6 md:p-8 border border-hairline bg-surface-card shadow-elevated relative overflow-hidden">
            <AtmosphericOrb variant="mint" size="md" className="-bottom-16 -right-16 opacity-30" />
            
            <div className="relative z-10 space-y-6">
              {/* Header inside preview */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
                <div>
                  <span className="text-[12px] font-semibold text-muted uppercase tracking-wider block">
                    TARGET ROLE BENCHMARK
                  </span>
                  <h3 className="font-serif text-[22px] sm:text-display-sm text-ink">
                    {currentPreview.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="mint" icon={TrendingUp}>
                    Estimated Readiness: {currentPreview.readiness}
                  </Badge>
                </div>
              </div>

              {/* Strengths vs Gaps Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Current Strengths */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-canvas border border-hairline">
                  <div className="flex items-center gap-2 text-semantic-success mb-3">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[13px] font-semibold uppercase tracking-wider">
                      Current Strengths
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {currentPreview.strengths.map((s, i) => (
                      <li key={i} className="text-[13px] sm:text-[14px] text-ink flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-semantic-success shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Identified Gaps */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-canvas border border-hairline">
                  <div className="flex items-center gap-2 text-[#854d0e] mb-3">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-[13px] font-semibold uppercase tracking-wider">
                      Identified Priority Gaps
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {currentPreview.gaps.map((g, i) => (
                      <li key={i} className="text-[13px] sm:text-[14px] text-ink flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-semantic-error shrink-0" />
                          <span className="truncate">{g.name}</span>
                        </span>
                        <Badge variant={g.priority === 'High' ? 'rose' : 'peach'} className="text-[10px] py-0 px-2 shrink-0">
                          {g.priority}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actionable Solution Bridge */}
              <div className="p-4 rounded-xl bg-canvas-soft border border-hairline-strong flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <span className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-0.5">
                    How CareerSense Bridges This Gap
                  </span>
                  <p className="text-[13px] sm:text-[14px] text-ink font-medium">
                    {currentPreview.firstPhase} &amp; Project: <span className="italic font-normal">{currentPreview.recommendedProject}</span>
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => handleAnalyzeRealProfile(currentPreview.title)}
                  className="w-full sm:w-auto shrink-0 shadow-sm"
                >
                  Analyze My Real Profile
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CORE PHILOSOPHY BANNER (Print Magazine Editorial Feature)
      ───────────────────────────────────────────────────────────── */}
      <section className="my-10 sm:my-16">
        <Card variant="soft" className="p-5 sm:p-8 md:p-14 text-center border-hairline relative overflow-hidden">
          <AtmosphericOrb variant="peach" size="md" className="-bottom-20 -left-20 opacity-30" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-caption-upper text-muted block mb-3">
              The CareerSense Philosophy
            </span>
            <blockquote className="font-serif text-[20px] sm:text-[28px] md:text-[34px] text-ink font-light leading-snug mb-5">
              "CareerSense doesn’t just tell students what to learn. It identifies the gap between where they are and where they want to go, then turns that gap into an actionable roadmap and projects."
            </blockquote>
            <p className="text-[15px] text-body max-w-xl mx-auto leading-relaxed">
              Most students waste hundreds of hours hopping between unrelated tutorials. CareerSense gives you clear diagnostic clarity and a sequenced trajectory toward full hireability.
            </p>
          </div>
        </Card>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. HOW IT WORKS (3-Step Editorial Workflow)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-caption-upper text-muted block mb-2">
            Structured Progression
          </span>
          <h2 className="font-serif text-display-lg text-ink mb-3 tracking-display-lg">
            How CareerSense Works
          </h2>
          <p className="text-[16px] text-body">
            A precise three-step engine designed to transition you from random learning to verified competence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workflowSteps.map((step, idx) => (
            <Card key={idx} className="p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div>
                <span className="font-serif text-[48px] text-ink/20 font-light block mb-3 group-hover:text-ink transition-colors">
                  {step.number}
                </span>
                <Badge variant="neutral" className="mb-4">
                  {step.badge}
                </Badge>
                <h3 className="font-sans text-title-sm text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-[15px] text-body leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-hairline-soft">
                <span className="text-[12px] text-muted font-medium">
                  {idx === 0 && 'Takes under 2 minutes'}
                  {idx === 1 && 'Benchmarked against real roles'}
                  {idx === 2 && 'Step-by-step execution'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. THE PROBLEM VS. THE SOLUTION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-caption-upper text-muted block mb-2">
              The Contrast
            </span>
            <h2 className="font-serif text-display-lg text-ink mb-3 tracking-display-lg">
              Breaking The Random Tutorial Trap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* The Old Way */}
            <Card className="p-5 sm:p-7 md:p-8 border border-hairline-strong bg-canvas">
              <span className="text-[12px] font-semibold text-semantic-error uppercase tracking-wider block mb-2">
                WITHOUT CAREERSENSE
              </span>
              <h3 className="font-sans text-title-sm text-ink mb-4">
                The Scattered Learning Loop
              </h3>
              <ul className="space-y-3.5 text-[14px] text-body">
                <li className="flex items-start gap-2.5">
                  <span className="text-semantic-error font-bold mt-0.5">✕</span>
                  <span>Bouncing between 15 conflicting YouTube tutorials without direction</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-semantic-error font-bold mt-0.5">✕</span>
                  <span>Never knowing if your current skills make you genuinely job-ready</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-semantic-error font-bold mt-0.5">✕</span>
                  <span>Building generic clone projects that fail to impress technical interviewers</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-semantic-error font-bold mt-0.5">✕</span>
                  <span>Writing weak resume bullets without quantifiable achievements or stack clarity</span>
                </li>
              </ul>
            </Card>

            {/* The CareerSense Way */}
            <Card className="p-5 sm:p-7 md:p-8 border-2 border-ink bg-surface-card shadow-soft-drop relative overflow-hidden">
              <span className="text-[12px] font-semibold text-semantic-success uppercase tracking-wider block mb-2">
                WITH CAREERSENSE
              </span>
              <h3 className="font-sans text-title-sm text-ink mb-4">
                Mentorship-Driven Progression
              </h3>
              <ul className="space-y-3.5 text-[14px] text-ink">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-semantic-success mt-0.5 shrink-0" />
                  <span>Exact diagnosis of your technical deficiencies for your target title</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-semantic-success mt-0.5 shrink-0" />
                  <span>Sequenced, phased milestones with realistic day-by-day estimates</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-semantic-success mt-0.5 shrink-0" />
                  <span>Practical project briefs that specifically prove and close missing skills</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-semantic-success mt-0.5 shrink-0" />
                  <span>Real-time technical mock interviews with personalized answer critiques</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CORE CAPABILITIES (6-Module Grid)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-caption-upper text-muted block mb-2">
            Engineered Capabilities
          </span>
          <h2 className="font-serif text-display-lg text-ink mb-3 tracking-display-lg">
            Six Purpose-Built Career Modules
          </h2>
          <p className="text-[16px] text-body">
            Built strictly to answer: What do I need to learn? How do I build it? Am I ready to interview?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link key={idx} to={item.path} className="block group">
                <Card 
                  interactive 
                  className="p-5 sm:p-7 h-full flex flex-col justify-between group-hover:border-hairline-strong transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-full bg-surface-strong flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="neutral">{item.badge}</Badge>
                    </div>
                    <h3 className="font-sans text-title-sm text-ink mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-hairline-soft flex items-center text-[13px] font-medium text-ink group-hover:translate-x-1 transition-transform">
                    <span>Launch module</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PRE-FOOTER CTA BAND (96px Padding Rhythm)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Badge variant="neutral" className="mb-4">
            BEGIN YOUR ACCELERATION
          </Badge>
          <h2 className="font-serif text-[28px] sm:text-display-lg text-ink mb-4 tracking-tight">
            Ready to find your technical gaps?
          </h2>
          <p className="text-[15px] sm:text-[16px] text-body mb-8 leading-relaxed">
            Create your profile in 2 minutes and receive a personalized learning roadmap today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <Link to="/setup" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-sm">
                Start Assessment Now
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Sample Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
