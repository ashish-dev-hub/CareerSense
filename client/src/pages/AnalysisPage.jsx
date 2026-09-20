import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AtmosphericOrb from '../components/common/AtmosphericOrb';
import { useProfile } from '../context/ProfileContext';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, TrendingUp, Edit3 } from 'lucide-react';

export default function AnalysisPage() {
  const { profile, derivedIntelligence } = useProfile();
  const { strengths, gaps, readinessScore } = derivedIntelligence;

  return (
    <div className="relative max-w-5xl mx-auto py-6 space-y-8">
      <AtmosphericOrb variant="mint" size="xl" className="-top-24 -left-24 opacity-35" />
      <AtmosphericOrb variant="peach" size="lg" className="top-1/3 -right-20 opacity-30" />

      {/* Header */}
      <div className="text-center">
        <Badge variant="neutral" className="mb-3">
          AI GAP DIAGNOSTIC MATRIX
        </Badge>
        <h1 className="font-serif text-display-lg text-ink mb-2">
          Skill Benchmark vs. {profile.targetRole}
        </h1>
        <p className="text-[16px] text-body max-w-xl mx-auto">
          We compared your {profile.skills.length} verified profile skills against market expectations for {profile.targetRole} to pinpoint exact growth areas.
        </p>
      </div>

      {/* Readiness Summary Card */}
      <Card className="p-5 sm:p-8 bg-surface-card border-hairline relative overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <TrendingUp className="w-5 h-5 text-ink" />
              <h2 className="font-sans text-title-md text-ink">
                Estimated Role Readiness: {readinessScore}% Match
              </h2>
            </div>
            <p className="text-[14px] sm:text-[15px] text-body max-w-xl">
              You possess {strengths.length} verified foundational skills for {profile.targetRole}. Systematically closing the {gaps.length} identified gaps will elevate you into full interview candidacy.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link to="/setup" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" icon={Edit3} className="w-full sm:w-auto">
                Edit Skills
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto shadow-sm">
                Open Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Existing Strengths */}
        <Card className="p-4 sm:p-7">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-semantic-success" />
              <h3 className="font-sans text-title-sm text-ink">
                Existing Strengths ({strengths.length})
              </h3>
            </div>
            <Badge variant="mint">Verified</Badge>
          </div>

          <p className="text-[13px] sm:text-[14px] text-muted mb-4 sm:mb-5">
            Skills meeting the industry baseline for {profile.targetRole}:
          </p>

          <div className="space-y-3 sm:space-y-3.5">
            {strengths.map((item, idx) => (
              <div key={idx} className="p-3 sm:p-4 rounded-xl bg-canvas border border-hairline flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-semantic-success mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-[14px] sm:text-[15px] font-medium text-ink truncate">{item.name}</h4>
                    <p className="text-[12px] sm:text-[13px] text-body mt-0.5">{item.evidence || item.note}</p>
                  </div>
                </div>
                <Badge variant="neutral" className="text-[11px] shrink-0">
                  {item.proficiency}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Identified Skill Gaps */}
        <Card className="p-4 sm:p-7">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#854d0e]" />
              <h3 className="font-sans text-title-sm text-ink">
                Identified Skill Gaps ({gaps.length})
              </h3>
            </div>
            <Badge variant="peach">Action Needed</Badge>
          </div>

          <p className="text-[13px] sm:text-[14px] text-muted mb-4 sm:mb-5">
            Skills you should prioritize to reach full job readiness:
          </p>

          <div className="space-y-3 sm:space-y-3.5">
            {gaps.map((item, idx) => (
              <div key={idx} className="p-3 sm:p-4 rounded-xl bg-canvas border border-hairline flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[14px] sm:text-[15px] font-medium text-ink truncate">{item.name}</span>
                  <Badge variant={item.priority === 'High' ? 'rose' : 'peach'} className="shrink-0">
                    {item.priority} Priority
                  </Badge>
                </div>
                <p className="text-[12px] sm:text-[13px] text-body leading-relaxed">{item.rationale}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Footer Navigation Action */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-hairline">
        <Link to="/setup" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">Back to Profile Setup</Button>
        </Link>
        <Link to="/dashboard" className="w-full sm:w-auto">
          <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto shadow-sm">
            Go to Candidate Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
