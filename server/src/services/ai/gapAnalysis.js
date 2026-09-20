const ROLE_BENCHMARKS = require('./mockData');

const normalize = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const isSkillMatch = (userSkillName, reqSkillName) => {
  const uNorm = normalize(userSkillName);
  const rNorm = normalize(reqSkillName);
  if (!uNorm || !rNorm) return false;

  if (uNorm === rNorm) return true;
  if (uNorm.includes(rNorm) || rNorm.includes(uNorm)) return true;

  // Specific common aliases
  if ((uNorm.includes('javascript') || uNorm === 'js') && rNorm.includes('javascript')) return true;
  if (uNorm.includes('react') && rNorm.includes('react')) return true;
  if (uNorm.includes('node') && rNorm.includes('node')) return true;
  if (uNorm.includes('mongo') && rNorm.includes('mongo')) return true;
  if (uNorm.includes('python') && rNorm.includes('python')) return true;
  if (uNorm.includes('git') && rNorm.includes('git')) return true;
  if ((uNorm.includes('html') || uNorm.includes('css')) && (rNorm.includes('html') || rNorm.includes('css'))) return true;

  return false;
};

const generateGapAnalysis = async (profile) => {
  // Simulate AI latency
  await new Promise(resolve => setTimeout(resolve, 600));

  const roleKey = profile.targetRole || 'Full Stack Developer';
  const benchmark = ROLE_BENCHMARKS[roleKey] || ROLE_BENCHMARKS['Full Stack Developer'];
  
  const strengths = [];
  const gaps = [];
  const userSkills = profile.skills || [];

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
    recommendedProjects: benchmark.recommendedProjects || [],
  };
};

module.exports = { generateGapAnalysis };
