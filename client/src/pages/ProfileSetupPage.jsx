import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import AtmosphericOrb from '../components/common/AtmosphericOrb';
import { useProfile } from '../context/ProfileContext';
import { 
  Target, 
  Plus, 
  X, 
  ArrowRight, 
  Clock, 
  FolderGit2, 
  Heart, 
  Check, 
  RotateCcw,
  Info,
  Code2
} from 'lucide-react';

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const { 
    profile, 
    updateProfile, 
    addSkill, 
    removeSkill, 
    addProject, 
    removeProject, 
    toggleInterest,
    resetToDefault,
    availableRoles,
    saveProfileToDb,
    isLoading
  } = useProfile();

  // Local state for adding a new skill
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState('Frontend');
  const [skillProficiency, setSkillProficiency] = useState('Intermediate');
  const [skillEvidence, setSkillEvidence] = useState('');

  // Local state for adding a new project
  const [showAddProject, setShowAddProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectStack, setProjectStack] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  const suggestedSkills = {
    'Full Stack Developer': ['Node.js', 'Express', 'MongoDB', 'TypeScript', 'Docker', 'PostgreSQL'],
    'AI / ML Engineer': ['PyTorch', 'Scikit-learn', 'FastAPI', 'ChromaDB', 'TensorFlow', 'Docker'],
    'Backend Developer': ['PostgreSQL', 'Redis', 'Docker', 'FastAPI', 'GraphQL', 'Kubernetes']
  };

  const allInterests = [
    'Full Stack Web Architecture',
    'RESTful API Design',
    'AI Integration & Agents',
    'Vector Search & RAG',
    'Database Optimization',
    'Clean UI/UX Design',
    'Distributed Systems',
    'Open Source Projects',
    'Cloud Deployments (Vercel/Render)',
    'Mobile-First Design'
  ];

  const handleAddSkill = (e) => {
    e?.preventDefault();
    if (!skillName.trim()) return;
    addSkill({
      name: skillName.trim(),
      category: skillCategory,
      proficiency: skillProficiency,
      evidence: skillEvidence.trim() || 'Added during profile assessment'
    });
    setSkillName('');
    setSkillEvidence('');
  };

  const handleQuickAdd = (name) => {
    if (profile.skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) return;
    addSkill({
      name,
      category: 'Backend',
      proficiency: 'Beginner',
      evidence: 'Learning milestone'
    });
  };

  const handleAddProject = (e) => {
    e?.preventDefault();
    if (!projectTitle.trim()) return;
    addProject({
      title: projectTitle.trim(),
      stack: projectStack.trim() || 'React, Tailwind CSS',
      description: projectDesc.trim() || 'Independent practical project build.'
    });
    setProjectTitle('');
    setProjectStack('');
    setProjectDesc('');
    setShowAddProject(false);
  };

  const handleSaveAndProceed = async (targetPath = '/analysis') => {
    await saveProfileToDb();
    navigate(targetPath);
  };

  const currentSuggestions = suggestedSkills[profile.targetRole] || suggestedSkills['Full Stack Developer'];

  return (
    <div className="relative max-w-4xl mx-auto py-6 space-y-8">
      {/* Background Decorative Blooms */}
      <AtmosphericOrb variant="peach" size="lg" className="-top-20 -right-20 opacity-30" />
      <AtmosphericOrb variant="mint" size="lg" className="top-1/3 -left-20 opacity-25" />
      <AtmosphericOrb variant="lavender" size="xl" className="bottom-10 right-1/4 opacity-20" />

      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="neutral">
          STEP 01 — CAREER PROFILE SETUP
        </Badge>
        <h1 className="font-serif text-display-lg text-ink">
          Define Your Career Trajectory
        </h1>
        <p className="text-[16px] text-body max-w-xl mx-auto leading-relaxed">
          Provide your current skills, target role, projects, and study schedule. CareerSense uses this data to diagnose your skill gaps and build your personalized roadmap.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. TARGET ROLE
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-2.5 mb-2">
          <Target className="w-5 h-5 text-ink" />
          <h2 className="font-sans text-title-md text-ink">1. Target Career Role</h2>
        </div>
        <p className="text-[14px] text-muted mb-5">
          Select the exact role you are targeting. Career benchmarks and gap diagnostics adjust automatically.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {availableRoles.map((role) => {
            const isSelected = profile.targetRole === role;
            return (
              <button
                key={role}
                type="button"
                onClick={() => updateProfile({ targetRole: role })}
                className={`px-4 py-2 rounded-pill text-[14px] font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-surface-card border border-hairline-strong text-ink hover:bg-surface-strong'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{role}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          2. EXPERIENCE LEVEL & LEARNING TIME
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-2.5 mb-2">
          <Clock className="w-5 h-5 text-ink" />
          <h2 className="font-sans text-title-md text-ink">2. Experience Level & Learning Commitment</h2>
        </div>
        <p className="text-[14px] text-muted mb-6">
          Helps calibrate roadmap pacing and project difficulty.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience level selector */}
          <div>
            <label className="block text-[14px] font-medium text-ink mb-2">
              Current Experience Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                const isSelected = profile.experienceLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => updateProfile({ experienceLevel: lvl })}
                    className={`py-2 px-3 rounded-lg text-[13px] font-medium border text-center transition-all ${
                      isSelected
                        ? 'border-ink bg-ink text-white shadow-sm'
                        : 'border-hairline bg-surface-card text-ink hover:border-hairline-strong'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
            <p className="text-[12px] text-muted mt-2">
              {profile.experienceLevel === 'Beginner' && 'Focus on syntax, fundamentals, and first CRUD project.'}
              {profile.experienceLevel === 'Intermediate' && 'Focus on full-stack architecture, testing, and production deployment.'}
              {profile.experienceLevel === 'Advanced' && 'Focus on performance profiling, distributed systems, and system design.'}
            </p>
          </div>

          {/* Learning Time Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[14px] font-medium text-ink">
                Weekly Study Time
              </label>
              <span className="text-[14px] font-semibold text-ink bg-surface-strong px-2.5 py-0.5 rounded-full">
                {profile.weeklyHours} hours/week
              </span>
            </div>

            <input
              type="range"
              min="4"
              max="40"
              step="2"
              value={profile.weeklyHours}
              onChange={(e) => updateProfile({ weeklyHours: Number(e.target.value) })}
              className="w-full h-2 bg-hairline rounded-lg appearance-none cursor-pointer accent-ink my-3"
            />

            <div className="flex justify-between text-[12px] text-muted">
              <span>4 hrs (Casual)</span>
              <span>12–16 hrs (Standard)</span>
              <span>40 hrs (Full-time Bootcamp)</span>
            </div>
            <p className="text-[12px] text-body mt-2">
              Pacing estimate: <span className="font-medium text-ink">~{(profile.weeklyHours / 5).toFixed(1)} hrs/day</span> across 5 days.
            </p>
          </div>
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          3. CURRENT SKILLS INVENTORY
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-ink" />
            <h2 className="font-sans text-title-md text-ink">
              3. Current Skills Inventory ({profile.skills.length})
            </h2>
          </div>
          <Badge variant="neutral" className="self-start sm:self-auto">Verified Benchmarking</Badge>
        </div>
        <p className="text-[14px] text-muted mb-6">
          Enter technologies you know. Categorize them and indicate your proficiency level.
        </p>

        {/* Skill Input Form */}
        <form onSubmit={handleAddSkill} className="p-4 rounded-xl bg-canvas border border-hairline mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <Input
                placeholder="Technology name (e.g. React, Node.js)..."
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
              />
            </div>

            <div>
              <select
                value={skillCategory}
                onChange={(e) => setSkillCategory(e.target.value)}
                className="w-full h-[44px] bg-surface-card text-ink rounded-lg border border-hairline-strong px-3 text-[14px] focus:outline-none focus:border-ink"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Programming">Programming</option>
                <option value="AI/ML">AI / ML</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps / Tools</option>
              </select>
            </div>

            <div>
              <select
                value={skillProficiency}
                onChange={(e) => setSkillProficiency(e.target.value)}
                className="w-full h-[44px] bg-surface-card text-ink rounded-lg border border-hairline-strong px-3 text-[14px] focus:outline-none focus:border-ink"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Optional project or course evidence (e.g. Built 2 projects, completed Udemy course)..."
                value={skillEvidence}
                onChange={(e) => setSkillEvidence(e.target.value)}
              />
            </div>
            <Button type="submit" variant="primary" icon={Plus} className="shrink-0 h-[44px]">
              Add to Skills
            </Button>
          </div>
        </form>

        {/* Quick Add Suggestions for target role */}
        <div className="mb-6">
          <span className="text-[12px] font-medium text-muted block mb-2">
            Suggested for {profile.targetRole}:
          </span>
          <div className="flex flex-wrap gap-2">
            {currentSuggestions.map((sug) => {
              const alreadyAdded = profile.skills.some((s) => s.name.toLowerCase() === sug.toLowerCase());
              if (alreadyAdded) return null;
              return (
                <button
                  key={sug}
                  type="button"
                  onClick={() => handleQuickAdd(sug)}
                  className="text-[12px] px-2.5 py-1 rounded-pill bg-surface-strong hover:bg-hairline-strong text-ink transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>{sug}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Added Skills List */}
        <div className="p-4 rounded-xl bg-surface-card border border-hairline min-h-[120px]">
          <span className="text-caption-upper text-muted block mb-3">
            Active Profile Skills ({profile.skills.length})
          </span>
          <div className="flex flex-wrap gap-2.5">
            {profile.skills.map((s) => (
              <div
                key={s.id || s.name}
                className="inline-flex items-center gap-2 bg-canvas border border-hairline px-3 py-1.5 rounded-pill text-[13px] text-ink shadow-sm group hover:border-hairline-strong transition-all"
              >
                <span className="font-medium">{s.name}</span>
                <span className="text-[11px] text-muted bg-surface-strong px-1.5 py-0.5 rounded-full">
                  {s.proficiency}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-soft">
                  {s.category}
                </span>
                <button
                  type="button"
                  onClick={() => removeSkill(s.id || s.name)}
                  className="text-muted hover:text-semantic-error transition-colors ml-0.5"
                  aria-label={`Remove ${s.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          4. EXISTING PROJECTS & PORTFOLIO WORK
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-5 h-5 text-ink" />
            <h2 className="font-sans text-title-md text-ink">
              4. Built Projects ({profile.projects.length})
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={() => setShowAddProject(!showAddProject)}
          >
            {showAddProject ? 'Cancel' : 'Add Project'}
          </Button>
        </div>
        <p className="text-[14px] text-muted mb-6">
          List your existing repositories or applications so the AI doesn't re-recommend things you've already built.
        </p>

        {/* Inline Add Project Form */}
        {showAddProject && (
          <form onSubmit={handleAddProject} className="p-4 rounded-xl bg-canvas border border-hairline mb-6 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Project title (e.g. Personal Portfolio)..."
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
              <Input
                placeholder="Technologies used (e.g. React, Tailwind)..."
                value={projectStack}
                onChange={(e) => setProjectStack(e.target.value)}
              />
            </div>
            <textarea
              rows={2}
              placeholder="Brief description of features, problems solved, and measurable impact..."
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              className="w-full bg-surface-card text-ink p-3 rounded-lg border border-hairline-strong text-[14px] focus:outline-none focus:border-ink"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAddProject(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Project
              </Button>
            </div>
          </form>
        )}

        {/* Existing Projects Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl bg-canvas border border-hairline flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-[15px] font-semibold text-ink">{proj.title}</h3>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="text-muted hover:text-semantic-error transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <Badge variant="neutral" className="text-[11px] mb-2 py-0 px-2">
                  {proj.stack}
                </Badge>
                <p className="text-[13px] text-body line-clamp-2">
                  {proj.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          5. TECHNICAL INTERESTS
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-6 md:p-8">
        <div className="flex items-center gap-2.5 mb-2">
          <Heart className="w-5 h-5 text-ink" />
          <h2 className="font-sans text-title-md text-ink">5. Technical Interests & Specializations</h2>
        </div>
        <p className="text-[14px] text-muted mb-5">
          Select topics you are passionate about exploring to bias project recommendations.
        </p>

        <div className="flex flex-wrap gap-2">
          {allInterests.map((interest) => {
            const isSelected = profile.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-3.5 py-1.5 rounded-pill text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-surface-card border border-hairline text-ink hover:bg-surface-strong'
                }`}
              >
                {isSelected && <Check className="w-3 h-3" />}
                <span>{interest}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          ACTION BAR: Save & Launch Analysis / Dashboard
      ───────────────────────────────────────────────────────────── */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-hairline">
        <Button
          variant="outline"
          icon={RotateCcw}
          onClick={resetToDefault}
          className="text-muted hover:text-ink text-[13px] w-full sm:w-auto order-3 sm:order-1"
          disabled={isLoading}
        >
          Reset Demo Defaults
        </Button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleSaveAndProceed('/dashboard')}
            className="w-full sm:w-auto text-[14px]"
            disabled={isLoading}
          >
            Go to Dashboard
          </Button>

          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => handleSaveAndProceed('/analysis')}
            className="w-full sm:w-auto shadow-md"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing Profile...' : 'Analyze Real Profile & View Gap Matrix'}
          </Button>
        </div>
      </div>
    </div>
  );
}
