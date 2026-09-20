import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AtmosphericOrb from '../components/common/AtmosphericOrb';
import { useProfile } from '../context/ProfileContext';
import { 
  ArrowRight, 
  Map, 
  Code2, 
  FileText, 
  Mic, 
  CheckCircle2, 
  Circle,
  Clock,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  FolderGit2,
  Heart,
  Edit3
} from 'lucide-react';

export default function DashboardPage() {
  const { 
    profile, 
    roadmapPhases, 
    toggleRoadmapTopic, 
    derivedIntelligence 
  } = useProfile();

  const { 
    strengths, 
    gaps, 
    readinessScore, 
    nextAction, 
    recommendedProjects 
  } = derivedIntelligence;

  // Calculate roadmap completion percentage
  const allTopics = roadmapPhases.flatMap((p) => p.topics);
  const completedTopics = allTopics.filter((t) => t.done).length;
  const roadmapPercent = allTopics.length > 0 ? Math.round((completedTopics / allTopics.length) * 100) : 0;

  return (
    <div className="relative max-w-5xl mx-auto py-6 space-y-8">
      {/* Background Decorative Blooms */}
      <AtmosphericOrb variant="sky" size="lg" className="-top-16 -right-16 opacity-35" />
      <AtmosphericOrb variant="lavender" size="lg" className="top-1/2 -left-20 opacity-30" />
      <AtmosphericOrb variant="peach" size="md" className="bottom-20 right-10 opacity-25" />

      {/* ─────────────────────────────────────────────────────────────
          1. DASHBOARD HEADER & PROFILE SUMMARY
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="neutral">ACTIVE CANDIDACY WORKSPACE</Badge>
            <span className="text-[13px] text-muted">• {profile.experienceLevel} Level</span>
          </div>
          <h1 className="font-serif text-[32px] sm:text-display-md text-ink">
            Targeting {profile.targetRole}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Badge variant="mint" icon={TrendingUp}>
            Readiness: {readinessScore}%
          </Badge>
          <Badge variant="neutral" icon={Clock}>
            {profile.weeklyHours} hrs/week
          </Badge>
          <Link to="/analysis">
            <Button variant="outline" size="sm" icon={TrendingUp}>
              Gap Matrix
            </Button>
          </Link>
          <Link to="/setup">
            <Button variant="outline" size="sm" icon={Edit3}>
              Edit Skills
            </Button>
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. PROFILE SNAPSHOT CHIPS (Skills, Projects, Interests)
      ───────────────────────────────────────────────────────────── */}
      <div className="p-4 rounded-xl bg-surface-card border border-hairline flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4 text-[13px] text-body">
          <span className="flex items-center gap-1.5 font-medium text-ink">
            <CheckCircle2 className="w-4 h-4 text-semantic-success" />
            <span>{profile.skills.length} Skills Registered</span>
          </span>
          <span className="text-hairline-strong">•</span>
          <span className="flex items-center gap-1.5 font-medium text-ink">
            <FolderGit2 className="w-4 h-4 text-ink" />
            <span>{profile.projects.length} Projects Documented</span>
          </span>
          <span className="text-hairline-strong">•</span>
          <span className="flex items-center gap-1.5 text-muted">
            <Heart className="w-3.5 h-3.5 text-gradient-rose" />
            <span>{profile.interests.slice(0, 2).join(', ')}{profile.interests.length > 2 ? ` +${profile.interests.length - 2} more` : ''}</span>
          </span>
        </div>

        <Link to="/setup" className="text-[12px] font-semibold text-ink hover:underline">
          Manage Inventory →
        </Link>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO: SINGLE MOST IMPORTANT NEXT ACTION
      ───────────────────────────────────────────────────────────── */}
      <Card variant="featured-dark" className="p-8 md:p-10 relative overflow-hidden bg-ink text-white shadow-elevated">
        <AtmosphericOrb variant="peach" size="md" className="-right-12 -bottom-12 opacity-30" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-caption-upper text-muted-soft tracking-caption-upper">
              YOUR NEXT RECOMMENDED STEP
            </span>
          </div>

          <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[36px] font-light leading-snug mb-3">
            {nextAction.phaseTitle}
          </h2>

          <p className="text-[15px] text-muted-soft mb-6 leading-relaxed font-normal">
            {nextAction.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/roadmap">
              <Button variant="dark" size="md" icon={ArrowRight} iconPosition="right">
                Continue Learning Roadmap
              </Button>
            </Link>
            <span className="text-[13px] text-muted-soft flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> ~{Math.round(nextAction.estimatedHours / (profile.weeklyHours / 5))} days at your current pacing
            </span>
          </div>
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          4. READINESS SCORE & CONTRIBUTING FACTORS
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-4 sm:p-6 md:p-8 bg-surface-card border border-hairline">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <h3 className="font-sans text-title-sm text-ink">
                Job-Readiness Diagnostic: {readinessScore}% Match
              </h3>
              <Link to="/analysis" className="text-[12px] font-semibold text-ink hover:underline">
                View Full Matrix →
              </Link>
            </div>
            <p className="text-[14px] text-muted mt-1">
              Calculated by benchmarking your {profile.skills.length} recorded skills directly against verified market requirements for {profile.targetRole}.
            </p>
          </div>
          <div className="w-32 bg-hairline rounded-full h-3 shrink-0 overflow-hidden self-start sm:self-auto">
            <div 
              className="bg-ink h-full rounded-full transition-all duration-500" 
              style={{ width: `${readinessScore}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-hairline text-[13px]">
          <div>
            <span className="text-muted block mb-0.5">Matched Core Competencies</span>
            <span className="font-semibold text-semantic-success">{strengths.length} verified skills</span>
          </div>
          <div>
            <span className="text-muted block mb-0.5">Primary Gaps to Close</span>
            <span className="font-semibold text-semantic-error">{gaps.filter(g => g.priority === 'High').length} high-priority topics</span>
          </div>
          <div>
            <span className="text-muted block mb-0.5">Roadmap Milestone Completion</span>
            <span className="font-semibold text-ink">{completedTopics} of {allTopics.length} topics finished ({roadmapPercent}%)</span>
          </div>
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          5. STRENGTHS VS. GAPS MATRIX
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Strengths */}
        <Card className="p-4 sm:p-6 md:p-7">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-semantic-success" />
              <h3 className="font-sans text-title-sm text-ink">
                Existing Strengths ({strengths.length})
              </h3>
            </div>
            <Badge variant="mint">Active</Badge>
          </div>

          <p className="text-[13px] text-muted mb-4">
            Technologies in your inventory that align with {profile.targetRole}:
          </p>

          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            {strengths.map((s, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-canvas border border-hairline flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[14px] font-medium text-ink block truncate">{s.name}</span>
                    <span className="text-[11px] text-muted block truncate">{s.evidence}</span>
                  </div>
                </div>
                <Badge variant="neutral" className="text-[11px] shrink-0">{s.proficiency}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Identified Gaps */}
        <Card className="p-4 sm:p-6 md:p-7">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#854d0e]" />
              <h3 className="font-sans text-title-sm text-ink">
                Priority Skill Gaps ({gaps.length})
              </h3>
            </div>
            <Badge variant="peach">Action Required</Badge>
          </div>

          <p className="text-[13px] text-muted mb-4">
            Missing competencies required to qualify for interviews:
          </p>

          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            {gaps.map((g, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-canvas border border-hairline flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-ink">{g.name}</span>
                  <Badge variant={g.priority === 'High' ? 'rose' : 'peach'} className="text-[10px]">
                    {g.priority} Priority
                  </Badge>
                </div>
                <span className="text-[12px] text-muted">{g.rationale}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. PHASED ROADMAP PREVIEW (Interactive Checklists)
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-7 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Map className="w-5 h-5 text-ink" />
              <h3 className="font-sans text-title-md text-ink">
                Personalized Learning Roadmap
              </h3>
            </div>
            <p className="text-[14px] text-muted">
              Click any topic to mark it complete. Your progress saves automatically.
            </p>
          </div>

          <Link to="/roadmap">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              Open Full Roadmap View
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmapPhases.map((phase, pIdx) => {
            const phaseDone = phase.topics.every(t => t.done);
            return (
              <div key={pIdx} className="p-5 rounded-xl bg-canvas border border-hairline flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-caption-upper text-muted font-semibold">
                      PHASE 0{phase.phaseNumber}
                    </span>
                    <Badge variant={phaseDone ? 'mint' : 'neutral'} className="text-[10px]">
                      {phaseDone ? 'Completed' : `~${phase.durationDays} days`}
                    </Badge>
                  </div>
                  <h4 className="text-[15px] font-semibold text-ink mb-4 line-clamp-2">
                    {phase.title}
                  </h4>

                  <div className="space-y-2">
                    {phase.topics.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => toggleRoadmapTopic(pIdx, t.id)}
                        className={`p-2.5 rounded-lg border text-[13px] flex items-center gap-2.5 cursor-pointer transition-all ${
                          t.done
                            ? 'bg-surface-card border-hairline text-muted line-through'
                            : 'bg-surface-card border-hairline-strong text-ink hover:border-ink'
                        }`}
                      >
                        {t.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-semantic-success shrink-0" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-hairline-strong shrink-0" />
                        )}
                        <span className="truncate">{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          7. RECOMMENDED GAP-CLOSING PROJECTS
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-caption-upper text-muted block mb-1">PRACTICAL VALIDATION</span>
            <h3 className="font-serif text-display-sm text-ink">
              Recommended Gap-Closing Projects
            </h3>
          </div>
          <Link to="/projects">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              View All Projects
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedProjects.map((proj, idx) => (
            <Card key={idx} className="p-6 md:p-7 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={proj.difficulty === 'Advanced' ? 'rose' : 'peach'}>
                    {proj.difficulty}
                  </Badge>
                  <span className="text-[13px] text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {proj.duration}
                  </span>
                </div>

                <h4 className="text-[16px] font-semibold text-ink">
                  {proj.title}
                </h4>

                <p className="text-[13px] text-body leading-relaxed">
                  {proj.problem}
                </p>

                <div className="p-3 rounded-lg bg-canvas border border-hairline">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-0.5">
                    Skills Developed:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {proj.skillsLearned.map((s, sIdx) => (
                      <span key={sIdx} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-card border border-hairline text-ink">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-hairline flex items-center justify-between">
                <span className="text-[12px] text-muted font-medium">Built for {profile.targetRole}</span>
                <Link to="/projects">
                  <Button variant="outline" size="sm">
                    Inspect Specs
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          8. QUICK PREPARATION LAUNCH CARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <Link to="/resume" className="block group">
          <Card interactive className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-strong flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-ink">Resume &amp; Portfolio Critique</h4>
                <p className="text-[13px] text-body">Benchmark bullet descriptions against {profile.targetRole}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-ink group-hover:translate-x-1 transition-all" />
          </Card>
        </Link>

        <Link to="/interview" className="block group">
          <Card interactive className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-strong flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-white transition-colors">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-ink">AI Mock Interview Mode</h4>
                <p className="text-[13px] text-body">Practice questions tailored for {profile.targetRole}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-ink group-hover:translate-x-1 transition-all" />
          </Card>
        </Link>
      </div>
    </div>
  );
}
