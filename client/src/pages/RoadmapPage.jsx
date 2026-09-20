import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AtmosphericOrb from '../components/common/AtmosphericOrb';
import { useProfile } from '../context/ProfileContext';
import { CheckCircle2, Circle, Clock, ArrowRight, Edit3 } from 'lucide-react';

export default function RoadmapPage() {
  const { profile, roadmapPhases, toggleRoadmapTopic } = useProfile();

  // Calculate overall progress
  const allTopics = roadmapPhases.flatMap((p) => p.topics);
  const completedTopics = allTopics.filter((t) => t.done).length;
  const progressPercent = allTopics.length > 0 ? Math.round((completedTopics / allTopics.length) * 100) : 0;

  return (
    <div className="relative max-w-4xl mx-auto py-6 space-y-8">
      {/* Background Decorative Blooms */}
      <AtmosphericOrb variant="mint" size="lg" className="-top-20 -right-20 opacity-30" />
      <AtmosphericOrb variant="lavender" size="xl" className="top-1/3 -left-32 opacity-25" />

      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="neutral">
          PHASED LEARNING TRAJECTORY
        </Badge>
        <h1 className="font-serif text-display-lg text-ink">
          Milestones for {profile.targetRole}
        </h1>
        <p className="text-[16px] text-body max-w-xl mx-auto">
          Sequenced curriculum calibrated to your {profile.weeklyHours} hours/week commitment to close your priority skill gaps.
        </p>

        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-surface-card border border-hairline px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm text-[12px] sm:text-[13px]">
          <span className="font-semibold text-ink">{completedTopics} of {allTopics.length} Topics Completed</span>
          <span className="text-hairline-strong hidden sm:inline">•</span>
          <span className="text-semantic-success font-medium">{progressPercent}% Progress</span>
        </div>
      </div>

      {/* Phased Timeline */}
      <div className="space-y-6">
        {roadmapPhases.map((phase, pIdx) => {
          const phaseDone = phase.topics.every((t) => t.done);
          return (
            <Card key={pIdx} className="p-4 sm:p-7 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4 mb-5">
                <div>
                  <span className="text-caption-upper text-muted block mb-1">
                    PHASE 0{phase.phaseNumber}
                  </span>
                  <h2 className="font-serif text-display-sm text-ink">
                    {phase.title}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> ~{phase.durationDays} days
                  </span>
                  <Badge variant={phaseDone ? 'mint' : 'neutral'}>
                    {phaseDone ? 'Completed' : 'In Progress'}
                  </Badge>
                </div>
              </div>

              {/* Topics Checklist */}
              <div className="space-y-2.5">
                {phase.topics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => toggleRoadmapTopic(pIdx, topic.id)}
                    className={`p-3.5 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                      topic.done
                        ? 'bg-canvas-soft border-hairline text-muted'
                        : 'bg-surface-card border-hairline text-ink hover:border-hairline-strong'
                    }`}
                  >
                    {topic.done ? (
                      <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-hairline-strong shrink-0" />
                    )}
                    <span className={`text-[14px] font-medium ${topic.done ? 'line-through text-muted' : ''}`}>
                      {topic.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-hairline">
        <Link to="/setup">
          <Button variant="outline" size="sm" icon={Edit3}>
            Edit Profile
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
